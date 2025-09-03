import React, { useState } from 'react';
import { Calendar, TrendingUp, DollarSign, Users, AlertTriangle, CheckCircle, Clock, Target, Filter, Download, Eye } from 'lucide-react';
import { mockProjects, mockProjectAnalytics } from '../../data/projectData';
import type { Project } from '../../types/project';

export const ProjectPortfolio: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [statusFilter, setStatusFilter] = useState<'all' | Project['status']>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | Project['priority']>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = mockProjects.filter(project => {
    const statusMatch = statusFilter === 'all' || project.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || project.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const handleExportData = () => {
    const csvHeaders = [
      'Project Name',
      'Type',
      'Status', 
      'Priority',
      'Start Date',
      'End Date',
      'Progress %',
      'Budget Allocated',
      'Budget Spent',
      'Team Size',
      'Required Skills',
      'Risk Level',
      'Confidence Score'
    ];

    const csvData = filteredProjects.map(project => [
      project.name,
      project.type.replace('-', ' '),
      project.status,
      project.priority,
      project.startDate.toLocaleDateString(),
      project.endDate.toLocaleDateString(),
      project.progressPercentage.toString(),
      project.budget.allocated.toString(),
      project.budget.spent.toString(),
      project.assignedEmployees.length.toString(),
      project.requiredSkills.join('; '),
      project.riskLevel,
      project.confidenceScore.toString()
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `project-portfolio-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (risk: Project['riskLevel']) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const calculateProjectHealth = (project: Project) => {
    const timeProgress = ((new Date().getTime() - project.startDate.getTime()) / 
                         (project.endDate.getTime() - project.startDate.getTime())) * 100;
    const workProgress = project.progressPercentage;
    
    if (workProgress >= timeProgress - 10) return { status: 'on-track', color: 'text-green-600' };
    if (workProgress >= timeProgress - 25) return { status: 'at-risk', color: 'text-yellow-600' };
    return { status: 'behind', color: 'text-red-600' };
  };

  const portfolioStats = {
    totalProjects: mockProjects.length,
    activeProjects: mockProjects.filter(p => p.status === 'active').length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget.allocated, 0),
    totalSpent: mockProjects.reduce((sum, p) => sum + p.budget.spent, 0),
    avgProgress: Math.round(mockProjects.reduce((sum, p) => sum + p.progressPercentage, 0) / mockProjects.length),
    onTimeProjects: mockProjects.filter(p => calculateProjectHealth(p).status === 'on-track').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Project Portfolio</h2>
          <p className="text-gray-600 mt-1">Comprehensive view of all projects and their status</p>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total Projects</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{portfolioStats.totalProjects}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm font-medium text-green-900">Active</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{portfolioStats.activeProjects}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <DollarSign size={16} className="text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Total Budget</span>
          </div>
          <p className="text-lg font-bold text-purple-800">${(portfolioStats.totalBudget / 1000000).toFixed(1)}M</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={16} className="text-orange-600" />
            <span className="text-sm font-medium text-orange-900">Avg Progress</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{portfolioStats.avgProgress}%</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={16} className="text-yellow-600" />
            <span className="text-sm font-medium text-yellow-900">On Time</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{portfolioStats.onTimeProjects}</p>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={16} className="text-red-600" />
            <span className="text-sm font-medium text-red-900">Budget Used</span>
          </div>
          <p className="text-2xl font-bold text-red-800">
            {Math.round((portfolioStats.totalSpent / portfolioStats.totalBudget) * 100)}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as typeof selectedTimeframe)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as typeof priorityFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Gantt Chart View */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
        
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const health = calculateProjectHealth(project);
            const duration = Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24));
            const elapsed = Math.ceil((new Date().getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24));
            const timeProgress = Math.min(100, Math.max(0, (elapsed / duration) * 100));
            
            return (
              <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Target size={20} className="text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      <p className="text-sm text-gray-600">{project.type.replace('-', ' ')} • {project.assignedEmployees.length} team members</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority}
                    </span>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Eye size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Progress Bars */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Work Progress</span>
                      <span className={`text-sm font-medium ${health.color}`}>
                        {project.progressPercentage}% • {health.status}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Time Progress</span>
                      <span className="text-sm text-gray-600">{Math.round(timeProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${timeProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-4 gap-4 pt-3 border-t border-gray-100">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">
                        ${(project.budget.allocated / 1000).toFixed(0)}K
                      </p>
                      <p className="text-xs text-gray-600">Budget</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{duration}</p>
                      <p className="text-xs text-gray-600">Days</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">{project.assignedEmployees.length}</p>
                      <p className="text-xs text-gray-600">Team</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold px-2 py-1 rounded ${getRiskColor(project.riskLevel)}`}>
                        {project.riskLevel.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-600">Risk</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Resource Allocation Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Allocation</h3>
          
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const budgetUsed = (project.budget.spent / project.budget.allocated) * 100;
              return (
                <div key={project.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{project.name}</span>
                    <span className="text-sm text-gray-600">
                      ${project.budget.spent.toLocaleString()} / ${project.budget.allocated.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${
                        budgetUsed > 90 ? 'bg-red-500' : 
                        budgetUsed > 75 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(100, budgetUsed)}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>{Math.round(budgetUsed)}% budget used</span>
                    <span>{project.assignedEmployees.length} team members</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Health Dashboard</h3>
          
          <div className="space-y-4">
            {filteredProjects.map((project) => {
              const health = calculateProjectHealth(project);
              const analytics = mockProjectAnalytics.find(a => a.projectId === project.id);
              
              return (
                <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium text-gray-900">{project.name}</h5>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${health.color} bg-opacity-10`}>
                      {health.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-blue-600">{project.confidenceScore}%</p>
                      <p className="text-xs text-gray-600">Confidence</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">
                        {analytics?.metrics.onTimeDelivery || 85}%
                      </p>
                      <p className="text-xs text-gray-600">On Time</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">
                        {analytics?.predictions.successProbability || 80}%
                      </p>
                      <p className="text-xs text-gray-600">Success</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedProject.name}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Type:</span> {selectedProject.type.replace('-', ' ')}</p>
                    <p><span className="font-medium">Status:</span> {selectedProject.status}</p>
                    <p><span className="font-medium">Priority:</span> {selectedProject.priority}</p>
                    <p><span className="font-medium">Progress:</span> {selectedProject.progressPercentage}%</p>
                    <p><span className="font-medium">Risk Level:</span> {selectedProject.riskLevel}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Timeline & Budget</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Start:</span> {selectedProject.startDate.toLocaleDateString()}</p>
                    <p><span className="font-medium">End:</span> {selectedProject.endDate.toLocaleDateString()}</p>
                    <p><span className="font-medium">Budget:</span> ${selectedProject.budget.allocated.toLocaleString()}</p>
                    <p><span className="font-medium">Spent:</span> ${selectedProject.budget.spent.toLocaleString()}</p>
                    <p><span className="font-medium">Hours:</span> {selectedProject.estimatedHours.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.requiredSkills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Team Members</h3>
                <div className="space-y-2">
                  {selectedProject.assignedEmployees.length > 0 ? (
                    selectedProject.assignedEmployees.map((assignment) => (
                      <div key={assignment.employeeId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{assignment.employeeName}</p>
                          <p className="text-sm text-gray-600">{assignment.role} • {assignment.allocation}% allocation</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            ${assignment.hourlyRate?.toLocaleString() || 75}/hr
                          </p>
                          {assignment.isLead && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Lead</span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No team members assigned yet</p>
                  )}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                >
                  Edit Project
                </button>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};