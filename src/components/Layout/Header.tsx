import React from 'react';
import { User, Bell, Settings, Plus, RotateCcw, Filter, Download, Calendar, ChevronDown } from 'lucide-react';
import { currentUser } from '../../data/mockData';
import type { NavItem } from '../../types';

interface HeaderProps {
  title: string;
  onNavigate?: (item: NavItem) => void;
}

export const Header: React.FC<HeaderProps> = ({ title, onNavigate }) => {
  const getCurrentDateForHeader = () => {
    const today = new Date(); // Remove the hardcoded date
    return `Today is ${today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })}`;
  };

  const getCurrentDateShort = () => {
    const today = new Date(); // Remove the hardcoded date
    return today.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs cursor-pointer hover:bg-gray-50 transition-colors">
            <Calendar size={14} className="text-gray-500" />
            <span className="text-xs">{getCurrentDateShort()}</span>
          </div>
          
          <button 
            onClick={() => onNavigate?.('account-settings')}
            className="w-7 h-7 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer"
          >
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover" />
            ) : (
              <User size={14} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};