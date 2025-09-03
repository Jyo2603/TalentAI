import React from 'react';
import { MonthView } from './MonthView';
import { WeekView } from './WeekView';
import { DayView } from './DayView';
import { AgendaView } from './AgendaView';
import type { CalendarEvent, TaskItem, CalendarView } from '../../types/calendar';

interface CalendarGridProps {
  view: CalendarView;
  events: CalendarEvent[];
  tasks: TaskItem[];
  onEventClick: (event: CalendarEvent) => void;
  onCreateEvent: (date?: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  view,
  events,
  tasks,
  onEventClick,
  onCreateEvent
}) => {
  const commonProps = {
    events,
    tasks,
    onEventClick,
    onCreateEvent,
    currentDate: view.currentDate
  };

  switch (view.type) {
    case 'month':
      return <MonthView {...commonProps} />;
    case 'week':
      return <WeekView {...commonProps} />;
    case 'day':
      return <DayView {...commonProps} />;
    case 'agenda':
      return <AgendaView {...commonProps} />;
    default:
      return <MonthView {...commonProps} />;
  }
};