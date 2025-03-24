import React from 'react';

function PriorityIndicator({ priority }) {
  const priorityClasses = {
    'low': 'bg-blue-700 bg-opacity-20 text-blue-100',
    'medium': 'bg-yellow-700 bg-opacity-20 text-yellow-400',
    'high': 'bg-red-700 bg-opacity-20 text-red-100'
  };
  
  const displayText = {
    'low': 'Low',
    'medium': 'Medium',
    'high': 'High'
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${priorityClasses[priority] || 'bg-gray-500 bg-opacity-20 text-gray-400'}`}>
      {displayText[priority] || priority}
    </span>
  );
}

export default PriorityIndicator;