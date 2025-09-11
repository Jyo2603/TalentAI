import React from 'react';
import { Plus, Clock, MapPin, Users } from 'lucide-react';
import type { CalendarEvent, TaskItem } from '../../types/calendar';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
}

export const DayView: React.FC<DayViewProps> = ({
  currentDate,
  events,
  tasks,
  onEventClick,
  onCreateEvent
}) => {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

  const getEventsForDate = () => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === currentDate.toDateString();
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const getTasksForDate = () => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === currentDate.toDateString();
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

  const dayEvents = getEventsForDate();
  const dayTasks = getTasksForDate();

  return (
    <div className="h-full flex">
      {/* Time Grid */}
      <div className="flex-1 flex flex-col">
        {/* All Day Events */}
        {dayEvents.some(e => e.isAllDay) && (
          <div className="border-b border-gray-200 p-4 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">All Day</h4>
            <div className="space-y-1">
              {dayEvents.filter(e => e.isAllDay).map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={`${getEventColor(event.type)} text-white p-2 rounded cursor-pointer hover:opacity-90 transition-opacity`}
                >
                  <div className="font-medium">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Hourly Grid */}
        <div className="flex-1 relative">
          <div className="grid grid-cols-2">
            {/* Time Labels */}
            <div className="bg-gray-50 border-r border-gray-200">
              {hours.map((hour) => (
                <div key={hour} className="h-16 border-b border-gray-200 p-2 text-xs text-gray-600 flex items-start">
                  {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>

            {/* Events Column */}
            <div className="relative">
              {hours.map((hour) => (
                <div
                  key={hour}
                  className="h-16 border-b border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer group"
                  onClick={() => {
                    const clickDate = new Date(currentDate);
                    clickDate.setHours(hour, 0, 0, 0);
                    onCreateEvent(clickDate);
                  }}
                >
                  <div className="opacity-0 group-hover:opacity-100 p-2">
                    <button className="w-full h-full flex items-center justify-center text-blue-600 hover:bg-blue-100 rounded transition-colors">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              ))}

              {/* Events Overlay */}
              {dayEvents.filter(e => !e.isAllDay).map((event) => {
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
                    className={`absolute left-2 right-2 ${getEventColor(event.type)} text-white p-2 rounded border-l-4 cursor-pointer hover:opacity-90 transition-opacity z-10`}
                    style={{
                      top: `${topOffset}px`,
                      height: `${Math.max(height, 40)}px`
                    }}
                  >
                    <div className="font-medium text-sm truncate">{event.title}</div>
                    <div className="opacity-90 text-xs flex items-center space-x-2">
                      <Clock size={10} />
                      <span>
                        {new Date(event.startTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })} - {new Date(event.endTime).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="opacity-90 text-xs flex items-center space-x-1 mt-1">
                        <MapPin size={10} />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Sidebar */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Tasks Due Today</h4>
        <div className="space-y-2">
          {dayTasks.map((task) => (
            <div
              key={task.id}
              className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority}
                </span>
              </div>
              
              {task.description && (
                <p className="text-xs text-gray-600 mb-2">{task.description}</p>
              )}
              
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  task.status === 'completed' ? 'bg-green-100 text-green-800' :
                  task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status}
                </span>
                
                <div className="text-xs text-gray-500">
                  {new Date(task.dueDate).toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {dayTasks.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No tasks due today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};