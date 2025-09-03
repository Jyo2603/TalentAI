import React, { useState } from 'react';
import { Search, Filter, Star, Users, Clock, Award, Eye, Play, Copy, Edit, Trash2, CheckCircle, X } from 'lucide-react';
import type { Assessment } from '../../types/assessment';

interface AssessmentLibraryProps {
  assessments: Assessment[];
  onSaveAssessment: (assessmentData: Partial<Assessment>) => void;
}

// Pre-built assessment templates
const prebuiltTemplates: Assessment[] = [
  {
    id: 'template-1',
    title: 'Frontend Developer Assessment',
    description: 'Comprehensive evaluation for React/JavaScript developers',
    type: 'template',
    role: 'Frontend Developer',
    department: 'Engineering',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        title: 'React Hooks',
        description: 'Test understanding of React hooks',
        content: 'Which hook is used to manage component state in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 'useState',
        points: 5,
        difficulty: 'easy',
        skills: ['React'],
        category: 'technical'
      }
    ],
    timeLimit: 45,
    passingScore: 70,
    difficulty: 'intermediate',
    estimatedDuration: 45,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 127,
    averageScore: 78,
    completionRate: 85
  },
  {
    id: 'template-2',
    title: 'Backend Developer Assessment',
    description: 'Server-side development and API design evaluation',
    type: 'template',
    role: 'Backend Developer',
    department: 'Engineering',
    skills: ['Node.js', 'Python', 'SQL', 'API Design', 'System Design'],
    questions: [
      {
        id: 'q2',
        type: 'multiple-choice',
        title: 'Database Optimization',
        description: 'Understanding of database performance',
        content: 'Which technique is most effective for improving query performance?',
        options: ['Indexing', 'Normalization', 'Denormalization', 'Caching'],
        correctAnswer: 'Indexing',
        points: 8,
        difficulty: 'medium',
        skills: ['SQL'],
        category: 'technical'
      }
    ],
    timeLimit: 60,
    passingScore: 75,
    difficulty: 'intermediate',
    estimatedDuration: 60,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 89,
    averageScore: 72,
    completionRate: 78
  },
  {
    id: 'template-3',
    title: 'Product Manager Assessment',
    description: 'Strategic thinking and product management evaluation',
    type: 'template',
    role: 'Product Manager',
    department: 'Product',
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Market Analysis'],
    questions: [
      {
        id: 'q3',
        type: 'short-answer',
        title: 'Product Prioritization',
        description: 'Evaluate product thinking and prioritization skills',
        content: 'How would you prioritize features for a new mobile app with limited development resources?',
        points: 20,
        timeLimit: 15,
        difficulty: 'medium',
        skills: ['Product Strategy'],
        category: 'problem-solving'
      }
    ],
    timeLimit: 50,
    passingScore: 75,
    difficulty: 'intermediate',
    estimatedDuration: 50,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 64,
    averageScore: 81,
    completionRate: 92
  },
  {
    id: 'template-4',
    title: 'UX/UI Designer Assessment',
    description: 'Design thinking and user experience evaluation',
    type: 'template',
    role: 'UX/UI Designer',
    department: 'Design',
    skills: ['UI Design', 'UX Research', 'Figma', 'Prototyping', 'Design Systems'],
    questions: [
      {
        id: 'q4',
        type: 'short-answer',
        title: 'Design Process',
        description: 'Evaluate design thinking methodology',
        content: 'Walk through your design process for creating a new feature from user research to final implementation.',
        points: 25,
        timeLimit: 20,
        difficulty: 'medium',
        skills: ['UX Research', 'Design Process'],
        category: 'problem-solving'
      }
    ],
    timeLimit: 40,
    passingScore: 70,
    difficulty: 'intermediate',
    estimatedDuration: 40,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 43,
    averageScore: 84,
    completionRate: 88
  },
  {
    id: 'template-5',
    title: 'Data Scientist Assessment',
    description: 'Statistical analysis and machine learning evaluation',
    type: 'template',
    role: 'Data Scientist',
    department: 'Data Science',
    skills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    questions: [
      {
        id: 'q5',
        type: 'multiple-choice',
        title: 'Statistical Concepts',
        description: 'Test understanding of statistical methods',
        content: 'Which statistical test would you use to compare means between two independent groups?',
        options: ['t-test', 'ANOVA', 'Chi-square', 'Correlation'],
        correctAnswer: 't-test',
        points: 10,
        difficulty: 'medium',
        skills: ['Statistics'],
        category: 'technical'
      }
    ],
    timeLimit: 75,
    passingScore: 80,
    difficulty: 'advanced',
    estimatedDuration: 75,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 56,
    averageScore: 76,
    completionRate: 71
  },
  {
    id: 'template-6',
    title: 'DevOps Engineer Assessment',
    description: 'Infrastructure and deployment pipeline evaluation',
    type: 'template',
    role: 'DevOps Engineer',
    department: 'Engineering',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Infrastructure as Code'],
    questions: [
      {
        id: 'q6',
        type: 'multiple-choice',
        title: 'Container Orchestration',
        description: 'Test understanding of Kubernetes concepts',
        content: 'What is the primary purpose of a Kubernetes Pod?',
        options: ['Load balancing', 'Container grouping', 'Network routing', 'Data storage'],
        correctAnswer: 'Container grouping',
        points: 12,
        difficulty: 'medium',
        skills: ['Kubernetes'],
        category: 'technical'
      }
    ],
    timeLimit: 55,
    passingScore: 75,
    difficulty: 'advanced',
    estimatedDuration: 55,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 38,
    averageScore: 73,
    completionRate: 82
  },
  {
    id: 'template-7',
    title: 'Sales Representative Assessment',
    description: 'Sales skills and customer relationship evaluation',
    type: 'template',
    role: 'Sales Representative',
    department: 'Sales',
    skills: ['Sales Strategy', 'CRM', 'Negotiation', 'Communication', 'Lead Generation'],
    questions: [
      {
        id: 'q7',
        type: 'short-answer',
        title: 'Sales Scenario',
        description: 'Evaluate sales approach and strategy',
        content: 'A potential client says your product is too expensive. How would you handle this objection?',
        points: 15,
        timeLimit: 10,
        difficulty: 'medium',
        skills: ['Negotiation', 'Communication'],
        category: 'behavioral'
      }
    ],
    timeLimit: 35,
    passingScore: 70,
    difficulty: 'intermediate',
    estimatedDuration: 35,
    isActive: true,
    createdBy: 'system',
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01'),
    usageCount: 72,
    averageScore: 79,
    completionRate: 94
  }
];

