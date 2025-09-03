import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, Eye, MessageSquare, FileText, User, Mail, Phone, Award, Star, Briefcase } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CandidateApplication {
  id: string;
  candidateId?: string;
  jobId?: string;
  jobTitle?: string;
  candidateName?: string;
  candidateEmail?: string;
  candidatePhone?: string;
  coverLetter?: string;
  expectedSalary?: number;
  availableStartDate?: string;
  howDidYouHear?: string;
  additionalInfo?: string;
  linkedInProfile?: string;
  portfolioUrl?: string;
  status?: 'submitted' | 'reviewing' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  submittedAt?: string;
  updatedAt?: string;
}

interface ApplicationTrackerProps {
  onNavigateToJobs?: () => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ onNavigateToJobs }) => {
  const { profile } = useAuth();
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApplication, setSelectedApplication] = useState<CandidateApplication | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      console.log('🔍 Loading applications for candidate:', profile?.id);
      // Load applications from localStorage
      const saved = localStorage.getItem('candidateApplications');
      console.log('💾 Raw saved applications:', saved);
      if (saved) {
        const parsedApplications = JSON.parse(saved);
        console.log('📋 Parsed applications:', parsedApplications);
        const userApplications = parsedApplications.filter((app: any) => {
          console.log('🔍 Checking app:', app.candidateId, 'vs user:', profile?.id);
          return app.candidateId === profile?.id;
        });
        console.log('✅ User applications found:', userApplications);
        setApplications(userApplications);
      } else {
        console.log('❌ No saved applications found');
        setApplications([]);
      }
    } catch (error) {
      console.error('Error loading applications:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reviewing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'shortlisted': return 'bg-green-50 text-green-700 border-green-200';
      case 'interview': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'hired': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock size={16} className="text-blue-600" />;
      case 'reviewing': return <Eye size={16} className="text-yellow-600" />;
      case 'shortlisted': return <CheckCircle size={16} className="text-green-600" />;
      case 'interview': return <Calendar size={16} className="text-purple-600" />;
      case 'rejected': return <Clock size={16} className="text-red-600" />;
      case 'hired': return <Award size={16} className="text-emerald-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'submitted': return 'Your application has been received and is in our system.';
      case 'reviewing': return 'Our hiring team is currently reviewing your application.';
      case 'shortlisted': return 'Congratulations! You have been shortlisted for this position.';
      case 'interview': return 'You have been invited for an interview. Check your email for details.';
      case 'rejected': return 'Thank you for your interest. We have decided to move forward with other candidates.';
      case 'hired': return 'Congratulations! We would like to extend an offer for this position.';
      default: return 'Application status is being updated.';
    }
  };

  const getDaysInPipeline = (submittedAt: string) => {
    const submitted = new Date(submittedAt);
    const now = new Date();
    const diffTime = now.getTime() - submitted.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleDeleteApplication = (applicationId: string) => {
    setShowDeleteConfirm(applicationId);
  };

  const confirmDeleteApplication = () => {
    if (!showDeleteConfirm) return;
    
    // Remove from applications list
    const updatedApplications = applications.filter(app => app.id !== showDeleteConfirm);
    setApplications(updatedApplications);
    
    // Update localStorage
    const allApplications = JSON.parse(localStorage.getItem('candidateApplications') || '[]');
    const filteredApplications = allApplications.filter((app: any) => app.id !== showDeleteConfirm);
    localStorage.setItem('candidateApplications', JSON.stringify(filteredApplications));
    
    // Remove from applied jobs list so they can apply again
    const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    const applicationToDelete = applications.find(app => app.id === showDeleteConfirm);
    if (applicationToDelete?.jobId) {
      const updatedAppliedJobs = appliedJobs.filter((jobId: string) => jobId !== applicationToDelete.jobId);
      localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    }
    
    setShowDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <button
          onClick={() => setSelectedApplication(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <span>← Back to Applications</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedApplication.job_title}</h1>
                <p className="text-gray-600">Application ID: {selectedApplication.id.slice(0, 8)}</p>
              </div>
              
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(selectedApplication.status)}`}>
                {getStatusIcon(selectedApplication.status)}
                <span className="font-medium capitalize">
                  {selectedApplication.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Current Status</h3>
                  <p className="text-blue-800 leading-relaxed">
                    {getStatusDescription(selectedApplication.status)}
                  </p>
                </div>

                {selectedApplication.cover_letter && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Cover Letter</h3>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedApplication.cover_letter}
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Timeline</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                        <FileText size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">Application Submitted</p>
                        <p className="text-sm text-blue-700">
                          {new Date(selectedApplication.submitted_at).toLocaleDateString()} at {new Date(selectedApplication.submitted_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {selectedApplication.status !== 'submitted' && (
                      <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                          <Eye size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-green-900">Application Reviewed</p>
                          <p className="text-sm text-green-700">
                            Your application has been reviewed by our team
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Submitted</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedApplication.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Days in Pipeline</span>
                      <span className="font-medium text-gray-900">
                        {getDaysInPipeline(selectedApplication.submitted_at)} days
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last Updated</span>
                      <span className="font-medium text-gray-900">
                        {new Date(selectedApplication.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    {selectedApplication.expected_salary && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Expected Salary</span>
                        <span className="font-medium text-gray-900">
                          ${selectedApplication.expected_salary.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Next Steps</h3>
                  <div className="space-y-2 text-sm text-green-800">
                    {selectedApplication.status === 'submitted' && (
                      <p>• Wait for initial review (typically 2-3 business days)</p>
                    )}
                    {selectedApplication.status === 'reviewing' && (
                      <p>• Our team is evaluating your qualifications</p>
                    )}
                    {selectedApplication.status === 'shortlisted' && (
                      <>
                        <p>• Prepare for potential interview invitation</p>
                        <p>• Review the job requirements and company information</p>
                      </>
                    )}
                    {selectedApplication.status === 'interview' && (
                      <>
                        <p>• Check your email for interview details</p>
                        <p>• Prepare for the interview process</p>
                      </>
                    )}
                  </div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2">
                  <MessageSquare size={16} />
                  <span>Contact HR Team</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the progress of your job applications</p>
        </div>

        {applications.length > 0 ? (
          <div className="space-y-6">
            {applications.map((application) => (
              <div key={application.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{application.jobTitle || application.job_title || 'Unknown Position'}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>Applied {new Date(application.submittedAt || new Date()).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{getDaysInPipeline(application.submittedAt || new Date().toISOString())} days in pipeline</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(application.status || 'submitted')}`}>
                    {getStatusIcon(application.status || 'submitted')}
                    <span className="font-medium capitalize">
                      {application.status || 'submitted'}
                    </span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {getStatusDescription(application.status || 'submitted')}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Last updated: {new Date(application.updatedAt || application.submittedAt || new Date()).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setSelectedApplication(application)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm"
                    >
                      <Eye size={14} />
                      <span>View Details</span>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm">
                      <MessageSquare size={14} />
                      <span>Contact HR</span>
                    </button>
                    <button 
                      onClick={() => handleDeleteApplication(application.id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
                      title="Delete Application"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-6">
              Start your career journey by browsing and applying to our open positions.
            </p>
            <button 
              onClick={onNavigateToJobs}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              Browse Open Jobs
            </button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Application</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this application? This action cannot be undone, but you can apply again later.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteApplication}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors font-medium"
                >
                  Delete Application
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};