import React, { useState, useEffect } from 'react';
import { X, Clock, User, Tag, Calendar } from 'lucide-react';
import type { TaskItem } from '../../types/calendar';

interface TaskModalProps {
  task: TaskItem | null;
  isCreating: boolean;
  onSave: (taskData: Partial<TaskItem>) => void;
  onDelete: (taskId: string) => void;
  onClose: () => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({
  task,
  isCreating,
  onSave,
  onDelete,
  onClose
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'administrative' as TaskItem['category'],
    priority: 'medium' as TaskItem['priority'],
    status: 'pending' as TaskItem['status'],
    dueDate: '',
    estimatedHours: '',
    tags: '',
    relatedId: ''
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        category: task.category || 'administrative',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : '',
        estimatedHours: task.estimatedHours?.toString() || '',
        tags: task.tags?.join(', ') || '',
        relatedId: task.relatedId || ''
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;
    
    const taskData: Partial<TaskItem> = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      priority: formData.priority,
      status: formData.status,
      dueDate: new Date(formData.dueDate),
      estimatedHours: formData.estimatedHours ? parseInt(formData.estimatedHours) : undefined,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      relatedId: formData.relatedId || undefined
    };

    onSave(taskData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Task' : 'Edit Task'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskItem['category'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hiring">Hiring</option>
                <option value="project">Project</option>
                <option value="review">Review</option>
                <option value="administrative">Administrative</option>
                <option value="follow-up">Follow-up</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskItem['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours</label>
              <input
                type="number"
                value={formData.estimatedHours}
                onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="2"
                min="0.5"
                step="0.5"
              />
            </div>
          </div>

          {!isCreating && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskItem['status'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="urgent, frontend, interview (comma separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Task description and details..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
            >
              {isCreating ? 'Create Task' : 'Save Changes'}
            </button>
            
            {!isCreating && (
              <button
                type="button"
                onClick={() => {
                  if (task?.id) {
                    onDelete(task.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            )}
            
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};