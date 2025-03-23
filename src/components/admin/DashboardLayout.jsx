import React from 'react';

const DashboardLayout = ({ children, isLoading, error, onRetry }) => {
  if (isLoading) {
    return (
      <div className="text-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-green mx-auto"></div>
          <p className="mt-4">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-charcoal-gray p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-400 mb-4">Error</h2>
          <p>{error}</p>
          <button 
            className="mt-4 bg-jungle-green hover:bg-dark-jungle-green text-white py-2 px-4 rounded"
            onClick={onRetry}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" text-gray-100 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;