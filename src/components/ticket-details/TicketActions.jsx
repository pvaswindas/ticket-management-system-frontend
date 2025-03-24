import React from 'react';

const TicketActions = ({ status, onEdit, onDelete, onResolve, deleteInProgress, isAdmin=false }) => {
  if (status === 'resolved') {
    return null;
  }

  return (
    <div className="mt-4 md:mt-0 flex flex-col gap-2">
      {status === 'open' && (
        <div className="flex gap-2 items-center">
          {!isAdmin ? (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-jungle-green hover:bg-dark-jungle-green rounded-md text-sm"
            >
              Edit Ticket
            </button>
          ) : (
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-jungle-green hover:bg-dark-jungle-green rounded-md text-sm"
            >
              Assign Work
            </button>
          )}
          <button
            onClick={onDelete}
            disabled={deleteInProgress}
            className={`px-4 py-2 ${deleteInProgress ? 'bg-gray-500' : 'bg-red-600 hover:bg-red-700'} rounded-md text-sm flex items-center justify-center`}
          >
            {deleteInProgress ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-r-transparent mr-2"></span>
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </button>
        </div>
      )}
      {status === 'in-progress' && (
        <button
          onClick={onResolve}
          className="px-4 py-2 bg-jungle-green hover:bg-dark-jungle-green rounded-md text-sm"
        >
          Mark as Resolved
        </button>
      )}
    </div>
  );
};

export default TicketActions;