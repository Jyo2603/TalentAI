import type { 
  Project, 
  ProjectTemplate, 
  HireVsAssignAnalysis, 
  EmployeeMatch, 
  ResourcePlan,
  CapacityPlan,
  ProjectAnalytics,
  ProjectMilestone,
  ProjectDeliverable,
  ProjectStakeholder
} from '../types/project';

export const projectTemplates: ProjectTemplate[] = [
  {
    id: '1',
    name: 'Web Application Development',
    description: 'Full-stack web application with modern tech stack',
    type: 'web-app',
    estimatedDuration: 12,
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'AWS'],
    teamSize: { min: 3, max: 6 },
    milestones: [
      {
        title: 'Project Setup & Architecture',
        description: 'Initial setup, architecture design, and development environment',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'MVP Development',
        description: 'Core features and basic functionality',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'Testing & QA',
        description: 'Comprehensive testing and quality assurance',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'Production Deployment',
        description: 'Deploy to production and monitor',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      }
    ],
    deliverables: [
      {
        title: 'Technical Architecture Document',
        description: 'Detailed system architecture and design decisions',
        type: 'document',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Frontend Application',
        description: 'React-based user interface',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Backend API',
        description: 'RESTful API with authentication',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Production Deployment',
        description: 'Live application with monitoring',
        type: 'deployment',
        dueDate: new Date(),
        reviewers: []
      }
    ]
  },
  {
    id: '2',
    name: 'AI/ML Model Development',
    description: 'Machine learning model development and deployment',
    type: 'ai-ml',
    estimatedDuration: 16,
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science', 'MLOps'],
    teamSize: { min: 2, max: 4 },
    milestones: [
      {
        title: 'Data Collection & Preparation',
        description: 'Gather, clean, and prepare training data',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'Model Development',
        description: 'Train and validate ML models',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'Model Deployment',
        description: 'Deploy model to production environment',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      }
    ],
    deliverables: [
      {
        title: 'Data Pipeline',
        description: 'Automated data processing pipeline',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Trained Model',
        description: 'Production-ready ML model',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Model API',
        description: 'REST API for model inference',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      }
    ]
  },
  {
    id: '3',
    name: 'Mobile Application',
    description: 'Cross-platform mobile application development',
    type: 'mobile-app',
    estimatedDuration: 20,
    requiredSkills: ['React Native', 'TypeScript', 'Mobile UI/UX', 'API Integration'],
    teamSize: { min: 3, max: 5 },
    milestones: [
      {
        title: 'UI/UX Design',
        description: 'Complete mobile app design and user flows',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'Core Development',
        description: 'Implement core app functionality',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      },
      {
        title: 'App Store Deployment',
        description: 'Deploy to iOS and Android app stores',
        dueDate: new Date(),
        dependencies: [],
        assignedTo: []
      }
    ],
    deliverables: [
      {
        title: 'Mobile App Design',
        description: 'Complete UI/UX design files',
        type: 'design',
        dueDate: new Date(),
        reviewers: []
      },
      {
        title: 'Mobile Application',
        description: 'Cross-platform mobile app',
        type: 'code',
        dueDate: new Date(),
        reviewers: []
      }
    ]
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'AI-Powered Analytics Platform',
    description: 'Build a comprehensive analytics platform with AI insights for enterprise customers',
    type: 'ai-ml',
    status: 'planning',
    priority: 'high',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-05-15'),
    estimatedHours: 2400,
    actualHours: 0,
    budget: {
      allocated: 480000,
      spent: 0,
      currency: 'USD'
    },
    requiredSkills: ['React', 'Python', 'Machine Learning', 'PostgreSQL', 'AWS', 'TypeScript'],
    skillGaps: ['Machine Learning', 'Data Visualization'],
    minTeamSize: 4,
    maxTeamSize: 7,
    assignedEmployees: [],
    stakeholders: [
      {
        id: '1',
        name: 'Emily Johnson',
        email: 'emily.johnson@company.com',
        role: 'product-owner',
        department: 'Product',
        notificationPreferences: ['milestone-updates', 'status-changes']
      },
      {
        id: '2',
        name: 'Michael Rodriguez',
        email: 'michael.rodriguez@company.com',
        role: 'tech-lead',
        department: 'Engineering',
        notificationPreferences: ['technical-updates', 'resource-changes']
      }
    ],
    milestones: [
      {
        id: '1',
        title: 'Data Pipeline Setup',
        description: 'Establish data ingestion and processing pipeline',
        dueDate: new Date('2025-02-15'),
        status: 'pending',
        dependencies: [],
        assignedTo: []
      },
      {
        id: '2',
        title: 'ML Model Development',
        description: 'Train and validate analytics models',
        dueDate: new Date('2025-03-30'),
        status: 'pending',
        dependencies: ['1'],
        assignedTo: []
      },
      {
        id: '3',
        title: 'Frontend Dashboard',
        description: 'Build interactive analytics dashboard',
        dueDate: new Date('2025-04-30'),
        status: 'pending',
        dependencies: ['2'],
        assignedTo: []
      }
    ],
    deliverables: [
      {
        id: '1',
        title: 'Technical Architecture',
        description: 'System architecture and technology decisions',
        type: 'document',
        dueDate: new Date('2025-02-10'),
        status: 'not-started',
        assignedTo: '',
        reviewers: ['2']
      },
      {
        id: '2',
        title: 'Data Processing Pipeline',
        description: 'Automated data ingestion and transformation',
        type: 'code',
        dueDate: new Date('2025-03-01'),
        status: 'not-started',
        assignedTo: '',
        reviewers: ['2']
      }
    ],
    progressPercentage: 0,
    createdBy: '1',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-15'),
    approvalStatus: 'pending',
    riskLevel: 'medium',
    confidenceScore: 75,
    estimatedROI: 250000
  },
  {
    id: '2',
    name: 'Customer Portal Redesign',
    description: 'Complete redesign of customer-facing portal with modern UX',
    type: 'web-app',
    status: 'active',
    priority: 'medium',
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-03-30'),
    estimatedHours: 1200,
    actualHours: 240,
    budget: {
      allocated: 180000,
      spent: 36000,
      currency: 'USD'
    },
    requiredSkills: ['React', 'TypeScript', 'UI/UX Design', 'CSS', 'API Integration'],
    skillGaps: [],
    minTeamSize: 3,
    maxTeamSize: 5,
    assignedEmployees: [
      {
        employeeId: '1',
        employeeName: 'Jennifer Walsh',
        role: 'Frontend Lead',
        allocation: 100,
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-03-30'),
        hourlyRate: 75,
        skills: ['React', 'TypeScript', 'CSS'],
        isLead: true
      },
      {
        employeeId: '5',
        employeeName: 'Sarah Kim',
        role: 'UI/UX Designer',
        allocation: 80,
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-02-28'),
        hourlyRate: 65,
        skills: ['UI/UX Design', 'Figma', 'Prototyping'],
        isLead: false
      }
    ],
    stakeholders: [
      {
        id: '3',
        name: 'Robert Kim',
        email: 'robert.kim@company.com',
        role: 'sponsor',
        department: 'Customer Success',
        notificationPreferences: ['milestone-updates', 'budget-alerts']
      }
    ],
    milestones: [
      {
        id: '1',
        title: 'Design System Update',
        description: 'Update design system and component library',
        dueDate: new Date('2025-02-01'),
        status: 'completed',
        dependencies: [],
        assignedTo: ['5'],
        completedAt: new Date('2025-01-30')
      },
      {
        id: '2',
        title: 'Frontend Implementation',
        description: 'Implement new designs in React',
        dueDate: new Date('2025-03-01'),
        status: 'in-progress',
        dependencies: ['1'],
        assignedTo: ['1']
      }
    ],
    deliverables: [
      {
        id: '1',
        title: 'Updated Design System',
        description: 'Modernized component library and style guide',
        type: 'design',
        dueDate: new Date('2025-02-01'),
        status: 'completed',
        assignedTo: '5',
        reviewers: ['1']
      }
    ],
    progressPercentage: 35,
    createdBy: '1',
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-16'),
    approvalStatus: 'approved',
    approvedBy: '3',
    approvedAt: new Date('2025-01-08'),
    riskLevel: 'low',
    confidenceScore: 90,
    estimatedROI: 120000
  },
  {
    id: '3',
    name: 'Infrastructure Modernization',
    description: 'Migrate legacy systems to cloud-native architecture',
    type: 'infrastructure',
    status: 'planning',
    priority: 'critical',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-08-31'),
    estimatedHours: 4800,
    actualHours: 0,
    budget: {
      allocated: 720000,
      spent: 0,
      currency: 'USD'
    },
    requiredSkills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python', 'DevOps'],
    skillGaps: ['Kubernetes', 'Terraform'],
    minTeamSize: 5,
    maxTeamSize: 8,
    assignedEmployees: [],
    stakeholders: [
      {
        id: '4',
        name: 'Alex Thompson',
        email: 'alex.thompson@company.com',
        role: 'sponsor',
        department: 'Infrastructure',
        notificationPreferences: ['all-updates']
      }
    ],
    milestones: [
      {
        id: '1',
        title: 'Migration Strategy',
        description: 'Define migration approach and timeline',
        dueDate: new Date('2025-03-15'),
        status: 'pending',
        dependencies: [],
        assignedTo: []
      },
      {
        id: '2',
        title: 'Pilot Migration',
        description: 'Migrate first service as proof of concept',
        dueDate: new Date('2025-04-30'),
        status: 'pending',
        dependencies: ['1'],
        assignedTo: []
      }
    ],
    deliverables: [],
    progressPercentage: 0,
    createdBy: '1',
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-12'),
    approvalStatus: 'pending',
    riskLevel: 'high',
    confidenceScore: 60,
    estimatedROI: 500000
  }
];

