import React from 'react';
import StatCard from './StatCard';

function StatsRow({ tickets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <StatCard 
        title="Total Tickets" 
        count={tickets.length} 
        color="text-gray-200"
      />
      <StatCard 
        title="Open Tickets" 
        count={tickets.filter(t => t.status === 'open').length} 
        color="text-jungle-green"
      />
      <StatCard 
        title="In Progress" 
        count={tickets.filter(t => t.status === 'in-progress').length} 
        color="text-dark-jungle-green"
      />
      <StatCard 
        title="Resolved" 
        count={tickets.filter(t => t.status === 'resolved').length} 
        color="text-deep-teal"
      />
    </div>
  );
}

export default StatsRow;