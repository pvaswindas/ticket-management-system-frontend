import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LoadingPage';

function ProtectedRoute({ children, adminAllowed = false }) {
    const { isAuthorized, isLoading, userStatus, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthorized || userStatus === 'suspended') {
                navigate('/login', { replace: true });
                return;
            }
            
            if (!adminAllowed && role === 'admin') {
                navigate('/admin', { replace: true });
                return;
            }
        }
    }, [isAuthorized, isLoading, navigate, userStatus, role, adminAllowed]);

    if (isLoading) return <LoadingPage />;

    const isAllowed = isAuthorized && 
                     userStatus !== 'suspended' && 
                     (adminAllowed || role !== 'admin');
                     
    return isAllowed ? children : null;
}

export default ProtectedRoute;