export const generateHireVsAssignAnalysis = (project: Project): HireVsAssignAnalysis => {
  // Simulate AI analysis
  const hiringCost = project.requiredSkills.length * 25000; // Average hiring cost per skill
  const hiringTimeline = 45; // Average days to hire
  
  const assignmentCost = project.estimatedHours * 75; // Average hourly rate
  const assignmentTimeline = 7; // Days to assign internal resources
  
  return {
    projectId: project.id,
    analysis: {
      hire: {
        cost: hiringCost,
        timeline: hiringTimeline,
        riskLevel: 'medium',
        pros: [
          'Fresh perspective and new ideas',
          'Dedicated focus on project',
          'Latest industry knowledge',
          'Long-term team growth'
        ],
        cons: [
          'Longer time to productivity',
          'Higher upfront costs',
          'Cultural integration time',
          'Uncertain performance'
        ],
        confidence: 70
      },
      assign: {
        cost: assignmentCost,
        timeline: assignmentTimeline,
        riskLevel: 'low',
        pros: [
          'Immediate availability',
          'Known performance history',
          'Existing team dynamics',
          'Lower risk'
        ],
        cons: [
          'Potential skill gaps',
          'Competing priorities',
          'Limited fresh perspective',
          'Workload concerns'
        ],
        confidence: 85,
        availableEmployees: []
      }
    },
    recommendation: assignmentCost < hiringCost ? 'assign' : 'hire',
    reasoning: `Based on cost analysis and timeline requirements, ${assignmentCost < hiringCost ? 'internal assignment' : 'external hiring'} is recommended for optimal project success.`,
    generatedAt: new Date()
  };
};

