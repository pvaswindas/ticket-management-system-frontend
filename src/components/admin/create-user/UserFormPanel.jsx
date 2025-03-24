import React, { useState } from 'react';

function UserFormPanel({ 
  register, 
  handleSubmit, 
  onSubmit, 
  errors, 
  reset, 
  isSubmitting,
}) {
  const [selectedRole, setSelectedRole] = useState('user');

  return (
    <div className="w-full md:w-3/5 p-6 bg-github">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New User</h1>
        <p className="text-gray-400">Enter user details to create a new account</p>
      </div>
      
      {/* Role Selection Tabs */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-white">
          Select Role
        </label>
        <div className="flex border border-deep-teal rounded-md overflow-hidden">
          <button
            type="button"
            className={`py-2 px-4 flex-1 text-center transition duration-300 ${selectedRole === 'user' ? 'bg-jungle-green text-white' : 'bg-charcoal-gray text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setSelectedRole('user')}
          >
            User
          </button>
          <button
            type="button"
            className={`py-2 px-4 flex-1 text-center transition duration-300 ${selectedRole === 'admin' ? 'bg-jungle-green text-white' : 'bg-charcoal-gray text-gray-400 hover:bg-gray-700'}`}
            onClick={() => setSelectedRole('admin')}
          >
            Admin
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit((data) => onSubmit({...data, role: selectedRole}))} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-white">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.email ? 'border-red-500' : 'border-deep-teal'}`}
            placeholder="user@example.com"
            {...register("email", { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-white">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            id="password"
            type="password"
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.password ? 'border-red-500' : 'border-deep-teal'}`}
            placeholder="Enter a secure password"
            {...register("password", { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message: 'Password must include uppercase, lowercase, number and special character'
              }
            })}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        
        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirm_password" className="block text-sm font-medium mb-1 text-white">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            id="confirm_password"
            type="password"
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.confirm_password ? 'border-red-500' : 'border-deep-teal'}`}
            placeholder="Confirm your password"
            {...register("confirm_password", { 
              required: 'Please confirm your password',
              validate: (value, formValues) => value === formValues.password || 'Passwords do not match'
            })}
          />
          {errors.confirm_password && (
            <p className="mt-1 text-sm text-red-500">{errors.confirm_password.message}</p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex items-center space-x-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-jungle-green hover:bg-dark-jungle-green text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              setSelectedRole('user');
            }}
            className="bg-charcoal-gray hover:bg-github border border-deep-teal text-white py-2 px-4 rounded-md transition duration-300"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserFormPanel;