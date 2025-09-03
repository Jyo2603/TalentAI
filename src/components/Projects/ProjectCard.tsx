import React from 'react';
import { Calendar, Users, AlertCircle, Target, Eye } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onViewComparison: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onViewComparison }) => {
  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilDeadline = () => {
    const today = new Date();
    const deadline = new Date(project.deadline);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {project.name}
          </h3>
          <p className="text-gray-600 mt-1 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
        
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(project.priority)}`}>
            {project.priority}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
            {project.status}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Calendar size={14} className="mr-1" />
            <span>Due {project.deadline.toLocaleDateString()}</span>
          </div>
          <div className={`flex items-center ${daysLeft < 7 ? 'text-red-600' : 'text-gray-600'}`}>
            <AlertCircle size={14} className="mr-1" />
            <span>{daysLeft} days left</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-gray-600">
            <Users size={14} className="mr-1" />
            <span>{project.assignedEmployees.length} assigned</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Target size={14} className="mr-1" />
            <span>{project.requiredSkills.length} skills needed</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium text-gray-700 mb-2">Required Skills</p>
          <div className="flex flex-wrap gap-1">
            {project.requiredSkills.slice(0, 3).map((skill) => (
              <span 
                key={skill}
                className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs"
              >
                {skill}
              </span>
            ))}
            {project.requiredSkills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{project.requiredSkills.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2 pt-4 border-t border-gray-100">
          <button 
            onClick={onViewComparison}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors flex items-center justify-center space-x-1"
          >
            <Eye size={14} />
            <span>Find Talent</span>
          </button>
          <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 rounded-lg transition-colors">
            Edit Project
          </button>
        </div>
      </div>
    </div>
  );
};