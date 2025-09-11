import React, { useState } from 'react';
import { UserCheck, Users, Calendar, Target, TrendingUp, Clock, AlertTriangle, CheckCircle, Plus, Filter, Download, Search, Eye, Edit, Mail, Phone, User, Trash2, X, Save, Send, AlertCircle } from 'lucide-react';

interface Assignment {
  id: string;
  employeeId: string;
  employeeName: string;
  projectId: string;
  projectName: string;
  role: string;
  allocation: number; // percentage
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  skills: string[];
  hourlyRate: number;
  avatar?: string;
  department: string;
}

const mockAssignments: Assignment[] = [
  {
    id: '1',
    employeeId: '1',
    employeeName: 'Jennifer Walsh',
    projectId: '2',
    projectName: 'Customer Portal Redesign',
    role: 'Frontend Lead',
    allocation: 100,
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-03-30'),
    status: 'active',
    skills: ['React', 'TypeScript', 'CSS'],
    hourlyRate: 75,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    department: 'Engineering'
  },
  {
    id: '2',
    employeeId: '5',
    employeeName: 'Sarah Kim',
    projectId: '2',
    projectName: 'Customer Portal Redesign',
    role: 'UI/UX Designer',
    allocation: 80,
    startDate: new Date('2025-01-15'),
    endDate: new Date('2025-02-28'),
    status: 'active',
    skills: ['UI/UX Design', 'Figma', 'Prototyping'],
    hourlyRate: 65,
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    department: 'Design'
  },
  {
    id: '3',
    employeeId: '3',
    employeeName: 'Lisa Thompson',
    projectId: '1',
    projectName: 'AI-Powered Analytics Platform',
    role: 'Product Manager',
    allocation: 90,
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-05-15'),
    status: 'pending',
    skills: ['Product Strategy', 'Agile', 'User Research'],
    hourlyRate: 80,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    department: 'Product'
  },
  {
    id: '4',
    employeeId: '4',
    employeeName: 'Robert Garcia',
    projectId: '3',
    projectName: 'Infrastructure Modernization',
    role: 'Backend Developer',
    allocation: 100,
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-08-31'),
    status: 'pending',
    skills: ['Python', 'Django', 'PostgreSQL'],
    hourlyRate: 70,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    department: 'Engineering'
  }
];

