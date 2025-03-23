import React, { useCallback, useEffect, useState } from 'react';
import TicketTable from '@/components/user/table/TicketTable';
import TabFilter from '@/components/user/table/TabFilter';
import StatsRow from '@/components/user/dashboard/StatsRow';
import Header from '@/components/user/dashboard/Header';
import { fetchTickets } from '@/services/tickets/ticketServices';

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recent');
    const [statusFilter, setStatusFilter] = useState('All');
    
    const pageSize = 5;

    const loadTickets = useCallback(async () => {
        setLoading(true);
        try {
            const status = statusFilter !== 'All' ? statusFilter : null;
            
            const response = await fetchTickets({
                status: status,
                pageSize: pageSize
            });
            
            setTickets(response.data.results);
        } catch (error) {
            console.error('Error fetching tickets:', error)
        } finally {
            setLoading(false);
        }
    }, [statusFilter]);

    useEffect(() => {
        loadTickets();
    }, [statusFilter, loadTickets]);


    const handleTabChange = (tab) => {
        setActiveTab(tab);
        
        if (tab === 'open') setStatusFilter('open');
        else if (tab === 'in-progress') setStatusFilter('in-progress');
        else if (tab === 'resolved') setStatusFilter('resolved');
        else setStatusFilter('All');
    };

    return (
        <div className="text-white md:px-10 overflow-y-auto">
            <Header />
            <StatsRow tickets={tickets} />
            
            {/* Action Bar */}
            <TabFilter 
                activeTab={activeTab} 
                setActiveTab={handleTabChange} 
            />
            
            <TicketTable 
                tickets={tickets} 
                loading={loading} 
            />
        </div>
    );
}

export default Dashboard;