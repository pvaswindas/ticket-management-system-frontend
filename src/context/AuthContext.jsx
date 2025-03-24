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
            await axiosInstance.post('auth/logout/');
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
        } catch {
            await logout();
            return false;
        }
    }, [logout]);


    const refreshAccessToken = useCallback(async () => {
        const refreshToken = localStorage.getItem('REFRESH_TOKEN');
        if (!refreshToken) return false;

        try {
            const res = await axiosInstance.post('auth/token/refresh/', { refresh: refreshToken });
            localStorage.setItem('ACCESS_TOKEN', res.data.access);
            localStorage.setItem('REFRESH_TOKEN', res.data.refresh);
            
            const statusOk = await checkUserStatus();
            setAuthState(prev => ({
                ...prev,
                isAuthorized: statusOk
            }));
            return statusOk;
        } catch {
            await logout();
            return false;
        }
    }, [checkUserStatus, logout]);


    const validateAccessToken = useCallback(async () => {
        const token = localStorage.getItem('ACCESS_TOKEN');
        if (!token) return false;

        try {
            const decoded = jwtDecode(token);
            const now = Math.floor(Date.now() / 1000);
            
            if (decoded.exp < now) {
                return await refreshAccessToken();
            }
            
            return await checkUserStatus();
        } catch {
            return false;
        }
    }, [refreshAccessToken, checkUserStatus]);

    
    const refreshAuthState = useCallback(async () => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        const isValid = await validateAccessToken();
        setAuthState(prev => ({ 
            ...prev, 
            isAuthorized: isValid,
            isLoading: false
        }));
        return isValid;
    }, [validateAccessToken]);


    useEffect(() => {
        let isMounted = true;
        
        (async () => {
            const isValid = await validateAccessToken();
            if (isMounted) {
                setAuthState(prev => ({
                    ...prev,
                    isAuthorized: isValid,
                    isLoading: false
                }));
            }
        })();

        const intervalId = setInterval(async () => {
            if (isMounted) {
                await checkUserStatus();
            }
        }, 5 * 60 * 1000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, [validateAccessToken, checkUserStatus]);


    const login = useCallback(async (credentials) => {
        try {
            const response = await loginUser(credentials)
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