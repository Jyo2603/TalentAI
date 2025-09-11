import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';
import type { CalendarEvent, TaskItem } from '../../types/calendar';

interface AgendaViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  currentDate,
  events,
  tasks,
  onEventClick,
  onCreateEvent
}) => {
  const getNext7Days = () => {
    const days: Date[] = [];
    const startDate = new Date();
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate.toDateString() === date.toDateString();
    }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.toDateString() === date.toDateString();
    }).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'interview': return <Users size={16} className="text-blue-600" />;
      case 'meeting': return <Users size={16} className="text-green-600" />;
      case 'deadline': return <AlertCircle size={16} className="text-red-600" />;
      case 'review': return <CheckCircle size={16} className="text-purple-600" />;
      case 'project': return <Calendar size={16} className="text-orange-600" />;
      default: return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const getTaskIcon = (category: TaskItem['category']) => {
    switch (category) {
      case 'hiring': return <Users size={16} className="text-blue-600" />;
      case 'project': return <Calendar size={16} className="text-green-600" />;
      case 'review': return <CheckCircle size={16} className="text-purple-600" />;
      case 'administrative': return <Calendar size={16} className="text-gray-600" />;
      case 'follow-up': return <Clock size={16} className="text-orange-600" />;
      default: return <Calendar size={16} className="text-gray-600" />;
    }
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const days = getNext7Days();

  return (
    <div className="h-full overflow-auto p-4">
      <div className="space-y-6">
        {days.map((day) => {
          const dayEvents = getEventsForDate(day);
          const dayTasks = getTasksForDate(day);
          const hasItems = dayEvents.length > 0 || dayTasks.length > 0;

          return (
            <div key={day.toISOString()} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className={`p-4 border-b border-gray-200 ${isToday(day) ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold ${isToday(day) ? 'text-blue-900' : 'text-gray-900'}`}>
                      {day.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {dayEvents.length} events • {dayTasks.length} tasks
                    </p>
                  </div>
                  
                  <button
                    onClick={() => onCreateEvent(day)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                  >
                    <Calendar size={16} />
                  </button>
                </div>
              </div>

              {hasItems ? (
                <div className="p-4 space-y-4">
                  {/* Events */}
                  {dayEvents.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>Events</span>
                      </h4>
                      <div className="space-y-2">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            onClick={() => onEventClick(event)}
                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          >
                            <div className="flex-shrink-0">
                              {getEventTypeIcon(event.type)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900 truncate">{event.title}</h5>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  event.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {event.priority}
                                </span>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
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
                                  <div className="flex items-center space-x-1">
                                    <MapPin size={12} />
                                    <span className="truncate">{event.location}</span>
                                  </div>
                                )}
                                
                                {event.attendees && event.attendees.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    <Users size={12} />
                                    <span>{event.attendees.length} attendees</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  {dayTasks.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center space-x-2">
                        <CheckCircle size={14} />
                        <span>Tasks</span>
                      </h4>
                      <div className="space-y-2">
                        {dayTasks.map((task) => (
                          <div
                            key={task.id}
                            className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-shrink-0">
                              {getTaskIcon(task.category)}
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-900 truncate">{task.title}</h5>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                    task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-green-100 text-green-800'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    task.status === 'completed' ? 'bg-green-100 text-green-800' :
                                    task.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }`}>
                                    {task.status}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Clock size={12} />
                                  <span>
                                    Due {new Date(task.dueDate).toLocaleTimeString('en-US', { 
                                      hour: 'numeric', 
                                      minute: '2-digit',
                                      hour12: true 
                                    })}
                                  </span>
                                </div>
                                
                                {task.estimatedHours && (
                                  <span>{task.estimatedHours}h estimated</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No events or tasks scheduled</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};