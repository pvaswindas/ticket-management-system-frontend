import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LandingPage';

function AdminOnlyRoute({ children }) {
    const { isAuthorized, isLoading, role } = useAuth();
    const navigate = useNavigate();

    if (isLoading) return <LoadingPage />;

    if (!isAuthorized || role != 'admin') {
        navigate('/admin/login');
        return null;
    }

    return children;
}

export default AdminOnlyRoute;
