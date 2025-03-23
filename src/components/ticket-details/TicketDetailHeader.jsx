import React from 'react';

const TicketDetailHeader = ({ onBack }) => {
  return (
    <div className="mb-8 flex items-center justify-between">
      <p className="text-gray-400">Manage your support requests</p>
      <button 
        onClick={onBack}
        className="px-4 py-2 bg-charcoal-gray hover:bg-github rounded-md text-sm"
      >
        Back to Tickets
      </button>
    </div>
  );
};

export default TicketDetailHeader;