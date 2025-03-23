import React from 'react';

function LoadingPage() {
  return (
    <div className='bg-github flex justify-center items-center w-full min-h-screen'>
      <div className='flex items-center'>
        <span className='text-white'>Loading</span>
        <div className='ml-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
      </div>
    </div>
  );
}

export default LoadingPage;