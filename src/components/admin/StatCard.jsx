import React from 'react';

const StatCard = ({ title, value, percentage, isNegative }) => {
  return (
    <div className="bg-charcoal-gray rounded-lg p-6 shadow">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className="flex items-center">
        <span className="text-3xl font-bold">{value}</span>
        {percentage && (
          <span 
            className={`text-xs font-medium px-2 py-1 rounded ml-2 ${
              isNegative 
                ? 'bg-red-900 text-red-400' 
                : 'bg-persian-green text-white'
            }`}
          >
            {percentage}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;