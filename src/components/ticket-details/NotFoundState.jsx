import React from 'react';

const NotFoundState = ({ onBack }) => {
  return (
    <div className="p-8 text-center text-white">
      <p>Ticket not found</p>
      <button 
        onClick={onBack}
        className="mt-4 px-4 py-2 bg-jungle-green hover:bg-dark-jungle-green rounded-md"
      >
        Back to Tickets
      </button>
    </div>
  );
};

export default NotFoundState;