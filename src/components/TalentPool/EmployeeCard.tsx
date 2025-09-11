import React, { useState } from 'react';
import { Mail, Calendar, Award, FolderOpen, Clock, User, ChevronDown, ChevronUp, CheckSquare, AlertCircle, TrendingUp } from 'lucide-react';
import type { Employee } from '../../types';

interface EmployeeCardProps {
  employee: Employee;
  isSelected?: boolean;
  showBulkSelect?: boolean;
  onSelect?: (employeeId: string) => void;
}

export const EmployeeCard: React.FC<EmployeeCardProps> = ({ 
  employee, 
  isSelected = false, 
  showBulkSelect = false, 
  onSelect 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getAvailabilityColor = (availability: Employee['availability']) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'assigned': return 'bg-orange-100 text-orange-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityIcon = (availability: Employee['availability']) => {
    switch (availability) {
      case 'available': return <Clock size={14} className="text-green-600" />;
      case 'assigned': return <FolderOpen size={14} className="text-orange-600" />;
      case 'unavailable': return <Clock size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getWorkloadColor = (workload: Employee['currentWorkload']) => {
    switch (workload) {
      case 'light': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'heavy': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getWorkloadIcon = (workload: Employee['currentWorkload']) => {
    switch (workload) {
      case 'light': return <TrendingUp size={14} className="text-green-600" />;
      case 'medium': return <Clock size={14} className="text-yellow-600" />;
      case 'heavy': return <AlertCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getDaysUntilAvailable = () => {
    if (!employee.availableDate) return null;
    const today = new Date();
    const diffTime = employee.availableDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilAvailable = getDaysUntilAvailable();
  return (
    <div className={`bg-white border rounded-lg p-6 hover:shadow-sm transition-all duration-200 group relative ${
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      {/* Bulk Select Checkbox */}
      {showBulkSelect && (
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onSelect?.(employee.id)}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              isSelected 
                ? 'bg-blue-600 border-blue-600' 
                : 'border-gray-300 hover:border-blue-400'
            }`}
          >
            {isSelected && <CheckSquare size={14} className="text-white" />}
          </button>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
            {employee.avatar ? (
              <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
            ) : (
              <User size={24} className="text-gray-600" />
            )}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {employee.name}
            </h3>
            <p className="text-sm text-gray-600">{employee.department}</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <span className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center space-x-1 ${getAvailabilityColor(employee.availability)}`}>
            {getAvailabilityIcon(employee.availability)}
            <span className="capitalize">{employee.availability}</span>
          </span>
          
          <span className={`px-3 py-1 rounded-lg border text-xs font-medium flex items-center space-x-1 ${getWorkloadColor(employee.currentWorkload)}`}>
            {getWorkloadIcon(employee.currentWorkload)}
            <span className="capitalize">{employee.currentWorkload} load</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">{employee.experience} years exp</span>
          {daysUntilAvailable !== null && daysUntilAvailable > 0 && (
            <span className="text-purple-600 font-medium">
              Available in {daysUntilAvailable} days
            </span>
          )}
          {employee.availability === 'available' && (
            <span className="text-green-600 font-medium">Available now</span>
          )}
        </div>

        {employee.currentProject && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Current:</span> {employee.currentProject}
            {employee.availableDate && (
              <span className="text-purple-600 ml-2">
                (until {employee.availableDate.toLocaleDateString()})
              </span>
            )}
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Top Skills</p>
          <div className="flex flex-wrap gap-1">
            {employee.skills.slice(0, 3).map((skill) => (
              <span 
                key={skill}
                className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
              >
                {skill}
              </span>
            ))}
            {employee.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                +{employee.skills.length - 3} more
              </span>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Mail size={14} className="mr-2" />
                {employee.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar size={14} className="mr-2" />
                Joined {employee.joinDate.toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <TrendingUp size={14} className="mr-2" />
                Current workload: {employee.currentWorkload}
              </div>
            </div>

            {/* Workload Details */}
            <div className={`border rounded-lg p-3 ${getWorkloadColor(employee.currentWorkload)}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Workload Status</span>
                {getWorkloadIcon(employee.currentWorkload)}
              </div>
              <p className="text-xs opacity-90">
                {employee.currentWorkload === 'light' && 'Ready for new assignments'}
                {employee.currentWorkload === 'medium' && 'Moderate capacity available'}
                {employee.currentWorkload === 'heavy' && 'At full capacity'}
              </p>
            </div>
            {employee.certifications.length > 0 && (
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Certifications</p>
                <div className="space-y-1">
                  {employee.certifications.map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Award size={12} className="text-yellow-600" />
                      <span className="text-xs text-gray-600">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-medium text-gray-700 mb-2">Recent Projects</p>
              <div className="space-y-1">
                {employee.pastProjects.slice(0, 3).map((project) => (
                  <div key={project} className="flex items-center space-x-2">
                    <FolderOpen size={12} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{project}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button 
                className={`flex-1 text-xs py-2 rounded transition-colors ${
                  employee.availability === 'available' && employee.currentWorkload !== 'heavy'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
                disabled={employee.availability !== 'available' || employee.currentWorkload === 'heavy'}
              >
                Assign to Project
              </button>
              <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs py-2 rounded-lg transition-colors font-medium">
                View Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};