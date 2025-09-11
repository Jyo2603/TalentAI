import React from 'react';
import { Users, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import type { NavItem } from '../../types';

interface EmployeeTeamsProps {
  onNavigate: (item: NavItem) => void;
}

const mockTeams = [
  {
    id: '1',
    name: 'Frontend Team',
    department: 'Engineering',
    memberCount: 8,
    availability: 'high',
    currentProjects: 2,
    lead: 'Jennifer Walsh'
  },
  {
    id: '2',
    name: 'AI/ML Team',
    department: 'AI/ML',
    memberCount: 6,
    availability: 'medium',
    currentProjects: 3,
    lead: 'Michael Chen'
  },
  {
    id: '3',
    name: 'Product Team',
    department: 'Product',
    memberCount: 5,
    availability: 'low',
    currentProjects: 4,
    lead: 'Lisa Thompson'
  }
];

export const EmployeeTeams: React.FC<EmployeeTeamsProps> = ({ onNavigate }) => {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
              <Users size={14} className="text-gray-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Team Overview</h3>
          </div>
          <p className="text-sm text-gray-500">Current team capacity and availability</p>
        </div>
        
        <button
          onClick={() => onNavigate('talent-pool')}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="space-y-5">
        {mockTeams.map((team) => (
          <div key={team.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm hover:bg-gray-50 transition-all duration-200 group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-cyan-600 transition-colors">{team.name}</h4>
                  <p className="text-sm text-gray-600">{team.department}</p>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getAvailabilityColor(team.availability)}`}>
                {team.availability} availability
              </span>
            </div>

            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{team.memberCount}</p>
                <p className="text-xs text-gray-600">Members</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-900">{team.currentProjects}</p>
                <p className="text-xs text-gray-600">Projects</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-900">{team.lead}</p>
                <p className="text-xs text-gray-600">Team Lead</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};