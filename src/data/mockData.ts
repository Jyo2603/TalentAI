import type { Job, Candidate, Employee, Project, Task, User, DashboardMetrics } from '../types';

// Job persistence functions
export const saveJobsToStorage = (jobs: Job[]) => {
  localStorage.setItem('jobs', JSON.stringify(jobs));
};

export const loadJobsFromStorage = (): Job[] => {
  const saved = localStorage.getItem('jobs');
  if (saved) {
    try {
      const parsedJobs = JSON.parse(saved);
      // Convert date strings back to Date objects
      return parsedJobs.map((job: any) => ({
        ...job,
        createdAt: new Date(job.createdAt)
      }));
    } catch (error) {
      console.error('Error loading jobs from storage:', error);
    }
  }
  return mockJobs;
};

export const currentUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@company.com',
  role: 'recruiter',
  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg'
};

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced Frontend Developer to join our team...',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'full-time',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
    salary: { min: 120000, max: 150000, currency: 'USD' },
    status: 'active',
    createdAt: new Date('2025-01-10'),
    applicantCount: 23
  },
  {
    id: '2',
    title: 'AI/ML Engineer',
    description: 'Join our AI team to build cutting-edge machine learning models...',
    department: 'AI/ML',
    location: 'Remote',
    type: 'full-time',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AWS'],
    salary: { min: 140000, max: 180000, currency: 'USD' },
    status: 'active',
    createdAt: new Date('2025-01-08'),
    applicantCount: 31
  },
  {
    id: '3',
    title: 'Product Manager',
    description: 'Lead product strategy and execution for our core platform...',
    department: 'Product',
    location: 'New York, NY',
    type: 'full-time',
    skills: ['Product Strategy', 'Agile', 'Analytics', 'UX Design'],
    salary: { min: 130000, max: 160000, currency: 'USD' },
    status: 'active',
    createdAt: new Date('2025-01-05'),
    applicantCount: 18
  }
];

export const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1-555-0123',
    jobId: '1',
    applicationDate: new Date('2025-01-12'),
    status: 'shortlisted',
    testScore: 87,
    atsScore: 92,
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    experience: 5
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@email.com',
    phone: '+1-555-0124',
    jobId: '2',
    applicationDate: new Date('2025-01-11'),
    status: 'interview',
    testScore: 94,
    atsScore: 88,
    skills: ['Python', 'TensorFlow', 'Machine Learning', 'AWS'],
    experience: 6
  },
  {
    id: '3',
    name: 'David Kim',
    email: 'david.kim@email.com',
    phone: '+1-555-0125',
    jobId: '1',
    applicationDate: new Date('2025-01-13'),
    status: 'applied',
    testScore: 76,
    atsScore: 85,
    skills: ['React', 'Vue.js', 'JavaScript', 'HTML'],
    experience: 3
  }
];

