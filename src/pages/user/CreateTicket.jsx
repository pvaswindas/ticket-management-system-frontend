import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InfoPanel from '@/components/common/InfoPanel';
import TicketFormPanel from '@/components/user/create-ticket/TicketFormPanel';
import { createTicket } from '@/services/tickets/ticketServices';
import AlertSnackbar from '@/components/AlertSnackbar';

function CreateTicket() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarErrorType, setSnackbarErrorType] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const { 
      register, 
      handleSubmit, 
      formState: { errors },
      reset
    } = useForm({
      defaultValues: {
        title: '',
        description: '',
        priority: 'Low'
      }
    });

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      
      try {
        await createTicket(data)
        
        setSubmitSuccess(true);
        reset();
        
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } catch {
        setSnackbarMessage("Failed to create ticket!");
        setSnackbarErrorType("error");
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="max-w-6xl md:px-10 py-4 overflow-y-auto">
          <AlertSnackbar
            open={snackbarOpen}
            message={snackbarMessage}
            alert_type={snackbarErrorType}
            onClose={() => setSnackbarOpen(false)}
          />
          <div className="bg-github-dark rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
            <InfoPanel />
            <TicketFormPanel 
              register={register} 
              handleSubmit={handleSubmit} 
              onSubmit={onSubmit} 
              errors={errors} 
              reset={reset} 
              isSubmitting={isSubmitting}
              submitSuccess={submitSuccess}
            />
          </div>
      </div>
    );
}

export default CreateTicket;