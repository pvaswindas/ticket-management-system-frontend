import React from 'react';
import Logo from '../../Logo';
import { LogOut } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '@/services/auth/auth';
import { getNavItems, getPageTitle } from '../../../utils/pageNavUtils';

function Sidebar({ isAdmin = false }) {
    const navigate = useNavigate();
    const location = useLocation();


    const currentPage = getPageTitle({ location, isAdmin });

    const navItems = getNavItems({ isAdmin })

    const handleLogout = () => {
        logoutUser(navigate);
    };

    return (
        <div className='bg-charcoal-gray h-full w-full py-6 flex flex-col overflow-y-auto'>
            <Logo />
            <div className='flex flex-col mt-9'>
                {navItems.map((item) => (
                    <Link
                        to={item.path}
                        key={item.name}
                        className={`group flex items-center ${item.name === currentPage
                            ? 'text-white bg-gradient-to-r from-black/5 to-jungle-green/20'
                            : 'text-gray-500 hover:bg-black/10'} px-6 font-medium relative w-full h-14 transition-all duration-300 ease-out overflow-hidden`}
                    >
                        <div className='flex gap-4 items-center z-10'>
                            {React.cloneElement(item.icon(), {
                                color: item.name === currentPage ? 'white' : '#6B7280',
                                className: `transition-all duration-300 ${
                                    item.name === currentPage ? '' : 'group-hover:text-gray-300 group-hover:scale-110'
                                }`
                            })}

                            <h1 className={`transition-all duration-300 ${item.name === currentPage ? '' : 'group-hover:text-gray-300 group-hover:translate-x-1'}`}>
                                {item.name}
                            </h1>
                        </div>
                        <div
                            className={`absolute inset-0 bg-gradient-to-r from-transparent to-jungle-green/10 transition-all duration-500 ease-out ${
                                item.name === currentPage ? 'opacity-100' : 'opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-30'
                            }`}
                        ></div>
                        <div
                            className={`w-1.5 bg-jungle-green h-full rounded-s-2xl absolute right-0 transition-all duration-300 ease-in-out ${
                                item.name === currentPage ? 'transform-none opacity-100' : 'translate-x-6 opacity-0'
                            }`}
                        ></div>
                    </Link>
                ))}
            </div>
            <div className='flex-grow'></div>
            <div className='mb-6'>
                <button
                    className='group flex items-center text-gray-500 hover:bg-black/10 w-full h-14 font-medium
                    relative transition-all duration-300 ease-out overflow-hidden rounded'
                    onClick={handleLogout}
                >
                    <div className='flex gap-4 items-center z-10 px-6'>
                        <LogOut
                            size={18}
                            color='#6B7280'
                            className='transition-all duration-300 group-hover:text-gray-300 group-hover:scale-110'
                        />
                        <h1 className='transition-all duration-300 group-hover:text-gray-300 group-hover:translate-x-1'>
                            Logout
                        </h1>
                    </div>
                    <div className='absolute inset-0 bg-gradient-to-r from-transparent to-jungle-green/10 transition-all duration-500 ease-out opacity-0 -translate-x-full group-hover:translate-x-0 group-hover:opacity-30'></div>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
