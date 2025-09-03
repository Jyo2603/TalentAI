import React from 'react';
import { Plus } from 'lucide-react';
import type { CalendarEvent, TaskItem } from '../../types/calendar';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  events,
  tasks,
  onEventClick,
  onCreateEvent
}) => {
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const getEventColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'interview': return 'bg-blue-500 border-blue-600';
      case 'meeting': return 'bg-green-500 border-green-600';
      case 'deadline': return 'bg-red-500 border-red-600';
      case 'review': return 'bg-purple-500 border-purple-600';
      case 'project': return 'bg-orange-500 border-orange-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM
  const weekDays = getWeekDays();

  return (
    <div className="h-full flex flex-col">
      {/* Week Header */}
      <div className="grid grid-cols-8 border-b border-gray-200">
        <div className="p-3 text-center text-sm font-medium text-gray-700 bg-gray-50">
          Time
        </div>
        {weekDays.map((day) => (
          <div key={day.toISOString()} className="p-3 text-center bg-gray-50">
            <div className="text-sm font-medium text-gray-700">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg font-bold ${
              day.toDateString() === new Date().toDateString() 
                ? 'text-blue-600' 
                : 'text-gray-900'
            }`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>

      {/* Week Grid */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-8">
          {/* Time Column */}
          <div className="bg-gray-50">
            {hours.map((hour) => (
              <div key={hour} className="h-16 border-b border-gray-200 p-2 text-xs text-gray-600">
                {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {weekDays.map((day) => {
            const dayEvents = getEventsForDate(day);
            
            return (
              <div key={day.toISOString()} className="relative">
                {hours.map((hour) => (
                  <div
                    key={hour}
                    className="h-16 border-b border-r border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer group"
                    onClick={() => {
                      const clickDate = new Date(day);
                      clickDate.setHours(hour, 0, 0, 0);
                      onCreateEvent(clickDate);
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 p-1">
                      <button className="w-full h-full flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Events Overlay */}
                {dayEvents.map((event) => {
                  const startHour = new Date(event.startTime).getHours();
                  const startMinute = new Date(event.startTime).getMinutes();
                  const endHour = new Date(event.endTime).getHours();
                  const endMinute = new Date(event.endTime).getMinutes();
                  
                  const topOffset = ((startHour - 8) * 64) + (startMinute / 60 * 64);
                  const height = ((endHour - startHour) * 64) + ((endMinute - startMinute) / 60 * 64);

                  return (
                    <div
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick(event);
                      }}
                      className={`absolute left-1 right-1 ${getEventColor(event.type)} text-white text-xs p-2 rounded border-l-4 cursor-pointer hover:opacity-90 transition-opacity z-10`}
                      style={{
                        top: `${topOffset}px`,
                        height: `${Math.max(height, 32)}px`
                      }}
                    >
                      <div className="font-medium truncate">{event.title}</div>
                      <div className="opacity-90 truncate">
                        {new Date(event.startTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};