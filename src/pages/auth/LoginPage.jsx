import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '@/services/auth/auth';
import AlertSnackbar from '../../components/AlertSnackbar';

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await loginUser(data)
      const { access, refresh, role } = response.data;
      
      // Store tokens and navigate
      localStorage.setItem('ACCESS_TOKEN', access);
      localStorage.setItem('REFRESH_TOKEN', refresh);
      if (role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      
      let errorMessage = 'Login failed. Please try again.';
      
      if (err.response?.data?.error) {
        if (err.response.data.error.non_field_errors) {
          errorMessage = err.response.data.error.non_field_errors[0];
        } else if (err.response.data.error.email) {
          errorMessage = err.response.data.error.email[0];
        } else if (err.response.data.error.password) {
          errorMessage = err.response.data.error.password[0];
        }
      }
      
      setSnackbarMessage(errorMessage);
      setSnackbarOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.6 
      }
    }
  };

  return (
    <motion.div 
      className="flex items-center md:w-full md:py-10 justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <AlertSnackbar
          open={snackbarOpen}
          message={snackbarMessage}
          alert_type="error"
          onClose={() => setSnackbarOpen(false)}
      />
      <motion.div 
        className="px-6 py-10 rounded-2xl shadow-md bg-black/30 w-full max-w-sm"
        variants={itemVariants}
      >
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            className="w-24 h-24 bg-black/20 rounded-full mb-4 flex items-center justify-center"
            variants={logoVariants}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 text-dark-jungle-green">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div className="mb-4" variants={itemVariants}>
            <label className="block text-white text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              className={`w-full text-white border border-gray-600 rounded-md p-3 focus:outline-none`}
              autoComplete='off'
              placeholder="Enter your email"
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div className="mb-6" variants={itemVariants}>
            <label className="block text-white text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                className={`w-full text-white border border-gray-600 rounded-md p-3 focus:outline-none`}
                autoComplete='current-password'
                placeholder="Enter your password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters"
                  }
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white rounded-md py-3 transition duration-300 ease-in-out"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
          
          <motion.div 
            className="text-center mt-4 text-sm text-white"
            variants={itemVariants}
          >
            <a href="#" className="hover:text-white transition duration-300">
              Forgot password?
            </a>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;