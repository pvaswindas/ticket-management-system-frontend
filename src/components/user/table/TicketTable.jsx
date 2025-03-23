import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PriorityIndicator from '../manage-tickets/PriorityIndicator';
import StatusPill from '../manage-tickets/StatusPill';
import { formatDate } from '../../../utils/formats';

function TicketTable({ tickets }) {
  const [expandedTicket, setExpandedTicket] = useState(null);
  const navigate = useNavigate()


  // Toggle expanded view for mobile
  const toggleExpand = (id) => {
    setExpandedTicket(expandedTicket === id ? null : id);
  };


  return (
    <div className="bg-github rounded-lg shadow overflow-hidden">
      {/* Desktop view - standard table */}
      <div className="hidden md:block">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-charcoal-gray">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Assignee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Last Updated</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-github divide-y divide-gray-700">
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-charcoal-gray">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">{ticket.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusPill status={ticket.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <PriorityIndicator priority={ticket.priority} />
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {ticket.status === 'open' ? '-' : ticket.assigned_to || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(ticket.updated_at)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    <button 
                      className="text-jungle-green hover:text-dark-jungle-green mr-3 cursor-pointer"
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile view - card-based layout */}
      <div className="md:hidden">
        {tickets.length > 0 ? (
          <div className="divide-y divide-gray-700">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 hover:bg-charcoal-gray">
                <div 
                  className="flex justify-between items-center cursor-pointer" 
                  onClick={() => toggleExpand(ticket.id)}
                >
                  <div className="text-sm font-medium text-gray-300">{ticket.title}</div>
                  <div className="flex items-center space-x-2">
                    <StatusPill status={ticket.status} />
                    <svg 
                      className={`w-4 h-4 text-gray-400 transform transition-transform ${expandedTicket === ticket.id ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
                
                {expandedTicket === ticket.id && (
                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
                    <div className="col-span-2">
                      <span className="font-medium text-gray-300">Priority:</span>{' '}
                        <PriorityIndicator priority={ticket.priority} />
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">Assignee:</span>{' '}
                      {ticket.status === 'open' ? '-' : ticket.assigned_to || '-'}
                    </div>
                    <div>
                      <span className="font-medium text-gray-300">Updated:</span>{' '}
                      {formatDate(ticket.updated_at)}
                    </div>
                    <div className="col-span-2 mt-3 flex space-x-3">
                      <button
                        className="text-jungle-green hover:text-dark-jungle-green"
                        onClick={() => navigate(`/tickets/${ticket.id}`)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-4 text-center text-gray-400">
            No tickets found
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketTable;