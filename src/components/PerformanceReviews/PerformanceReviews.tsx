import React, { useState } from 'react';
import { 
  TrendingUp, Users, Target, CheckCircle, Clock, Star, 
  Calendar, Award, Download, Search, Filter, Plus, Send,
  User, Mail, Phone, Edit, Eye, BarChart3, AlertTriangle,
  FileText, MessageSquare, Settings, X, Save
} from 'lucide-react';

interface PerformanceReview {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  department: string;
  role: string;
  reviewPeriod: string;
  status: 'draft' | 'pending' | 'in-progress' | 'completed' | 'overdue';
  dueDate: Date;
  completedDate?: Date;
  reviewerId: string;
  reviewerName: string;
  overallRating?: number;
  goals: Goal[];
  strengths: string[];
  improvementAreas: string[];
  developmentPlan: string[];
  comments?: string;
  avatar?: string;
  lastUpdated: Date;
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'performance' | 'development' | 'leadership' | 'technical';
  status: 'not-started' | 'in-progress' | 'completed' | 'exceeded';
  progress: number;
  targetDate: Date;
  achievedDate?: Date;
  metrics?: string;
}

const mockReviews: PerformanceReview[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Jennifer Walsh',
    employeeEmail: 'jennifer.walsh@company.com',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    reviewPeriod: 'Q4 2024',
    status: 'completed',
    dueDate: new Date('2025-01-15'),
    completedDate: new Date('2025-01-12'),
    reviewerId: '1',
    reviewerName: 'Michael Rodriguez',
    overallRating: 4.5,
    goals: [
      {
        id: 'g1',
        title: 'Lead Component Library Project',
        description: 'Design and implement reusable component library',
        category: 'technical',
        status: 'completed',
        progress: 100,
        targetDate: new Date('2024-12-31'),
        achievedDate: new Date('2024-12-20'),
        metrics: 'Delivered 50+ components, 95% test coverage'
      },
      {
        id: 'g2',
        title: 'Mentor Junior Developers',
        description: 'Provide guidance to 2 junior team members',
        category: 'leadership',
        status: 'exceeded',
        progress: 120,
        targetDate: new Date('2024-12-31'),
        achievedDate: new Date('2024-11-30'),
        metrics: 'Mentored 3 developers, all promoted'
      }
    ],
    strengths: [
      'Exceptional technical leadership',
      'Strong mentoring abilities',
      'Excellent code quality and architecture decisions',
      'Proactive problem-solving approach'
    ],
    improvementAreas: [
      'Could improve cross-team communication',
      'Consider taking on more strategic initiatives'
    ],
    developmentPlan: [
      'Attend leadership training program',
      'Lead cross-functional project in Q1 2025',
      'Present at engineering all-hands meeting'
    ],
    comments: 'Jennifer has been an outstanding contributor this quarter. Her leadership on the component library project exceeded expectations.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    lastUpdated: new Date('2025-01-12')
  },
  {
    id: '2',
    employeeId: '2',
    employeeName: 'Michael Chen',
    employeeEmail: 'michael.chen@company.com',
    department: 'AI/ML',
    role: 'Senior ML Engineer',
    reviewPeriod: 'Q4 2024',
    status: 'in-progress',
    dueDate: new Date('2025-01-20'),
    reviewerId: '1',
    reviewerName: 'Sarah Chen',
    overallRating: 4.2,
    goals: [
      {
        id: 'g3',
        title: 'Improve Model Accuracy',
        description: 'Increase recommendation model accuracy by 15%',
        category: 'performance',
        status: 'completed',
        progress: 100,
        targetDate: new Date('2024-12-31'),
        achievedDate: new Date('2024-12-15'),
        metrics: 'Achieved 18% improvement in accuracy'
      },
      {
        id: 'g4',
        title: 'Research New ML Frameworks',
        description: 'Evaluate and implement new ML frameworks',
        category: 'development',
        status: 'in-progress',
        progress: 75,
        targetDate: new Date('2025-01-31'),
        metrics: 'Evaluated 3 frameworks, implementing PyTorch Lightning'
      }
    ],
    strengths: [
      'Deep ML expertise and research skills',
      'Strong analytical thinking',
      'Excellent documentation practices'
    ],
    improvementAreas: [
      'Could improve presentation skills',
      'More collaboration with product team needed'
    ],
    developmentPlan: [
      'Public speaking workshop',
      'Regular product team sync meetings',
      'Conference presentation opportunity'
    ],
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    lastUpdated: new Date('2025-01-14')
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Lisa Thompson',
    employeeEmail: 'lisa.thompson@company.com',
    department: 'Product',
    role: 'VP of Product',
    reviewPeriod: 'Q4 2024',
    status: 'pending',
    dueDate: new Date('2025-01-25'),
    reviewerId: '1',
    reviewerName: 'Sarah Chen',
    goals: [
      {
        id: 'g5',
        title: 'Launch Mobile App Beta',
        description: 'Successfully launch mobile app beta program',
        category: 'performance',
        status: 'not-started',
        progress: 0,
        targetDate: new Date('2025-02-28'),
        metrics: 'Target: 1000 beta users, 4.5+ app store rating'
      }
    ],
    strengths: [],
    improvementAreas: [],
    developmentPlan: [],
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    lastUpdated: new Date('2025-01-10')
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'Robert Garcia',
    employeeEmail: 'robert.garcia@company.com',
    department: 'Engineering',
    role: 'Backend Developer',
    reviewPeriod: 'Q4 2024',
    status: 'overdue',
    dueDate: new Date('2025-01-10'),
    reviewerId: '1',
    reviewerName: 'Michael Rodriguez',
    goals: [
      {
        id: 'g6',
        title: 'API Performance Optimization',
        description: 'Reduce API response times by 30%',
        category: 'technical',
        status: 'in-progress',
        progress: 60,
        targetDate: new Date('2025-01-31'),
        metrics: 'Current: 20% improvement achieved'
      }
    ],
    strengths: [],
    improvementAreas: [],
    developmentPlan: [],
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    lastUpdated: new Date('2025-01-08')
  }
];

