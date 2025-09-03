import React from 'react';
import { Star, Award, Calendar, ArrowRight, MessageSquare, FileText, Eye } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import type { Candidate } from '../../types';

interface CandidateListItemProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateListItem: React.FC<CandidateListItemProps> = ({ 
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

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
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
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="py-4 px-4">
        <div>
          <button
            onClick={() => onSelect(candidate)}
            className="font-medium text-gray-900 hover:text-blue-600 transition-colors text-left"
          >
            {candidate.name}
          </button>
          <p className="text-sm text-gray-600">{candidate.email}</p>
          <p className="text-xs text-gray-500">{candidate.experience} years experience</p>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <span className="text-sm text-gray-900">{job?.title || 'Unknown'}</span>
        <p className="text-xs text-gray-500">{job?.department}</p>
      </td>
      
      <td className="py-4 px-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(candidate.status)}`}>
          {candidate.status}
        </span>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          {candidate.testScore && (
            <span className={`text-xs font-medium px-2 py-1 rounded flex items-center space-x-1 ${getScoreColor(candidate.testScore)}`}>
              <Star size={12} />
              <span>{candidate.testScore}%</span>
            </span>
          )}
          
          {candidate.atsScore && (
            <span className={`text-xs font-medium px-2 py-1 rounded flex items-center space-x-1 ${getScoreColor(candidate.atsScore)}`}>
              <Award size={12} />
              <span>{candidate.atsScore}%</span>
            </span>
          )}
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar size={14} className="mr-1" />
          <span>{candidate.applicationDate.toLocaleDateString()}</span>
        </div>
      </td>
      
      <td className="py-4 px-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onSelect(candidate)}
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded transition-colors"
            title="View Profile"
          >
            <Eye size={14} />
          </button>
          
          {nextStatus && (
            <button 
              onClick={() => onStatusChange(candidate.id, nextStatus)}
              className="bg-green-100 hover:bg-green-200 text-green-800 p-2 rounded transition-colors"
              title={`Move to ${nextStatus}`}
            >
              <ArrowRight size={14} />
            </button>
          )}
          
          <button 
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 p-2 rounded transition-colors"
            title="Send Message"
          >
            <MessageSquare size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
};