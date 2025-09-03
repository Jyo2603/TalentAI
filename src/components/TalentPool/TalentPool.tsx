import React, { useState } from 'react';
import { Search, Filter, Users, Clock, CheckSquare, ArrowUpDown, Download, BarChart3, Calendar, TrendingUp, AlertTriangle, Target, Plus, Eye } from 'lucide-react';
import { EmployeeCard } from './EmployeeCard';
import { SkillsFilter } from './SkillsFilter';
import { mockEmployees } from '../../data/mockData';
import type { Employee } from '../../types';

type SortOption = 'name' | 'experience' | 'availability' | 'workload' | 'availableDate';

export const TalentPool: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<Employee['availability'] | 'all'>('all');
  const [workloadFilter, setWorkloadFilter] = useState<Employee['currentWorkload'] | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [showBenchAnalytics, setShowBenchAnalytics] = useState(false);

  const filteredEmployees = mockEmployees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.every(skill => employee.skills.includes(skill));
    
    const matchesAvailability = availabilityFilter === 'all' || 
                               employee.availability === availabilityFilter;
    
    const matchesWorkload = workloadFilter === 'all' || 
                           employee.currentWorkload === workloadFilter;
    
    return matchesSearch && matchesSkills && matchesAvailability && matchesWorkload;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'experience':
        return b.experience - a.experience;
      case 'availability':
        const availabilityOrder = { 'available': 0, 'assigned': 1, 'unavailable': 2 };
        return availabilityOrder[a.availability] - availabilityOrder[b.availability];
      case 'workload':
        const workloadOrder = { 'light': 0, 'medium': 1, 'heavy': 2 };
        return workloadOrder[a.currentWorkload] - workloadOrder[b.currentWorkload];
      case 'availableDate':
        if (!a.availableDate && !b.availableDate) return 0;
        if (!a.availableDate) return 1;
        if (!b.availableDate) return -1;
        return a.availableDate.getTime() - b.availableDate.getTime();
      default:
        return 0;
    }
  });

  // Bench-specific data
  const benchEmployees = mockEmployees.filter(emp => emp.availability === 'available');
  
  // Get employees who are currently assigned but will become available within 30 days
  const upcomingAvailable = mockEmployees.filter(emp => {
    // Must NOT be currently available
    if (emp.availability === 'available') return false;
    
    // Must have an available date
    if (!emp.availableDate) return false;
    
    // Available date must be in the future but within 30 days
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const availableDate = new Date(emp.availableDate);
    availableDate.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    
    return availableDate >= today && availableDate <= thirtyDaysFromNow;
  });
  
  const benchSkills = benchEmployees.reduce((acc, emp) => {
    emp.skills.forEach(skill => {
      acc[skill] = (acc[skill] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);
  
  const topBenchSkills = Object.entries(benchSkills)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 8);

  const avgBenchTime = benchEmployees.length > 0 
    ? Math.round(benchEmployees.reduce((sum, emp) => {
        const daysSinceAvailable = emp.availableDate 
          ? Math.max(0, (new Date().getTime() - emp.availableDate.getTime()) / (1000 * 60 * 60 * 24))
          : 0;
        return sum + daysSinceAvailable;
      }, 0) / benchEmployees.length)
    : 0;

  const availableCount = mockEmployees.filter(emp => emp.availability === 'available').length;
  const assignedCount = mockEmployees.filter(emp => emp.availability === 'assigned').length;
  const lightWorkloadCount = mockEmployees.filter(emp => emp.currentWorkload === 'light').length;
  const heavyWorkloadCount = mockEmployees.filter(emp => emp.currentWorkload === 'heavy').length;
  
  const comingAvailable = mockEmployees.filter(emp => 
    emp.availableDate && 
    emp.availableDate > new Date() && 
    emp.availableDate <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ).length;
  const utilizationRate = Math.round((assignedCount / mockEmployees.length) * 100);

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId) 
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedEmployees.length === filteredEmployees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    }
  };

  const handleBulkAssign = () => {
    if (selectedEmployees.length === 0) return;
    alert(`Assigning ${selectedEmployees.length} employees to project. This would open a project selection modal.`);
    setSelectedEmployees([]);
    setShowBulkActions(false);
  };

  const handleExportData = () => {
    const csvHeaders = [
      'Name',
      'Email',
      'Department',
      'Availability',
      'Workload',
      'Experience (Years)',
      'Current Project',
      'Available Date',
      'Skills',
      'Certifications'
    ];

    const csvData = filteredEmployees.map(employee => [
      employee.name,
      employee.email,
      employee.department,
      employee.availability,
      employee.currentWorkload,
      employee.experience.toString(),
      employee.currentProject || '',
      employee.availableDate?.toLocaleDateString() || '',
      employee.skills.join('; '),
      employee.certifications.join('; ')
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `employees-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="text-gray-600 mt-1">Manage internal employees and their availability</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowBenchAnalytics(!showBenchAnalytics)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors font-medium ${
              showBenchAnalytics 
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <BarChart3 size={16} />
            <span>Bench Analytics</span>
          </button>
          
          <button 
            onClick={handleExportData}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Available</p>
              <p className="text-xl font-semibold text-gray-900">{availableCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Assigned</p>
              <p className="text-xl font-semibold text-gray-900">{assignedCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Light Workload</p>
              <p className="text-xl font-semibold text-gray-900">{lightWorkloadCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Utilization</p>
              <p className="text-xl font-semibold text-gray-900">{utilizationRate}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bench Analytics Dashboard */}
      {showBenchAnalytics && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Bench Analytics Dashboard</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={14} />
              <span>Real-time data</span>
            </div>
          </div>

          {/* Bench Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users size={18} className="text-blue-600" />
                <span className="font-medium text-blue-900">On Bench</span>
              </div>
              <p className="text-2xl font-semibold text-blue-800">{benchEmployees.length}</p>
              <p className="text-sm text-blue-600">Available now</p>
            </div>

            <div className="bg-green-50 rounded-lg border border-green-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock size={18} className="text-green-600" />
                <span className="font-medium text-green-900">Avg Bench Time</span>
              </div>
              <p className="text-2xl font-semibold text-green-800">{avgBenchTime}</p>
              <p className="text-sm text-green-600">Days</p>
            </div>

            <div className="bg-purple-50 rounded-lg border border-purple-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Calendar size={18} className="text-purple-600" />
                <span className="font-medium text-purple-900">Coming Available</span>
              </div>
              <p className="text-2xl font-semibold text-purple-800">{comingAvailable}</p>
              <p className="text-sm text-purple-600">Next 30 days</p>
            </div>

            <div className="bg-orange-50 rounded-lg border border-orange-200 p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp size={18} className="text-orange-600" />
                <span className="font-medium text-orange-900">Utilization Rate</span>
              </div>
              <p className="text-2xl font-semibold text-orange-800">{utilizationRate}%</p>
              <p className="text-sm text-orange-600">Team assigned</p>
            </div>
          </div>

          {/* Skills on Bench */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Available on Bench</h3>
              <div className="space-y-3">
                {topBenchSkills.map(([skill, count]) => (
                  <div key={skill} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900">{skill}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{count} employee{count !== 1 ? 's' : ''}</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(count / benchEmployees.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Availability</h3>
              <div className="space-y-3">
                {upcomingAvailable.length > 0 ? (
                  upcomingAvailable.slice(0, 5).map((employee) => {
                    const daysUntil = employee.availableDate 
                      ? Math.ceil((employee.availableDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                      : 0;
                    return (
                      <div key={employee.id} className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {employee.avatar ? (
                              <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                            ) : (
                              <Users size={16} className="text-gray-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-purple-800">
                            {daysUntil === 0 ? 'Today' : 
                             daysUntil === 1 ? 'Tomorrow' : 
                             `${daysUntil} days`}
                          </p>
                          <p className="text-xs text-purple-600">
                            {employee.availableDate?.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    <Calendar size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No employees becoming available soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bench Alerts */}
          {benchEmployees.length > 5 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle size={16} className="text-yellow-600" />
                <span className="font-medium text-yellow-900">High Bench Alert</span>
              </div>
              <p className="text-sm text-yellow-800">
                You have {benchEmployees.length} employees on bench. Consider assigning them to projects to optimize utilization.
              </p>
            </div>
          )}

          {/* Quick Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
            <button 
              onClick={() => {
                setAvailabilityFilter('available');
                setShowBenchAnalytics(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
            >
              <Users size={16} />
              <span>View Available</span>
            </button>
            
            <button 
              onClick={() => setShowBulkActions(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 font-medium"
            >
              <CheckSquare size={16} />
              <span>Bulk Assign</span>
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by name, department, or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value as Employee['availability'] | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Availability</option>
              <option value="available">Available</option>
              <option value="assigned">Assigned</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>

          <div>
            <select
              value={workloadFilter}
              onChange={(e) => setWorkloadFilter(e.target.value as Employee['currentWorkload'] | 'all')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Workloads</option>
              <option value="light">Light Workload</option>
              <option value="medium">Medium Workload</option>
              <option value="heavy">Heavy Workload</option>
            </select>
          </div>

          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="experience">Sort by Experience</option>
              <option value="availability">Sort by Availability</option>
              <option value="workload">Sort by Workload</option>
              <option value="availableDate">Sort by Available Date</option>
            </select>
          </div>

          <div>
            <button 
              onClick={() => setShowBulkActions(!showBulkActions)}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2 border rounded-lg transition-colors font-medium ${
                showBulkActions 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <CheckSquare size={16} />
              <span>Bulk Select</span>
            </button>
          </div>
        </div>

        <SkillsFilter 
          selectedSkills={selectedSkills}
          onSkillsChange={setSelectedSkills}
        />

        {/* Bulk Actions Bar */}
        {showBulkActions && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
                >
                  <CheckSquare size={16} />
                  <span>
                    {selectedEmployees.length === filteredEmployees.length ? 'Deselect All' : 'Select All'}
                  </span>
                </button>
                
                {selectedEmployees.length > 0 && (
                  <span className="text-blue-800 font-medium">
                    {selectedEmployees.length} employee{selectedEmployees.length !== 1 ? 's' : ''} selected
                  </span>
                )}
              </div>
              
              {selectedEmployees.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBulkAssign}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Assign to Project
                  </button>
                  <button
                    onClick={() => setSelectedEmployees([])}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard 
            key={employee.id} 
            employee={employee}
            isSelected={selectedEmployees.includes(employee.id)}
            showBulkSelect={showBulkActions}
            onSelect={handleSelectEmployee}
          />
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No employees found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};