export const PerformanceReviews: React.FC = () => {
  const [reviews, setReviews] = useState(mockReviews);
  const [selectedReview, setSelectedReview] = useState<PerformanceReview | null>(null);
  const [activeView, setActiveView] = useState<'overview' | 'details'>('overview');
  const [statusFilter, setStatusFilter] = useState<'all' | PerformanceReview['status']>('all');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlert, setShowAlert] = useState<{ type: 'success' | 'info' | 'warning'; message: string } | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [editingReview, setEditingReview] = useState<PerformanceReview | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [editFormData, setEditFormData] = useState({
    overallRating: 0,
    strengths: '',
    improvementAreas: '',
    developmentPlan: '',
    comments: ''
  });

  const filteredReviews = reviews.filter(review => {
    const statusMatch = statusFilter === 'all' || review.status === statusFilter;
    const departmentMatch = departmentFilter === 'all' || review.department === departmentFilter;
    const searchMatch = searchTerm === '' ||
                       review.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       review.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       review.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    return statusMatch && departmentMatch && searchMatch;
  });

  const handleCreateReview = () => {
    const newReview: PerformanceReview = {
      id: Date.now().toString(),
      employeeId: Date.now().toString(),
      employeeName: 'New Employee',
      employeeEmail: 'new.employee@company.com',
      department: 'Engineering',
      role: 'Software Engineer',
      reviewPeriod: 'Q1 2025',
      status: 'draft',
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      reviewerId: '1',
      reviewerName: 'Sarah Chen',
      goals: [
        {
          id: `goal-${Date.now()}`,
          title: 'Complete Onboarding Goals',
          description: 'Successfully complete all onboarding objectives',
          category: 'development',
          status: 'not-started',
          progress: 0,
          targetDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
          metrics: 'Complete all training modules and initial projects'
        }
      ],
      strengths: [],
      improvementAreas: [],
      developmentPlan: [],
      lastUpdated: new Date()
    };

    setReviews(prev => [newReview, ...prev]);
    setShowAlert({ type: 'success', message: 'New performance review created successfully!' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleSendReminders = () => {
    const pendingReviews = reviews.filter(r => r.status === 'pending' || r.status === 'overdue');
    
    if (pendingReviews.length === 0) {
      setShowAlert({ type: 'info', message: 'No pending reviews to send reminders for.' });
    } else {
      setShowAlert({ 
        type: 'success', 
        message: `Reminder emails sent to ${pendingReviews.length} employee${pendingReviews.length !== 1 ? 's' : ''} with pending reviews.` 
      });
    }
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleEditReview = (review: PerformanceReview) => {
    setEditingReview(review);
    setEditFormData({
      overallRating: review.overallRating || 0,
      strengths: review.strengths.join('\n'),
      improvementAreas: review.improvementAreas.join('\n'),
      developmentPlan: review.developmentPlan.join('\n'),
      comments: review.comments || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editingReview) return;

    const updatedReview: PerformanceReview = {
      ...editingReview,
      overallRating: editFormData.overallRating,
      strengths: editFormData.strengths.split('\n').filter(s => s.trim()),
      improvementAreas: editFormData.improvementAreas.split('\n').filter(s => s.trim()),
      developmentPlan: editFormData.developmentPlan.split('\n').filter(s => s.trim()),
      comments: editFormData.comments,
      lastUpdated: new Date()
    };

    setReviews(prev => prev.map(r => r.id === editingReview.id ? updatedReview : r));
    setSelectedReview(updatedReview);
    setShowEditModal(false);
    setEditingReview(null);
    setShowAlert({ type: 'success', message: 'Performance review updated successfully!' });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleSendToEmployee = (review: PerformanceReview) => {
    setEditingReview(review);
    setShowSendModal(true);
  };

  const handleConfirmSend = () => {
    if (!editingReview) return;

    setIsSending(true);
    
    setTimeout(() => {
      const updatedReview: PerformanceReview = {
        ...editingReview,
        status: 'completed',
        completedDate: new Date(),
        lastUpdated: new Date()
      };

      setReviews(prev => prev.map(r => r.id === editingReview.id ? updatedReview : r));
      setSelectedReview(updatedReview);
      setIsSending(false);
      setShowSendModal(false);
      setEditingReview(null);
      setShowAlert({ 
        type: 'success', 
        message: `Performance review sent to ${editingReview.employeeName} successfully!` 
      });
      setTimeout(() => setShowAlert(null), 3000);
    }, 2000);
  };

  const handleExportData = () => {
    const csvHeaders = [
      'Employee Name',
      'Department',
      'Role',
      'Review Period',
      'Status',
      'Overall Rating',
      'Due Date',
      'Completed Date',
      'Goals Count',
      'Goals Completed',
      'Reviewer'
    ];

    const csvData = filteredReviews.map(review => [
      review.employeeName,
      review.department,
      review.role,
      review.reviewPeriod,
      review.status,
      review.overallRating?.toString() || '',
      review.dueDate.toLocaleDateString(),
      review.completedDate?.toLocaleDateString() || '',
      review.goals.length.toString(),
      review.goals.filter(g => g.status === 'completed' || g.status === 'exceeded').length.toString(),
      review.reviewerName
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `performance-reviews-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: PerformanceReview['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: PerformanceReview['status']) => {
    switch (status) {
      case 'draft': return <FileText size={14} className="text-gray-600" />;
      case 'pending': return <Clock size={14} className="text-yellow-600" />;
      case 'in-progress': return <TrendingUp size={14} className="text-blue-600" />;
      case 'completed': return <CheckCircle size={14} className="text-green-600" />;
      case 'overdue': return <AlertTriangle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getGoalStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'exceeded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-500' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
        {!interactive && <span className="text-sm font-medium text-gray-700 ml-2">{rating.toFixed(1)}</span>}
      </div>
    );
  };

  const statusCounts = {
    draft: reviews.filter(r => r.status === 'draft').length,
    pending: reviews.filter(r => r.status === 'pending').length,
    'in-progress': reviews.filter(r => r.status === 'in-progress').length,
    completed: reviews.filter(r => r.status === 'completed').length,
    overdue: reviews.filter(r => r.status === 'overdue').length
  };

  const totalReviews = reviews.length;
  const completedReviews = reviews.filter(r => r.status === 'completed').length;
  const avgRating = reviews.filter(r => r.overallRating).reduce((sum, r) => sum + (r.overallRating || 0), 0) / reviews.filter(r => r.overallRating).length || 0;
  const onTimeCompletion = Math.round((reviews.filter(r => r.status === 'completed' && r.completedDate && r.completedDate <= r.dueDate).length / completedReviews) * 100) || 0;

  const departments = Array.from(new Set(reviews.map(r => r.department)));

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Alert Messages */}
      {showAlert && (
        <div className={`p-3 rounded-lg border ${
          showAlert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          showAlert.type === 'info' ? 'bg-blue-50 border-blue-200 text-blue-800' :
          'bg-yellow-50 border-yellow-200 text-yellow-800'
        }`}>
          <div className="flex items-center space-x-2">
            <CheckCircle size={16} />
            <span className="font-medium text-sm">{showAlert.message}</span>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Total Reviews</p>
              <p className="text-lg font-bold text-gray-900">{totalReviews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Star size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Average Rating</p>
              <p className="text-lg font-bold text-gray-900">{avgRating.toFixed(1)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Target size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">Goal Achievement</p>
              <p className="text-lg font-bold text-gray-900">
                {Math.round(reviews.flatMap(r => r.goals).filter(g => g.status === 'completed' || g.status === 'exceeded').length / reviews.flatMap(r => r.goals).length * 100) || 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600">On-Time Rate</p>
              <p className="text-lg font-bold text-gray-900">{onTimeCompletion}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Pipeline */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Review Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center justify-center mb-2">
                {getStatusIcon(status as PerformanceReview['status'])}
              </div>
              <p className="text-lg font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-600 capitalize">{status.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReviews.map((review) => {
          const daysUntilDue = Math.ceil((review.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isOverdue = daysUntilDue < 0;
          const isDueSoon = daysUntilDue <= 7 && daysUntilDue >= 0;
          
          return (
            <div key={review.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all group">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                    {review.avatar ? (
                      <img src={review.avatar} alt={review.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={16} className="text-gray-600 mt-2 ml-2" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {review.employeeName}
                    </h3>
                    <p className="text-xs text-gray-600">{review.role}</p>
                    <p className="text-xs text-gray-500">{review.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {getStatusIcon(review.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                    {review.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Review Period & Rating */}
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-700">Review Period</span>
                  <span className="text-xs font-bold text-gray-900">{review.reviewPeriod}</span>
                </div>
                {review.overallRating && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Rating</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(review.overallRating)}
                    </div>
                  </div>
                )}
              </div>

              {/* Goals Progress */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-700">Goals</span>
                  <span className="text-xs text-gray-600">
                    {review.goals.filter(g => g.status === 'completed' || g.status === 'exceeded').length}/{review.goals.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {review.goals.slice(0, 2).map((goal) => (
                    <div key={goal.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 truncate">{goal.title}</span>
                        <span className={`px-1 py-0.5 rounded text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                          {goal.status === 'not-started' ? 'pending' : goal.status.replace('-', ' ')}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, goal.progress)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                  {review.goals.length > 2 && (
                    <p className="text-xs text-gray-500 text-center">+{review.goals.length - 2} more</p>
                  )}
                </div>
              </div>

              {/* Due Date Warning */}
              {(isOverdue || isDueSoon) && (
                <div className={`p-2 rounded-lg border mb-3 ${
                  isOverdue ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center space-x-1">
                    <AlertTriangle size={12} className={isOverdue ? 'text-red-600' : 'text-yellow-600'} />
                    <span className={`text-xs font-medium ${
                      isOverdue ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {isOverdue ? `Overdue ${Math.abs(daysUntilDue)}d` : `Due in ${daysUntilDue}d`}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedReview(review);
                    setActiveView('details');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-1 text-xs font-medium"
                >
                  <Eye size={12} />
                  <span>View</span>
                </button>
                <button 
                  onClick={() => handleEditReview(review)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-2 rounded-lg transition-colors"
                >
                  <Edit size={12} />
                </button>
                <button 
                  onClick={() => handleSendToEmployee(review)}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-2 py-2 rounded-lg transition-colors"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
          <TrendingUp size={32} className="mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600 mb-4">
            {statusFilter === 'all' && departmentFilter === 'all' && searchTerm === ''
              ? "Create your first performance review to get started"
              : "No reviews match your current filters"}
          </p>
          <button
            onClick={handleCreateReview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Create First Review
          </button>
        </div>
      )}
    </div>
  );

  const renderDetails = () => {
    if (!selectedReview) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveView('overview')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <span>← Back to Overview</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleEditReview(selectedReview)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 text-sm"
            >
              <Edit size={14} />
              <span>Edit Review</span>
            </button>
            <button 
              onClick={() => handleSendToEmployee(selectedReview)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 text-sm"
            >
              <Send size={14} />
              <span>Send to Employee</span>
            </button>
          </div>
        </div>

        {/* Employee Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              {selectedReview.avatar ? (
                <img src={selectedReview.avatar} alt={selectedReview.employeeName} className="w-full h-full object-cover" />
              ) : (
                <User size={32} className="text-gray-600 mt-4 ml-4" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedReview.employeeName}</h2>
              <p className="text-gray-600 mb-1">{selectedReview.role}</p>
              <p className="text-sm text-gray-500 mb-2">{selectedReview.department}</p>
              
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Mail size={12} className="text-gray-400" />
                  <span className="text-gray-600">{selectedReview.employeeEmail}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={12} className="text-gray-400" />
                  <span className="text-gray-600">{selectedReview.reviewPeriod}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full border text-sm ${getStatusColor(selectedReview.status)}`}>
                {getStatusIcon(selectedReview.status)}
                <span className="font-medium">{selectedReview.status.replace('-', ' ')}</span>
              </div>
              {selectedReview.overallRating && (
                <div className="mt-2">
                  {renderStars(selectedReview.overallRating)}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Goals & Objectives */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Goals & Objectives</h3>
          
          <div className="space-y-3">
            {selectedReview.goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{goal.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                    {goal.metrics && (
                      <p className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block">
                        📊 {goal.metrics}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status.replace('-', ' ')}
                    </span>
                    <p className="text-xs text-gray-600 mt-1">
                      Due: {goal.targetDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-700">Progress</span>
                    <span className="text-xs font-bold text-gray-900">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.status === 'exceeded' ? 'bg-purple-600' :
                        goal.status === 'completed' ? 'bg-green-600' :
                        goal.status === 'in-progress' ? 'bg-blue-600' :
                        'bg-gray-400'
                      }`}
                      style={{ width: `${Math.min(100, goal.progress)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Assessment */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <CheckCircle size={16} className="text-green-600" />
              <span>Strengths</span>
            </h3>
            
            {selectedReview.strengths.length > 0 ? (
              <div className="space-y-2">
                {selectedReview.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-green-50 rounded border border-green-200">
                    <CheckCircle size={12} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-green-800 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <CheckCircle size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">No strengths recorded yet</p>
              </div>
            )}
          </div>

          {/* Improvement Areas */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Target size={16} className="text-orange-600" />
              <span>Areas for Improvement</span>
            </h3>
            
            {selectedReview.improvementAreas.length > 0 ? (
              <div className="space-y-2">
                {selectedReview.improvementAreas.map((area, index) => (
                  <div key={index} className="flex items-start space-x-2 p-2 bg-orange-50 rounded border border-orange-200">
                    <Target size={12} className="text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-orange-800 leading-relaxed">{area}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-500">
                <Target size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">No improvement areas identified</p>
              </div>
            )}
          </div>
        </div>

        {/* Development Plan */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
            <TrendingUp size={16} className="text-blue-600" />
            <span>Development Plan</span>
          </h3>
          
          {selectedReview.developmentPlan.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedReview.developmentPlan.map((item, index) => (
                <div key={index} className="flex items-start space-x-2 p-3 bg-blue-50 rounded border border-blue-200">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              <TrendingUp size={24} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No development plan created yet</p>
            </div>
          )}
        </div>

        {/* Comments */}
        {selectedReview.comments && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <MessageSquare size={16} className="text-purple-600" />
              <span>Additional Comments</span>
            </h3>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{selectedReview.comments}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Performance Reviews</h1>
          <p className="text-gray-600 mt-1">Track employee performance and development goals</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={handleCreateReview}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={16} />
            <span>Create Review</span>
          </button>
          
          <button
            onClick={handleSendReminders}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
          >
            <Send size={16} />
            <span>Send Reminders</span>
          </button>
        </div>
      </div>

      {activeView === 'overview' && renderOverview()}
      {activeView === 'details' && renderDetails()}

      {/* Edit Review Modal */}
      {showEditModal && editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Edit Performance Review</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">{editingReview.employeeName} • {editingReview.reviewPeriod}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Overall Rating</label>
                <div className="flex items-center space-x-2">
                  {renderStars(editFormData.overallRating, true, (rating) => 
                    setEditFormData({ ...editFormData, overallRating: rating })
                  )}
                  <span className="text-sm text-gray-600 ml-3">
                    {editFormData.overallRating > 0 ? `${editFormData.overallRating}/5` : 'Click to rate'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Strengths</label>
                <textarea
                  value={editFormData.strengths}
                  onChange={(e) => setEditFormData({ ...editFormData, strengths: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter each strength on a new line..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Areas for Improvement</label>
                <textarea
                  value={editFormData.improvementAreas}
                  onChange={(e) => setEditFormData({ ...editFormData, improvementAreas: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter each improvement area on a new line..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Development Plan</label>
                <textarea
                  value={editFormData.developmentPlan}
                  onChange={(e) => setEditFormData({ ...editFormData, developmentPlan: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter each development action on a new line..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Comments</label>
                <textarea
                  value={editFormData.comments}
                  onChange={(e) => setEditFormData({ ...editFormData, comments: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional feedback and comments..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Review Modal */}
      {showSendModal && editingReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Send Performance Review</h2>
                <button
                  onClick={() => setShowSendModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">Review Summary</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p><span className="font-medium">Employee:</span> {editingReview.employeeName}</p>
                  <p><span className="font-medium">Period:</span> {editingReview.reviewPeriod}</p>
                  <p><span className="font-medium">Rating:</span> {editingReview.overallRating ? `${editingReview.overallRating}/5` : 'Not rated'}</p>
                  <p><span className="font-medium">Goals:</span> {editingReview.goals.length} objectives</p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle size={16} className="text-yellow-600" />
                  <span className="font-medium text-yellow-900">Confirmation Required</span>
                </div>
                <p className="text-sm text-yellow-800">
                  This will send the performance review to {editingReview.employeeName} and mark it as completed.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleConfirmSend}
                  disabled={isSending}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Review</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setShowSendModal(false)}
                  disabled={isSending}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};