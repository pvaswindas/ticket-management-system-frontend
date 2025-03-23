import React from 'react';

function StatCard({ title, count, color }) {
  return (
    <div className="bg-charcoal-gray rounded-lg shadow p-4 border border-gray-700">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{count}</p>
    </div>
  );
}

export default StatCard;