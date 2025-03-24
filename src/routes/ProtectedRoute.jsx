import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from '@/pages/common/LoadingPage';

function ProtectedRoute({ children, adminAllowed = false }) {
    const { isAuthorized, isLoading, userStatus, role } = useAuth();

    if (isLoading) return <LoadingPage />;

    if (!isAuthorized || userStatus === 'suspended') {
        return <Navigate to="/login" replace />;
    }
    
    if (!adminAllowed && role === 'admin') {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default ProtectedRoute;