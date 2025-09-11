import React, { useState, useEffect } from 'react';
import { FileText, Clock, CheckCircle, Star, Award, Play, Eye, Calendar, TrendingUp, Target } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AssessmentAttempt {
  id: string;
  candidateId: string;
  jobId: string;
  jobTitle: string;
  assessmentTitle: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  timeLimit: number;
  totalQuestions: number;
  answeredQuestions?: number;
  totalScore?: number;
  maxScore?: number;
  percentage?: number;
  timeSpentMinutes?: number;
  passed?: boolean;
  feedback?: string;
  passingScore: number;
}

interface AssessmentCenterProps {
  onNavigateToJobs?: () => void;
}

export const AssessmentCenter: React.FC<AssessmentCenterProps> = ({ onNavigateToJobs }) => {
  const { profile } = useAuth();
  const [assessments, setAssessments] = useState<AssessmentAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentAttempt | null>(null);
  const [isStartingAssessment, setIsStartingAssessment] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadAssessments();
  }, []);

  const loadAssessments = async () => {
    try {
      // Load assessments from localStorage
      const saved = localStorage.getItem('candidateAssessments');
      if (saved) {
        const parsedAssessments = JSON.parse(saved);
        setAssessments(parsedAssessments.filter((assessment: any) => assessment.candidateId === profile?.id));
      } else {
        setAssessments([]);
      }
    } catch (error) {
      console.error('Error loading assessments:', error);
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartAssessment = (assessment: AssessmentAttempt) => {
    setIsStartingAssessment(true);
    
    // Simulate starting assessment
    setTimeout(() => {
      const updatedAssessment = {
        ...assessment,
        status: 'in-progress' as const,
        startedAt: new Date().toISOString(),
        answeredQuestions: 0
      };
      
      // Update in localStorage
      const saved = localStorage.getItem('candidateAssessments');
      if (saved) {
        const assessments = JSON.parse(saved);
        const updatedAssessments = assessments.map((a: any) => 
          a.id === assessment.id ? updatedAssessment : a
        );
        localStorage.setItem('candidateAssessments', JSON.stringify(updatedAssessments));
        setAssessments(prev => prev.map(a => a.id === assessment.id ? updatedAssessment : a));
      }
      
      setIsStartingAssessment(false);
      alert('Assessment started! This is a demo - in a real app, you would see the actual questions.');
    }, 1500);
  };

  const handleContinueAssessment = (assessment: AssessmentAttempt) => {
    alert('Continuing assessment... This is a demo - in a real app, you would resume where you left off.');
  };

  const handleCompleteAssessment = (assessment: AssessmentAttempt) => {
    const score = Math.floor(Math.random() * 40) + 60; // 60-100%
    const passed = score >= assessment.passingScore;
    
    const completedAssessment = {
      ...assessment,
      status: 'completed' as const,
      completedAt: new Date().toISOString(),
      answeredQuestions: assessment.totalQuestions,
      totalScore: Math.round((score / 100) * assessment.totalQuestions * 5),
      maxScore: assessment.totalQuestions * 5,
      percentage: score,
      timeSpentMinutes: Math.floor(Math.random() * 30) + 30,
      passed: passed,
      feedback: passed 
        ? 'Great job! You demonstrated strong technical skills and problem-solving abilities.'
        : 'Good effort! Consider reviewing the key concepts and trying again when you feel more prepared.'
    };
    
    // Update in localStorage
    const saved = localStorage.getItem('candidateAssessments');
    if (saved) {
      const assessments = JSON.parse(saved);
      const updatedAssessments = assessments.map((a: any) => 
        a.id === assessment.id ? completedAssessment : a
      );
      localStorage.setItem('candidateAssessments', JSON.stringify(updatedAssessments));
      setAssessments(prev => prev.map(a => a.id === assessment.id ? completedAssessment : a));
    }
    
    alert(`Assessment completed! Score: ${score}% (${passed ? 'Passed' : 'Needs Review'})`);
  };

  const handleDeleteAssessment = (assessmentId: string) => {
    setShowDeleteConfirm(assessmentId);
  };

  const confirmDeleteAssessment = () => {
    if (!showDeleteConfirm) return;
    
    // Remove from assessments list
    const updatedAssessments = assessments.filter(assessment => assessment.id !== showDeleteConfirm);
    setAssessments(updatedAssessments);
    
    // Update localStorage
    const allAssessments = JSON.parse(localStorage.getItem('candidateAssessments') || '[]');
    const filteredAssessments = allAssessments.filter((assessment: any) => assessment.id !== showDeleteConfirm);
    localStorage.setItem('candidateAssessments', JSON.stringify(filteredAssessments));
    
    setShowDeleteConfirm(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'not-started': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'in-progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-50 text-green-700 border-green-200';
      case 'expired': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'not-started': return <Clock size={16} className="text-gray-600" />;
      case 'in-progress': return <Play size={16} className="text-blue-600" />;
      case 'completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'expired': return <Clock size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-600 bg-green-50';
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your assessments...</p>
        </div>
      </div>
    );
  }

  const completedAssessments = assessments.filter(a => a.status === 'completed');
  const inProgressAssessments = assessments.filter(a => a.status === 'in-progress');
  const pendingAssessments = assessments.filter(a => a.status === 'not-started');
  const averageScore = completedAssessments.length > 0
    ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.percentage || 0), 0) / completedAssessments.length)
    : 0;

  if (selectedAssessment) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <button
          onClick={() => setSelectedAssessment(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <span>← Back to Assessments</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedAssessment.assessmentTitle}</h1>
                <p className="text-gray-600">Assessment Results</p>
              </div>
              
              {selectedAssessment.status === 'completed' && (
                <div className={`px-6 py-3 rounded-xl border ${getScoreColor(selectedAssessment.percentage || 0)}`}>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedAssessment.percentage}%</p>
                    <p className="text-sm font-medium">Final Score</p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {selectedAssessment.status === 'completed' ? (
                  <>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Performance Summary</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-blue-700">Total Score</p>
                          <p className="text-xl font-bold text-blue-800">
                            {selectedAssessment.totalScore} / {selectedAssessment.maxScore}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-blue-700">Time Spent</p>
                          <p className="text-xl font-bold text-blue-800">
                            {selectedAssessment.timeSpentMinutes} min
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-6 ${
                      selectedAssessment.passed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-red-50 border-red-200'
                    }`}>
                      <div className="flex items-center space-x-3 mb-3">
                        {selectedAssessment.passed ? (
                          <CheckCircle size={24} className="text-green-600" />
                        ) : (
                          <Target size={24} className="text-red-600" />
                        )}
                        <h3 className={`text-lg font-semibold ${
                          selectedAssessment.passed ? 'text-green-900' : 'text-red-900'
                        }`}>
                          {selectedAssessment.passed ? 'Assessment Passed!' : 'Needs Improvement'}
                        </h3>
                      </div>
                      <p className={`text-sm ${
                        selectedAssessment.passed ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {selectedAssessment.passed 
                          ? 'Congratulations! You have successfully passed this assessment.'
                          : 'Don\'t worry! Use this as a learning opportunity to improve your skills.'
                        }
                      </p>
                    </div>

                    {selectedAssessment.feedback && (
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recruiter Feedback</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedAssessment.feedback}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <FileText size={48} className="mx-auto text-blue-600 mb-4" />
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">Assessment Ready</h3>
                    <p className="text-blue-800 mb-6">
                      This assessment is ready to begin. Make sure you have enough time to complete it.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium">
                      Start Assessment
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(selectedAssessment.status)}`}>
                        {selectedAssessment.status.replace('-', ' ')}
                      </span>
                    </div>
                    {selectedAssessment.startedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Started</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedAssessment.startedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedAssessment.completedAt && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-medium text-gray-900">
                          {new Date(selectedAssessment.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {selectedAssessment.jobId && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Related Job</span>
                        <span className="font-medium text-gray-900">Yes</span>
                      </div>
                    )}
                  </div>
                </div>

                {selectedAssessment.status === 'completed' && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-700">Overall Performance</span>
                          <span className="text-sm font-bold text-gray-900">{selectedAssessment.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              (selectedAssessment.percentage || 0) >= 85 ? 'bg-green-500' :
                              (selectedAssessment.percentage || 0) >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedAssessment.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <p className="text-lg font-bold text-gray-900">{selectedAssessment.totalScore}</p>
                            <p className="text-xs text-gray-600">Points Earned</p>
                          </div>
                          <div>
                            <p className="text-lg font-bold text-gray-900">{selectedAssessment.timeSpentMinutes}</p>
                            <p className="text-xs text-gray-600">Minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={() => handleDeleteAssessment(selectedAssessment.id)}
                  className="w-full bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  title="Delete Assessment"
                >
                  <span>🗑️</span>
                  <span>Delete Assessment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Center</h1>
        <p className="text-gray-600">Complete assessments to showcase your skills</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileText size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assessments</p>
              <p className="text-2xl font-bold text-gray-900">{assessments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{completedAssessments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Star size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrendingUp size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{inProgressAssessments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments List */}
      {assessments.length > 0 ? (
        <div className="space-y-6">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{assessment.assessmentTitle}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Started {assessment.startedAt ? new Date(assessment.startedAt).toLocaleDateString() : 'Not started'}</span>
                    </div>
                    {assessment.completedAt && (
                      <div className="flex items-center space-x-1">
                        <CheckCircle size={14} />
                        <span>Completed {new Date(assessment.completedAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(assessment.status)}`}>
                  {getStatusIcon(assessment.status)}
                  <span className="font-medium capitalize">
                    {assessment.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {assessment.status === 'completed' && (
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-blue-800">{assessment.percentage}%</p>
                    <p className="text-sm text-blue-600">Score</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-green-800">{assessment.timeSpentMinutes}</p>
                    <p className="text-sm text-green-600">Minutes</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-purple-800">
                      {assessment.passed ? 'PASS' : 'REVIEW'}
                    </p>
                    <p className="text-sm text-purple-600">Result</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {assessment.jobId && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mr-2">
                      Job-specific
                    </span>
                  )}
                 Last updated: Recently
                </div>
                
                <div className="flex items-center space-x-2">
                  {assessment.status === 'not-started' && (
                    <button 
                      onClick={() => handleStartAssessment(assessment)}
                      disabled={isStartingAssessment}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 disabled:opacity-50"
                    >
                      {isStartingAssessment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Starting...</span>
                        </>
                      ) : (
                        <>
                          <Play size={16} />
                          <span>Start Assessment</span>
                        </>
                      )}
                    </button>
                  )}
                  
                  {assessment.status === 'in-progress' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleContinueAssessment(assessment)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Play size={16} />
                        <span>Continue</span>
                      </button>
                      <button 
                        onClick={() => handleCompleteAssessment(assessment)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                      >
                        Complete (Demo)
                      </button>
                    </div>
                  )}
                  
                  {assessment.status === 'completed' && (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedAssessment(assessment)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Eye size={16} />
                        <span>View Results</span>
                      </button>
                      <button 
                        onClick={() => handleDeleteAssessment(assessment.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded-lg transition-colors"
                        title="Delete Assessment"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Assessments Available</h3>
          <p className="text-gray-600 mb-6">
            Assessments will appear here when you apply for positions that require them.
          </p>
          <button 
            onClick={onNavigateToJobs}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Browse Open Jobs
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Assessment</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this assessment? This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={confirmDeleteAssessment}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors font-medium"
                >
                  Delete Assessment
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
    </div>
  );
};