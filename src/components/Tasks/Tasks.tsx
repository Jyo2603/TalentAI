import React, { useState } from 'react';
import { Plus, Filter, Calendar, CheckSquare, Clock } from 'lucide-react';
import { TaskCard } from './TaskCard';
import { mockTasks } from '../../data/mockData';
import type { Task } from '../../types';

export const Tasks: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Task['type']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Task['status']>('all');

  const filteredTasks = mockTasks.filter(task => {
    const typeMatch = filter === 'all' || task.type === filter;
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const pendingTasks = mockTasks.filter(t => t.status === 'pending').length;
  const inProgressTasks = mockTasks.filter(t => t.status === 'in-progress').length;
  const completedTasks = mockTasks.filter(t => t.status === 'completed').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600 mt-2">Track hiring and staffing tasks with priorities and deadlines</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>New Task</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-800">{pendingTasks}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-800">{inProgressTasks}</p>
              <p className="text-sm text-blue-600">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckSquare size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
              <p className="text-sm text-green-600">Completed</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <CheckSquare size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-800">{mockTasks.length}</p>
              <p className="text-sm text-purple-600">Total</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | Task['type'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="hiring">Hiring</option>
              <option value="staffing">Staffing</option>
              <option value="review">Review</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | Task['status'])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="flex items-end">
            <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <CheckSquare size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No tasks found</p>
          <p className="text-gray-600 mt-1">Try adjusting your filters or create a new task</p>
        </div>
      )}
    </div>
  );
};