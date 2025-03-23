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
    ticketsByStatus: [0, 0, 0], // Open, In-Progress, Resolved
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
      
      // Get all tickets
      const ticketsResponse = await axiosInstance.get('tickets/');
      const tickets = ticketsResponse.data.results || [];
      
      // Get user data
      const usersResponse = await axiosInstance.get('auth/users/stats/');
      const users = usersResponse.data;

      // Process ticket data
      processTicketData(tickets);
      processUserData(users);
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
      setLoading(false);
    }
  };

  // Process ticket data from API response
  const processTicketData = (tickets) => {
    // Count tickets by status
    const openTickets = tickets.filter(t => t.status === 'open').length;
    const inProgressTickets = tickets.filter(t => t.status === 'in-progress').length;
    const resolvedTickets = tickets.filter(t => t.status === 'resolved').length;
    
    // Count tickets by priority
    const lowPriority = tickets.filter(t => t.priority === 'low').length;
    const mediumPriority = tickets.filter(t => t.priority === 'medium').length;
    const highPriority = tickets.filter(t => t.priority === 'high').length;
    
    // Calculate tickets by month (assuming created_at is in ISO format)
    const ticketsByMonth = Array(12).fill(0);
    tickets.forEach(ticket => {
      const creationMonth = new Date(ticket.created_at).getMonth();
      ticketsByMonth[creationMonth]++;
    });
    
    // Get 5 most recent tickets
    const recentTickets = tickets
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map(ticket => ({
        id: ticket.id,
        title: ticket.title,
        priority: ticket.priority,
        status: ticket.status,
        createdAt: new Date(ticket.created_at).toISOString().split('T')[0],
        assignedTo: ticket.assigned_to || null
      }));
    
    setTicketData({
      totalTickets: tickets.length,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      ticketsByPriority: {
        low: lowPriority,
        medium: mediumPriority,
        high: highPriority
      },
      ticketCreationByMonth: ticketsByMonth,
      ticketsByStatus: [openTickets, inProgressTickets, resolvedTickets],
      recentTickets
    });
  };

  const processUserData = (users) => {
    setUserData(users);
  };

  // Calculate response rate based on resolved tickets
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