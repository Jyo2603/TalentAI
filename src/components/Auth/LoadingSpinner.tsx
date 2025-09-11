import React from 'react';
import { Users } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Users size={32} className="text-white animate-pulse" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">TalentAI</h2>
        <p className="text-gray-600 mb-6">Loading your workspace...</p>
        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};