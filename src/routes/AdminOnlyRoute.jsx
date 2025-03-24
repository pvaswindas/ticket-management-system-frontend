import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingPage from '@/pages/common/LoadingPage';

function AdminOnlyRoute({ children }) {
    const { isAuthorized, isLoading, role } = useAuth();

    if (isLoading) return <LoadingPage />;

    if (!isAuthorized || role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default AdminOnlyRoute;