import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import { getNavItems, getPageTitle } from '@/utils/pageNavUtils';

function BottomBar({ isAdmin=false }) {
    const location = useLocation();
  
    const currentPage = getPageTitle({ location, isAdmin });

    const navItems = getNavItems({ isAdmin })

    return (
      <div
          className='lg:hidden w-full h-14 bg-charcoal-gray fixed bottom-0 left-0 shadow-lg flex items-center
          justify-between'
      >
        {navItems.map((item) => (
          <Link 
            to={item.path}
            key={item.name}
            className={`group flex flex-col items-center justify-center ${
              item.name === currentPage 
                ? 'text-white' 
                : 'text-gray-500 hover:text-gray-300'
            } relative h-full flex-1 transition-all duration-300 ease-out overflow-hidden`}
          >
            <div className='flex flex-col items-center z-10'>
              {React.cloneElement(item.icon(), {
                  color: item.name === currentPage ? 'white' : '#6B7280',
                  className: `transition-all duration-300 ${
                      item.name === currentPage ? '' : 'group-hover:text-gray-300 group-hover:scale-110'
                  }`
              })}
            </div>
            
            {/* Background highlight effect */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-jungle-green/20 to-transparent transition-all duration-500 ease-out ${
                item.name === currentPage ? 'opacity-100' : 'opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-30'
              }`}
            ></div>
            
            {/* Green indicator bar with bottom entrance animation */}
            <div 
              className={`h-1 bg-jungle-green w-full rounded-t-md absolute bottom-0 transition-all duration-300 ease-in-out ${
                item.name === currentPage 
                  ? 'transform-none opacity-100' 
                  : 'translate-y-2 opacity-0'
              }`}
            ></div>
          </Link>
        ))}
      </div>
    )
}

export default BottomBar