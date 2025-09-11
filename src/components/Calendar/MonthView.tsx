import React from 'react';
import { Plus } from 'lucide-react';
import type { CalendarEvent, TaskItem } from '../../types/calendar';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  events,
  tasks,
  onEventClick,
  onCreateEvent
}) => {
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: Date[] = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'interview': return 'bg-blue-500';
      case 'meeting': return 'bg-green-500';
      case 'deadline': return 'bg-red-500';
      case 'review': return 'bg-purple-500';
      case 'project': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="h-full flex flex-col">
      {/* Week Headers */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {weekDays.map((day) => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 auto-rows-fr">
        {days.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const dayTasks = getTasksForDate(date);
          const isCurrentMonthDay = isCurrentMonth(date);
          const isTodayDate = isToday(date);

          return (
            <div
              key={index}
              className={`border-r border-b border-gray-200 p-2 min-h-[120px] relative group hover:bg-gray-50 transition-colors ${
                !isCurrentMonthDay ? 'bg-gray-50 text-gray-400' : ''
              } ${isTodayDate ? 'bg-blue-50' : ''}`}
              onClick={() => onCreateEvent(date)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-medium ${
                  isTodayDate ? 'text-blue-600' : isCurrentMonthDay ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateEvent(date);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white rounded transition-all"
                >
                  <Plus size={12} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-1">
                {/* Events */}
                {dayEvents.slice(0, 2).map((event) => (
                  <div
                    key={event.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`${getEventColor(event.type)} text-white text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity truncate`}
                  >
                    {event.startTime.toLocaleTimeString('en-US', { 
                      hour: 'numeric', 
                      minute: '2-digit',
                      hour12: true 
                    })} {event.title}
                  </div>
                ))}

                {/* Tasks */}
                {dayTasks.slice(0, 1).map((task) => (
                  <div
                    key={task.id}
                    className="bg-gray-200 text-gray-800 text-xs p-1 rounded truncate border-l-2 border-purple-500"
                  >
                    📋 {task.title}
                  </div>
                ))}

                {/* Show more indicator */}
                {(dayEvents.length > 2 || dayTasks.length > 1) && (
                  <div className="text-xs text-gray-600 font-medium">
                    +{Math.max(0, dayEvents.length - 2) + Math.max(0, dayTasks.length - 1)} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};