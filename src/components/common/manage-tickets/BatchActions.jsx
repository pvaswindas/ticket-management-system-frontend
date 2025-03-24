import React from 'react';

function BatchActions({ selectedCount, onAction }) {
  return (
    <div className="mb-4 p-3 bg-deep-teal bg-opacity-30 border border-jungle-green rounded-lg flex items-center justify-between">
      <div>
        <span className="mr-2">{selectedCount} tickets selected</span>
      </div>
      <div className="flex gap-2">
        <button 
          className="px-3 py-1 bg-jungle-green hover:bg-dark-jungle-green rounded-md text-sm transition-colors"
          onClick={() => onAction('resolve')}
        >
          Resolve Selected
        </button>
        <button 
          className="px-3 py-1 bg-charcoal-gray hover:bg-github rounded-md text-sm transition-colors"
          onClick={() => onAction('close')}
        >
          Close Selected
        </button>
        <button 
          className="px-3 py-1 bg-github hover:bg-github-dark rounded-md text-sm transition-colors"
          onClick={() => onAction('delete')}
        >
          Delete Selected
        </button>
      </div>
    </div>
  );
}

export default BatchActions;