export const mockCapacityPlan: CapacityPlan = {
  timeframe: {
    start: new Date('2025-01-01'),
    end: new Date('2025-06-30')
  },
  employees: [
    {
      employeeId: '1',
      employeeName: 'Jennifer Walsh',
      department: 'Engineering',
      skills: ['React', 'Node.js', 'TypeScript'],
      currentAllocation: 100,
      projectedAllocation: 80,
      availableHours: 160,
      assignments: [
        {
          projectId: '2',
          projectName: 'Customer Portal Redesign',
          allocation: 100,
          startDate: new Date('2025-01-15'),
          endDate: new Date('2025-03-30')
        }
      ]
    },
    {
      employeeId: '2',
      employeeName: 'Michael Chen',
      department: 'AI/ML',
      skills: ['Python', 'TensorFlow', 'Machine Learning'],
      currentAllocation: 0,
      projectedAllocation: 100,
      availableHours: 800,
      assignments: []
    }
  ],
  projects: [
    {
      projectId: '1',
      projectName: 'AI-Powered Analytics Platform',
      requiredHours: 2400,
      allocatedHours: 0,
      utilizationRate: 0,
      isOverAllocated: false
    },
    {
      projectId: '2',
      projectName: 'Customer Portal Redesign',
      requiredHours: 1200,
      allocatedHours: 960,
      utilizationRate: 80,
      isOverAllocated: false
    }
  ],
  utilization: {
    current: 65,
    projected: 85,
    optimal: 80
  },
  bottlenecks: [
    {
      type: 'skill',
      description: 'Machine Learning expertise shortage',
      impact: 'high',
      affectedProjects: ['1'],
      recommendations: [
        'Hire ML engineer',
        'Provide ML training to existing team',
        'Consider ML consulting services'
      ]
    }
  ],
  recommendations: [
    'Consider hiring 2 additional ML engineers for Q2',
    'Cross-train frontend developers in backend technologies',
    'Implement resource sharing between projects'
  ]
};

export const mockProjectAnalytics: ProjectAnalytics[] = [
  {
    projectId: '2',
    metrics: {
      onTimeDelivery: 85,
      budgetVariance: -5, // 5% under budget
      scopeCreep: 12,
      teamSatisfaction: 8.5,
      stakeholderSatisfaction: 9.0
    },
    trends: {
      velocityTrend: [75, 82, 88, 85, 90, 87, 92],
      burnRate: [15000, 18000, 16000, 20000, 17000, 19000, 16500],
      qualityMetrics: [85, 87, 90, 88, 92, 89, 94]
    },
    predictions: {
      completionDate: new Date('2025-03-25'),
      finalCost: 171000,
      successProbability: 92
    }
  }
];