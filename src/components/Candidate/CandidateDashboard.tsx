import React, { useState, useEffect } from 'react';
import { User, Briefcase, FileText, Calendar, Award, TrendingUp, Clock, CheckCircle, Eye, Send, Plus, Search, Filter, Star, Target, BarChart3, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CandidateDashboardProps {
  onNavigateToJobs?: () => void;
  onNavigateToApplications?: () => void;
  onNavigateToAssessments?: () => void;
  onNavigateToProfile?: () => void;
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({ 
  onNavigateToJobs, 
  onNavigateToApplications, 
  onNavigateToAssessments,
  onNavigateToProfile
}) => {
  const { profile } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCandidateData();
  }, []);

  const loadCandidateData = async () => {
    try {
      // Load applications from localStorage
      const savedApplications = localStorage.getItem('candidateApplications');
      if (savedApplications) {
        const parsedApplications = JSON.parse(savedApplications);
        setApplications(parsedApplications.filter((app: any) => app.candidateId === profile?.id));
      }
      
      // Load assessments from localStorage
      const savedAssessments = localStorage.getItem('candidateAssessments');
      if (savedAssessments) {
        const parsedAssessments = JSON.parse(savedAssessments);
        setAssessments(parsedAssessments.filter((assessment: any) => assessment.candidateId === profile?.id));
      }
    } catch (error) {
      console.error('Error loading candidate data:', error);
      setApplications([]);
      setAssessments([]);
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
      case 'submitted': return <Clock size={14} className="text-blue-600" />;
      case 'reviewing': return <Eye size={14} className="text-yellow-600" />;
      case 'shortlisted': return <CheckCircle size={14} className="text-green-600" />;
      case 'interview': return <Calendar size={14} className="text-purple-600" />;
      case 'rejected': return <Clock size={14} className="text-red-600" />;
      case 'hired': return <Award size={14} className="text-emerald-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const totalApplications = applications.length;
  const activeApplications = applications.filter(app => 
    ['submitted', 'reviewing', 'shortlisted', 'interview'].includes(app.status)
  ).length;
  const completedAssessments = assessments.filter(a => a.status === 'completed').length;
  const avgScore = assessments.filter(a => a.status === 'completed').length > 0
    ? Math.round(assessments.filter(a => a.status === 'completed').reduce((sum, a) => sum + (a.percentage || 0), 0) / assessments.filter(a => a.status === 'completed').length)
    : 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome back, Demo</h1>
          <p className="text-gray-600">Track your applications and assessments</p>
        </div>
        
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Applications</p>
              <p className="text-xl font-semibold text-gray-900">{totalApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp size={16} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-xl font-semibold text-gray-900">{activeApplications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText size={16} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Assessments</p>
              <p className="text-xl font-semibold text-gray-900">{completedAssessments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award size={16} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Score</p>
              <p className="text-xl font-semibold text-gray-900">{avgScore}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Applications</h2>
            {applications.length > 0 && (
              <button 
                onClick={onNavigateToApplications}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {applications.slice(0, 3).map((application) => (
              <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {application.jobTitle}
                    </h3>
                    <div className="flex items-center space-x-3 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>Applied {new Date(application.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span className="capitalize">{application.status}</span>
                  </div>
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="text-center py-8">
                <Briefcase size={32} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Journey</h3>
                <p className="text-gray-600 mb-4">
                  Discover exciting opportunities at QuantumCore Technologies.
                </p>
                <button 
                  onClick={onNavigateToJobs}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
                >
                  Browse Open Positions
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Assessment Progress */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Assessment Center</h2>
            {assessments.length > 0 && (
              <button 
                onClick={onNavigateToAssessments}
                className="text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors flex items-center space-x-1"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {assessments.slice(0, 3).map((assessment) => (
              <div key={assessment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      {assessment.assessmentTitle}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {assessment.status === 'completed' ? 'Completed' : assessment.status === 'in-progress' ? 'In Progress' : 'Ready to Start'}
                    </p>
                  </div>
                  
                  {assessment.status === 'completed' && (
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-lg font-semibold text-gray-900">{assessment.percentage || 0}%</span>
                      </div>
                      <span className={`text-xs font-medium ${(assessment.passed ?? false) ? 'text-green-600' : 'text-red-600'}`}>
                        {(assessment.passed ?? false) ? 'Passed' : 'Review'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {assessments.length === 0 && (
              <div className="text-center py-8">
                <FileText size={32} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Assessments Yet</h3>
                <p className="text-gray-600">
                  Assessments will appear when you apply for positions that require them.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};