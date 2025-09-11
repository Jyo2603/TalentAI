import type { CalendarEvent, TaskItem, TaskTemplate, WorkloadData } from '../types/calendar';

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Interview: Alex Johnson - Frontend Developer',
    description: 'Technical interview for Senior Frontend Developer position',
    type: 'interview',
    startTime: new Date('2025-01-16T14:00:00'),
    endTime: new Date('2025-01-16T15:00:00'),
    location: 'Conference Room A / Zoom',
    attendees: ['sarah.chen@company.com', 'alex.johnson@email.com', 'tech.lead@company.com'],
    priority: 'high',
    status: 'confirmed',
    relatedId: '1', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-01-15T10:00:00'),
    reminders: [15, 60], // 15 min and 1 hour before
    timeZone: 'PST'
  },
  {
    id: '2',
    title: 'Interview: Maria Rodriguez - AI/ML Engineer',
    description: 'Final round interview with engineering team',
    type: 'interview',
    startTime: new Date('2025-01-17T10:00:00'),
    endTime: new Date('2025-01-17T11:30:00'),
    location: 'Conference Room B',
    attendees: ['sarah.chen@company.com', 'maria.rodriguez@email.com', 'ai.lead@company.com'],
    priority: 'high',
    status: 'scheduled',
    relatedId: '2',
    createdBy: '1',
    createdAt: new Date('2025-01-15T11:00:00'),
    reminders: [30, 120],
    timeZone: 'PST'
  },
  {
    id: '3',
    title: 'Team Standup - Engineering',
    description: 'Daily engineering team standup meeting',
    type: 'meeting',
    startTime: new Date('2025-01-16T09:00:00'),
    endTime: new Date('2025-01-16T09:30:00'),
    location: 'Engineering Floor',
    attendees: ['engineering.team@company.com'],
    isRecurring: true,
    recurringPattern: 'daily',
    priority: 'medium',
    status: 'confirmed',
    createdBy: '1',
    createdAt: new Date('2025-01-01T00:00:00'),
    reminders: [5],
    timeZone: 'PST'
  },
  {
    id: '4',
    title: 'Project Alpha Deadline',
    description: 'AI-Powered Analytics Platform project deadline',
    type: 'deadline',
    startTime: new Date('2025-03-15T17:00:00'),
    endTime: new Date('2025-03-15T17:00:00'),
    priority: 'high',
    status: 'scheduled',
    relatedId: '1', // project ID
    createdBy: '1',
    createdAt: new Date('2025-01-10T00:00:00'),
    isAllDay: true,
    reminders: [1440, 10080], // 1 day and 1 week before
    timeZone: 'PST'
  },
  {
    id: '5',
    title: 'Quarterly Review - Q1 2025',
    description: 'Review hiring metrics and team performance',
    type: 'review',
    startTime: new Date('2025-01-20T15:00:00'),
    endTime: new Date('2025-01-20T16:30:00'),
    location: 'Executive Conference Room',
    attendees: ['leadership.team@company.com'],
    priority: 'high',
    status: 'scheduled',
    createdBy: '1',
    createdAt: new Date('2025-01-10T00:00:00'),
    reminders: [60, 1440],
    timeZone: 'PST'
  },
  {
    id: '6',
    title: 'Product Team Weekly Sync',
    description: 'Weekly product team synchronization meeting',
    type: 'meeting',
    startTime: new Date('2025-01-17T14:00:00'),
    endTime: new Date('2025-01-17T15:00:00'),
    location: 'Product Conference Room',
    attendees: ['product.team@company.com'],
    isRecurring: true,
    recurringPattern: 'weekly',
    priority: 'medium',
    status: 'confirmed',
    createdBy: '1',
    createdAt: new Date('2025-01-01T00:00:00'),
    reminders: [15],
    timeZone: 'PST'
  },
  {
    id: '7',
    title: 'Interview: David Kim - Frontend Developer',
    description: 'Technical interview for Senior Frontend Developer position',
    type: 'interview',
    startTime: new Date('2025-01-17T11:00:00'),
    endTime: new Date('2025-01-17T12:00:00'),
    location: 'Conference Room C / Zoom',
    attendees: ['sarah.chen@company.com', 'david.kim@email.com', 'jennifer.walsh@company.com'],
    priority: 'high',
    status: 'scheduled',
    relatedId: '3', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-01-15T12:00:00'),
    reminders: [15, 60],
    timeZone: 'PST'
  },
  {
    id: '8',
    title: 'Interview: Sarah Wilson - Product Manager',
    description: 'Final round interview for Product Manager position',
    type: 'interview',
    startTime: new Date('2025-01-18T14:30:00'),
    endTime: new Date('2025-01-18T15:30:00'),
    location: 'Conference Room A',
    attendees: ['sarah.chen@company.com', 'sarah.wilson@email.com', 'emily.johnson@company.com'],
    priority: 'medium',
    status: 'confirmed',
    relatedId: '4', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-01-15T13:30:00'),
    reminders: [30, 120],
    timeZone: 'PST'
  },
  {
    id: '9',
    title: 'Interview: Emily Chen - Senior Frontend Developer',
    description: 'Technical interview for Senior Frontend Developer position',
    type: 'interview',
    startTime: new Date('2025-09-04T10:00:00'),
    endTime: new Date('2025-09-04T11:00:00'),
    location: 'Conference Room A / Zoom',
    attendees: ['sarah.chen@company.com', 'emily.chen@email.com', 'jennifer.walsh@company.com'],
    priority: 'high',
    status: 'scheduled',
    relatedId: '5', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-09-02T14:00:00'),
    reminders: [15, 60],
    timeZone: 'PST'
  },
  {
    id: '10',
    title: 'Interview: James Wilson - Product Manager',
    description: 'Final round interview for Product Manager position',
    type: 'interview',
    startTime: new Date('2025-09-04T14:30:00'),
    endTime: new Date('2025-09-04T15:30:00'),
    location: 'Conference Room B',
    attendees: ['sarah.chen@company.com', 'james.wilson@email.com', 'emily.johnson@company.com'],
    priority: 'high',
    status: 'confirmed',
    relatedId: '6', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-09-02T15:00:00'),
    reminders: [30, 120],
    timeZone: 'PST'
  },
  {
    id: '11',
    title: 'Interview: Anna Martinez - Data Scientist',
    description: 'Technical interview for Data Scientist position',
    type: 'interview',
    startTime: new Date('2025-09-05T09:30:00'),
    endTime: new Date('2025-09-05T10:30:00'),
    location: 'Conference Room C / Zoom',
    attendees: ['sarah.chen@company.com', 'anna.martinez@email.com', 'michael.chen@company.com'],
    priority: 'high',
    status: 'scheduled',
    relatedId: '7', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-09-02T16:00:00'),
    reminders: [15, 60],
    timeZone: 'PST'
  },
  {
    id: '12',
    title: 'Interview: Robert Kim - DevOps Engineer',
    description: 'Technical interview for Senior DevOps Engineer position',
    type: 'interview',
    startTime: new Date('2025-09-05T15:00:00'),
    endTime: new Date('2025-09-05T16:00:00'),
    location: 'Conference Room A',
    attendees: ['sarah.chen@company.com', 'robert.kim@email.com', 'alex.thompson@company.com'],
    priority: 'medium',
    status: 'scheduled',
    relatedId: '8', // candidate ID
    createdBy: '1',
    createdAt: new Date('2025-09-02T17:00:00'),
    reminders: [15, 60],
    timeZone: 'PST'
  },
];