interface CandidateSelectionModalProps {
  assessment: Assessment;
  onClose: () => void;
  onAssign: (candidateIds: string[]) => void;
}

const CandidateSelectionModal: React.FC<CandidateSelectionModalProps> = ({ assessment, onClose, onAssign }) => {
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  
  // Mock candidates for assignment
  const availableCandidates = [
    { id: '1', name: 'Alex Johnson', email: 'alex.johnson@email.com', position: 'Senior Frontend Developer' },
    { id: '2', name: 'Maria Rodriguez', email: 'maria.rodriguez@email.com', position: 'AI/ML Engineer' },
    { id: '3', name: 'David Kim', email: 'david.kim@email.com', position: 'Frontend Developer' }
  ];

  const handleToggleCandidate = (candidateId: string) => {
    setSelectedCandidates(prev => 
      prev.includes(candidateId) 
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleAssign = () => {
    onAssign(selectedCandidates);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Assign Assessment</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded transition-colors">
              <X size={20} className="text-gray-600" />
            </button>
          </div>
          <p className="text-gray-600 mt-1">Select candidates to assign "{assessment.title}"</p>
        </div>
        
        <div className="p-6">
          <div className="space-y-3 max-h-64 overflow-auto">
            {availableCandidates.map((candidate) => (
              <label key={candidate.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCandidates.includes(candidate.id)}
                  onChange={() => handleToggleCandidate(candidate.id)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-sm text-gray-600">{candidate.position}</p>
                  <p className="text-sm text-gray-500">{candidate.email}</p>
                </div>
              </label>
            ))}
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleAssign}
              disabled={selectedCandidates.length === 0}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors"
            >
              Assign to {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? 's' : ''}
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AssessmentLibrary: React.FC<AssessmentLibraryProps> = ({ 
  assessments, 
  onSaveAssessment 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Assessment | null>(null);
  const [showCandidateModal, setShowCandidateModal] = useState<Assessment | null>(null);

  // Add state to force re-renders
  const [assessmentList, setAssessmentList] = useState(assessments);
  
  // Update local state when props change
  React.useEffect(() => {
    setAssessmentList(assessments);
  }, [assessments]);

  // Combine prebuilt templates with user-created assessments
  const allTemplates = [...prebuiltTemplates, ...assessmentList];

  const filteredTemplates = allTemplates.filter(template => {
    const searchMatch = searchTerm === '' ||
                       template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       template.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       template.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const departmentMatch = departmentFilter === 'all' || template.department === departmentFilter;
    const difficultyMatch = difficultyFilter === 'all' || template.difficulty === difficultyFilter;
    
    return searchMatch && departmentMatch && difficultyMatch;
  });

  const getDifficultyColor = (difficulty: Assessment['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAssignToCandidate = (template: Assessment) => {
    setShowCandidateModal(template);
  };

  const handleDuplicateTemplate = (template: Assessment) => {
    const duplicatedAssessment: Partial<Assessment> = {
      ...template,
      id: undefined,
      title: `${template.title} (Copy)`,
      type: 'custom',
      createdAt: new Date(),
      updatedAt: new Date(),
      usageCount: 0
    };
    onSaveAssessment(duplicatedAssessment);
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    const assessment = allTemplates.find(a => a.id === assessmentId);
    if (!assessment) return;
    
    const confirmMessage = assessment.type === 'ai-generated' 
      ? 'Are you sure you want to delete this AI-generated assessment? This action cannot be undone.'
      : 'Are you sure you want to delete this copied assessment? This action cannot be undone.';
    
    if (window.confirm(confirmMessage)) {
      const updatedAssessments = assessments.filter(a => a.id !== assessmentId);
      localStorage.setItem('assessments', JSON.stringify(updatedAssessments));
      // Force re-render by updating state
      setAssessmentList(updatedAssessments);
    }
  };

  const handleAssignCandidates = (candidateIds: string[]) => {
    // In a real app, this would send assessment invitations
    alert(`Assessment assigned to ${candidateIds.length} candidate${candidateIds.length !== 1 ? 's' : ''}. Email invitations would be sent.`);
  };

  const departments = Array.from(new Set(allTemplates.map(t => t.department)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Assessment Library</h2>
          <p className="text-gray-600 mt-1">Browse and assign role-based assessments</p>
        </div>
        
        <div className="text-sm text-gray-600">
          {allTemplates.filter(t => t.type === 'template').length} templates • {assessments.length} custom
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search assessments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as typeof difficultyFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Assessment Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <div 
            key={template.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 h-full flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {template.title}
                  </h3>
                  {template.type === 'template' && (
                    <Star size={14} className="text-yellow-500 fill-current flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{template.description}</p>
              </div>
            </div>

            {/* Role and Difficulty */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">{template.role}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                  {template.difficulty}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock size={14} className="text-gray-500" />
                  <span>{template.timeLimit}min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={14} className="text-gray-500" />
                  <span>{template.usageCount || 0} uses</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-6 flex-1">
                <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
                <div className="flex flex-wrap gap-1">
                  {template.skills.slice(0, 3).map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {template.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{template.skills.length - 3}
                    </span>
                  )}
                </div>
              </div>

            {/* Actions */}
            <div className="mt-auto">
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAssignToCandidate(template)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 text-sm font-medium"
                >
                  <Play size={14} />
                  <span>Assign</span>
                </button>
                
                <button 
                  onClick={() => setSelectedTemplate(template)}
                  title="Preview"
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Eye size={14} />
                </button>
                
                <button 
                  onClick={() => handleDuplicateTemplate(template)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  title="Duplicate"
                >
                  <Copy size={14} />
                </button>

                {(template.type === 'ai-generated' || template.type === 'custom' || template.title.includes('(Copy)')) && (
                  <button 
                    onClick={() => handleDeleteAssessment(template.id)}
                    className="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Star size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No assessments found</p>
          <p className="text-gray-600 mt-1">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{selectedTemplate.title}</h2>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Assessment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Role:</span> {selectedTemplate.role}</p>
                    <p><span className="font-medium">Department:</span> {selectedTemplate.department}</p>
                    <p><span className="font-medium">Duration:</span> {selectedTemplate.timeLimit} minutes</p>
                    <p><span className="font-medium">Questions:</span> {selectedTemplate.questions.length}</p>
                    <p><span className="font-medium">Difficulty:</span> {selectedTemplate.difficulty}</p>
                    <p><span className="font-medium">Passing Score:</span> {selectedTemplate.passingScore}%</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Performance Stats</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Times Used:</span> {selectedTemplate.usageCount || 0}</p>
                    <p><span className="font-medium">Average Score:</span> {selectedTemplate.averageScore || 0}%</p>
                    <p><span className="font-medium">Completion Rate:</span> {selectedTemplate.completionRate || 0}%</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Skills Covered</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-blue-50 text-blue-700 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    handleAssignToCandidate(selectedTemplate);
                    setSelectedTemplate(null);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  Assign to Candidates
                </button>
                <button 
                  onClick={() => {
                    handleDuplicateTemplate(selectedTemplate);
                    setSelectedTemplate(null);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Duplicate
                </button>
                <button 
                  onClick={() => setSelectedTemplate(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Candidate Selection Modal */}
      {showCandidateModal && (
        <CandidateSelectionModal
          assessment={showCandidateModal}
          onClose={() => setShowCandidateModal(null)}
          onAssign={handleAssignCandidates}
        />
      )}
    </div>
  );
};