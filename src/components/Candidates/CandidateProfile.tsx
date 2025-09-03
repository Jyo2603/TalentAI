import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, MapPin, Star, Award, MessageSquare, FileText, Download, Edit, ArrowRight, Clock, User } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import type { Candidate } from '../../types';

interface CandidateProfileProps {
  candidate: Candidate;
  onBack: () => void;
  onStatusChange: (candidateId: string, newStatus: Candidate['status']) => void;
}

export const CandidateProfile: React.FC<CandidateProfileProps> = ({ 
  candidate, 
  onBack, 
  onStatusChange 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'notes'>('overview');
  const [notes, setNotes] = useState('');
  
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
    if (score >= 85) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
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

  const mockTimeline = [
    {
      id: '1',
      type: 'application',
      title: 'Application Submitted',
      description: 'Candidate applied for the position',
      timestamp: candidate.applicationDate,
      icon: FileText,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      id: '2',
      type: 'assessment',
      title: 'Assessment Completed',
      description: `Scored ${candidate.testScore}% on technical assessment`,
      timestamp: new Date(candidate.applicationDate.getTime() + 24 * 60 * 60 * 1000),
      icon: Star,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      id: '3',
      type: 'review',
      title: 'Resume Reviewed',
      description: `ATS score: ${candidate.atsScore}%`,
      timestamp: new Date(candidate.applicationDate.getTime() + 48 * 60 * 60 * 1000),
      icon: Award,
      color: 'text-green-600 bg-green-50'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{candidate.name}</h1>
          <p className="text-gray-600 mt-1">Candidate Profile</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{candidate.name}</h2>
                  <p className="text-gray-600">{job?.title || 'Unknown Position'}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Applied {candidate.applicationDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{candidate.experience} years experience</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(candidate.status)}`}>
                {candidate.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {candidate.testScore && (
                <div className={`border rounded-lg p-4 ${getScoreColor(candidate.testScore)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Star size={20} />
                    <span className="font-medium">Technical Assessment</span>
                  </div>
                  <p className="text-2xl font-bold">{candidate.testScore}%</p>
                  <p className="text-sm opacity-80">Overall Score</p>
                </div>
              )}
              
              {candidate.atsScore && (
                <div className={`border rounded-lg p-4 ${getScoreColor(candidate.atsScore)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award size={20} />
                    <span className="font-medium">ATS Score</span>
                  </div>
                  <p className="text-2xl font-bold">{candidate.atsScore}%</p>
                  <p className="text-sm opacity-80">Resume Quality</p>
                </div>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'timeline', label: 'Timeline' },
                  { id: 'notes', label: 'Notes' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as typeof activeTab)}
                    className={`px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Mail size={16} className="text-gray-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{candidate.email}</p>
                          <p className="text-xs text-gray-600">Email</p>
                        </div>
                      </div>
                      
                      {candidate.phone && (
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <Phone size={16} className="text-gray-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{candidate.phone}</p>
                            <p className="text-xs text-gray-600">Phone</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills & Experience</h3>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Technical Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill) => (
                            <span 
                              key={skill}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700">Experience Level</p>
                          <p className="text-lg font-bold text-gray-900">{candidate.experience} years</p>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700">Application Date</p>
                          <p className="text-lg font-bold text-gray-900">
                            {candidate.applicationDate.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Match Analysis</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900 mb-2">Applied for: {job?.title}</h4>
                      <p className="text-sm text-blue-700 mb-3">{job?.department} • {job?.location}</p>
                      
                      {job && (
                        <div>
                          <p className="text-xs font-medium text-blue-800 mb-2">Skill Match</p>
                          <div className="flex flex-wrap gap-1">
                            {job.skills.map((skill) => {
                              const hasSkill = candidate.skills.includes(skill);
                              return (
                                <span 
                                  key={skill}
                                  className={`px-2 py-1 rounded text-xs ${
                                    hasSkill 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {skill} {hasSkill ? '✓' : '✗'}
                                </span>
                              );
                            })}
                          </div>
                          <p className="text-xs text-blue-700 mt-2">
                            {Math.round((candidate.skills.filter(skill => job.skills.includes(skill)).length / job.skills.length) * 100)}% skill match
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Application Timeline</h3>
                  
                  <div className="space-y-4">
                    {mockTimeline.map((event, index) => {
                      const Icon = event.icon;
                      return (
                        <div key={event.id} className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-lg ${event.color} flex items-center justify-center flex-shrink-0`}>
                            <Icon size={16} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900">{event.title}</h4>
                              <span className="text-sm text-gray-600">
                                {event.timestamp.toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Interview Notes & Comments</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Note</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add your notes about this candidate..."
                    />
                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                      Save Note
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Sarah Chen</span>
                        <span className="text-sm text-gray-600">2 days ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Strong technical skills demonstrated in the assessment. React and TypeScript knowledge is excellent. 
                        Recommend moving to interview stage.
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Michael Chen</span>
                        <span className="text-sm text-gray-600">1 day ago</span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Portfolio shows good attention to detail and modern development practices. 
                        Would be a good fit for our frontend team.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            
            <div className="space-y-3">
              {nextStatus && (
                <button 
                  onClick={() => onStatusChange(candidate.id, nextStatus)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Move to {nextStatus}</span>
                  <ArrowRight size={16} />
                </button>
              )}
              
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <Calendar size={16} />
                <span>Schedule Interview</span>
              </button>
              
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                <MessageSquare size={16} />
                <span>Send Message</span>
              </button>
              
              <div className="grid grid-cols-2 gap-2">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1">
                  <Download size={14} />
                  <span>Resume</span>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1">
                  <FileText size={14} />
                  <span>Portfolio</span>
                </button>
              </div>
              
              {candidate.status !== 'rejected' && (
                <button 
                  onClick={() => onStatusChange(candidate.id, 'rejected')}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-800 py-2 rounded-lg transition-colors"
                >
                  Reject Candidate
                </button>
              )}
            </div>
          </div>

          {/* Job Details */}
          {job && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Position</p>
                  <p className="text-gray-900">{job.title}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Department</p>
                  <p className="text-gray-900">{job.department}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Location</p>
                  <p className="text-gray-900">{job.location}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Salary Range</p>
                  <p className="text-gray-900">
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
                  <div className="flex flex-wrap gap-1">
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
              </div>
            </div>
          )}

          {/* Application Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Stats</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Days in Pipeline</span>
                <span className="font-medium text-gray-900">
                  {Math.floor((new Date().getTime() - candidate.applicationDate.getTime()) / (1000 * 60 * 60 * 24))}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Referral</span>
                <span className="font-medium text-gray-900">None</span>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-900 mb-2">Recruiter Notes</p>
                <div className="space-y-1">
                  <p className="text-xs text-blue-800">• Strong technical background with {candidate.experience} years experience</p>
                  <p className="text-xs text-blue-800">• {candidate.testScore ? `Assessment score: ${candidate.testScore}%` : 'Assessment pending'}</p>
                  <p className="text-xs text-blue-800">• {candidate.atsScore ? `Resume quality score: ${candidate.atsScore}%` : 'Resume review pending'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};