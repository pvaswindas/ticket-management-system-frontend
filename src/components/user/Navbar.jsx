import React from 'react'
import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

function Navbar({ setIsSidebarOpen }) {
    const location = useLocation();
    
    const getPageTitle = () => {
        const path = location.pathname;
        
        if (path.startsWith('/dashboard')) return 'Dashboard';
        if (path.startsWith('/tickets')) return 'Ticket Management';
        if (path.startsWith('/account')) return 'Account Settings';
        
        return '';
    }

    return (
        <div className='flex w-full gap-4 items-center'>
            <Menu onClick={() => setIsSidebarOpen(prev => !prev)} color='white' className='hidden lg:flex cursor-pointer' />
            <h1 className='text-white font-medium text-xl'>{getPageTitle()}</h1>
        </div>
    )
}

export default Navbar