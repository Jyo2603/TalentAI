import React, { useState } from 'react';
import { Plus, Target, Brain, BarChart3, Users, Download } from 'lucide-react';
import { ProjectCreationWizard } from './ProjectCreationWizard';
import { SmartMatchingEngine } from './SmartMatchingEngine';
import { ProjectPortfolio } from './ProjectPortfolio';
import { mockProjects } from '../../data/projectData';
import type { Project } from '../../types/project';

type TabType = 'portfolio' | 'matching';

export const Projects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('portfolio');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showCreateWizard, setShowCreateWizard] = useState(false);

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
      'Team Size'
    ];

    const csvData = projects.map(project => [
      project.name,
      project.type.replace('-', ' '),
      project.status,
      project.priority,
      project.startDate.toLocaleDateString(),
      project.endDate.toLocaleDateString(),
      project.progressPercentage.toString(),
      project.budget.allocated.toString(),
      project.assignedEmployees.length.toString()
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `projects-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const tabs = [
    { 
      id: 'portfolio' as TabType, 
      label: 'Portfolio View', 
      icon: BarChart3,
      description: 'Gantt charts and project overview'
    },
    { 
      id: 'matching' as TabType, 
      label: 'Smart Matching', 
      icon: Brain,
      description: 'AI-powered hire vs assign analysis'
    }
  ];

  const handleCreateProject = (projectData: Partial<Project>) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: projectData.name || 'New Project',
      description: projectData.description || '',
      type: projectData.type || 'web-app',
      status: 'planning',
      priority: projectData.priority || 'medium',
      startDate: projectData.startDate || new Date(),
      endDate: projectData.endDate || new Date(),
      estimatedHours: projectData.estimatedHours || 0,
      actualHours: 0,
      budget: projectData.budget || { allocated: 0, spent: 0, currency: 'USD' },
      requiredSkills: projectData.requiredSkills || [],
      skillGaps: [],
      minTeamSize: projectData.minTeamSize || 3,
      maxTeamSize: projectData.maxTeamSize || 6,
      assignedEmployees: [],
      stakeholders: projectData.stakeholders || [],
      milestones: projectData.milestones || [],
      deliverables: projectData.deliverables || [],
      progressPercentage: 0,
      createdBy: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      approvalStatus: 'pending',
      riskLevel: 'medium',
      confidenceScore: 75,
      estimatedROI: (projectData.budget?.allocated || 0) * 1.5
    };
    
    setProjects(prev => [newProject, ...prev]);
    setShowCreateWizard(false);
    setActiveTab('portfolio');
  };

  const handleUpdateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(project =>
        project.id === projectId ? { ...project, ...updates, updatedAt: new Date() } : project
      )
    );
  };

  const handleAssignEmployee = (employeeId: string, role: string) => {
    if (!selectedProject) return;
    alert(`Assigning employee ${employeeId} as ${role} to ${selectedProject.name}`);
  };

  const handleRequestHiring = (skills: string[]) => {
    alert(`Requesting to hire candidates with skills: ${skills.join(', ')}`);
  };

  const activeProjects = projects.filter(p => p.status === 'active').length;
  const planningProjects = projects.filter(p => p.status === 'planning').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget.allocated, 0);
  const avgProgress = projects.length
    ? Math.round(projects.reduce((sum, p) => sum + p.progressPercentage, 0) / projects.length)
    : 0;

  const renderContent = () => {
    switch (activeTab) {
      case 'portfolio':
        return <ProjectPortfolio />;
      case 'matching':
        return (
          <div className="space-y-6">
            {!selectedProject ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Brain size={32} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Select a Project for AI Analysis</h3>
                <p className="text-gray-600 mb-8">Choose a project to get intelligent hire vs assign recommendations</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {projects.map(project => (
                    <div
                      key={project.id}
                      onClick={() => setSelectedProject(project)}
                      className="border border-gray-200 hover:border-blue-300 hover:shadow-md rounded-lg p-6 cursor-pointer transition-all bg-white"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <Target size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.type.replace('-', ' ')}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">{project.requiredSkills.length} skills needed</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <SmartMatchingEngine
                project={selectedProject}
                onAssignEmployee={handleAssignEmployee}
                onRequestHiring={handleRequestHiring}
                onBack={() => setSelectedProject(null)}
              />
            )}
          </div>
        );
      default:
        return <ProjectPortfolio />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">AI-powered project management and resource optimization</p>
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
            onClick={() => setShowCreateWizard(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
          >
            <Plus size={18} />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75 mt-0.5">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Project Creation Wizard */}
      {showCreateWizard && (
        <ProjectCreationWizard 
          onSave={handleCreateProject} 
          onCancel={() => setShowCreateWizard(false)} 
        />
      )}
    </div>
  );
};