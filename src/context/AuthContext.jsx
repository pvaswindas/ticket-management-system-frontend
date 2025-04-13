import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/services/axiosInstance';
import { loginUser } from '../services/auth/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        isAuthorized: null,
        role: 'user',
        isLoading: true,
        userStatus: null
    });

    const logout = useCallback(async () => {
        try {
            const refresh = localStorage.getItem('REFRESH_TOKEN');
            if (refresh) {
                await axiosInstance.options('auth/logout', refresh);
            }
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('REFRESH_TOKEN');
            setAuthState(prev => ({
                ...prev,
                isAuthorized: false,
                role: 'user',
                userStatus: null
            }));
        }
    }, []);

    const checkUserStatus = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return false;
    
        try {
            const response = await axiosInstance.get('auth/status/');
            
            if (response.data.status === 'suspended') {
                await logout();
                setAuthState(prev => ({
                    ...prev,
                    isAuthorized: false,
                    userStatus: 'suspended'
                }));
                return false;
            }
            
            setAuthState(prev => ({
                ...prev,
                userStatus: 'active',
                role: response.data.role
            }));
            return true;
        } catch (error) {
            // Let axios interceptor handle auth errors
            if (!error.response || error.response.status !== 401) {
                console.error("Status check error:", error);
            }
            return false;
        }
    }, [logout]);

    const validateToken = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return false;
    
        try {
            const decoded = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            
            // Check if token is expired
            if (decoded.exp && decoded.exp < now) {
                console.log("Token expired, will rely on interceptor for refresh");
                return false;
            }
            
            return await checkUserStatus();
        } catch {
            return false;
        }
    }, [checkUserStatus]);
    
    const refreshAuthState = useCallback(async () => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        const isValid = await validateToken();
        setAuthState(prev => ({ 
            ...prev, 
            isAuthorized: isValid,
            isLoading: false
        }));
        return isValid;
    }, [validateToken]);

    // Set up authentication state and event listeners
    useEffect(() => {
        let isMounted = true;
        
        // Initial auth check
        validateToken().then(isValid => {
            if (isMounted) {
                setAuthState(prev => ({
                    ...prev,
                    isAuthorized: isValid,
                    isLoading: false
                }));
            }
        });

        // Listen for logout events from axios interceptor
        const handleLogout = () => {
            if (isMounted) {
                logout();
            }
        };
        
        window.addEventListener('auth:logout', handleLogout);

        // Periodic status check
        const statusInterval = setInterval(() => {
            if (isMounted) {
                checkUserStatus();
            }
        }, 5 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(statusInterval);
            window.removeEventListener('auth:logout', handleLogout);
        };
    }, [validateToken, checkUserStatus, logout]);

    const login = useCallback(async (credentials) => {
        try {
            const response = await loginUser(credentials);
            const { access, refresh, role } = response.data;
            
            localStorage.setItem('ACCESS_TOKEN', access);
            localStorage.setItem('REFRESH_TOKEN', refresh);
            
            setAuthState(prev => ({
                ...prev,
                isAuthorized: true,
                role: role,
                userStatus: 'active'
            }));
            
            return { success: true, role };
        } catch (error) {
            return { 
                success: false, 
                error: error.response?.data?.error || { non_field_errors: ['Login failed'] }
            };
        }
    }, []);

    const value = {
        ...authState,
        login,
        logout,
        refreshAuthState
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}