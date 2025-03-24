import React from 'react';

function StatusPill({ status }) {
  const statusClasses = {
    'open': 'bg-red-700 bg-opacity-20 text-red-100',
    'in-progress': 'bg-yellow-700 bg-opacity-20 text-yellow-100',
    'resolved': 'bg-dark-jungle-green bg-opacity-20 text-teal-100'
  };
  
  const displayText = {
    'open': 'Open',
    'in-progress': 'Progress',
    'resolved': 'Resolved'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${statusClasses[status] || 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>
      {displayText[status] || status}
    </span>
  );
}

export default StatusPill;