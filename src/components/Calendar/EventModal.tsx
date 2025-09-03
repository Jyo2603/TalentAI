import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';
import { hasConflict } from '../../data/calendarData';
import type { CalendarEvent } from '../../types/calendar';

interface EventModalProps {
  event: CalendarEvent | null;
  isCreating: boolean;
  onSave: (eventData: Partial<CalendarEvent>) => void;
  onDelete: (eventId: string) => void;
  onClose: () => void;
  existingEvents: CalendarEvent[];
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  isCreating,
  onSave,
  onDelete,
  onClose,
  existingEvents
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'meeting' as CalendarEvent['type'],
    startTime: '',
    endTime: '',
    location: '',
    attendees: '',
    priority: 'medium' as CalendarEvent['priority'],
    isAllDay: false,
    reminders: '15'
  });

  const [hasConflicts, setHasConflicts] = useState(false);

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        description: event.description || '',
        type: event.type || 'meeting',
        startTime: event.startTime ? new Date(event.startTime).toISOString().slice(0, 16) : '',
        endTime: event.endTime ? new Date(event.endTime).toISOString().slice(0, 16) : '',
        location: event.location || '',
        attendees: event.attendees?.join(', ') || '',
        priority: event.priority || 'medium',
        isAllDay: event.isAllDay || false,
        reminders: event.reminders?.[0]?.toString() || '15'
      });
    }
  }, [event]);

  useEffect(() => {
    if (formData.startTime && formData.endTime) {
      const tempEvent: Partial<CalendarEvent> = {
        startTime: new Date(formData.startTime),
        endTime: new Date(formData.endTime)
      };
      
      const conflicts = hasConflict(tempEvent, existingEvents.filter(e => e.id !== event?.id));
      setHasConflicts(conflicts);
    }
  }, [formData.startTime, formData.endTime, existingEvents, event?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;
    
    const eventData: Partial<CalendarEvent> = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      startTime: new Date(formData.startTime),
      endTime: new Date(formData.endTime),
      location: formData.location,
      attendees: formData.attendees.split(',').map(email => email.trim()).filter(Boolean),
      priority: formData.priority,
      isAllDay: formData.isAllDay,
      reminders: [parseInt(formData.reminders)]
    };

    onSave(eventData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Event' : 'Edit Event'}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as CalendarEvent['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="interview">Interview</option>
                <option value="meeting">Meeting</option>
                <option value="deadline">Deadline</option>
                <option value="review">Review</option>
                <option value="project">Project</option>
                <option value="personal">Personal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as CalendarEvent['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.isAllDay}
              onChange={(e) => setFormData({ ...formData, isAllDay: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="allDay" className="text-sm text-gray-700">All day event</label>
          </div>

          {!formData.isAllDay && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {hasConflicts && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle size={16} className="text-red-600" />
                <span className="text-sm font-medium text-red-800">Scheduling Conflict Detected</span>
              </div>
              <p className="text-sm text-red-700 mt-1">
                This event overlaps with existing events. Please choose a different time.
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Conference room, Zoom link, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attendees</label>
            <input
              type="text"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="email1@company.com, email2@company.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Event description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reminder (minutes before)</label>
            <select
              value={formData.reminders}
              onChange={(e) => setFormData({ ...formData, reminders: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="1440">1 day</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={hasConflicts}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors"
            >
              {isCreating ? 'Create Event' : 'Save Changes'}
            </button>
            
            {!isCreating && (
              <button
                type="button"
                onClick={() => {
                  if (event?.id) {
                    onDelete(event.id);
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