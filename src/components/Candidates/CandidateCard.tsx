import React from 'react';
import { Mail, Phone, Calendar, ArrowRight, Eye, User } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import type { Candidate } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  onSelect, 
  onStatusChange 
}) => {
  const job = mockJobs.find(j => j.id === candidate.jobId);

  const getStatusColor = (status: Candidate['status']) => {
    switch (status) {
      case 'applied': return 'bg-gray-100 text-gray-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getNextStatus = (currentStatus: Candidate['status']): Candidate['status'] | null => {
    switch (currentStatus) {
      case 'applied': return 'shortlisted';
      case 'shortlisted': return 'interview';
      case 'interview': return 'hired';
      default: return null;
    }
  };

  const nextStatus = getNextStatus(candidate.status);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3 flex-1">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-gray-600" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {candidate.name}
            </h3>
            <p className="text-sm text-gray-600 truncate">{job?.title || 'Unknown Position'}</p>
          </div>
        </div>
        
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(candidate.status)}`}>
          {candidate.status}
        </span>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={14} className="flex-shrink-0" />
          <span className="truncate">{candidate.email}</span>
        </div>
        {candidate.phone && (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone size={14} className="flex-shrink-0" />
            <span>{candidate.phone}</span>
          </div>
        )}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar size={14} className="flex-shrink-0" />
          <span>Applied {candidate.applicationDate.toLocaleDateString()}</span>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700">Experience</p>
          <p className="text-lg font-bold text-gray-900">{candidate.experience} years</p>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6 flex-1">
        <p className="text-sm font-medium text-gray-700 mb-2">Skills</p>
        <div className="flex flex-wrap gap-1">
          {candidate.skills.slice(0, 4).map((skill) => (
            <span 
              key={skill}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 4 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              +{candidate.skills.length - 4} more
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2 mt-auto">
        {nextStatus && (
          <button 
            onClick={() => onStatusChange(candidate.id, nextStatus)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
          >
            <span>Move to {nextStatus}</span>
            <ArrowRight size={14} />
          </button>
        )}
        
        <button 
          onClick={() => onSelect(candidate)}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm"
        >
          <Eye size={14} />
          <span>View Profile</span>
        </button>
      </div>
    </div>
  );
};