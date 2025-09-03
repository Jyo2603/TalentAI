import React from 'react';
import { MapPin, Users, DollarSign, Calendar, Eye, Edit, Pause, Play } from 'lucide-react';
import type { Job } from '../../types';

interface JobListProps {
  onJobSelect: (job: Job) => void;
  onEditJob: (job: Job) => void;
  onToggleJobStatus: (jobId: string, newStatus: Job['status']) => void;
  onCreateJob: () => void;
  jobs: Job[];
}

export const JobList: React.FC<JobListProps> = ({ onJobSelect, onEditJob, onToggleJobStatus, onCreateJob, jobs }) => {
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Open Positions ({jobs.length})</h2>
        <button 
          onClick={onCreateJob}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-colors"
        >
          Post New Job
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div 
            key={job.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 
                  className="font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer text-sm"
                  onClick={() => onJobSelect(job)}
                >
                  {job.title}
                </h3>
                <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                  <span>{job.department}</span>
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>
              </div>
              
              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>{job.applicantCount} applicants</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign size={12} />
                  <span>${job.salary.min.toLocaleString()}-${job.salary.max.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>{job.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {job.skills.slice(0, 5).map((skill) => (
                <span 
                  key={skill}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 5 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                  +{job.skills.length - 5}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <button 
                onClick={() => onJobSelect(job)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded transition-colors flex items-center justify-center space-x-1"
              >
                <Eye size={12} />
                <span>View</span>
              </button>
              <button 
                onClick={() => onEditJob(job)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-2 rounded transition-colors"
              >
                <Edit size={12} />
              </button>
              <button 
                onClick={() => onToggleJobStatus(job.id, job.status === 'active' ? 'paused' : 'active')}
                className={`text-xs px-3 py-2 rounded transition-colors ${
                  job.status === 'active' 
                    ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700' 
                    : 'bg-green-100 hover:bg-green-200 text-green-700'
                }`}
              >
                {job.status === 'active' ? <Pause size={12} /> : <Play size={12} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-gray-600">No job postings yet</p>
          <button 
            onClick={onCreateJob}
            className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Create your first job posting
          </button>
        </div>
      )}
    </div>
  );
};