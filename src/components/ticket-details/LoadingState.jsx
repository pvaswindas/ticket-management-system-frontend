import React from 'react';

const LoadingState = () => {
  return (
    <div className="p-8 text-center text-white">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-jungle-green border-r-transparent"></div>
      <p className="mt-2 text-github">Loading ticket details...</p>
    </div>
  );
};

export default LoadingState;