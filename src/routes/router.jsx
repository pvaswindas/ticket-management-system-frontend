import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage";
import RestrictedRoute from "./RestrictedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const LandingPage = lazy(() => import('@/pages/common/LandingPage'))
const LoginForm = lazy(() => import('@/components/auth/LoginForm'))
const Dashboard = lazy(() => import('@/components/user/Dashboard'))
const Tickets = lazy(() => import('@/components/user/Tickets'))
const Account = lazy(() => import('@/components/user/Account'))


const router = createBrowserRouter([
    {
        
        path: '/',
        element: (
            <Suspense fallback={<LoadingPage />} >
                <LandingPage />
            </Suspense>
        )
    },
    {
        
        path: '/',
        element: (
            <RestrictedRoute>
                <AuthLayout />
            </RestrictedRoute>
        ),
        children: [
            {
                path: 'login',
                element: (
                    <Suspense fallback={<LoadingPage />} >
                        <LoginForm />
                    </Suspense>
                )
            },
        ],
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Dashboard />
                    </Suspense>
                )
            },
            {
                path: 'tickets',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Tickets />
                    </Suspense>
                )
            },
            {
                path: 'account',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <Account />
                    </Suspense>
                )
            },
        ]
    }
])

export function Routes() {
    return <RouterProvider router={router} />
}