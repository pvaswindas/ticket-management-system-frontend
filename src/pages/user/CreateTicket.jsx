import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InfoPanel from '@/components/user/create-ticket/InfoPanel';
import TicketFormPanel from '@/components/user/create-ticket/TicketFormPanel';
import { createTicket } from '../../services/tickets/ticketServices';

function CreateTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
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
      // Simulate API call to create ticket
      await createTicket(data)
      
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl md:px-10 py-4 overflow-y-auto">
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