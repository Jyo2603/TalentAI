import React, { useState } from 'react';
import { Users, Mail, Bell, Calendar, MessageSquare, Settings, Plus, Edit, Trash2, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { mockProjects } from '../../data/projectData';
import type { Project, ProjectStakeholder } from '../../types/project';

interface StakeholderManagementProps {
  projects: Project[];
  onUpdateProject: (projectId: string, updates: Partial<Project>) => void;
}

export const StakeholderManagement: React.FC<StakeholderManagementProps> = ({
  projects,
  onUpdateProject
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddStakeholder, setShowAddStakeholder] = useState(false);
  const [newStakeholder, setNewStakeholder] = useState({
    name: '',
    email: '',
    role: 'observer' as ProjectStakeholder['role'],
    department: '',
    notificationPreferences: [] as string[]
  });

  const notificationTypes = [
    { id: 'milestone-updates', label: 'Milestone Updates', description: 'When milestones are completed or delayed' },
    { id: 'status-changes', label: 'Status Changes', description: 'When project status changes' },
    { id: 'budget-alerts', label: 'Budget Alerts', description: 'When budget thresholds are reached' },
    { id: 'resource-changes', label: 'Resource Changes', description: 'When team members are added/removed' },
    { id: 'risk-alerts', label: 'Risk Alerts', description: 'When project risks are identified' },
    { id: 'weekly-reports', label: 'Weekly Reports', description: 'Weekly progress summaries' }
  ];

  const getRoleColor = (role: ProjectStakeholder['role']) => {
    switch (role) {
      case 'sponsor': return 'bg-purple-100 text-purple-800';
      case 'product-owner': return 'bg-blue-100 text-blue-800';
      case 'tech-lead': return 'bg-green-100 text-green-800';
      case 'observer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: ProjectStakeholder['role']) => {
    switch (role) {
      case 'sponsor': return '👑';
      case 'product-owner': return '🎯';
      case 'tech-lead': return '⚡';
      case 'observer': return '👁️';
      default: return '👤';
    }
  };

  const handleAddStakeholder = () => {
    if (!selectedProject || !newStakeholder.name || !newStakeholder.email) return;

    const stakeholder: ProjectStakeholder = {
      id: Date.now().toString(),
      name: newStakeholder.name,
      email: newStakeholder.email,
      role: newStakeholder.role,
      department: newStakeholder.department,
      notificationPreferences: newStakeholder.notificationPreferences
    };

    const updatedStakeholders = [...selectedProject.stakeholders, stakeholder];
    onUpdateProject(selectedProject.id, { stakeholders: updatedStakeholders });
    
    setNewStakeholder({
      name: '',
      email: '',
      role: 'observer',
      department: '',
      notificationPreferences: []
    });
    setShowAddStakeholder(false);
  };

  const handleRemoveStakeholder = (stakeholderId: string) => {
    if (!selectedProject) return;
    
    const updatedStakeholders = selectedProject.stakeholders.filter(s => s.id !== stakeholderId);
    onUpdateProject(selectedProject.id, { stakeholders: updatedStakeholders });
  };

  const allStakeholders = projects.flatMap(p => 
    p.stakeholders.map(s => ({ ...s, projectName: p.name, projectId: p.id }))
  );

  const stakeholderStats = {
    total: allStakeholders.length,
    sponsors: allStakeholders.filter(s => s.role === 'sponsor').length,
    productOwners: allStakeholders.filter(s => s.role === 'product-owner').length,
    techLeads: allStakeholders.filter(s => s.role === 'tech-lead').length,
    observers: allStakeholders.filter(s => s.role === 'observer').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Stakeholder Management</h2>
          <p className="text-gray-600 mt-1">Manage project stakeholders and communication</p>
        </div>
      </div>

      {/* Stakeholder Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{stakeholderStats.total}</p>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">👑</span>
            <span className="text-sm font-medium text-purple-900">Sponsors</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{stakeholderStats.sponsors}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">🎯</span>
            <span className="text-sm font-medium text-green-900">Product Owners</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{stakeholderStats.productOwners}</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">⚡</span>
            <span className="text-sm font-medium text-yellow-900">Tech Leads</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{stakeholderStats.techLeads}</p>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg">👁️</span>
            <span className="text-sm font-medium text-gray-900">Observers</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stakeholderStats.observers}</p>
        </div>
      </div>

      {/* Project Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Project</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedProject?.id === project.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  project.status === 'planning' ? 'bg-blue-100 text-blue-800' :
                  project.status === 'active' ? 'bg-green-100 text-green-800' :
                  project.status === 'on-hold' ? 'bg-yellow-100 text-yellow-800' :
                  project.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{project.stakeholders.length} stakeholders</span>
                <span className="text-gray-600">{project.assignedEmployees.length} team members</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stakeholder Details */}
      {selectedProject && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Stakeholders for {selectedProject.name}
            </h3>
            <button
              onClick={() => setShowAddStakeholder(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Plus size={16} />
              <span>Add Stakeholder</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedProject.stakeholders.map((stakeholder) => (
              <div key={stakeholder.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getRoleIcon(stakeholder.role)}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{stakeholder.name}</h4>
                      <p className="text-sm text-gray-600">{stakeholder.email}</p>
                      <p className="text-xs text-gray-500">{stakeholder.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(stakeholder.role)}`}>
                      {stakeholder.role.replace('-', ' ')}
                    </span>
                    <button
                      onClick={() => handleRemoveStakeholder(stakeholder.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-700">Notification Preferences</p>
                  <div className="flex flex-wrap gap-1">
                    {stakeholder.notificationPreferences.map((pref) => (
                      <span key={pref} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {pref.replace('-', ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-3 border-t border-gray-100">
                  <button className="flex-1 bg-green-100 hover:bg-green-200 text-green-800 py-2 rounded text-xs transition-colors flex items-center justify-center space-x-1">
                    <Mail size={12} />
                    <span>Email</span>
                  </button>
                  <button className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 rounded text-xs transition-colors flex items-center justify-center space-x-1">
                    <Calendar size={12} />
                    <span>Schedule</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Stakeholder Modal */}
      {showAddStakeholder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add New Stakeholder</h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={newStakeholder.name}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={newStakeholder.email}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.doe@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={newStakeholder.role}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, role: e.target.value as ProjectStakeholder['role'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="sponsor">Sponsor</option>
                    <option value="product-owner">Product Owner</option>
                    <option value="tech-lead">Tech Lead</option>
                    <option value="observer">Observer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={newStakeholder.department}
                    onChange={(e) => setNewStakeholder({ ...newStakeholder, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Engineering"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Notification Preferences</label>
                <div className="grid grid-cols-2 gap-3">
                  {notificationTypes.map((type) => (
                    <label key={type.id} className="flex items-start space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newStakeholder.notificationPreferences.includes(type.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewStakeholder({
                              ...newStakeholder,
                              notificationPreferences: [...newStakeholder.notificationPreferences, type.id]
                            });
                          } else {
                            setNewStakeholder({
                              ...newStakeholder,
                              notificationPreferences: newStakeholder.notificationPreferences.filter(p => p !== type.id)
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded mt-1"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{type.label}</p>
                        <p className="text-xs text-gray-600">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddStakeholder}
                  disabled={!newStakeholder.name || !newStakeholder.email}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors"
                >
                  Add Stakeholder
                </button>
                <button
                  onClick={() => setShowAddStakeholder(false)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Hub */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Communication Hub</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MessageSquare size={24} className="text-green-600" />
            </div>
            <h4 className="font-medium text-green-900 mb-2">Weekly Reports</h4>
            <p className="text-sm text-green-700 mb-4">Automated weekly progress reports to all stakeholders</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Configure Reports
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Bell size={24} className="text-blue-600" />
            </div>
            <h4 className="font-medium text-blue-900 mb-2">Smart Alerts</h4>
            <p className="text-sm text-blue-700 mb-4">AI-powered alerts for project risks and opportunities</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Setup Alerts
            </button>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calendar size={24} className="text-purple-600" />
            </div>
            <h4 className="font-medium text-purple-900 mb-2">Meeting Scheduler</h4>
            <p className="text-sm text-purple-700 mb-4">Schedule stakeholder meetings and reviews</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
              Schedule Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};