export const mockTasks: TaskItem[] = [
  {
    id: '1',
    title: 'Review Alex Johnson Application',
    description: 'Complete technical assessment review and provide feedback',
    category: 'hiring',
    priority: 'high',
    status: 'in-progress',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-16T17:00:00'),
    estimatedHours: 2,
    actualHours: 1.5,
    relatedId: '1', // candidate ID
    tags: ['frontend', 'react', 'urgent'],
    createdAt: new Date('2025-01-15T09:00:00'),
    updatedAt: new Date('2025-01-15T14:30:00'),
    comments: [
      {
        id: '1',
        taskId: '1',
        author: 'Sarah Chen',
        content: 'Started reviewing the technical assessment. Strong React skills demonstrated.',
        createdAt: new Date('2025-01-15T14:30:00')
      }
    ]
  },
  {
    id: '2',
    title: 'Prepare Interview Questions - AI/ML Role',
    description: 'Create technical questions for Maria Rodriguez interview',
    category: 'hiring',
    priority: 'high',
    status: 'pending',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-17T09:00:00'),
    estimatedHours: 1,
    relatedId: '2',
    tags: ['ai-ml', 'interview-prep'],
    createdAt: new Date('2025-01-15T11:00:00'),
    updatedAt: new Date('2025-01-15T11:00:00')
  },
  {
    id: '3',
    title: 'Assign Backend Developer to Project Alpha',
    description: 'Find and assign suitable backend developer for AI Analytics project',
    category: 'project',
    priority: 'high',
    status: 'in-progress',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-18T12:00:00'),
    estimatedHours: 3,
    actualHours: 2,
    relatedId: '1', // project ID
    tags: ['staffing', 'backend', 'ai-project'],
    createdAt: new Date('2025-01-14T10:00:00'),
    updatedAt: new Date('2025-01-15T16:00:00'),
    subtasks: [
      {
        id: '3a',
        title: 'Review internal backend developers',
        description: 'Check availability and skills match',
        category: 'project',
        priority: 'medium',
        status: 'completed',
        assignedTo: '1',
        assignedBy: '1',
        dueDate: new Date('2025-01-16T12:00:00'),
        estimatedHours: 1,
        actualHours: 0.5,
        parentTaskId: '3',
        createdAt: new Date('2025-01-14T10:00:00'),
        updatedAt: new Date('2025-01-15T11:00:00'),
        completedAt: new Date('2025-01-15T11:00:00')
      },
      {
        id: '3b',
        title: 'Compare with external candidates',
        description: 'Evaluate cost and timeline for external hiring',
        category: 'project',
        priority: 'medium',
        status: 'in-progress',
        assignedTo: '1',
        assignedBy: '1',
        dueDate: new Date('2025-01-17T12:00:00'),
        estimatedHours: 1.5,
        actualHours: 1,
        parentTaskId: '3',
        createdAt: new Date('2025-01-14T10:00:00'),
        updatedAt: new Date('2025-01-15T16:00:00')
      }
    ],
    comments: [
      {
        id: '2',
        taskId: '3',
        author: 'Sarah Chen',
        content: 'Identified 3 potential internal candidates. Need to check their current project commitments.',
        createdAt: new Date('2025-01-15T16:00:00')
      }
    ]
  },
  {
    id: '4',
    title: 'Update Job Posting - Product Manager',
    description: 'Revise job description based on stakeholder feedback',
    category: 'administrative',
    priority: 'medium',
    status: 'pending',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-16T16:00:00'),
    estimatedHours: 1,
    relatedId: '3', // job ID
    tags: ['job-posting', 'product'],
    createdAt: new Date('2025-01-15T08:00:00'),
    updatedAt: new Date('2025-01-15T08:00:00')
  },
  {
    id: '5',
    title: 'Conduct Reference Checks',
    description: 'Contact references for shortlisted candidates',
    category: 'hiring',
    priority: 'medium',
    status: 'pending',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-19T17:00:00'),
    estimatedHours: 4,
    tags: ['reference-check', 'verification'],
    createdAt: new Date('2025-01-15T12:00:00'),
    updatedAt: new Date('2025-01-15T12:00:00')
  },
  {
    id: '6',
    title: 'Quarterly Hiring Report',
    description: 'Compile Q1 hiring metrics and performance analysis',
    category: 'review',
    priority: 'low',
    status: 'pending',
    assignedTo: '1',
    assignedBy: '1',
    dueDate: new Date('2025-01-25T17:00:00'),
    estimatedHours: 6,
    tags: ['reporting', 'analytics', 'quarterly'],
    createdAt: new Date('2025-01-12T00:00:00'),
    updatedAt: new Date('2025-01-12T00:00:00')
  }
];

