import { useState, useEffect } from 'react';
import axiosInstance from "@/services/axiosInstance";

export const useDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState({
    totalTickets: 0,
    openTickets: 0,
    inProgressTickets: 0,
    resolvedTickets: 0,
    ticketsByPriority: {
      low: 0,
      medium: 0,
      high: 0
    },
    ticketCreationByMonth: Array(12).fill(0),
    ticketsByStatus: [0, 0, 0],
    recentTickets: []
  });

  const [userData, setUserData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    inactiveUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
    userGrowthByMonth: Array(12).fill(0),
    userActivityScore: 0
  });

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const ticketsResponse = await axiosInstance.get('tickets/stats/');
      const ticketStats = ticketsResponse.data;

      setTicketData({
        totalTickets: ticketStats.totalTickets,
        openTickets: ticketStats.openTickets,
        inProgressTickets: ticketStats.inProgressTickets,
        resolvedTickets: ticketStats.resolvedTickets,
        ticketsByPriority: ticketStats.ticketsByPriority,
        ticketCreationByMonth: ticketStats.ticketCreationByMonth,
        ticketsByStatus: ticketStats.ticketsByStatus,
        recentTickets: ticketStats.recentTickets
      });

      const usersResponse = await axiosInstance.get('auth/users/stats/');
      setUserData(usersResponse.data);

      setLoading(false);
    } catch {
      setError("Failed to load dashboard data. Please try again.");
      setLoading(false);
    }
  };

  const calculateResponseRate = () => {
    if (ticketData.totalTickets === 0) return 0;
    return Math.round((ticketData.resolvedTickets / ticketData.totalTickets) * 100);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    loading,
    error,
    ticketData,
    userData,
    calculateResponseRate,
    retry: fetchDashboardData
  };
};