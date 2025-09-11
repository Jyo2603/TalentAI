import React from 'react';
import { MapPin, DollarSign, Calendar, Users, X, Edit, Pause, Play, Archive } from 'lucide-react';
import type { Job } from '../../types';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
  onEdit: (job: Job) => void;
  onToggleStatus: (jobId: string, newStatus: Job['status']) => void;
}

export const JobDetails: React.FC<JobDetailsProps> = ({ 
  job, 
  onClose, 
  onEdit, 
  onToggleStatus 
}) => {
  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      case 'closed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-medium text-gray-900">{job.title}</h2>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users size={14} />
                <span>{job.applicantCount} applicants</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>Posted {job.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {job.description}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded p-3">
                <h4 className="text-xs font-medium text-gray-700 mb-1">Department</h4>
                <p className="text-sm text-gray-900">{job.department}</p>
              </div>
              
              <div className="bg-gray-50 rounded p-3">
                <h4 className="text-xs font-medium text-gray-700 mb-1">Employment Type</h4>
                <p className="text-sm text-gray-900 capitalize">{job.type.replace('-', ' ')}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded p-4">
              <h4 className="text-sm font-medium text-green-900 mb-2">Salary Range</h4>
              <div className="flex items-center space-x-2">
                <DollarSign size={16} className="text-green-600" />
                <span className="text-lg font-medium text-green-800">
                  ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-green-600 mt-1">Annual salary in {job.salary.currency}</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded p-4">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Application Stats</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Total Applications</span>
                  <span className="font-medium text-blue-800">{job.applicantCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">This Week</span>
                  <span className="font-medium text-blue-800">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Avg. Score</span>
                  <span className="font-medium text-blue-800">78%</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => onEdit(job)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Edit size={14} />
                <span>Edit Job</span>
              </button>
              
              <button
                onClick={() => onToggleStatus(job.id, job.status === 'active' ? 'paused' : 'active')}
                className={`w-full py-2 rounded text-sm transition-colors flex items-center justify-center space-x-2 ${
                  job.status === 'active'
                    ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                {job.status === 'active' ? <Pause size={14} /> : <Play size={14} />}
                <span>{job.status === 'active' ? 'Pause' : 'Activate'}</span>
              </button>
              
              <button
                onClick={() => onToggleStatus(job.id, 'closed')}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded text-sm transition-colors flex items-center justify-center space-x-2"
              >
                <Archive size={14} />
                <span>Close Job</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};