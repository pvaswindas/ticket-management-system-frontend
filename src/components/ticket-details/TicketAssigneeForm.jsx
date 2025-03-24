import React from 'react';

const TicketAssigneeForm = ({ register, handleSubmit, onSubmit, onCancel, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Assign To <span className="text-red-500">*</span>
        </label>
        <select
          className={`w-full px-4 py-2 rounded-md bg-github text-white border ${errors.assigned_to ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:border-jungle-green`}
          {...register("assigned_to", { required: 'Assignee is required' })}
        >
          <option value="">Select an assignee</option>
          <option value="Ethan Carter (Support Agent)">Ethan Carter (Support Agent)</option>
          <option value="Liam Reynolds (Sales Agent)">Liam Reynolds (Sales Agent)</option>
          <option value="Noah Bennett (Tech Support)">Noah Bennett (Tech Support)</option>
          <option value="Ava Mitchell (Customer Service)">Ava Mitchell (Customer Service)</option>
          <option value="Lucas Harrison (Marketing Specialist)">Lucas Harrison (Marketing Specialist)</option>
          <option value="Mia Collins (HR Coordinator)">Mia Collins (HR Coordinator)</option>
          <option value="William Foster (Project Manager)">William Foster (Project Manager)</option>
          <option value="Charlotte Hayes (Product Analyst)">Charlotte Hayes (Product Analyst)</option>
          <option value="James Turner (IT Consultant)">James Turner (IT Consultant)</option>
          <option value="Amelia Scott (Finance Executive)">Amelia Scott (Finance Executive)</option>
        </select>
        {errors.assigned_to && (
          <p className="mt-1 text-sm text-red-500">{errors.assigned_to.message}</p>
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
          Assign Ticket
        </button>
      </div>
    </form>
  );
};

export default TicketAssigneeForm;