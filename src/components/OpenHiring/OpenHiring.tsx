import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { JobList } from './JobList';
import CandidatesPipeline from './CandidatesPipeline';
import { JobForm } from './JobForm';
import { JobDetails } from './JobDetails';
import { mockCandidates, loadJobsFromStorage, saveJobsToStorage } from '../../data/mockData';
import type { Job } from '../../types';

type TabType = 'jobs' | 'candidates' | 'create-job' | 'job-details';

export const OpenHiring: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('jobs');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState(() => loadJobsFromStorage());
  const [candidates, setCandidates] = useState(mockCandidates);

  const tabs = [
    { id: 'jobs' as TabType, label: 'Open Jobs', count: jobs.length },
    { id: 'create-job' as TabType, label: 'Create Job', count: null }
  ];

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
    setActiveTab('job-details');
  };

  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setActiveTab('create-job');
  };

  const handleSaveJob = (jobData: Partial<Job>) => {
    let updatedJobs: Job[];
    
    if (editingJob) {
      // Update existing job
      updatedJobs = jobs.map(job => 
        job.id === editingJob.id 
          ? { ...job, ...jobData }
          : job
      );
    } else {
      // Create new job
      const newJob: Job = {
        id: Date.now().toString(),
        title: jobData.title || '',
        description: jobData.description || '',
        department: jobData.department || '',
        location: jobData.location || '',
        type: jobData.type || 'full-time',
        skills: jobData.skills || [],
        salary: jobData.salary || { min: 0, max: 0, currency: 'USD' },
        status: 'active',
        createdAt: new Date(),
        applicantCount: 0
      };
      updatedJobs = [newJob, ...jobs];
    }
    
    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
    
    setEditingJob(null);
    setActiveTab('jobs');
  };

  const handleCancelJobForm = () => {
    setEditingJob(null);
    setActiveTab('jobs');
  };

  const handleCreateJob = () => {
    setEditingJob(null);
    setActiveTab('create-job');
  };

  const handleToggleJobStatus = (jobId: string, newStatus: Job['status']) => {
    const updatedJobs = jobs.map(job => 
      job.id === jobId 
        ? { ...job, status: newStatus }
        : job
    );
    setJobs(updatedJobs);
    saveJobsToStorage(updatedJobs);
  };

  const handleCandidateStatusChange = (candidateId: string, newStatus: any) => {
    setCandidates(prev => prev.map(candidate => 
      candidate.id === candidateId 
        ? { ...candidate, status: newStatus }
        : candidate
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Open Hiring</h1>
        <p className="text-gray-600 mt-2">Manage external recruitment and candidate applications</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {activeTab !== 'job-details' && (
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-left">
                    <div>{tab.label}</div>
                    {tab.count !== null && (
                      <div className="text-xs opacity-75">{tab.count} active</div>
                    )}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        )}

        <div className="p-6">
          {activeTab === 'jobs' && (
            <JobList 
              jobs={jobs}
              onJobSelect={handleJobSelect}
              onEditJob={handleEditJob}
              onToggleJobStatus={handleToggleJobStatus}
              onCreateJob={handleCreateJob}
            />
          )}
          
          {activeTab === 'create-job' && (
            <JobForm 
              editingJob={editingJob}
              onSave={handleSaveJob}
              onCancel={handleCancelJobForm}
            />
          )}
          
          {activeTab === 'job-details' && selectedJob && (
            <JobDetails 
              job={selectedJob}
              onClose={() => setActiveTab('jobs')}
              onEdit={handleEditJob}
              onToggleStatus={handleToggleJobStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
};