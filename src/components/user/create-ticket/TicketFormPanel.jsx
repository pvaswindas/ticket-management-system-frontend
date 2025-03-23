import React from 'react';
import SuccessMessage from './SuccessMessage';

function TicketFormPanel({ 
  register, 
  handleSubmit, 
  onSubmit, 
  errors, 
  reset, 
  isSubmitting,
  submitSuccess 
}) {
  return (
    <div className="w-full md:w-3/5 p-6 bg-github">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create New Support Ticket</h1>
        <p className="text-gray-400">Please provide details about your issue</p>
      </div>
      
      {submitSuccess && <SuccessMessage />}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title Field */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-white">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.title ? 'border-red-500' : 'border-deep-teal'}`}
            placeholder="Brief description of the issue"
            {...register("title", { 
              required: 'Title is required',
              minLength: {
                value: 10,
                message: 'Title must be at least 10 characters'
              },
              maxLength: {
                value: 100,
                message: 'Title must not exceed 100 characters'
              }
            })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        
        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1 text-white">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={5}
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.description ? 'border-red-500' : 'border-deep-teal'}`}
            placeholder="Detailed description of the issue"
            {...register("description", { 
              required: 'Description is required',
              minLength: {
                value: 30,
                message: 'Description must be at least 30 characters'
              }
            })}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        
        {/* Priority Field */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1 text-white">
            Priority <span className="text-red-500">*</span>
          </label>
          <select
            id="priority"
            className={`w-full p-2 border rounded-md bg-charcoal-gray text-white focus:outline-none ${errors.priority ? 'border-red-500' : 'border-deep-teal'}`}
            {...register("priority", { required: 'Priority is required' })}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="flex items-center space-x-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-jungle-green hover:bg-dark-jungle-green text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Create Ticket'}
          </button>
          <button
            type="button"
            onClick={() => reset()}
            className="bg-charcoal-gray hover:bg-github border border-deep-teal text-white py-2 px-4 rounded-md transition duration-300"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}

export default TicketFormPanel;