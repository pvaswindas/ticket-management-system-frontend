import React, { useCallback, useEffect, useState } from 'react';
import TicketTable from '@/components/common/table/TicketTable';
import TabFilter from '@/components/common/table/TabFilter';
import Header from '@/components/user/dashboard/Header';
import { fetchTickets, retrieveStatsResponse } from '@/services/tickets/ticketServices';
import StatsRow from '../../components/user/dashboard/StatsRow';

function Dashboard() {
    const [tickets, setTickets] = useState([]);
    const [userStats, setUserStats] = useState({
        totalTickets: 0,
        openTickets: 0,
        inProgressTickets: 0,
        resolvedTickets: 0
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recent');
    
    const pageSize = 5;

    const fetchUserStats = useCallback(async () => {
        try {
            const statsResponse = await retrieveStatsResponse();
            setUserStats(statsResponse.data);
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    }, []);

    const fetchTicketsByTab = useCallback(async () => {
        setLoading(true);
        try {
            let filterStatus = null;
            switch(activeTab) {
                case 'open':
                    filterStatus = 'open';
                    break;
                case 'in-progress':
                    filterStatus = 'in-progress';
                    break;
                case 'resolved':
                    filterStatus = 'resolved';
                    break;
                default:
                    filterStatus = null;
            }

            const ticketsResponse = await fetchTickets({
                status: filterStatus,
                pageSize: pageSize
            });
            
            setTickets(ticketsResponse.data.results);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        } finally {
            setLoading(false);
        }
    }, [activeTab]);

    useEffect(() => {
        fetchUserStats();
    }, [fetchUserStats]);

    useEffect(() => {
        fetchTicketsByTab();
    }, [fetchTicketsByTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="text-white md:px-10 overflow-y-auto">
            <Header />
            <StatsRow userStats={userStats} />
            
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