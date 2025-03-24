import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { fetchTickets, editTicket, closeTicket, deleteTicket, assignTicket } from '@/services/tickets/ticketServices';
import AlertSnackbar from '@/components/AlertSnackbar';
import LoadingState from '@/components/ticket-details/LoadingState';
import NotFoundState from '@/components/ticket-details/NotFoundState';
import TicketDetailHeader from '@/components/ticket-details/TicketDetailHeader';
import TicketForm from '@/components/ticket-details/TicketForm';
import TicketViewMode from '@/components/ticket-details/TicketViewMode';
import TicketAssigneeForm from '@/components/ticket-details/TicketAssigneeForm';
import { useAuth } from '@/hooks/useAuth';

function TicketDetail() {
  const { id } = useParams();
  const { role } = useAuth();
  const isAdmin = role === 'admin' ? true : false
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarErrorType, setSnackbarErrorType] = useState("error");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAssigning, setIsAssigning] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      priority: 'low'
    }
  });

  const { 
    register: registerAssignee, 
    handleSubmit: handleSubmitAssignee, 
    formState: { errors: assigneeErrors },
    reset: resetAssignee
  } = useForm({
    defaultValues: {
      assigned_to: ''
    }
  });

  useEffect(() => {
    const fetchTicket = async () => {
      setLoading(true);
      try {
        const response = await fetchTickets({ ticketId: id });
        const data = response.data;
        setTicket(data);
        
        reset({
          title: data.title,
          description: data.description,
          priority: data.priority
        });
        
        resetAssignee({
          assigned_to: data.assigned_to || ''
        });
      } catch {
        setSnackbarMessage("Failed to fetch ticket!")
        setSnackbarErrorType("error")
        setSnackbarOpen(true)
      } finally {
        setLoading(false);
      }
    };
    
    fetchTicket();
  }, [id, reset, resetAssignee]);

  const handleEdit = () => {
    if (!isAdmin) {
      setIsEditing(true);
    } else {
      setIsAssigning(true)
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsAssigning(false);
    
    if (isEditing) {
      reset({
        title: ticket.title,
        description: ticket.description,
        priority: ticket.priority
      });
    } else if (isAssigning) {
      resetAssignee({
        assigned_to: ticket.assigned_to || ''
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await editTicket(id, {
        title: data.title,
        description: data.description,
        priority: data.priority
      });
      
      setTicket(response.data);
      setIsEditing(false);
      setSnackbarMessage("Successfully made changes!")
      setSnackbarErrorType("success")
      setSnackbarOpen(true)
    } catch {
      setSnackbarMessage("Failed to make changes!")
      setSnackbarErrorType("error")
      setSnackbarOpen(true)
    }
  };

  const onAssignSubmit = async (data) => {
    try {
      const response = await assignTicket(id, {
        assigned_to: data.assigned_to
      });
      
      setTicket(response.data);
      setIsAssigning(false);
      setSnackbarMessage("Successfully assigned the ticket!")
      setSnackbarErrorType("success")
      setSnackbarOpen(true)
    } catch {
      setSnackbarMessage("Failed to assign the ticket!")
      setSnackbarErrorType("error")
      setSnackbarOpen(true)
    }
  };

  const handleResolve = async () => {
    try {
      const response = await closeTicket(id);
      setTicket(response.data);
      setSnackbarMessage("Successfully resolved the ticket!")
      setSnackbarErrorType("success")
      setSnackbarOpen(true)
    } catch {
      setSnackbarMessage("Failed to resolve the ticket!")
      setSnackbarErrorType("error")
      setSnackbarOpen(true)
    }
  };

  const handleDelete = async () => {
    setDeleteInProgress(true);
    try {
      await deleteTicket(id);
      sessionStorage.setItem('ticketDeletedMessage', `Ticket #${id} was successfully deleted`);
      navigate('/tickets');
    } catch (error) {
      setDeleteInProgress(false);
      setSnackbarMessage("Failed to delete the ticket!")
      setSnackbarErrorType("error")
      setSnackbarOpen(true)
      console.error('Error deleting ticket:', error);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return <LoadingState />;
  }

  if (!ticket) {
    return <NotFoundState onBack={() => navigate('/tickets')} />;
  }

  return (
    <div className="text-white md:px-10 overflow-y-auto">
      <AlertSnackbar
        open={snackbarOpen}
        message={snackbarMessage}
        alert_type={snackbarErrorType}
        onClose={() => setSnackbarOpen(false)}
      />
      
      <TicketDetailHeader onBack={() => navigate('/tickets')} />
      
      <div className="bg-charcoal-gray rounded-lg shadow overflow-hidden p-6">
      {isEditing ? (
          <TicketForm 
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            onCancel={handleCancel}
            errors={errors}
          />
        ) : isAssigning ? (
          <TicketAssigneeForm 
            register={registerAssignee}
            handleSubmit={handleSubmitAssignee}
            onSubmit={onAssignSubmit}
            onCancel={handleCancel}
            errors={assigneeErrors}
          />
        ) : (
          <TicketViewMode 
            ticket={ticket}
            formatDate={formatDate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onResolve={handleResolve}
            deleteInProgress={deleteInProgress}
            isAdmin={isAdmin}
          />
        )}
      </div>
    </div>
  );
}

export default TicketDetail;