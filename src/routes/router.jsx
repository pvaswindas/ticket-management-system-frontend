import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoadingPage from "../pages/common/LoadingPage";
import RestrictedRoute from "./RestrictedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import AdminOnlyRoute from "./AdminOnlyRoute";

const LandingPage = lazy(() => import('@/pages/common/LandingPage'))

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))

const Dashboard = lazy(() => import('@/pages/user/Dashboard'))
const CreateTicket = lazy(() => import('@/pages/user/CreateTicket'))
const ManageTickets = lazy(() => import('@/pages/user/ManageTickets'))
const TicketDetail = lazy(() => import('@/pages/user/TicketDetail'))

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const TicketManagement = lazy(() => import('@/pages/admin/TicketManagement'))
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
    },
    {
        path: '/admin/',
        element: (
            <AdminOnlyRoute>
                <AdminLayout />
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
                path: 'tickets',
                element: (
                    <Suspense fallback={<LoadingPage />} >
                        <TicketManagement />
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
])

export function Routes() {
    return <RouterProvider router={router} />
}