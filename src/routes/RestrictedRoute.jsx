import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LoadingPage';

function RestrictedRoute({ children }) {
    const { isAuthorized, isLoading, role } = useAuth();

    if (isLoading) return <LoadingPage />;

    if (isAuthorized) {
        return role === 'admin' ? <Navigate to="/admin" replace /> : <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default RestrictedRoute;