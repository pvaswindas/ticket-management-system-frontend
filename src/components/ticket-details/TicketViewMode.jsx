import React from 'react';
import StatusPill from '@/components/common/manage-tickets/StatusPill';
import PriorityIndicator from '@/components/common/manage-tickets/PriorityIndicator';
import TicketActions from './TicketActions';

const TicketViewMode = ({ 
  ticket, 
  formatDate, 
  onEdit, 
  onDelete, 
  onResolve, 
  deleteInProgress,
  isAdmin=false
}) => {
  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
          <div className="flex gap-4 text-sm text-gray-400 mb-2">
            <span>Created: {formatDate(ticket.created_at)}</span>
            <span>Updated: {formatDate(ticket.updated_at)}</span>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <StatusPill status={ticket.status} />
            <PriorityIndicator priority={ticket.priority} />
          </div>
        </div>
        
        <TicketActions 
          status={ticket.status}
          onEdit={onEdit}
          onDelete={onDelete}
          onResolve={onResolve}
          deleteInProgress={deleteInProgress}
          isAdmin={isAdmin}
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-md font-medium mb-2">Description</h3>
        <div className="bg-github p-4 rounded-lg">
          <p className="whitespace-pre-line">{ticket.description}</p>
        </div>
      </div>
      
      {ticket.status !== 'open' && (
        <div className="mb-6">
          <h3 className="text-md font-medium mb-2">Assigned To</h3>
          <p>{ticket.assigned_to || "Not assigned yet"}</p>
        </div>
      )}
    </>
  );
};

export default TicketViewMode;