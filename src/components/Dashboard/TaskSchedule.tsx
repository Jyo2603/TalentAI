import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, Plus } from 'lucide-react';
import { mockTasks } from '../../data/calendarData';
import type { NavItem } from '../../types';

interface TaskScheduleProps {
  onNavigate: (item: NavItem) => void;
}

export const TaskSchedule: React.FC<TaskScheduleProps> = ({ onNavigate }) => {
  // Get today's tasks
  const today = new Date();
  const todaysTasks = mockTasks.filter(task => {
    const taskDate = new Date(task.dueDate);
    return taskDate.toDateString() === today.toDateString();
  });

  const pendingTasksCount = mockTasks.filter(t => t.status === 'pending').length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hiring': return <Calendar size={16} />;
      case 'review': return <CheckCircle size={16} />;
      case 'project': return <Clock size={16} />;
      case 'administrative': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <Calendar size={14} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <p className="text-sm text-gray-500 font-medium">
            </p>
            <p className="text-sm text-gray-500">{pendingTasksCount} pending tasks</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('calendar')}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View Calendar →
        </button>
      </div>

      <div className="space-y-4">
        {todaysTasks.slice(0, 4).map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm ${
              task.status === 'completed'
                ? 'bg-green-50 border-green-200 opacity-75' 
                : 'bg-gray-50 border-gray-200 hover:border-blue-200 hover:bg-blue-50'
            }`}
          >
            <div className="flex-shrink-0">
              {task.status === 'completed' ? (
                <CheckCircle size={16} className="text-green-500" />
              ) : (
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full hover:border-blue-400 transition-colors" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <div className="text-gray-400">
                  {getCategoryIcon(task.category)}
                </div>
                <h4 className={`text-sm font-medium ${
                  task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {task.title}
                </h4>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock size={12} className="mr-1" />
                  {new Date(task.dueDate).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        ))}
        
        {todaysTasks.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Calendar size={32} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium">No tasks scheduled for today</p>
            <p className="text-xs text-gray-400">Enjoy your free time! 🎉</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onNavigate('calendar')}
          className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <Plus size={16} />
          <span>Add New Task</span>
        </button>
      </div>
    </div>
  );
};