import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LandingPage';

function AdminRestrictedRoute({ children }) {
    const { isAuthorized, isLoading, role } = useAuth();
    const navigate = useNavigate();
    if (isLoading) return <LoadingPage />;

    if (isAuthorized && role === 'admin') {
        navigate('/admin');
        return null;
    }

    return children;
}

export default AdminRestrictedRoute;
