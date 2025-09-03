import React, { useState } from 'react';
import { JobBoard } from './JobBoard';
import { CompanyShowcase } from './CompanyShowcase';
import { GeneralApplication } from './GeneralApplication';
import type { JobApplication } from '../../types/career';

type ViewType = 'job-board' | 'company' | 'general-application';

export const CareerSite: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('job-board');

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  const handleApplicationSubmit = (application: Partial<JobApplication>) => {
    console.log('Application submitted:', application);
    // In a real app, this would send to your backend
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'job-board':
        return <JobBoard onViewChange={handleViewChange} />;
      case 'company':
        return <CompanyShowcase onBackToJobs={() => handleViewChange('job-board')} />;
      case 'general-application':
        return (
          <GeneralApplication 
            onSubmit={handleApplicationSubmit}
            onBack={() => handleViewChange('job-board')}
          />
        );
      default:
        return <JobBoard onViewChange={handleViewChange} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderCurrentView()}
    </div>
  );
};