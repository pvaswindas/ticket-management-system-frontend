import React from 'react';

const TicketForm = ({ register, handleSubmit, onSubmit, onCancel, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className={`w-full px-4 py-2 rounded-md bg-github text-white border ${errors.title ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-jungle-green`}
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
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Priority <span className="text-red-500">*</span>
        </label>
        <select
          className={`px-4 py-2 rounded-md bg-github text-white border ${errors.priority ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-jungle-green`}
          {...register("priority", { required: 'Priority is required' })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && (
          <p className="mt-1 text-sm text-red-500">{errors.priority.message}</p>
        )}
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          rows="5"
          className={`w-full px-4 py-2 rounded-lg bg-github text-white border ${errors.description ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-jungle-green`}
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
      
      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-charcoal-gray hover:bg-github rounded-md text-sm"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-jungle-green hover:bg-dark-jungle-green rounded-md text-sm"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default TicketForm;