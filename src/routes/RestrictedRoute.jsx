import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LoadingPage';

function RestrictedRoute({ children }) {
    const { isAuthorized, isLoading } = useAuth();

    if (isLoading) return <LoadingPage />;
    
    return isAuthorized ? <Navigate to="/dashboard" replace /> : children;
}

export default RestrictedRoute;
