import React from 'react';
import { useDashboardData } from '@/hooks/useDashboardData';
import DashboardLayout from '@/components/admin/DashboardLayout';
import StatCard from '@/components/admin/StatCard';
import ChartCard from '@/components/admin/ChartCard';
import TicketStatusChart from '@/components/admin/TicketStatusChart';
import TicketPriorityChart from '@/components/admin/TicketPriorityChart';
import TicketTrendsChart from '@/components/admin/TicketTrendsChart';
import UserGrowthChart from '@/components/admin/UserGrowthChart';
import RecentTicketsTable from '@/components/admin/RecentTicketsTable';
import UserActivityWidget from '@/components/admin/UserActivityWidget';

const AdminDashboard = () => {
  const { 
    loading, 
    error, 
    ticketData, 
    userData, 
    calculateResponseRate, 
    retry 
  } = useDashboardData();

  return (
    <DashboardLayout
      isLoading={loading}
      error={error}
      onRetry={retry}
    >
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Tickets" 
          value={ticketData.totalTickets} 
          percentage="+8%" 
        />
        
        <StatCard 
          title="Total Users" 
          value={userData.totalUsers.toLocaleString()} 
          percentage="+12%" 
        />
        
        <StatCard 
          title="Open Tickets" 
          value={ticketData.openTickets} 
          percentage={ticketData.openTickets > 0 ? '+24%' : '0%'} 
          isNegative={ticketData.openTickets > 0}
        />
        
        <StatCard 
          title="Response Rate" 
          value={`${calculateResponseRate()}%`} 
          percentage="+2%" 
        />
      </div>
      
      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Ticket Status Distribution */}
        <ChartCard title="Ticket Status Distribution">
          <TicketStatusChart 
            openTickets={ticketData.openTickets} 
            inProgressTickets={ticketData.inProgressTickets} 
            resolvedTickets={ticketData.resolvedTickets} 
          />
        </ChartCard>
        
        {/* Ticket Priority Distribution */}
        <ChartCard title="Ticket Priority Distribution">
          <TicketPriorityChart 
            lowPriority={ticketData.ticketsByPriority.low} 
            mediumPriority={ticketData.ticketsByPriority.medium} 
            highPriority={ticketData.ticketsByPriority.high} 
          />
        </ChartCard>
        
        {/* Ticket Trends */}
        <ChartCard title="Ticket Creation Trends">
          <TicketTrendsChart 
            ticketCreationByMonth={ticketData.ticketCreationByMonth} 
          />
        </ChartCard>
        
        {/* User Growth */}
        <ChartCard title="User Growth">
          <UserGrowthChart 
            userGrowthByMonth={userData.userGrowthByMonth} 
          />
        </ChartCard>
      </div>
      
      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="md:col-span-2">
          <ChartCard title="Recent Tickets">
            <RecentTicketsTable tickets={ticketData.recentTickets} />
          </ChartCard>
        </div>
        
        {/* User Activity */}
        <ChartCard title="User Activity">
          <UserActivityWidget 
            userActivityScore={userData.userActivityScore} 
            activeUsers={userData.activeUsers} 
            inactiveUsers={userData.inactiveUsers} 
          />
        </ChartCard>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;