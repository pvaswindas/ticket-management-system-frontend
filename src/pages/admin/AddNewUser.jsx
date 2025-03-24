import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import InfoPanel from '@/components/common/InfoPanel';
import UserFormPanel from '@/components/admin/create-user/UserFormPanel';
import { createUser } from '@/services/users/userServices';
import AlertSnackbar from '@/components/AlertSnackbar';

function AddNewUser() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarErrorType, setSnackbarErrorType] = useState("success");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
  
    const { 
      register, 
      handleSubmit, 
      formState: { errors },
      reset,
      setError
    } = useForm({
      defaultValues: {
        email: '',
        password: '',
        confirm_password: ''
      }
    });

    const onSubmit = async (data) => {
      setIsSubmitting(true);
      
      try {
        await createUser(data);
        
        setSnackbarMessage("User created successfully!");
        setSnackbarErrorType("success");
        setSnackbarOpen(true);
        reset();
      } catch (error) {
        if (error.response && error.response.data) {
          const apiErrors = error.response.data;
          if (apiErrors.email) {
            setSnackbarMessage(apiErrors.email[0]);
            setError('email', { type: 'server', message: apiErrors.email[0] });
          } else if (apiErrors.password) {
            setSnackbarMessage(apiErrors.password[0]);
            setError('password', { type: 'server', message: apiErrors.password[0] });
          } else if (apiErrors.confirm_password) {
            setSnackbarMessage(apiErrors.confirm_password[0]);
            setError('confirm_password', { type: 'server', message: apiErrors.confirm_password[0] });
          } else if (apiErrors.role) {
            setSnackbarMessage(apiErrors.role[0]);
          } else if (apiErrors.non_field_errors) {
            setSnackbarMessage(apiErrors.non_field_errors[0]);
          } else {
            setSnackbarMessage(
              typeof apiErrors === 'string' 
                ? apiErrors 
                : "Failed to create user. Please check your input."
            );
          }
        } else {
          setSnackbarMessage("Network error. Please try again later.");
        }
        
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
            <InfoPanel isUserCreation={true} />
            <UserFormPanel 
              register={register} 
              handleSubmit={handleSubmit} 
              onSubmit={onSubmit} 
              errors={errors} 
              reset={reset} 
              isSubmitting={isSubmitting}
            />
          </div>
      </div>
    );
}

export default AddNewUser;