import React from 'react';

function Pagination({ setPaginationUrl, linkToPrevious, linkToNext }) {
  return (
    <div className="px-4 py-4 flex items-center justify-end border-t border-charcoal-gray"> 
      <div className="flex gap-2">
        <button
          className="px-3 py-1 bg-charcoal-gray hover:bg-github rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPaginationUrl(linkToPrevious)}
          disabled={!linkToPrevious}
        >
          Previous
        </button>
        
        <button
          className="px-3 py-1 bg-charcoal-gray hover:bg-github rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => setPaginationUrl(linkToNext)}
          disabled={!linkToNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;