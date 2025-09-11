import React from 'react';
import { Plus, Clock, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import type { TaskItem } from '../../types/calendar';

interface TaskPanelProps {
  tasks: TaskItem[];
  onTaskClick: (task: TaskItem) => void;
  onCreateTask: () => void;
  onTaskStatusChange: (taskId: string, newStatus: TaskItem['status']) => void;
}

export const TaskPanel: React.FC<TaskPanelProps> = ({
  tasks,
  onTaskClick,
  onCreateTask,
  onTaskStatusChange
}) => {
  const [filter, setFilter] = React.useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const getTaskColor = (category: TaskItem['category']) => {
    switch (category) {
      case 'hiring': return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'project': return 'bg-green-50 border-green-200 text-green-800';
      case 'review': return 'bg-purple-50 border-purple-200 text-purple-800';
      case 'administrative': return 'bg-gray-50 border-gray-200 text-gray-800';
      case 'follow-up': return 'bg-orange-50 border-orange-200 text-orange-800';
      default: return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getPriorityColor = (priority: TaskItem['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: Date) => {
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString();
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'in-progress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const overdueCount = tasks.filter(t => isOverdue(t.dueDate) && t.status !== 'completed').length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">Tasks</h3>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-blue-50 rounded p-2">
            <p className="text-xs text-blue-900">Pending</p>
            <p className="text-sm font-medium text-blue-800">{pendingCount}</p>
          </div>
          <div className="bg-green-50 rounded p-2">
            <p className="text-xs text-green-900">In Progress</p>
            <p className="text-sm font-medium text-green-800">{inProgressCount}</p>
          </div>
          <div className="bg-purple-50 rounded p-2">
            <p className="text-xs text-purple-900">Completed</p>
            <p className="text-sm font-medium text-purple-800">{completedCount}</p>
          </div>
          <div className="bg-red-50 rounded p-2">
            <p className="text-xs text-red-900">Overdue</p>
            <p className="text-sm font-medium text-red-800">{overdueCount}</p>
          </div>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="w-full px-2 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick(task)}
            className={`border rounded p-2 cursor-pointer hover:shadow-sm transition-all ${getTaskColor(task.category)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-xs font-medium line-clamp-2">{task.title}</h4>
              <span className={`px-1 py-0.5 rounded text-xs ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <Clock size={10} />
                <span className={isOverdue(task.dueDate) && task.status !== 'completed' ? 'text-red-600 font-medium' : ''}>
                  {new Date(task.dueDate).toLocaleDateString()}
                </span>
              </div>
              
              <span className={`px-1 py-0.5 rounded text-xs ${
                task.status === 'completed' ? 'bg-green-100 text-green-800' :
                task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {task.status}
              </span>
            </div>

            {isOverdue(task.dueDate) && task.status !== 'completed' && (
              <div className="flex items-center space-x-1 mt-1 text-red-600">
                <AlertCircle size={10} />
                <span className="text-xs">Overdue</span>
              </div>
            )}

            <div className="flex space-x-1 mt-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onTaskStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed');
                }}
                className={`flex-1 text-xs py-0.5 rounded transition-colors ${
                  task.status === 'completed'
                    ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {task.status === 'completed' ? 'Reopen' : 'Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};