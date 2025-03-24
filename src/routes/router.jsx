import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage";
import RestrictedRoute from "./RestrictedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminOnlyRoute from "./AdminOnlyRoute";

const LandingPage = lazy(() => import('@/pages/common/LandingPage'))

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))

const Dashboard = lazy(() => import('@/pages/user/Dashboard'))
const CreateTicket = lazy(() => import('@/pages/user/CreateTicket'))
const TicketManagement = lazy(() => import('@/pages/shared/TicketManagement'))
const TicketDetail = lazy(() => import('@/pages/shared/TicketDetail'))

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AddNewUser = lazy(() => import('@/pages/admin/AddNewUser'))
const UserManagement = lazy(() => import('@/pages/admin/UserManagement'))




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
        ]
    },
    {
        path: '/admin/',
        element: (
            <AdminOnlyRoute>
                <MainLayout />
            </AdminOnlyRoute>
        ),
        children: [
            {
                path: '',
                element: (
                    <Suspense fallback={<LoadingPage />} >
                        <AdminDashboard />
                    </Suspense>
                )
            },
            {
                path: 'create-user',
                element: (
                    <Suspense fallback={<LoadingPage />} >
                        <AddNewUser />
                    </Suspense>
                )
            },
            {
                path: 'users',
                element: (
                    <Suspense fallback={<LoadingPage />} >
                        <UserManagement />
                    </Suspense>
                )
            },
        ]
    },
    {
        path: '/',
        element: (
            <ProtectedRoute adminAllowed={true} >
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'tickets',
                element: (
                    <Suspense fallback={<LoadingPage />}>
                        <TicketManagement />
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