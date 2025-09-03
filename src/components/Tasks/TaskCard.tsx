import React from 'react';
import { Calendar, AlertCircle, User, Star } from 'lucide-react';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const getTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'hiring': return 'bg-blue-100 text-blue-800';
      case 'staffing': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getDaysUntilDue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDue();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {task.title}
            </h3>
            <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(task.type)}`}>
              {task.type}
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600">{task.description}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
            <Star size={12} className="inline mr-1" />
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600">
            <User size={14} className="mr-1" />
            <span>Sarah Chen</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar size={14} className="mr-1" />
            <span>Due {task.dueDate.toLocaleDateString()}</span>
          </div>
        </div>
        
        <div className={`flex items-center ${daysLeft < 2 ? 'text-red-600' : 'text-gray-600'}`}>
          <AlertCircle size={14} className="mr-1" />
          <span>
            {daysLeft === 0 ? 'Due today' : 
             daysLeft === 1 ? 'Due tomorrow' : 
             daysLeft < 0 ? `${Math.abs(daysLeft)} days overdue` :
             `${daysLeft} days left`}
          </span>
        </div>
      </div>

      <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition-colors">
          Mark Complete
        </button>
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-4 py-2 rounded transition-colors">
          Edit Task
        </button>
      </div>
    </div>
  );
};