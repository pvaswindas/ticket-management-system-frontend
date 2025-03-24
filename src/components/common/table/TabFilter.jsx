import React from 'react';

function TabFilter({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'recent', label: 'Recent' },
    { id: 'open', label: 'Open' },
    { id: 'in-progress', label: 'In-progress' },
    { id: 'resolved', label: 'Resolved' },
  ];
  
  return (
    <div className="my-5 w-full">
      {/* Desktop/larger */}
      <div className="hidden sm:flex sm:space-x-2">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`px-4 py-2 rounded transition-colors ${
              activeTab === tab.id 
                ? 'bg-jungle-green text-white' 
                : 'bg-charcoal-gray text-gray-300 hover:bg-deep-teal'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Mobile screen */}
      <div className="flex gap-2 md:hidden w-full justify-between">
        {tabs.map(tab => (
          <button 
            key={tab.id}
            className={`px-3 py-2 rounded-full text-sm transition-colors ${
              activeTab === tab.id 
                ? 'bg-jungle-green text-white' 
                : 'bg-charcoal-gray text-gray-300 hover:bg-deep-teal'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TabFilter;