import React from 'react';
import { Users, TrendingUp, Clock, CheckCircle, ArrowRight, User, Calendar, Star, Award } from 'lucide-react';
import { mockCandidates, mockJobs } from '../../data/mockData';
import type { NavItem } from '../../types';

interface HiringPipelineProps {
  onNavigate: (item: NavItem) => void;
}

export const HiringPipeline: React.FC<HiringPipelineProps> = ({ onNavigate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'applied': return 'bg-blue-100 text-blue-800';
      case 'shortlisted': return 'bg-green-100 text-green-800';
      case 'interview': return 'bg-purple-100 text-purple-800';
      case 'hired': return 'bg-emerald-100 text-emerald-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const statusCounts = {
    applied: mockCandidates.filter(c => c.status === 'applied').length,
    shortlisted: mockCandidates.filter(c => c.status === 'shortlisted').length,
    interview: mockCandidates.filter(c => c.status === 'interview').length,
    hired: mockCandidates.filter(c => c.status === 'hired').length,
    rejected: mockCandidates.filter(c => c.status === 'rejected').length
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <Users size={14} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hiring Pipeline</h3>
            <p className="text-sm text-gray-500">Candidate flow and status</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('candidates')}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {/* Pipeline Status Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Clock size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Applied</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{statusCounts.applied}</p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-900">Shortlisted</span>
            </div>
            <p className="text-2xl font-bold text-green-800">{statusCounts.shortlisted}</p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar size={16} className="text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Interview</span>
            </div>
            <p className="text-2xl font-bold text-purple-800">{statusCounts.interview}</p>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Award size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-900">Hired</span>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{statusCounts.hired}</p>
          </div>
        </div>

        {/* Recent Candidates */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Recent Candidates</h4>
          {mockCandidates.slice(0, 3).map((candidate) => (
            <div key={candidate.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{candidate.name}</p>
                  <p className="text-xs text-gray-600">
                    {mockJobs.find(j => j.id === candidate.jobId)?.title || 'Unknown Position'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {candidate.testScore && (
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {candidate.testScore}%
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
                  {candidate.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onNavigate('candidates')}
          className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <Users size={16} />
          <span>Manage All Candidates</span>
        </button>
      </div>
    </div>
  );
};