import React from 'react';
import { CircleHelp } from 'lucide-react';

function InfoPanel({ isUserCreation = false }) {
  return (
    <div className="bg-dark-jungle-green w-full md:w-2/5 p-8 flex flex-col justify-center items-center">
      <div className="text-center mb-6">
        <CircleHelp color='#0e9b8b' size={isUserCreation ? "130" : "150"} />
      </div>
      
      <h2 className="text-xl font-bold text-white mb-4">Need Help?</h2>
      <p className="text-gray-300 text-center mb-6">
        {!isUserCreation ? (
          "Create a support ticket and our team will respond within 24 hours."
        ) : (
          "To create a new user or admin, provide the necessary details."
        )}
      </p>
      
      <PriorityGuide isUserCreation={isUserCreation} />
    </div>
  );
}

export default InfoPanel;

function PriorityGuide({ isUserCreation }) {
  return (
    <div className="bg-github p-4 rounded-lg border border-deep-teal w-full max-w-sm">
      <h3 className="text-jungle-green font-semibold mb-2">{isUserCreation ? 'Required Information:' : 'Priority Levels:'}</h3>
      <ul className="text-white text-sm">
        {isUserCreation ? (
          <>
            <li className="mb-2">
              <span className="font-bold text-jungle-green">Role:</span> Select either User or Admin.
            </li>
            <li className="mb-2">
              <span className="font-bold text-jungle-green">Email:</span> Provide a valid email address.
            </li>
            <li className="mb-2">
              <span className="font-bold text-jungle-green">Password:</span> Must be at least 8 characters with an uppercase, lowercase, number, and special character.
            </li>
            <li>
              <span className="font-bold text-jungle-green">Confirm Password:</span> Ensure it matches the password.
            </li>
          </>
        ) : (
          <>
            <li className="mb-2">
              <span className="font-bold text-jungle-green">Low:</span> General questions and non-urgent issues.
            </li>
            <li className="mb-2">
              <span className="font-bold text-amber-500">Medium:</span> Important issues affecting workflow.
            </li>
            <li>
              <span className="font-bold text-red-400">High:</span> Critical issues requiring immediate attention.
            </li>
          </>
        )}
      </ul>
    </div>
  );
}