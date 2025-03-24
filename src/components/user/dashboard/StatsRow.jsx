import React from 'react';

const StatsRow = ({ userStats }) => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-charcoal-gray p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Total Tickets</h3>
            <p className="text-2xl font-bold text-white">{userStats.totalTickets}</p>
        </div>
        <div className="bg-charcoal-gray p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Open Tickets</h3>
            <p className="text-2xl font-bold text-orange-500">{userStats.openTickets}</p>
        </div>
        <div className="bg-charcoal-gray p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">In Progress</h3>
            <p className="text-2xl font-bold text-blue-500">{userStats.inProgressTickets}</p>
        </div>
        <div className="bg-charcoal-gray p-4 rounded-lg">
            <h3 className="text-sm text-gray-400 mb-2">Resolved</h3>
            <p className="text-2xl font-bold text-green-500">{userStats.resolvedTickets}</p>
        </div>
    </div>
);
  
export default StatsRow;