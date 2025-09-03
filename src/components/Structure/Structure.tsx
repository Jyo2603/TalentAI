import React, { useState } from 'react';
import { Building, Users, TrendingUp, BarChart3, User, Plus, Edit, ChevronDown, ChevronRight, Target, Award, DollarSign, Search, Filter, Eye, Settings } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  description: string;
  headId: string;
  headName: string;
  headAvatar?: string;
  employeeCount: number;
  budget: number;
  teams: string[];
  parentDepartmentId?: string;
  growth: number;
  efficiency: number;
}

interface OrganizationLevel {
  id: string;
  name: string;
  level: number;
  parentId?: string;
  children: OrganizationLevel[];
  employeeCount: number;
  type: 'company' | 'division' | 'department' | 'team';
  budget?: number;
  head?: string;
}

const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Engineering',
    description: 'Software development and technical infrastructure',
    headId: '1',
    headName: 'Michael Rodriguez',
    headAvatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg',
    employeeCount: 45,
    budget: 2400000,
    teams: ['Frontend Team', 'Backend Team', 'DevOps Team', 'Mobile Team'],
    growth: 12,
    efficiency: 94
  },
  {
    id: '2',
    name: 'Product',
    description: 'Product strategy, design, and user experience',
    headId: '2',
    headName: 'Emily Johnson',
    headAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    employeeCount: 18,
    budget: 980000,
    teams: ['Product Management', 'UX Design', 'Product Analytics'],
    growth: 8,
    efficiency: 89
  },
  {
    id: '3',
    name: 'Sales',
    description: 'Revenue generation and customer acquisition',
    headId: '3',
    headName: 'Lisa Thompson',
    headAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    employeeCount: 22,
    budget: 1200000,
    teams: ['Enterprise Sales', 'SMB Sales', 'Sales Development'],
    growth: 15,
    efficiency: 92
  },
  {
    id: '4',
    name: 'Marketing',
    description: 'Brand, demand generation, and customer marketing',
    headId: '4',
    headName: 'Jennifer Lee',
    headAvatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    employeeCount: 12,
    budget: 800000,
    teams: ['Growth Marketing', 'Content Marketing', 'Brand Marketing'],
    growth: 10,
    efficiency: 87
  },
  {
    id: '5',
    name: 'Customer Success',
    description: 'Customer support and relationship management',
    headId: '5',
    headName: 'Robert Kim',
    headAvatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    employeeCount: 16,
    budget: 720000,
    teams: ['Support Team', 'Success Team', 'Implementation Team'],
    growth: 6,
    efficiency: 91
  },
  {
    id: '6',
    name: 'Security',
    description: 'Information security and compliance',
    headId: '6',
    headName: 'Alex Thompson',
    headAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    employeeCount: 8,
    budget: 650000,
    teams: ['Security Operations', 'Compliance Team'],
    growth: 20,
    efficiency: 96
  }
];

const organizationStructure: OrganizationLevel = {
  id: 'company',
  name: 'QuantumCore Technologies',
  level: 0,
  children: [
    {
      id: 'engineering',
      name: 'Engineering',
      level: 1,
      parentId: 'company',
      employeeCount: 45,
      type: 'department',
      budget: 2400000,
      head: 'Michael Rodriguez',
      children: [
        {
          id: 'frontend',
          name: 'Frontend Team',
          level: 2,
          parentId: 'engineering',
          employeeCount: 15,
          type: 'team',
          head: 'Jennifer Walsh',
          children: []
        },
        {
          id: 'backend',
          name: 'Backend Team',
          level: 2,
          parentId: 'engineering',
          employeeCount: 18,
          type: 'team',
          head: 'Robert Garcia',
          children: []
        },
        {
          id: 'devops',
          name: 'DevOps Team',
          level: 2,
          parentId: 'engineering',
          employeeCount: 12,
          type: 'team',
          head: 'David Park',
          children: []
        }
      ]
    },
    {
      id: 'product',
      name: 'Product',
      level: 1,
      parentId: 'company',
      employeeCount: 18,
      type: 'department',
      budget: 980000,
      head: 'Emily Johnson',
      children: []
    },
    {
      id: 'sales',
      name: 'Sales',
      level: 1,
      parentId: 'company',
      employeeCount: 22,
      type: 'department',
      budget: 1200000,
      head: 'Lisa Thompson',
      children: []
    }
  ],
  employeeCount: 121,
  type: 'company'
};

export const Structure: React.FC = () => {
  const [activeView, setActiveView] = useState<'departments' | 'org-chart'>('departments');
  const [departments, setDepartments] = useState(mockDepartments);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['company']));

  const filteredDepartments = departments.filter(dept =>
    searchTerm === '' || 
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.headName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const renderOrgChart = (node: OrganizationLevel, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;

    const getNodeColor = (type: OrganizationLevel['type']) => {
      switch (type) {
        case 'company': return 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-purple-300';
        case 'division': return 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-blue-300';
        case 'department': return 'bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-300';
        case 'team': return 'bg-gradient-to-br from-orange-500 to-yellow-600 text-white border-orange-300';
        default: return 'bg-gray-100 border-gray-300 text-gray-800';
      }
    };

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div 
          className={`relative border-2 rounded-xl p-4 min-w-[220px] text-center shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer ${getNodeColor(node.type)}`}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {hasChildren && (
            <button className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
          
          <div className="mb-2">
            <h4 className="font-bold text-lg">{node.name}</h4>
            {node.head && (
              <p className="text-sm opacity-90">{node.head}</p>
            )}
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium">{node.employeeCount} employees</p>
            {node.budget && (
              <p className="text-xs opacity-80">${(node.budget / 1000000).toFixed(1)}M budget</p>
            )}
            <p className="text-xs opacity-70 capitalize">{node.type}</p>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-6">
            <div className="w-px h-6 bg-gray-300 mx-auto"></div>
            <div className="flex justify-center space-x-8">
              {node.children.map((child, index) => (
                <div key={child.id} className="relative">
                  <div className="w-px h-6 bg-gray-300 mx-auto"></div>
                  <div className="w-full h-px bg-gray-300"></div>
                  {renderOrgChart(child, depth + 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + dept.budget, 0);
  const avgGrowth = Math.round(departments.reduce((sum, dept) => sum + dept.growth, 0) / departments.length);
  const avgEfficiency = Math.round(departments.reduce((sum, dept) => sum + dept.efficiency, 0) / departments.length);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Structure</h1>
            <p className="text-gray-600 mt-2">View and manage company organizational hierarchy</p>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl">
            <Plus size={18} />
            <span>Add Department</span>
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Building size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Departments</p>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Users size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-2xl font-bold text-gray-900">${(totalBudget / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Growth</p>
              <p className="text-2xl font-bold text-gray-900">{avgGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8 inline-flex">
        <button
          onClick={() => setActiveView('departments')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeView === 'departments'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Building size={18} />
          <span>Departments</span>
        </button>
        <button
          onClick={() => setActiveView('org-chart')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeView === 'org-chart'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <BarChart3 size={18} />
          <span>Org Chart</span>
        </button>
      </div>

      {/* Content */}
      {activeView === 'departments' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDepartments.map((department) => (
              <div key={department.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group">
                <div className="p-6">
                  {/* Department Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Building size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {department.name}
                        </h3>
                        <p className="text-sm text-gray-500">{department.employeeCount} employees</p>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Settings size={16} className="text-gray-600" />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{department.description}</p>

                  {/* Department Head */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                        {department.headAvatar ? (
                          <img src={department.headAvatar} alt={department.headName} className="w-full h-full object-cover" />
                        ) : (
                          <User size={16} className="text-gray-600 mt-2 ml-2" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{department.headName}</p>
                        <p className="text-xs text-gray-600">Department Head</p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-900">${(department.budget / 1000000).toFixed(1)}M</p>
                      <p className="text-xs text-gray-600">Budget</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{department.growth}%</p>
                      <p className="text-xs text-gray-600">Growth</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{department.efficiency}%</p>
                      <p className="text-xs text-gray-600">Efficiency</p>
                    </div>
                  </div>

                  {/* Teams */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Teams ({department.teams.length})</p>
                    <div className="space-y-1">
                      {department.teams.slice(0, 3).map((team) => (
                        <div key={team} className="flex items-center space-x-2 text-xs text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>{team}</span>
                        </div>
                      ))}
                      {department.teams.length > 3 && (
                        <p className="text-xs text-gray-500">+{department.teams.length - 3} more teams</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedDepartment(department)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg transition-colors">
                      <Edit size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'org-chart' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Organization Chart</h3>
            <p className="text-gray-600">Interactive organizational hierarchy</p>
          </div>
          
          <div className="overflow-x-auto">
            <div className="min-w-max flex justify-center">
              {renderOrgChart(organizationStructure)}
            </div>
          </div>
        </div>
      )}

      {/* Department Detail Modal */}
      {selectedDepartment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDepartment.name}</h2>
                  <p className="text-gray-600 mt-1">{selectedDepartment.employeeCount} employees • ${(selectedDepartment.budget / 1000000).toFixed(1)}M budget</p>
                </div>
                <button
                  onClick={() => setSelectedDepartment(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-600 text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Department Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Users size={20} className="text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Team Size</p>
                      <p className="text-xl font-bold text-blue-800">{selectedDepartment.employeeCount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center space-x-3">
                    <TrendingUp size={20} className="text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-900">Growth Rate</p>
                      <p className="text-xl font-bold text-green-800">{selectedDepartment.growth}%</p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <Award size={20} className="text-purple-600" />
                    <div>
                      <p className="text-sm font-medium text-purple-900">Efficiency</p>
                      <p className="text-xl font-bold text-purple-800">{selectedDepartment.efficiency}%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Department Head */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Leadership</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                    {selectedDepartment.headAvatar ? (
                      <img src={selectedDepartment.headAvatar} alt={selectedDepartment.headName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={32} className="text-gray-600 mt-4 ml-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedDepartment.headName}</h4>
                    <p className="text-gray-600">Department Head</p>
                    <p className="text-sm text-gray-500">{selectedDepartment.department}</p>
                  </div>
                </div>
              </div>

              {/* Teams */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Teams ({selectedDepartment.teams.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDepartment.teams.map((team, index) => (
                    <div key={team} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{team}</p>
                          <p className="text-xs text-gray-600">{Math.floor(Math.random() * 8) + 3} members</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors font-medium">
                  Edit Department
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                  Add Team
                </button>
                <button 
                  onClick={() => setSelectedDepartment(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
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