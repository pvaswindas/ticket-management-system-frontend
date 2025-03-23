import React from 'react';
import TicketIcon from './TicketIcon';
import PriorityGuide from './PriorityGuide';

function InfoPanel() {
  return (
    <div className="bg-dark-jungle-green w-full md:w-2/5 p-8 flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <TicketIcon />
      </div>
      
      <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
      <p className="text-gray-300 text-center mb-6">
        Create a support ticket and our team will respond within 24 hours.
      </p>
      
      <PriorityGuide />
    </div>
  );
}

export default InfoPanel;