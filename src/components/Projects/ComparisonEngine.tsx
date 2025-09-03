import React, { useState } from 'react';
import { Users, UserPlus, Star, Award, TrendingUp, Clock } from 'lucide-react';
import { mockCandidates, mockEmployees } from '../../data/mockData';
import type { Project, Candidate, Employee } from '../../types';

interface ComparisonEngineProps {
  selectedProject: Project | null;
}

export const ComparisonEngine: React.FC<ComparisonEngineProps> = ({ selectedProject }) => {
  const [activeView, setActiveView] = useState<'external' | 'internal'>('external');

  if (!selectedProject) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900">Select a Project</p>
        <p className="text-gray-600 mt-1">Choose a project from the overview tab to see talent comparison</p>
      </div>
    );
  }

  // Calculate skill matches for employees
  const getSkillMatch = (skills: string[], required: string[]) => {
    const matches = skills.filter(skill => required.includes(skill)).length;
    return Math.round((matches / required.length) * 100);
  };

  // Filter relevant candidates and employees
  const relevantCandidates = mockCandidates.filter(candidate => 
    candidate.skills.some(skill => selectedProject.requiredSkills.includes(skill))
  ).slice(0, 5);

  const relevantEmployees = mockEmployees.filter(employee => 
    employee.skills.some(skill => selectedProject.requiredSkills.includes(skill))
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Talent Comparison: {selectedProject.name}
        </h2>
        <p className="text-gray-600 mb-4">{selectedProject.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-gray-700 mr-2">Required Skills:</span>
          {selectedProject.requiredSkills.map((skill) => (
            <span key={skill} className="px-2 py-1 bg-white text-gray-700 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Toggle View */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveView('external')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'external'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <UserPlus size={16} />
          <span>External Candidates ({relevantCandidates.length})</span>
        </button>
        
        <button
          onClick={() => setActiveView('internal')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'internal'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Users size={16} />
          <span>Internal Employees ({relevantEmployees.length})</span>
        </button>
      </div>

      {/* Comparison Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeView === 'external' && relevantCandidates.map((candidate) => (
          <div key={candidate.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                <p className="text-sm text-gray-600">{candidate.experience} years experience</p>
              </div>
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                External
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                {candidate.testScore && (
                  <div className="flex items-center space-x-1">
                    <Star size={14} className="text-blue-600" />
                    <span className="text-sm font-medium">Test: {candidate.testScore}%</span>
                  </div>
                )}
                {candidate.atsScore && (
                  <div className="flex items-center space-x-1">
                    <Award size={14} className="text-purple-600" />
                    <span className="text-sm font-medium">ATS: {candidate.atsScore}%</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Skills Match</p>
                <div className="flex flex-wrap gap-1">
                  {candidate.skills.filter(skill => selectedProject.requiredSkills.includes(skill)).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {getSkillMatch(candidate.skills, selectedProject.requiredSkills)}% match
                </p>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded transition-colors">
                  Hire Candidate
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 rounded transition-colors">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeView === 'internal' && relevantEmployees.map((employee) => (
          <div key={employee.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {employee.avatar ? (
                    <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <Users size={20} className="text-gray-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.department}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  employee.availability === 'available' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {employee.availability === 'available' ? 'Available' : 'Assigned'}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp size={14} className="text-green-600" />
                  <span className="text-sm font-medium">
                    {getSkillMatch(employee.skills, selectedProject.requiredSkills)}% skill match
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} className="text-gray-600" />
                  <span className="text-sm">{employee.experience} years exp</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Matching Skills</p>
                <div className="flex flex-wrap gap-1">
                  {employee.skills.filter(skill => selectedProject.requiredSkills.includes(skill)).map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Recent Projects</p>
                <div className="space-y-1">
                  {employee.pastProjects.slice(0, 2).map((project) => (
                    <p key={project} className="text-xs text-gray-600">• {project}</p>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                <button 
                  className={`flex-1 text-sm py-2 rounded transition-colors ${
                    employee.availability === 'available'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                  disabled={employee.availability !== 'available'}
                >
                  {employee.availability === 'available' ? 'Assign to Project' : 'Currently Assigned'}
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm py-2 rounded transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {((activeView === 'external' && relevantCandidates.length === 0) || 
        (activeView === 'internal' && relevantEmployees.length === 0)) && (
        <div className="text-center py-12">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No {activeView} talent found</p>
          <p className="text-gray-600 mt-1">
            No {activeView} {activeView === 'external' ? 'candidates' : 'employees'} match the project requirements
          </p>
        </div>
      )}
    </div>
  );
};