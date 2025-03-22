import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import LoadingPage from '@/pages/common/LoadingPage';

function ProtectedRoute({ children }) {
    
    const { isAuthorized, isLoading, userStatus } = useAuth();
    const navigate = useNavigate();

    // Redirect if not authorized
    React.useEffect(() => {
        if (!isLoading) {
            if (!isAuthorized || userStatus === 'suspended') {
                navigate('/login');
            }
        }
    }, [isAuthorized, isLoading, navigate, userStatus]);

    if (isLoading) return <LoadingPage />;

    return isAuthorized && userStatus !== 'suspended' ? children : null;
}

export default ProtectedRoute;
