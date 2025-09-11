import React, { useState } from 'react';
import { Download, Filter, Search, TrendingUp, Users, Award, Clock, FileText, Eye, BarChart3 } from 'lucide-react';
import type { Assessment } from '../../types/assessment';

interface CandidateResult {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  assessmentTitle: string;
  atsScore: number;
  assessmentScore: number;
  status: 'not-started' | 'in-progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  timeSpent?: number;
  totalQuestions: number;
  answeredQuestions: number;
}

interface ResultsDashboardProps {
  assessments: Assessment[];
}

const mockResults: CandidateResult[] = [
  {
    id: '1',
    candidateName: 'Alex Johnson',
    candidateEmail: 'alex.johnson@email.com',
    jobTitle: 'Senior Frontend Developer',
    assessmentTitle: 'Frontend Developer Assessment',
    atsScore: 92,
    assessmentScore: 87,
    status: 'completed',
    startedAt: new Date('2025-01-14T10:00:00'),
    completedAt: new Date('2025-01-14T10:42:00'),
    timeSpent: 42,
    totalQuestions: 15,
    answeredQuestions: 15
  },
  {
    id: '2',
    candidateName: 'Maria Rodriguez',
    candidateEmail: 'maria.rodriguez@email.com',
    jobTitle: 'AI/ML Engineer',
    assessmentTitle: 'AI-Generated: AI/ML Engineer Assessment',
    atsScore: 88,
    assessmentScore: 94,
    status: 'completed',
    startedAt: new Date('2025-01-13T14:00:00'),
    completedAt: new Date('2025-01-13T15:15:00'),
    timeSpent: 75,
    totalQuestions: 12,
    answeredQuestions: 12
  },
  {
    id: '3',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    jobTitle: 'Frontend Developer',
    assessmentTitle: 'Frontend Developer Assessment',
    atsScore: 85,
    assessmentScore: 76,
    status: 'completed',
    startedAt: new Date('2025-01-15T09:00:00'),
    completedAt: new Date('2025-01-15T09:38:00'),
    timeSpent: 38,
    totalQuestions: 15,
    answeredQuestions: 15
  },
  {
    id: '4',
    candidateName: 'Sarah Wilson',
    candidateEmail: 'sarah.wilson@email.com',
    jobTitle: 'Data Analyst',
    assessmentTitle: 'Data Analyst Assessment',
    atsScore: 79,
    assessmentScore: 0,
    status: 'in-progress',
    startedAt: new Date('2025-01-15T11:00:00'),
    totalQuestions: 14,
    answeredQuestions: 8
  }
];

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({ assessments }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CandidateResult['status']>('all');
  const [selectedResult, setSelectedResult] = useState<CandidateResult | null>(null);

  const filteredResults = mockResults.filter(result => {
    const searchMatch = searchTerm === '' ||
                       result.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       result.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       result.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || result.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status: CandidateResult['status']) => {
    switch (status) {
      case 'not-started': return 'bg-gray-100 text-gray-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleExportResults = () => {
    const csvHeaders = [
      'Candidate Name',
      'Email',
      'Job Title',
      'Assessment',
      'ATS Score',
      'Assessment Score',
      'Status',
      'Time Spent (min)',
      'Progress'
    ];

    const csvData = filteredResults.map(result => [
      result.candidateName,
      result.candidateEmail,
      result.jobTitle,
      result.assessmentTitle,
      result.atsScore.toString(),
      result.assessmentScore.toString(),
      result.status,
      result.timeSpent?.toString() || '',
      `${result.answeredQuestions}/${result.totalQuestions}`
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `assessment-results-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const completedResults = mockResults.filter(r => r.status === 'completed');
  const averageScore = completedResults.length > 0 
    ? Math.round(completedResults.reduce((sum, r) => sum + r.assessmentScore, 0) / completedResults.length)
    : 0;

  const statusCounts = {
    'not-started': mockResults.filter(r => r.status === 'not-started').length,
    'in-progress': mockResults.filter(r => r.status === 'in-progress').length,
    'completed': mockResults.filter(r => r.status === 'completed').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Results Dashboard</h2>
          <p className="text-gray-600 mt-1">View candidate scores and assessment analytics</p>
        </div>
        
        <button 
          onClick={handleExportResults}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Download size={16} />
          <span>Export Results</span>
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={18} className="text-blue-600" />
            <span className="font-medium text-blue-900">Total Candidates</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{mockResults.length}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Award size={18} className="text-green-600" />
            <span className="font-medium text-green-900">Average Score</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{averageScore}%</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={18} className="text-purple-600" />
            <span className="font-medium text-purple-900">Completed</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{statusCounts.completed}</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp size={18} className="text-orange-600" />
            <span className="font-medium text-orange-900">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{statusCounts['in-progress']}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search candidates..."
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
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>Advanced Filters</span>
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Assessment</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">ATS Score</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Test Score</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Progress</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => (
                <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{result.candidateName}</p>
                      <p className="text-sm text-gray-600">{result.candidateEmail}</p>
                      <p className="text-sm text-gray-500">{result.jobTitle}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <p className="text-sm font-medium text-gray-900">{result.assessmentTitle}</p>
                    <p className="text-xs text-gray-600">{result.totalQuestions} questions</p>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.atsScore)}`}>
                      {result.atsScore}%
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    {result.status === 'completed' ? (
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(result.assessmentScore)}`}>
                        {result.assessmentScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status.replace('-', ' ')}
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(result.answeredQuestions / result.totalQuestions) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">
                        {result.answeredQuestions}/{result.totalQuestions}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <button 
                      onClick={() => setSelectedResult(result)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded transition-colors"
                      title="View Details"
                    >
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Assessment Scores</h4>
            <div className="space-y-3">
              {[
                { range: '90-100%', count: completedResults.filter(r => r.assessmentScore >= 90).length, color: 'bg-green-500' },
                { range: '80-89%', count: completedResults.filter(r => r.assessmentScore >= 80 && r.assessmentScore < 90).length, color: 'bg-blue-500' },
                { range: '70-79%', count: completedResults.filter(r => r.assessmentScore >= 70 && r.assessmentScore < 80).length, color: 'bg-yellow-500' },
                { range: 'Below 70%', count: completedResults.filter(r => r.assessmentScore < 70).length, color: 'bg-red-500' }
              ].map((range) => {
                const percentage = completedResults.length > 0 ? (range.count / completedResults.length) * 100 : 0;
                return (
                  <div key={range.range} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-gray-700">{range.range}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${range.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm text-gray-600">{range.count}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-3">Assessment Analytics</h4>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-600">Average Completion Time</p>
                <p className="text-xl font-bold text-blue-800">
                  {Math.round(completedResults.reduce((sum, r) => sum + (r.timeSpent || 0), 0) / completedResults.length || 0)} min
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-green-600">Pass Rate</p>
                <p className="text-xl font-bold text-green-800">
                  {Math.round((completedResults.filter(r => r.assessmentScore >= 70).length / completedResults.length) * 100 || 0)}%
                </p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-purple-600">Completion Rate</p>
                <p className="text-xl font-bold text-purple-800">
                  {Math.round((statusCounts.completed / mockResults.length) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {filteredResults.length === 0 && (
        <div className="text-center py-12">
          <BarChart3 size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No results found</p>
          <p className="text-gray-600 mt-1">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Assessment Results</h2>
                <button
                  onClick={() => setSelectedResult(null)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600 mt-1">{selectedResult.candidateName}</p>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-1">ATS Score</h4>
                  <p className="text-2xl font-bold text-blue-800">{selectedResult.atsScore}%</p>
                  <p className="text-sm text-blue-600">Resume quality</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-1">Assessment Score</h4>
                  <p className="text-2xl font-bold text-green-800">
                    {selectedResult.status === 'completed' ? `${selectedResult.assessmentScore}%` : 'In Progress'}
                  </p>
                  <p className="text-sm text-green-600">Technical evaluation</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-lg font-bold text-gray-900">{selectedResult.answeredQuestions}/{selectedResult.totalQuestions}</p>
                  <p className="text-sm text-gray-600">Questions</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">{selectedResult.timeSpent || 0}</p>
                  <p className="text-sm text-gray-600">Minutes</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900">
                    {Math.round((selectedResult.answeredQuestions / selectedResult.totalQuestions) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Progress</p>
                </div>
              </div>

              {selectedResult.status === 'completed' && (
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">Performance Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Technical Questions</span>
                      <span className="font-medium text-gray-900">85%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Problem Solving</span>
                      <span className="font-medium text-gray-900">92%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Code Quality</span>
                      <span className="font-medium text-gray-900">78%</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-3">
                <button 
                  onClick={() => setSelectedResult(null)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors"
                >
                  View Full Report
                </button>
                <button 
                  onClick={() => setSelectedResult(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
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