export const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Jennifer Walsh',
    email: 'jennifer.walsh@company.com',
    department: 'Engineering',
    skills: ['React', 'Node.js', 'TypeScript', 'GraphQL'],
    certifications: ['AWS Certified Developer', 'React Professional'],
    availability: 'available',
    currentWorkload: 'light',
    pastProjects: ['E-commerce Platform', 'Mobile App API', 'Dashboard Redesign'],
    joinDate: new Date('2022-03-15'),
    experience: 4,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    department: 'AI/ML',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
    certifications: ['TensorFlow Developer', 'AWS ML Specialty'],
    availability: 'available',
    currentWorkload: 'medium',
    pastProjects: ['Image Recognition System', 'Chatbot AI', 'Recommendation Engine'],
    joinDate: new Date('2021-09-20'),
    experience: 6,
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg'
  },
  {
    id: '3',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@company.com',
    department: 'Product',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Analytics'],
    certifications: ['Certified Product Manager', 'Scrum Master'],
    availability: 'assigned',
    currentWorkload: 'heavy',
    currentProject: 'Mobile App Redesign',
    availableDate: new Date('2025-09-15'),
    pastProjects: ['B2B Platform', 'Customer Portal', 'Analytics Dashboard'],
    joinDate: new Date('2020-11-10'),
    experience: 8,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  },
  {
    id: '4',
    name: 'Robert Garcia',
    email: 'robert.garcia@company.com',
    department: 'Engineering',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    certifications: ['AWS Solutions Architect'],
    availability: 'assigned',
    currentWorkload: 'medium',
    currentProject: 'API Modernization',
    availableDate: new Date('2025-09-10'),
    pastProjects: ['Payment Gateway', 'User Authentication System'],
    joinDate: new Date('2023-01-08'),
    experience: 3,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '5',
    name: 'Sarah Kim',
    email: 'sarah.kim@company.com',
    department: 'Design',
    skills: ['UI/UX Design', 'Figma', 'Prototyping', 'User Research'],
    certifications: ['Google UX Design Certificate'],
    availability: 'assigned',
    currentWorkload: 'medium',
    currentProject: 'Dashboard Redesign',
    availableDate: new Date('2025-09-12'),
    pastProjects: ['Mobile App UI', 'Brand Guidelines', 'Design System'],
    joinDate: new Date('2022-08-12'),
    experience: 3,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  },
  {
    id: '6',
    name: 'David Park',
    email: 'david.park@company.com',
    department: 'Engineering',
    skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
    certifications: ['Oracle Java Certified', 'Kubernetes Administrator'],
    availability: 'assigned',
    currentWorkload: 'heavy',
    currentProject: 'Legacy System Migration',
    availableDate: new Date('2025-09-25'),
    pastProjects: ['API Gateway', 'Authentication Service', 'Data Pipeline'],
    joinDate: new Date('2021-05-20'),
    experience: 7,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI-Powered Analytics Platform',
    description: 'Build a comprehensive analytics platform with AI insights',
    requiredSkills: ['React', 'Python', 'Machine Learning', 'PostgreSQL'],
    priority: 'high',
    deadline: new Date('2025-03-15'),
    status: 'planning',
    assignedEmployees: [],
    createdBy: '1',
    createdAt: new Date('2025-01-10')
  },
  {
    id: '2',
    name: 'Mobile App Backend',
    description: 'Develop scalable backend infrastructure for mobile application',
    requiredSkills: ['Node.js', 'Express', 'MongoDB', 'API Development'],
    priority: 'medium',
    deadline: new Date('2025-02-28'),
    status: 'planning',
    assignedEmployees: [],
    createdBy: '1',
    createdAt: new Date('2025-01-12')
  }
];

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review Alex Johnson Application',
    description: 'Complete review of frontend developer candidate',
    type: 'review',
    priority: 'high',
    status: 'pending',
    assignedTo: '1',
    dueDate: new Date('2025-01-15'),
    relatedId: '1',
    createdAt: new Date('2025-01-14')
  },
  {
    id: '2',
    title: 'Schedule interview with Maria Rodriguez',
    description: 'Coordinate AI/ML engineer interview slots',
    type: 'hiring',
    priority: 'medium',
    status: 'pending',
    assignedTo: '1',
    dueDate: new Date('2025-01-16'),
    relatedId: '2',
    createdAt: new Date('2025-01-13')
  },
  {
    id: '3',
    title: 'Assign backend developer to Project Alpha',
    description: 'Find suitable backend developer for new project',
    type: 'staffing',
    priority: 'high',
    status: 'in-progress',
    assignedTo: '1',
    dueDate: new Date('2025-01-17'),
    relatedId: '1',
    createdAt: new Date('2025-01-11')
  }
];

export const mockMetrics: DashboardMetrics = {
  openJobs: 12,
  externalApplicants: 84,
  benchEmployees: 7,
  tasksToday: 5,
  avgAtsScore: 78,
  timeToHire: 18
};