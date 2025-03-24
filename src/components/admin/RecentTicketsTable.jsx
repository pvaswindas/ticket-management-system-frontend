import React from 'react';

const RecentTicketsTable = ({ tickets }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Assigned To</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <tr key={ticket.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.title}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.priority === 'high' ? 'bg-red-800 text-white' :
                    ticket.priority === 'medium' ? 'bg-amber-600 text-white' :
                    'bg-persian-green text-white'
                  }`}>
                    {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    ticket.status === 'open' ? 'bg-yellow-500 text-white' :
                    ticket.status === 'in-progress' ? 'bg-indigo-500 text-white' :
                    'bg-pine-green text-white'
                  }`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.createdAt}</td>
                <td className="px-4 py-3 whitespace-nowrap text-sm">{ticket.assignedTo || 'Unassigned'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-4 py-3 text-center text-sm text-gray-400">No tickets found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTicketsTable;