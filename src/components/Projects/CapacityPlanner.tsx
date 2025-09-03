import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, AlertTriangle, Clock, Target, BarChart3, Zap, CheckCircle } from 'lucide-react';
import { mockCapacityPlan } from '../../data/projectData';
import { mockEmployees } from '../../data/mockData';
import type { CapacityPlan, EmployeeCapacity } from '../../types/project';

export const CapacityPlanner: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'month' | 'quarter' | 'year'>('quarter');
  const [selectedView, setSelectedView] = useState<'overview' | 'employees' | 'projects' | 'bottlenecks'>('overview');
  const [capacityPlan] = useState<CapacityPlan>(mockCapacityPlan);

  const getUtilizationColor = (utilization: number) => {
    if (utilization > 90) return 'bg-red-500';
    if (utilization > 80) return 'bg-yellow-500';
    if (utilization > 60) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const getWorkloadColor = (allocation: number) => {
    if (allocation > 100) return 'bg-red-50 text-red-800 border-red-200';
    if (allocation > 80) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    if (allocation > 60) return 'bg-green-50 text-green-800 border-green-200';
    return 'bg-blue-50 text-blue-800 border-blue-200';
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(start);
      date.setMonth(date.getMonth() + i);
      slots.push({
        month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        utilization: Math.floor(Math.random() * 40) + 60, // 60-100%
        available: Math.floor(Math.random() * 5) + 2, // 2-7 people
        overallocated: Math.floor(Math.random() * 3) // 0-3 people
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Capacity Planning</h2>
          <p className="text-gray-600 mt-1">Optimize resource allocation and identify bottlenecks</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as typeof selectedTimeframe)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="month">Next Month</option>
            <option value="quarter">Next Quarter</option>
            <option value="year">Next Year</option>
          </select>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Updated 5 min ago</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-900">Current Utilization</p>
              <p className="text-xl font-bold text-blue-800">{capacityPlan.utilization.current}%</p>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-1.5">
            <div 
              className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${capacityPlan.utilization.current}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-900">Projected Utilization</p>
              <p className="text-xl font-bold text-green-800">{capacityPlan.utilization.projected}%</p>
            </div>
          </div>
          <div className="w-full bg-green-200 rounded-full h-1.5">
            <div 
              className="bg-green-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${capacityPlan.utilization.projected}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-purple-900">Available Employees</p>
              <p className="text-xl font-bold text-purple-800">
                {mockEmployees.filter(e => e.availability === 'available').length}
              </p>
            </div>
          </div>
          <p className="text-xs text-purple-600">Ready for assignment</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertTriangle size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-orange-900">Bottlenecks</p>
              <p className="text-xl font-bold text-orange-800">{capacityPlan.bottlenecks.length}</p>
            </div>
          </div>
          <p className="text-xs text-orange-600">Require attention</p>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'employees', label: 'Employee Capacity', icon: Users },
          { id: 'projects', label: 'Project Allocation', icon: Target },
          { id: 'bottlenecks', label: 'Bottlenecks', icon: AlertTriangle }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as typeof selectedView)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              <span>{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content based on selected view */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* Capacity Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-3">Capacity Timeline</h3>
            
            <div className="space-y-3">
              {timeSlots.slice(0, 6).map((slot, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-16 text-xs font-medium text-gray-700">
                    {slot.month}
                  </div>
                  
                  <div className="flex-1 flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-4 relative">
                      <div 
                        className={`h-4 rounded-full transition-all duration-500 ${getUtilizationColor(slot.utilization)}`}
                        style={{ width: `${Math.min(100, slot.utilization)}%` }}
                      ></div>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {slot.utilization}%
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-green-600 font-medium">
                        {slot.available} available
                      </span>
                      {slot.overallocated > 0 && (
                        <span className="text-red-600 font-medium">
                          {slot.overallocated} overallocated
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Utilization Targets */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target size={20} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Optimal Range</h4>
                  <p className="text-xs text-gray-600">Target utilization</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">75-85%</p>
              <p className="text-xs text-blue-700 mt-1">Balanced productivity and flexibility</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Current Status</h4>
                  <p className="text-xs text-gray-600">Team utilization</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-600">{capacityPlan.utilization.current}%</p>
              <p className="text-xs text-green-700 mt-1">Within optimal range</p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={20} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Forecast</h4>
                  <p className="text-xs text-gray-600">Next quarter</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-600">{capacityPlan.utilization.projected}%</p>
              <p className="text-xs text-purple-700 mt-1">Trending upward</p>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'employees' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Employee Capacity Overview</h3>
          
          <div className="space-y-4">
            {capacityPlan.employees.map((employee) => (
              <div key={employee.employeeId} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{employee.employeeName}</h4>
                      <p className="text-xs text-gray-600">{employee.department}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getWorkloadColor(employee.currentAllocation)}`}>
                      {employee.currentAllocation}% allocated
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Current Allocation</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${getUtilizationColor(employee.currentAllocation)}`}
                        style={{ width: `${Math.min(100, employee.currentAllocation)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-600">{employee.availableHours}h available this month</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {employee.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {employee.skills.length > 4 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          +{employee.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {employee.assignments.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-700 mb-2">Current Assignments</p>
                    <div className="space-y-2">
                      {employee.assignments.map((assignment, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                          <span className="text-gray-900">{assignment.projectName}</span>
                          <span className="text-xs text-gray-600">{assignment.allocation}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'projects' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Project Resource Allocation</h3>
          
          <div className="space-y-4">
            {capacityPlan.projects.map((project) => (
              <div key={project.projectId} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">{project.projectName}</h4>
                    <p className="text-xs text-gray-600">
                      {project.allocatedHours.toLocaleString()}h allocated of {project.requiredHours.toLocaleString()}h required
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      project.isOverAllocated 
                        ? 'bg-red-100 text-red-800' 
                        : project.utilizationRate > 80 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.utilizationRate}% staffed
                    </div>
                  </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      project.isOverAllocated ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(100, project.utilizationRate)}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Gap: {project.requiredHours - project.allocatedHours}h
                  </span>
                  {project.isOverAllocated && (
                    <span className="text-red-600 font-medium flex items-center space-x-1">
                      <AlertTriangle size={12} />
                      <span>Over-allocated</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'bottlenecks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Capacity Bottlenecks</h3>
            
            <div className="space-y-4">
              {capacityPlan.bottlenecks.map((bottleneck, index) => (
                <div key={index} className={`border rounded-lg p-4 ${
                  bottleneck.impact === 'high' ? 'border-red-200 bg-red-50' :
                  bottleneck.impact === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        bottleneck.impact === 'high' ? 'bg-red-100' :
                        bottleneck.impact === 'medium' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <AlertTriangle size={20} className={
                          bottleneck.impact === 'high' ? 'text-red-600' :
                          bottleneck.impact === 'medium' ? 'text-yellow-600' :
                          'text-blue-600'
                        } />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 capitalize">{bottleneck.type} Bottleneck</h4>
                        <p className="text-xs text-gray-600">{bottleneck.description}</p>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      bottleneck.impact === 'high' ? 'bg-red-100 text-red-800' :
                      bottleneck.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {bottleneck.impact} impact
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Affected Projects</p>
                      <div className="flex flex-wrap gap-2">
                        {bottleneck.affectedProjects.map((projectId) => (
                          <span key={projectId} className="px-2 py-0.5 bg-white text-gray-800 rounded text-xs border">
                            Project {projectId}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-700 mb-2">Recommendations</p>
                      <ul className="space-y-1">
                        {bottleneck.recommendations.map((rec, recIndex) => (
                          <li key={recIndex} className="text-xs text-gray-700 flex items-start space-x-2">
                            <Zap size={10} className="text-blue-500 mt-1 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-5">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">AI Optimization Recommendations</h3>
                <p className="text-xs text-gray-600">Based on current capacity analysis</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {capacityPlan.recommendations.map((recommendation, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-gray-800">{recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};