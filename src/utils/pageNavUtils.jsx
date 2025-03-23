import { LayoutDashboard, LayoutGrid, CirclePlus, Tickets, Ticket, Users } from 'lucide-react';

export const getPageTitle = ({ location, isAdmin = false }) => {
    const path = location.pathname;
    
    // For admin routes
    if (isAdmin || path.includes('/admin')) {
      if (path === '/admin/' || path === '/admin') return 'Dashboard';
      if (path.includes('/admin/tickets')) return 'Ticket Management';
      if (path.includes('/admin/create-user')) return 'Add New User';
      if (path.includes('/admin/users')) return 'User Management';
    } 
    // For user routes
    else {
      if (path === '/dashboard') return 'Dashboard';
      if (path === '/create-tickets') return 'Create Ticket';
      if (path === '/tickets' && !path.includes('/tickets/')) return 'Manage Tickets';
      if (path.includes('/tickets/')) return 'Ticket Detail';
    }
    
    return 'Dashboard';
  };

export const getNavItems = ({ isAdmin }) => {
    const userNavItems = [
        { name: 'Dashboard', icon: () => <LayoutGrid size={18} />, path: '/dashboard' },
        { name: 'Create Ticket', icon: () => <CirclePlus size={18} />, path: '/create-tickets' },
        { name: 'Manage Tickets', icon: () => <Tickets size={18} />, path: '/tickets' },
    ];

    const adminNavItems = [
        { name: 'Dashboard', icon: () => <LayoutDashboard size={18} />, path: '/admin' },
        { name: 'Ticket Management', icon: () => <Ticket size={18} />, path: '/admin/tickets' },
        { name: 'Add New User', icon: () => <CirclePlus size={18} />, path: '/admin/create-user' },
        { name: 'User Management', icon: () => <Users size={18} />, path: '/admin/users' },
    ];

    return isAdmin ? adminNavItems : userNavItems;
};
