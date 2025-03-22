import React from 'react'
import Logo from '../Logo'
import { LayoutGrid, Ticket, User } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
  
    const getPageTitle = () => {
        const path = location.pathname;
        
        if (path.startsWith('/dashboard')) return 'Dashboard';
        if (path.startsWith('/tickets')) return 'Tickets';
        if (path.startsWith('/account')) return 'Account';
        
      return '';
    }

    const currentPage = getPageTitle();

    const navItems = [
        { name: 'Dashboard', icon: <LayoutGrid size={18} />, path: '/dashboard' },
        { name: 'Tickets', icon: <Ticket size={18} />, path: '/tickets' },
        { name: 'Account', icon: <User size={18} />, path: '/account' },
    ];

    return (
        <div className='bg-charcoal-gray min-h-screen w-full py-6 flex flex-col gap-9'>
            <Logo />
            <div className='flex flex-col'>
                {navItems.map((item) => (
                    <Link 
                        to={item.path}
                        key={item.name}
                        className={`group flex items-center ${item.name === currentPage 
                            ? 'text-white bg-gradient-to-r from-black/5 to-jungle-green/20' 
                            : 'text-gray-500 hover:bg-black/10'} px-6 font-medium relative w-full h-14 transition-all duration-300 ease-out overflow-hidden`}
                    >
                        <div className='flex gap-4 items-center z-10'>
                            {React.cloneElement(item.icon, { 
                                color: item.name === currentPage ? 'white' : '#6B7280',
                                className: `transition-all duration-300 ${item.name === currentPage ? '' : 'group-hover:text-gray-300 group-hover:scale-110'}`
                            })}
                            <h1 className={`transition-all duration-300 ${item.name === currentPage ? '' : 'group-hover:text-gray-300 group-hover:translate-x-1'}`}>
                                {item.name}
                            </h1>
                        </div>
                        
                        {/* Background highlight effect */}
                        <div 
                            className={`absolute inset-0 bg-gradient-to-r from-transparent to-jungle-green/10 transition-all duration-500 ease-out ${
                                item.name === currentPage ? 'opacity-100' : 'opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-30'
                            }`}
                        ></div>
                        
                        {/* Green indicator bar with right-side entrance animation */}
                        <div 
                            className={`w-1.5 bg-jungle-green h-full rounded-s-2xl absolute right-0 transition-all duration-300 ease-in-out ${
                                item.name === currentPage 
                                ? 'transform-none opacity-100' 
                                : 'translate-x-6 opacity-0'
                            }`}
                        ></div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar