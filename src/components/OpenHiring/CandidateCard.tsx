import React, { useState } from 'react';
import { Mail, Phone, Star, Award, ChevronDown, ChevronUp, Calendar, FileText, MessageSquare, ArrowRight } from 'lucide-react';
import type { Candidate } from '../../types';

interface CandidateCardProps {
  candidate: Candidate;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

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

  const handleStatusChange = async (newStatus: Candidate['status']) => {
    setIsMoving(true);
    // Simulate API call delay
    setTimeout(() => {
      onStatusChange(candidate.id, newStatus);
      setIsMoving(false);
    }, 500);
  };

  const nextStatus = getNextStatus(candidate.status);

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 ${
      isMoving ? 'opacity-50 scale-95' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{candidate.name}</h4>
          <p className="text-sm text-gray-600">{candidate.experience} years experience</p>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="mt-3 space-y-2">
        <div className="flex items-center space-x-4">
          {candidate.testScore && (
            <div className="flex items-center space-x-1">
              <Star size={14} className="text-blue-600" />
              <span className={`text-xs font-medium px-2 py-1 rounded ${getScoreColor(candidate.testScore)}`}>
                Test: {candidate.testScore}%
              </span>
            </div>
          )}
          
          {candidate.atsScore && (
            <div className="flex items-center space-x-1">
              <Award size={14} className="text-purple-600" />
              <span className={`text-xs font-medium px-2 py-1 rounded ${getScoreColor(candidate.atsScore)}`}>
                ATS: {candidate.atsScore}%
              </span>
            </div>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail size={14} className="mr-2" />
              {candidate.email}
            </div>
            {candidate.phone && (
              <div className="flex items-center text-sm text-gray-600">
                <Phone size={14} className="mr-2" />
                {candidate.phone}
              </div>
            )}
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={14} className="mr-2" />
              Applied {candidate.applicationDate.toLocaleDateString()}
            </div>
          </div>
          
          <div>
            <p className="text-xs font-medium text-gray-700 mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {candidate.skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 pt-3">
            {nextStatus && (
              <button 
                onClick={() => handleStatusChange(nextStatus)}
                disabled={isMoving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs py-2 rounded transition-colors flex items-center justify-center space-x-1"
              >
                <span>Move to {nextStatus}</span>
                <ArrowRight size={12} />
              </button>
            )}
            
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-green-100 hover:bg-green-200 text-green-800 text-xs py-2 rounded transition-colors flex items-center justify-center space-x-1">
                <Calendar size={12} />
                <span>Schedule</span>
              </button>
              <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 text-xs py-2 rounded transition-colors flex items-center justify-center space-x-1">
                <FileText size={12} />
                <span>Resume</span>
              </button>
            </div>
            
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs py-2 rounded transition-colors flex items-center justify-center space-x-1">
              <MessageSquare size={12} />
              <span>Send Message</span>
            </button>
            
            {candidate.status !== 'rejected' && (
              <button 
                onClick={() => handleStatusChange('rejected')}
                className="w-full bg-red-100 hover:bg-red-200 text-red-800 text-xs py-2 rounded transition-colors"
              >
                Reject Candidate
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};