export interface Project {
  id: string;
  name: string;
  description: string;
  type: 'web-app' | 'mobile-app' | 'data-pipeline' | 'ai-ml' | 'infrastructure' | 'custom';
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  
  // Timeline & Budget
  startDate: Date;
  endDate: Date;
  estimatedHours: number;
  actualHours?: number;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  
  // Requirements
  requiredSkills: string[];
  skillGaps: string[];
  minTeamSize: number;
  maxTeamSize: number;
  
  // Assignment
  assignedEmployees: ProjectAssignment[];
  stakeholders: ProjectStakeholder[];
  
  // Progress
  milestones: ProjectMilestone[];
  deliverables: ProjectDeliverable[];
  progressPercentage: number;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  
  // Analytics
  riskLevel: 'low' | 'medium' | 'high';
  confidenceScore: number; // 0-100
  estimatedROI: number;
}

export interface ProjectAssignment {
  employeeId: string;
  employeeName: string;
  role: string;
  allocation: number; // percentage 0-100
  startDate: Date;
  endDate: Date;
  hourlyRate?: number;
  skills: string[];
  isLead: boolean;
}

export interface ProjectStakeholder {
  id: string;
  name: string;
  email: string;
  role: 'sponsor' | 'product-owner' | 'tech-lead' | 'observer';
  department: string;
  notificationPreferences: string[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  dependencies: string[];
  assignedTo: string[];
  completedAt?: Date;
}

export interface ProjectDeliverable {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'code' | 'design' | 'deployment' | 'other';
  dueDate: Date;
  status: 'not-started' | 'in-progress' | 'review' | 'completed';
  assignedTo: string;
  reviewers: string[];
  fileUrl?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  type: Project['type'];
  estimatedDuration: number; // weeks
  requiredSkills: string[];
  teamSize: { min: number; max: number };
  milestones: Omit<ProjectMilestone, 'id' | 'status' | 'completedAt'>[];
  deliverables: Omit<ProjectDeliverable, 'id' | 'status' | 'assignedTo' | 'reviewers'>[];
}

export interface HireVsAssignAnalysis {
  projectId: string;
  analysis: {
    hire: {
      cost: number;
      timeline: number; // days
      riskLevel: 'low' | 'medium' | 'high';
      pros: string[];
      cons: string[];
      confidence: number; // 0-100
    };
    assign: {
      cost: number;
      timeline: number; // days
      riskLevel: 'low' | 'medium' | 'high';
      pros: string[];
      cons: string[];
      confidence: number; // 0-100
      availableEmployees: EmployeeMatch[];
    };
  };
  recommendation: 'hire' | 'assign' | 'hybrid';
  reasoning: string;
  generatedAt: Date;
}

export interface EmployeeMatch {
  employeeId: string;
  employeeName: string;
  skillMatch: number; // 0-100
  availabilityScore: number; // 0-100
  performanceScore: number; // 0-100
  overallScore: number; // 0-100
  matchingSkills: string[];
  missingSkills: string[];
  pastProjectSuccess: number; // 0-100
  currentWorkload: 'light' | 'medium' | 'heavy';
  availableDate?: Date;
}

export interface ResourcePlan {
  projectId: string;
  phases: ProjectPhase[];
  totalCost: number;
  totalDuration: number;
  riskFactors: string[];
  recommendations: string[];
}

export interface ProjectPhase {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  requiredSkills: string[];
  estimatedHours: number;
  dependencies: string[];
  assignedEmployees: string[];
}

export interface CapacityPlan {
  timeframe: {
    start: Date;
    end: Date;
  };
  employees: EmployeeCapacity[];
  projects: ProjectCapacity[];
  utilization: {
    current: number;
    projected: number;
    optimal: number;
  };
  bottlenecks: CapacityBottleneck[];
  recommendations: string[];
}

export interface EmployeeCapacity {
  employeeId: string;
  employeeName: string;
  department: string;
  skills: string[];
  currentAllocation: number; // 0-100
  projectedAllocation: number; // 0-100
  availableHours: number;
  assignments: {
    projectId: string;
    projectName: string;
    allocation: number;
    startDate: Date;
    endDate: Date;
  }[];
}

export interface ProjectCapacity {
  projectId: string;
  projectName: string;
  requiredHours: number;
  allocatedHours: number;
  utilizationRate: number;
  isOverAllocated: boolean;
}

export interface CapacityBottleneck {
  type: 'skill' | 'employee' | 'timeline';
  description: string;
  impact: 'low' | 'medium' | 'high';
  affectedProjects: string[];
  recommendations: string[];
}

export interface ProjectAnalytics {
  projectId: string;
  metrics: {
    onTimeDelivery: number; // percentage
    budgetVariance: number; // percentage
    scopeCreep: number; // percentage
    teamSatisfaction: number; // 1-10
    stakeholderSatisfaction: number; // 1-10
  };
  trends: {
    velocityTrend: number[]; // weekly velocity
    burnRate: number[]; // weekly burn rate
    qualityMetrics: number[]; // weekly quality scores
  };
  predictions: {
    completionDate: Date;
    finalCost: number;
    successProbability: number; // 0-100
  };
}