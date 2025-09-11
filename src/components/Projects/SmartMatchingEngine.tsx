import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Users, Clock, Award, Target, Zap, AlertTriangle, CheckCircle, Star, ArrowLeft } from 'lucide-react';
import { mockEmployees } from '../../data/mockData';
import { analyzeProjectWithAI } from '../../services/openai';
import type { Project, EmployeeMatch, HireVsAssignAnalysis } from '../../types/project';
import type { Employee } from '../../types';

interface SmartMatchingEngineProps {
  project: Project;
  onAssignEmployee: (employeeId: string, role: string) => void;
  onRequestHiring: (skills: string[]) => void;
  onBack: () => void;
}

export const SmartMatchingEngine: React.FC<SmartMatchingEngineProps> = ({
  project,
  onAssignEmployee,
  onRequestHiring,
  onBack
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysis, setAnalysis] = useState<HireVsAssignAnalysis | null>(null);
  const [employeeMatches, setEmployeeMatches] = useState<EmployeeMatch[]>([]);
  const [selectedView, setSelectedView] = useState<'analysis' | 'matches' | 'recommendations'>('analysis');

  useEffect(() => {
    generateAnalysis();
  }, [project]);

  const calculateSkillMatch = (employeeSkills: string[], requiredSkills: string[]): number => {
    const matches = employeeSkills.filter(skill => requiredSkills.includes(skill)).length;
    return Math.round((matches / requiredSkills.length) * 100);
  };

  const getAvailabilityScore = (employee: Employee): number => {
    if (employee.availability === 'available') return 100;
    if (employee.availability === 'assigned' && employee.currentWorkload === 'light') return 70;
    if (employee.availability === 'assigned' && employee.currentWorkload === 'medium') return 40;
    return 10;
  };

  const getPerformanceScore = (employee: Employee): number => {
    const baseScore = Math.min(100, employee.experience * 10 + 40);
    const projectBonus = Math.min(20, employee.pastProjects.length * 5);
    return Math.min(100, baseScore + projectBonus);
  };

  const generateAnalysis = async () => {
    setIsAnalyzing(true);
    
    try {
      // Calculate employee matches first
      const matches = mockEmployees.map(employee => {
        const skillMatch = calculateSkillMatch(employee.skills, project.requiredSkills);
        const availabilityScore = getAvailabilityScore(employee);
        const performanceScore = getPerformanceScore(employee);
        const overallScore = Math.round((skillMatch * 0.4 + availabilityScore * 0.3 + performanceScore * 0.3));
        
        return {
          employeeId: employee.id,
          employeeName: employee.name,
          skillMatch,
          availabilityScore,
          performanceScore,
          overallScore,
          matchingSkills: employee.skills.filter(skill => project.requiredSkills.includes(skill)),
          missingSkills: project.requiredSkills.filter(skill => !employee.skills.includes(skill)),
          pastProjectSuccess: Math.floor(Math.random() * 30) + 70,
          currentWorkload: employee.currentWorkload,
          availableDate: employee.availableDate
        };
      }).sort((a, b) => b.overallScore - a.overallScore);

      setEmployeeMatches(matches);

      // Use OpenAI for hire vs assign analysis
      const employeeData = mockEmployees.map(emp => ({
        id: emp.id,
        name: emp.name,
        skills: emp.skills,
        experience: emp.experience,
        availability: emp.availability,
        currentWorkload: emp.currentWorkload
      }));
      
      const aiAnalysis = await analyzeProjectWithAI(
        project.name,
        project.description,
        project.requiredSkills,
        project.estimatedHours,
        employeeData
      );

      // Convert AI analysis to our format
      const analysisResult: HireVsAssignAnalysis = {
        projectId: project.id,
        analysis: {
          hire: aiAnalysis.hireAnalysis,
          assign: {
            ...aiAnalysis.assignAnalysis,
            availableEmployees: matches.slice(0, 5)
          }
        },
        recommendation: aiAnalysis.recommendation,
        reasoning: aiAnalysis.reasoning,
        generatedAt: new Date()
      };

      setAnalysis(analysisResult);
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Project analysis failed:', error);
      setIsAnalyzing(false);
      alert('Failed to generate project analysis. Please try again.');
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'bg-green-50 text-green-800 border-green-200';
    if (score >= 70) return 'bg-yellow-50 text-yellow-800 border-yellow-200';
    return 'bg-red-50 text-red-800 border-red-200';
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Brain size={32} className="text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis in Progress</h2>
          <p className="text-gray-600 mb-6">
            Analyzing {project.requiredSkills.length} required skills across {mockEmployees.length} employees
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <p className="text-green-600">Skill Matching</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                </div>
                <p className="text-blue-600">Cost Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-1">
                  <Clock size={16} className="text-gray-400" />
                </div>
                <p className="text-gray-400">Risk Assessment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Smart Matching Engine</h2>
            <p className="text-gray-600 mt-1">AI-powered analysis for {project.name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Brain size={16} className="text-blue-500" />
          <span>Analysis completed {analysis?.generatedAt.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Project Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
        <p className="text-gray-600 mb-4">{project.description}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-gray-600">Required Skills</p>
            <p className="text-lg font-bold text-gray-900">{project.requiredSkills.length}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-gray-600">Team Size</p>
            <p className="text-lg font-bold text-gray-900">{project.minTeamSize}-{project.maxTeamSize}</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-lg font-bold text-gray-900">${(project.budget.allocated / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-sm text-gray-600">Timeline</p>
            <p className="text-lg font-bold text-gray-900">
              {Math.ceil((project.endDate.getTime() - project.startDate.getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks
            </p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Required Skills:</p>
          <div className="flex flex-wrap gap-2">
            {project.requiredSkills.map((skill) => (
              <span key={skill} className="px-3 py-1 bg-white text-gray-700 rounded-lg text-sm shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {[
          { id: 'analysis', label: 'Hire vs Assign', icon: TrendingUp },
          { id: 'matches', label: 'Employee Matches', icon: Users },
          { id: 'recommendations', label: 'AI Recommendations', icon: Target }
        ].map((view) => {
          const Icon = view.icon;
          return (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id as typeof selectedView)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon size={16} />
              <span>{view.label}</span>
            </button>
          );
        })}
      </div>

      {/* Analysis Content */}
      {selectedView === 'analysis' && analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Hire Option */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">External Hiring</h3>
                <p className="text-sm text-gray-600">Recruit new talent</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-blue-900">Total Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">
                    ${analysis.analysis.hire.cost.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock size={16} className="text-purple-600" />
                    <span className="text-sm font-medium text-purple-900">Timeline</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-800">
                    {analysis.analysis.hire.timeline} days
                  </p>
                </div>
              </div>

              <button
                onClick={() => onRequestHiring(project.skillGaps || [])}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
              >
                Start Hiring Process
              </button>
            </div>
          </div>

          {/* Assign Option */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Target size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Internal Assignment</h3>
                <p className="text-sm text-gray-600">Use existing team members</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-green-900">Total Cost</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800">
                    ${analysis.analysis.assign.cost.toLocaleString()}
                  </p>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock size={16} className="text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">Timeline</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-800">
                    {analysis.analysis.assign.timeline} days
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedView('matches')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors font-medium"
              >
                View Employee Matches
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedView === 'matches' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">Top Employee Matches</h3>
            <div className="text-sm text-gray-600">
              Showing {employeeMatches.filter(m => m.overallScore >= 50).length} potential matches
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {employeeMatches.filter(match => match.overallScore >= 50).slice(0, 6).map((match) => (
              <div key={match.employeeId} className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${getMatchColor(match.overallScore)}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{match.employeeName}</h4>
                    <p className="text-sm text-gray-600">
                      {mockEmployees.find(e => e.id === match.employeeId)?.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Star size={16} className="text-yellow-500" />
                      <span className="text-lg font-bold text-gray-900">{match.overallScore}%</span>
                    </div>
                    <p className="text-xs text-gray-600">Overall Match</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-blue-600">{match.skillMatch}%</p>
                    <p className="text-xs text-gray-600">Skills</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{match.availabilityScore}%</p>
                    <p className="text-xs text-gray-600">Available</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-600">{match.performanceScore}%</p>
                    <p className="text-xs text-gray-600">Performance</p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => onAssignEmployee(match.employeeId, 'Team Member')}
                    disabled={match.availabilityScore < 50}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition-colors text-sm"
                  >
                    Assign to Project
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedView === 'recommendations' && analysis && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">AI Recommendations</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-2">Recommendation</h4>
              <p className="text-blue-800">
                Based on analysis, we recommend: <strong>{analysis.recommendation === 'assign' ? 'Internal Assignment' : 'External Hiring'}</strong>
              </p>
              <p className="text-sm text-blue-700 mt-2">{analysis.reasoning}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="font-medium text-green-900 mb-2">Cost Analysis</h5>
                <p className="text-2xl font-bold text-green-800">
                  ${analysis.recommendation === 'assign' ? analysis.analysis.assign.cost.toLocaleString() : analysis.analysis.hire.cost.toLocaleString()}
                </p>
                <p className="text-sm text-green-600">Recommended approach cost</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h5 className="font-medium text-purple-900 mb-2">Timeline</h5>
                <p className="text-2xl font-bold text-purple-800">
                  {analysis.recommendation === 'assign' ? analysis.analysis.assign.timeline : analysis.analysis.hire.timeline} days
                </p>
                <p className="text-sm text-purple-600">Time to start project</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h5 className="font-medium text-yellow-900 mb-2">Key Insights</h5>
              <ul className="space-y-1 text-sm text-yellow-800">
                <li>• {employeeMatches.filter(m => m.overallScore >= 70).length} employees match project requirements</li>
                <li>• {project.skillGaps?.length || 0} critical skills missing from current team</li>
                <li>• Confidence score: {analysis.recommendation === 'assign' ? analysis.analysis.assign.confidence : analysis.analysis.hire.confidence}%</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setSelectedView('matches')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
              >
                View Employee Matches
              </button>
              <button
                onClick={() => setSelectedView('analysis')}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Back to Analysis
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};