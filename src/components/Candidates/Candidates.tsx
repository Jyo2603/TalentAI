import React, { useState } from 'react';
import { Search, Filter, Users, Clock, CheckCircle, Grid, List, Eye } from 'lucide-react';
import { CandidateList } from './CandidateList';
import { CandidateProfile } from './CandidateProfile';
import { mockCandidates, mockJobs } from '../../data/mockData';
import type { Candidate } from '../../types';

export const Candidates: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Candidate['status']>('all');
  const [jobFilter, setJobFilter] = useState<'all' | string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid');
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [candidates, setCandidates] = useState(mockCandidates);

  const filteredCandidates = candidates.filter(candidate => {
    const matchesSearch = candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || candidate.status === statusFilter;
    const matchesJob = jobFilter === 'all' || candidate.jobId === jobFilter;
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleCandidateSelect = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const handleStatusChange = (candidateId: string, newStatus: Candidate['status']) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus }
        : candidate
    ));
  };

  const handleBackToList = () => {
    setSelectedCandidate(null);
  };

  if (selectedCandidate) {
    return (
      <CandidateProfile
        candidate={selectedCandidate}
        onBack={handleBackToList}
        onStatusChange={handleStatusChange}
      />
    );
  }

  const statusCounts = {
    applied: candidates.filter(c => c.status === 'applied').length,
    shortlisted: candidates.filter(c => c.status === 'shortlisted').length,
    interview: candidates.filter(c => c.status === 'interview').length,
    hired: candidates.filter(c => c.status === 'hired').length,
    rejected: candidates.filter(c => c.status === 'rejected').length
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">Manage candidate applications and track progress</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <Grid size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
              }`}
            >
              <List size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600">Applied</p>
          <p className="text-xl font-semibold text-gray-900">{statusCounts.applied}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Shortlisted</p>
          <p className="text-xl font-semibold text-blue-800">{statusCounts.shortlisted}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600">Interview</p>
          <p className="text-xl font-semibold text-yellow-800">{statusCounts.interview}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Hired</p>
          <p className="text-xl font-semibold text-green-800">{statusCounts.hired}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600">Rejected</p>
          <p className="text-xl font-semibold text-red-800">{statusCounts.rejected}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Positions</option>
            {mockJobs.map(job => (
              <option key={job.id} value={job.id}>{job.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Candidates List */}
      <CandidateList
        candidates={filteredCandidates}
        viewMode={viewMode}
        onCandidateSelect={handleCandidateSelect}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};