export const mockTaskTemplates: TaskTemplate[] = [
  {
    id: '1',
    name: 'New Candidate Review Process',
    description: 'Standard process for reviewing new candidate applications',
    category: 'hiring',
    estimatedHours: 3,
    subtasks: [
      {
        title: 'Review Resume & Portfolio',
        description: 'Assess candidate qualifications and experience',
        category: 'hiring',
        priority: 'high',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Check ATS Score',
        description: 'Review automated screening results',
        category: 'hiring',
        priority: 'medium',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 0.5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Schedule Initial Screening',
        description: 'Coordinate phone/video screening call',
        category: 'hiring',
        priority: 'high',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 1.5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  },
  {
    id: '2',
    name: 'Project Staffing Analysis',
    description: 'Analyze staffing needs for new project',
    category: 'project',
    estimatedHours: 4,
    subtasks: [
      {
        title: 'Define Required Skills',
        description: 'List all technical and soft skills needed',
        category: 'project',
        priority: 'high',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Review Internal Talent Pool',
        description: 'Check availability of internal employees',
        category: 'project',
        priority: 'high',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Compare Hiring vs Assignment Costs',
        description: 'Analyze cost-benefit of hiring vs internal assignment',
        category: 'project',
        priority: 'medium',
        status: 'pending',
        assignedTo: '',
        assignedBy: '',
        dueDate: new Date(),
        estimatedHours: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
  }
];

export const mockWorkloadData: WorkloadData[] = [
  {
    userId: '1',
    userName: 'Sarah Chen',
    totalTasks: 8,
    completedTasks: 3,
    overdueTasks: 1,
    estimatedHours: 24,
    actualHours: 18,
    availability: 'high'
  },
  {
    userId: '2',
    userName: 'Michael Chen',
    totalTasks: 12,
    completedTasks: 7,
    overdueTasks: 2,
    estimatedHours: 35,
    actualHours: 32,
    availability: 'overloaded'
  },
  {
    userId: '3',
    userName: 'Lisa Thompson',
    totalTasks: 6,
    completedTasks: 4,
    overdueTasks: 0,
    estimatedHours: 18,
    actualHours: 16,
    availability: 'medium'
  }
];

// Helper function to generate time slots for scheduling
export const generateTimeSlots = (date: Date, startHour: number = 9, endHour: number = 17): Date[] => {
  const slots: Date[] = [];
  const baseDate = new Date(date);
  baseDate.setHours(startHour, 0, 0, 0);
  
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slot = new Date(baseDate);
      slot.setHours(hour, minute, 0, 0);
      slots.push(slot);
    }
  }
  
  return slots;
};

// Helper function to check for scheduling conflicts
export const hasConflict = (newEvent: Partial<CalendarEvent>, existingEvents: CalendarEvent[]): boolean => {
  if (!newEvent.startTime || !newEvent.endTime) return false;
  
  return existingEvents.some(event => {
    const newStart = new Date(newEvent.startTime!);
    const newEnd = new Date(newEvent.endTime!);
    const existingStart = new Date(event.startTime);
    const existingEnd = new Date(event.endTime);
    
    return (newStart < existingEnd && newEnd > existingStart);
  });
};