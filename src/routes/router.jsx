import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage";
import RestrictedRoute from "./RestrictedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const LandingPage = lazy(() => import('@/pages/common/LandingPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const Dashboard = lazy(() => import('@/pages/user/Dashboard'))
const CreateTicket = lazy(() => import('@/pages/user/CreateTicket'))
const ManageTickets = lazy(() => import('@/pages/user/ManageTickets'))
const TicketDetail = lazy(() => import('@/pages/user/TicketDetail'))


const router = createBrowserRouter([
    {
        
        path: '/',
        element: (
            <Suspense fallback={<LoadingPage />} >
                <RestrictedRoute>
                    <LandingPage />
                </RestrictedRoute>
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
                        <LoginPage />
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
                path: 'create-tickets',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <CreateTicket />
                    </Suspense>
                )
            },
            {
                path: 'tickets',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <ManageTickets />
                    </Suspense>
                )
            },
            {
                path: 'tickets/:id',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <TicketDetail />
                    </Suspense>
                )
            },
        ]
    }
])

export function Routes() {
    return <RouterProvider router={router} />
}