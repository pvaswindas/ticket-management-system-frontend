import React from 'react';

function PriorityGuide() {
  return (
    <div className="bg-github p-4 rounded-lg border border-deep-teal w-full max-w-sm">
      <h3 className="text-jungle-green font-semibold mb-2">Priority Levels:</h3>
      <ul className="text-white text-sm">
        <li className="mb-2">
          <span className="font-bold text-jungle-green">Low:</span> General questions and non-urgent issues
        </li>
        <li className="mb-2">
          <span className="font-bold text-amber-500">Medium:</span> Important issues affecting workflow
        </li>
        <li>
          <span className="font-bold text-red-400">High:</span> Critical issues requiring immediate attention
        </li>
      </ul>
    </div>
  );
}

export default PriorityGuide;