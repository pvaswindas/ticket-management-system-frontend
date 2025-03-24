import React, { useState, useEffect } from 'react';
import TabFilter from '@/components/common/table/TabFilter';
import TicketTable from '@/components/common/table/TicketTable';
import Pagination from '@/components/common/manage-tickets/Pagination';
import { fetchTickets } from '@/services/tickets/ticketServices';
import AlertSnackbar from '@/components/AlertSnackbar';

function TicketManagement({ isAdmin=false }) {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('recent');
    const [statusFilter, setStatusFilter] = useState('All');
    const [linkToPrevious, setLinkToPrevious] = useState(null);
    const [linkToNext, setLinkToNext] = useState(null);
    const [paginationUrl, setPaginationUrl] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarErrorType, setSnackbarErrorType] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        
        if (tab === 'open') setStatusFilter('open');
        else if (tab === 'in-progress') setStatusFilter('in-progress');
        else if (tab === 'resolved') setStatusFilter('resolved');
        else setStatusFilter('All');
        
        setPaginationUrl(null);
    };

    useEffect(() => {
      const deletedMessage = sessionStorage.getItem('ticketDeletedMessage');
      if (deletedMessage) {
        setSnackbarMessage(deletedMessage);
        setSnackbarErrorType("success");
        setSnackbarOpen(true);
        
        sessionStorage.removeItem('ticketDeletedMessage');
      }

      const loadTickets = async () => {
        setLoading(true);
        try {
          const status = statusFilter !== 'All' ? statusFilter : null;
          
          const response = paginationUrl 
            ? await fetchTickets({ url: paginationUrl })
            : await fetchTickets({ status: status });
          
          setTickets(response.data.results);
          setLinkToPrevious(response.data.previous);
          setLinkToNext(response.data.next);
        } catch {
          setSnackbarMessage("Failed to fetch tickets!");
          setSnackbarErrorType("error");
          setSnackbarOpen(true);
        } finally {
          setLoading(false);
        }
      };
      
      loadTickets();
    }, [paginationUrl, statusFilter]);

    return (
      <div className="text-white md:px-10 overflow-y-auto">
        <AlertSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          alert_type={snackbarErrorType}
          onClose={() => setSnackbarOpen(false)}
        />
        <div className="mb-8">
          <p className="text-gray-400">View and manage all your support tickets</p>
        </div>

        {/* Filters */}
        <TabFilter 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
        />

        {/* Tickets table with matching container */}
        <div className="bg-github rounded-lg shadow overflow-hidden">
          <TicketTable 
              tickets={tickets} 
              loading={loading}
              isAdmin={isAdmin}
          />
          
          {/* Pagination - styled to match table */}
          <Pagination 
              setPaginationUrl={setPaginationUrl}
              linkToPrevious={linkToPrevious}
              linkToNext={linkToNext}
          />
        </div>
      </div>
    );
}

export default TicketManagement;