import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Grid, List } from 'lucide-react';
import type { CalendarView, CalendarEvent, TaskItem } from '../../types/calendar';

interface CalendarHeaderProps {
  view: CalendarView;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onDateChange: (date: Date) => void;
  onViewChange: (viewType: CalendarView['type']) => void;
  onCreateEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  view,
  events,
  tasks,
  onDateChange,
  onViewChange,
  onCreateEvent
}) => {
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(view.currentDate);
    
    switch (view.type) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'agenda':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
    }
    
    onDateChange(newDate);
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const formatHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long'
    };

    switch (view.type) {
      case 'month':
        return view.currentDate.toLocaleDateString('en-US', options);
      case 'week':
        const weekStart = new Date(view.currentDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      case 'day':
        return view.currentDate.toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'agenda':
        return 'Agenda View';
      default:
        return '';
    }
  };

  const viewButtons = [
    { type: 'month' as const, label: 'Month', icon: Grid },
    { type: 'week' as const, label: 'Week', icon: CalendarIcon },
    { type: 'day' as const, label: 'Day', icon: Clock },
    { type: 'agenda' as const, label: 'Agenda', icon: List }
  ];

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-medium text-gray-900">{formatHeaderDate()}</h2>
          
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={16} className="text-gray-600" />
            </button>
            
            <button
              onClick={goToToday}
              className="px-2 py-1 text-xs text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Today
            </button>
            
            <button
              onClick={() => navigateDate('next')}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded p-1">
            {viewButtons.map((button) => {
              const Icon = button.icon;
              return (
                <button
                  key={button.type}
                  onClick={() => onViewChange(button.type)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition-colors ${
                    view.type === button.type
                      ? 'bg-white text-gray-900'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon size={14} />
                  <span>{button.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-blue-50 rounded p-2">
          <p className="text-xs text-blue-900">Today's Events</p>
          <p className="text-lg font-medium text-blue-800">
            {events.filter(e => {
              const today = new Date();
              const eventDate = new Date(e.startTime);
              return eventDate.toDateString() === today.toDateString();
            }).length}
          </p>
        </div>
        
        <div className="bg-green-50 rounded p-2">
          <p className="text-xs text-green-900">Interviews</p>
          <p className="text-lg font-medium text-green-800">
            {events.filter(e => e.type === 'interview').length}
          </p>
        </div>
        
        <div className="bg-purple-50 rounded p-2">
          <p className="text-xs text-purple-900">Pending Tasks</p>
          <p className="text-lg font-medium text-purple-800">
            {tasks.filter(t => t.status === 'pending').length}
          </p>
        </div>
        
        <div className="bg-orange-50 rounded p-2">
          <p className="text-xs text-orange-900">Overdue</p>
          <p className="text-lg font-medium text-orange-800">
            {tasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'completed').length}
          </p>
        </div>
      </div>
    </div>
  );
};