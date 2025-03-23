import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LoadingPage';

function AdminOnlyRoute({ children }) {
    const { isAuthorized, isLoading, role } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && (!isAuthorized || role !== 'admin')) {
            navigate('/', { replace: true });
        }
    }, [isAuthorized, isLoading, navigate, role]);

    if (isLoading) return <LoadingPage />;

    return (isAuthorized && role === 'admin') ? children : <LoadingPage />;
}

export default AdminOnlyRoute;