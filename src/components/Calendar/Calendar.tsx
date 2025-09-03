import React, { useState } from 'react';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { TaskPanel } from './TaskPanel';
import { EventModal } from './EventModal';
import { TaskModal } from './TaskModal';
import { mockCalendarEvents, mockTasks as mockCalendarTasks } from '../../data/calendarData';
import type { CalendarEvent, TaskItem, CalendarView } from '../../types/calendar';

export const Calendar: React.FC = () => {
  const [view, setView] = useState<CalendarView>({
    type: 'month',
    currentDate: new Date()
  });
  const [events, setEvents] = useState<CalendarEvent[]>(mockCalendarEvents);
  const [tasks, setTasks] = useState<TaskItem[]>(mockCalendarTasks);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleDateChange = (date: Date) => {
    setView(prev => ({ ...prev, currentDate: date }));
  };

  const handleViewChange = (viewType: CalendarView['type']) => {
    setView(prev => ({ ...prev, type: viewType }));
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
    setIsCreatingEvent(false);
  };

  const handleTaskClick = (task: TaskItem) => {
    setSelectedTask(task);
    setShowTaskModal(true);
    setIsCreatingTask(false);
  };

  const handleCreateEvent = (date?: Date) => {
    const newEvent: Partial<CalendarEvent> = {
      startTime: date || new Date(),
      endTime: date ? new Date(date.getTime() + 60 * 60 * 1000) : new Date(Date.now() + 60 * 60 * 1000),
      type: 'meeting',
      priority: 'medium',
      status: 'scheduled'
    };
    setSelectedEvent(newEvent as CalendarEvent);
    setIsCreatingEvent(true);
    setShowEventModal(true);
  };

  const handleCreateTask = () => {
    const newTask: Partial<TaskItem> = {
      dueDate: new Date(),
      category: 'administrative',
      priority: 'medium',
      status: 'pending'
    };
    setSelectedTask(newTask as TaskItem);
    setIsCreatingTask(true);
    setShowTaskModal(true);
  };

  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (isCreatingEvent) {
      const newEvent: CalendarEvent = {
        id: Date.now().toString(),
        title: eventData.title || 'New Event',
        description: eventData.description,
        type: eventData.type || 'meeting',
        startTime: eventData.startTime || new Date(),
        endTime: eventData.endTime || new Date(),
        location: eventData.location,
        attendees: eventData.attendees || [],
        priority: eventData.priority || 'medium',
        status: eventData.status || 'scheduled',
        relatedId: eventData.relatedId,
        createdBy: '1',
        createdAt: new Date(),
        reminders: eventData.reminders || [15],
        timeZone: 'PST'
      };
      setEvents(prev => [...prev, newEvent]);
    } else if (selectedEvent) {
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData, updatedAt: new Date() }
          : event
      ));
    }
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleSaveTask = (taskData: Partial<TaskItem>) => {
    if (isCreatingTask) {
      const newTask: TaskItem = {
        id: Date.now().toString(),
        title: taskData.title || 'New Task',
        description: taskData.description,
        category: taskData.category || 'administrative',
        priority: taskData.priority || 'medium',
        status: taskData.status || 'pending',
        assignedTo: taskData.assignedTo || '1',
        assignedBy: '1',
        dueDate: taskData.dueDate || new Date(),
        estimatedHours: taskData.estimatedHours,
        relatedId: taskData.relatedId,
        tags: taskData.tags || [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTasks(prev => [...prev, newTask]);
    } else if (selectedTask) {
      setTasks(prev => prev.map(task => 
        task.id === selectedTask.id 
          ? { ...task, ...taskData, updatedAt: new Date() }
          : task
      ));
    }
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventModal(false);
    setSelectedEvent(null);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setShowTaskModal(false);
    setSelectedTask(null);
  };

  const handleTaskStatusChange = (taskId: string, newStatus: TaskItem['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: newStatus, 
            updatedAt: new Date(),
            completedAt: newStatus === 'completed' ? new Date() : undefined
          }
        : task
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Calendar & Tasks</h1>
        <p className="text-sm text-gray-600 mt-1">Schedules and assignments</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
        {/* Calendar Section - Takes 3 columns */}
        <div className="xl:col-span-3 bg-white rounded-lg border border-gray-200 flex flex-col">
          <CalendarHeader
            view={view}
            events={events}
            tasks={tasks}
            onDateChange={handleDateChange}
            onViewChange={handleViewChange}
            onCreateEvent={handleCreateEvent}
          />
          
          <div className="flex-1 overflow-hidden">
            <CalendarGrid
              view={view}
              events={events}
              tasks={tasks}
              onEventClick={handleEventClick}
              onCreateEvent={handleCreateEvent}
            />
          </div>
        </div>

        {/* Task Panel - Takes 1 column */}
        <div className="xl:col-span-1">
          <TaskPanel
            tasks={tasks}
            onTaskClick={handleTaskClick}
            onCreateTask={handleCreateTask}
            onTaskStatusChange={handleTaskStatusChange}
          />
        </div>
      </div>

      {/* Modals */}
      {showEventModal && (
        <EventModal
          event={selectedEvent}
          isCreating={isCreatingEvent}
          onSave={handleSaveEvent}
          onDelete={handleDeleteEvent}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          existingEvents={events}
        />
      )}

      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          isCreating={isCreatingTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          onClose={() => {
            setShowTaskModal(false);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};