export const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [statusFilter, setStatusFilter] = useState<'all' | Assignment['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<Assignment | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  
  const [newAssignmentData, setNewAssignmentData] = useState({
    employeeName: '',
    projectName: '',
    role: '',
    allocation: 100,
    startDate: '',
    endDate: '',
    hourlyRate: 75,
    department: '',
    skills: ''
  });

  const [editFormData, setEditFormData] = useState({
    employeeName: '',
    projectName: '',
    role: '',
    allocation: 100,
    startDate: '',
    endDate: '',
    hourlyRate: 75,
    department: '',
    skills: '',
    status: 'pending' as Assignment['status']
  });

  const filteredAssignments = assignments.filter(assignment => {
    const statusMatch = statusFilter === 'all' || assignment.status === statusFilter;
    const searchMatch = searchTerm === '' ||
                       assignment.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       assignment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       assignment.role.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'active': return 'bg-green-50 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Assignment['status']) => {
    switch (status) {
      case 'pending': return <Clock size={14} className="text-yellow-600" />;
      case 'active': return <CheckCircle size={14} className="text-green-600" />;
      case 'completed': return <Target size={14} className="text-blue-600" />;
      case 'cancelled': return <AlertTriangle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const handleEditAssignment = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setEditFormData({
      employeeName: assignment.employeeName,
      projectName: assignment.projectName,
      role: assignment.role,
      allocation: assignment.allocation,
      startDate: assignment.startDate.toISOString().split('T')[0],
      endDate: assignment.endDate.toISOString().split('T')[0],
      hourlyRate: assignment.hourlyRate,
      department: assignment.department,
      skills: assignment.skills.join(', '),
      status: assignment.status
    });
    setShowEditModal(true);
  };

  const handleUpdateAssignment = () => {
    if (!editingAssignment) return;

    const updatedAssignment: Assignment = {
      ...editingAssignment,
      employeeName: editFormData.employeeName,
      projectName: editFormData.projectName,
      role: editFormData.role,
      allocation: editFormData.allocation,
      startDate: new Date(editFormData.startDate),
      endDate: new Date(editFormData.endDate),
      hourlyRate: editFormData.hourlyRate,
      department: editFormData.department,
      skills: editFormData.skills.split(',').map(s => s.trim()).filter(Boolean),
      status: editFormData.status
    };

    setAssignments(prev => prev.map(a => a.id === editingAssignment.id ? updatedAssignment : a));
    
    // Update selected assignment if it's the one being edited
    if (selectedAssignment?.id === editingAssignment.id) {
      setSelectedAssignment(updatedAssignment);
    }
    
    setShowEditModal(false);
    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
      
      // Close detail modal if the deleted assignment was selected
      if (selectedAssignment?.id === assignmentId) {
        setSelectedAssignment(null);
      }
    }
  };

  const handleContactEmployee = (assignment: Assignment) => {
    setEditingAssignment(assignment);
    setContactSubject(`Project Assignment: ${assignment.projectName}`);
    setContactMessage('');
    setShowContactModal(true);
  };

  const handleSendContact = () => {
    if (!contactMessage.trim()) return;
    
    setIsContactSubmitting(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsContactSubmitting(false);
      setContactSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setContactSubmitted(false);
        setShowContactModal(false);
        setContactMessage('');
        setContactSubject('');
        setEditingAssignment(null);
      }, 3000);
    }, 2000);
  };

  const handleExportData = () => {
    const csvHeaders = [
      'Employee Name',
      'Department',
      'Project Name',
      'Role',
      'Allocation %',
      'Start Date',
      'End Date',
      'Status',
      'Hourly Rate',
      'Skills'
    ];

    const csvData = filteredAssignments.map(assignment => [
      assignment.employeeName,
      assignment.department,
      assignment.projectName,
      assignment.role,
      assignment.allocation.toString(),
      assignment.startDate.toLocaleDateString(),
      assignment.endDate.toLocaleDateString(),
      assignment.status,
      assignment.hourlyRate.toString(),
      assignment.skills.join('; ')
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `assignments-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateAssignment = () => {
    if (!newAssignmentData.employeeName.trim() || !newAssignmentData.projectName.trim() || !newAssignmentData.role.trim() || !newAssignmentData.startDate || !newAssignmentData.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now().toString(),
      employeeId: Date.now().toString(),
      employeeName: newAssignmentData.employeeName.trim(),
      projectId: Date.now().toString(),
      projectName: newAssignmentData.projectName.trim(),
      role: newAssignmentData.role.trim(),
      allocation: newAssignmentData.allocation,
      startDate: new Date(newAssignmentData.startDate),
      endDate: new Date(newAssignmentData.endDate),
      status: 'pending',
      skills: newAssignmentData.skills ? newAssignmentData.skills.split(',').map(s => s.trim()).filter(Boolean) : ['General'],
      hourlyRate: newAssignmentData.hourlyRate,
      department: newAssignmentData.department || 'Engineering',
      avatar: undefined
    };

    setAssignments(prev => [newAssignment, ...prev]);
    setShowCreateAssignment(false);
    
    // Reset form
    setNewAssignmentData({
      employeeName: '',
      projectName: '',
      role: '',
      allocation: 100,
      startDate: '',
      endDate: '',
      hourlyRate: 75,
      department: '',
      skills: ''
    });
  };

  const statusCounts = {
    pending: assignments.filter(a => a.status === 'pending').length,
    active: assignments.filter(a => a.status === 'active').length,
    completed: assignments.filter(a => a.status === 'completed').length,
    cancelled: assignments.filter(a => a.status === 'cancelled').length
  };

  const totalAssignments = assignments.length;
  const avgAllocation = Math.round(assignments.reduce((sum, a) => sum + a.allocation, 0) / assignments.length);
  const totalValue = assignments.reduce((sum, a) => sum + (a.hourlyRate * a.allocation * 40), 0); // Rough monthly value

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Assignments</h1>
          <p className="text-gray-600 mt-1">Track employee project assignments and allocations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
          
          <button 
            onClick={() => setShowCreateAssignment(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={16} />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserCheck size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assignments</p>
              <p className="text-xl font-semibold text-gray-900">{totalAssignments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-xl font-semibold text-gray-900">{statusCounts.active}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Allocation</p>
              <p className="text-xl font-semibold text-gray-900">{avgAllocation}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Monthly Value</p>
              <p className="text-xl font-semibold text-gray-900">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <p className="text-2xl font-semibold text-yellow-800">{statusCounts.pending}</p>
            <p className="text-sm text-yellow-600 font-medium">Pending</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <p className="text-2xl font-semibold text-green-800">{statusCounts.active}</p>
            <p className="text-sm text-green-600 font-medium">Active</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Target size={20} className="text-blue-600" />
            </div>
            <p className="text-2xl font-semibold text-blue-800">{statusCounts.completed}</p>
            <p className="text-sm text-blue-600 font-medium">Completed</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <AlertCircle size={20} className="text-red-600" />
            </div>
            <p className="text-2xl font-semibold text-red-800">{statusCounts.cancelled}</p>
            <p className="text-sm text-red-600 font-medium">Cancelled</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssignments.map((assignment) => {
          const daysRemaining = Math.ceil((assignment.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
          const isExpiringSoon = daysRemaining <= 7 && daysRemaining > 0;
          const isOverdue = daysRemaining < 0;
          
          return (
            <div key={assignment.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    {assignment.avatar ? (
                      <img src={assignment.avatar} alt={assignment.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={16} className="text-gray-600" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-gray-900 truncate text-sm">{assignment.employeeName}</h3>
                    <p className="text-xs text-gray-600 truncate">{assignment.role}</p>
                    <p className="text-xs text-gray-500">{assignment.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {getStatusIcon(assignment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <h4 className="font-medium text-blue-900 text-sm mb-1">{assignment.projectName}</h4>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-700">Allocation:</span>
                  <span className="font-semibold text-blue-800">{assignment.allocation}%</span>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Rate:</span>
                    <p className="font-medium text-gray-900">${assignment.hourlyRate}/hr</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <p className="font-medium text-gray-900">
                      {Math.ceil((assignment.endDate.getTime() - assignment.startDate.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-gray-600">Timeline:</span>
                  <p className="font-medium text-gray-900 text-sm">
                    {assignment.startDate.toLocaleDateString()} - {assignment.endDate.toLocaleDateString()}
                  </p>
                </div>

                {/* Time Status */}
                {(isExpiringSoon || isOverdue) && (
                  <div className={`p-2 rounded-lg border ${
                    isOverdue ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                  }`}>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle size={12} className={isOverdue ? 'text-red-600' : 'text-yellow-600'} />
                      <span className={`text-xs font-medium ${
                        isOverdue ? 'text-red-800' : 'text-yellow-800'
                      }`}>
                        {isOverdue ? `Overdue by ${Math.abs(daysRemaining)} days` : `Ends in ${daysRemaining} days`}
                      </span>
                    </div>
                  </div>
                )}

                {/* Skills */}
                <div>
                  <p className="text-xs font-medium text-gray-700 mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {assignment.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                        {skill}
                      </span>
                    ))}
                    {assignment.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                        +{assignment.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2 border-t border-gray-100">
                  <button 
                    onClick={() => setSelectedAssignment(assignment)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 rounded-lg transition-colors flex items-center justify-center space-x-1 text-xs font-medium"
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </button>
                  <button 
                    onClick={() => handleEditAssignment(assignment)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1.5 rounded-lg transition-colors"
                  >
                    <Edit size={12} />
                  </button>
                  <button 
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="bg-red-100 hover:bg-red-200 text-red-700 px-2 py-1.5 rounded-lg transition-colors"
                    title="Delete Assignment"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <UserCheck size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assignments found</h3>
          <p className="text-gray-600 mb-6">
            {statusFilter === 'all' 
              ? "Create your first assignment to get started" 
              : "No assignments match your current filters"}
          </p>
          <button 
            onClick={() => setShowCreateAssignment(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create First Assignment
          </button>
        </div>
      )}

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{selectedAssignment.employeeName}</h2>
                  <p className="text-gray-600">{selectedAssignment.role} • {selectedAssignment.projectName}</p>
                </div>
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Employee Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User size={14} className="text-gray-600" />
                      <span>{selectedAssignment.employeeName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users size={14} className="text-gray-600" />
                      <span>{selectedAssignment.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target size={14} className="text-gray-600" />
                      <span>{selectedAssignment.role}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Assignment Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Project:</span> {selectedAssignment.projectName}</p>
                    <p><span className="font-medium">Allocation:</span> {selectedAssignment.allocation}%</p>
                    <p><span className="font-medium">Rate:</span> ${selectedAssignment.hourlyRate}/hour</p>
                    <p><span className="font-medium">Status:</span> {selectedAssignment.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Timeline</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Start Date:</span>
                    <span className="font-medium text-gray-900">{selectedAssignment.startDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">End Date:</span>
                    <span className="font-medium text-gray-900">{selectedAssignment.endDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAssignment.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => handleEditAssignment(selectedAssignment)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                  Edit Assignment
                </button>
                <button 
                  onClick={() => handleDeleteAssignment(selectedAssignment.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleContactEmployee(selectedAssignment)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Contact Employee
                </button>
                <button 
                  onClick={() => setSelectedAssignment(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Create New Assignment</h2>
                <button
                  onClick={() => setShowCreateAssignment(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name *</label>
                  <input
                    type="text"
                    value={newAssignmentData.employeeName}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, employeeName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                  <input
                    type="text"
                    value={newAssignmentData.projectName}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="AI Analytics Platform"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  value={newAssignmentData.skills}
                  onChange={(e) => setNewAssignmentData({ ...newAssignmentData, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, CSS (comma separated)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <input
                    type="text"
                    value={newAssignmentData.role}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Frontend Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newAssignmentData.department}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={newAssignmentData.startDate}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={newAssignmentData.endDate}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allocation (%)</label>
                  <input
                    type="number"
                    value={newAssignmentData.allocation}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, allocation: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={newAssignmentData.hourlyRate}
                    onChange={(e) => setNewAssignmentData({ ...newAssignmentData, hourlyRate: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="50"
                    max="200"
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCreateAssignment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
                >
                  Create Assignment
                </button>
                <button
                  onClick={() => setShowCreateAssignment(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Assignment Modal */}
      {showEditModal && editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Edit Assignment</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">{editingAssignment.employeeName} • {editingAssignment.projectName}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={editFormData.employeeName}
                    onChange={(e) => setEditFormData({ ...editFormData, employeeName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                  <input
                    type="text"
                    value={editFormData.projectName}
                    onChange={(e) => setEditFormData({ ...editFormData, projectName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <input
                    type="text"
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={editFormData.department}
                    onChange={(e) => setEditFormData({ ...editFormData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={editFormData.startDate}
                    onChange={(e) => setEditFormData({ ...editFormData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={editFormData.endDate}
                    onChange={(e) => setEditFormData({ ...editFormData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Allocation (%)</label>
                  <input
                    type="number"
                    value={editFormData.allocation}
                    onChange={(e) => setEditFormData({ ...editFormData, allocation: parseInt(e.target.value) || 100 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                  <input
                    type="number"
                    value={editFormData.hourlyRate}
                    onChange={(e) => setEditFormData({ ...editFormData, hourlyRate: parseInt(e.target.value) || 75 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="50"
                    max="200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editFormData.status}
                    onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value as Assignment['status'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                <input
                  type="text"
                  value={editFormData.skills}
                  onChange={(e) => setEditFormData({ ...editFormData, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, TypeScript, CSS (comma separated)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleUpdateAssignment}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>Update Assignment</span>
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

      {/* Contact Employee Modal */}
      {showContactModal && editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Contact Employee</h2>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">Send message to {editingAssignment.employeeName}</p>
            </div>
            
            {contactSubmitted ? (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">
                  Your message has been sent to {editingAssignment.employeeName}.
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your message..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleSendContact}
                    disabled={!contactMessage.trim() || isContactSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    {isContactSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};