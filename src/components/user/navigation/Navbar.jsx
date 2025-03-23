import React from 'react'
import { Menu, LogOut } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { logoutUser } from "@/services/auth/auth"

function Navbar({ setIsSidebarOpen }) {
    const navigate = useNavigate()
    const location = useLocation();
    
    const getPageTitle = () => {
        const path = location.pathname;
        
        if (path.startsWith('/dashboard')) return 'Dashboard';
        if (path.startsWith('/create-tickets')) return 'Create Ticket';
        if (path.startsWith('/tickets')) return 'Ticket Management';
        
        return '';
    }

    const handleLogout = () => {
        logoutUser(navigate);
    }

    return (
        <div className='flex w-full items-center justify-between'>
            <div className='flex w-full gap-4 items-center'>
                <Menu onClick={() => setIsSidebarOpen(prev => !prev)} color='white' className='hidden lg:flex cursor-pointer' />
                <h1 className='text-white font-medium text-xl'>{getPageTitle()}</h1>
            </div>
            <button
                className='lg:hidden cursor-pointer'
                onClick={handleLogout}
            >
                <LogOut size={22} color='white' />
            </button>
        </div>
    )
}

export default Navbar