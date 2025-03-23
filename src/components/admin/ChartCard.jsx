import React from 'react';

const ChartCard = ({ title, children }) => {
  return (
    <div className="bg-charcoal-gray rounded-lg p-6 shadow">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ChartCard;