export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: 'interview' | 'meeting' | 'deadline' | 'review' | 'project' | 'personal';
  startTime: Date;
  endTime: Date;
  location?: string;
  attendees?: string[];
  isRecurring?: boolean;
  recurringPattern?: 'daily' | 'weekly' | 'monthly';
  priority: 'low' | 'medium' | 'high';
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  relatedId?: string; // candidateId, projectId, etc.
  createdBy: string;
  createdAt: Date;
  reminders?: number[]; // minutes before event
  isAllDay?: boolean;
  timeZone?: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string;
  category: 'hiring' | 'project' | 'review' | 'administrative' | 'follow-up';
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTo: string;
  assignedBy: string;
  dueDate: Date;
  estimatedHours?: number;
  actualHours?: number;
  relatedId?: string;
  parentTaskId?: string; // for subtasks
  subtasks?: TaskItem[];
  tags?: string[];
  attachments?: string[];
  comments?: TaskComment[];
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface TaskComment {
  id: string;
  taskId: string;
  author: string;
  content: string;
  createdAt: Date;
}

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  category: TaskItem['category'];
  estimatedHours: number;
  subtasks: Omit<TaskItem, 'id' | 'assignedTo' | 'assignedBy' | 'createdAt' | 'updatedAt'>[];
}

export interface CalendarView {
  type: 'month' | 'week' | 'day' | 'agenda';
  currentDate: Date;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  isAvailable: boolean;
  userId?: string;
}

export interface WorkloadData {
  userId: string;
  userName: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  estimatedHours: number;
  actualHours: number;
  availability: 'low' | 'medium' | 'high' | 'overloaded';
}