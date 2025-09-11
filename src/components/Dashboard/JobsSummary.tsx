import React from 'react';
import { Briefcase, Plus, Eye, Edit, Users, Calendar, MapPin } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import type { NavItem } from '../../types';

interface JobsSummaryProps {
  onNavigate: (item: NavItem) => void;
}

export const JobsSummary: React.FC<JobsSummaryProps> = ({ onNavigate }) => {
  const activeJobs = mockJobs.filter(job => job.status === 'active');
  const draftJobs = mockJobs.filter(job => job.status === 'draft');
  const totalApplicants = mockJobs.reduce((sum, job) => sum + job.applicantCount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
            <Briefcase size={14} className="text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Open Positions</h3>
            <p className="text-sm text-gray-500">{activeJobs.length} active jobs</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('open-hiring')}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Manage Jobs →
        </button>
      </div>

      <div className="space-y-4">
        {/* Job Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-green-800">{activeJobs.length}</p>
            <p className="text-xs text-green-600">Active</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-gray-800">{draftJobs.length}</p>
            <p className="text-xs text-gray-600">Drafts</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
            <p className="text-lg font-bold text-blue-800">{totalApplicants}</p>
            <p className="text-xs text-blue-600">Applicants</p>
          </div>
        </div>

        {/* Recent Jobs */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">Recent Job Postings</h4>
          {activeJobs.slice(0, 3).map((job) => (
            <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-200 transition-all duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{job.title}</p>
                  <p className="text-xs text-gray-600">{job.department} • {job.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {job.applicantCount} applicants
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => onNavigate('open-hiring')}
          className="w-full flex items-center justify-center space-x-2 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
        >
          <Plus size={16} />
          <span>Create New Job Posting</span>
        </button>
      </div>
    </div>
  );
};