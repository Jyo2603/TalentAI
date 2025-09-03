import React, { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { AuthWrapper } from './components/Auth/AuthWrapper';
import { useAuth } from './contexts/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { CandidateLayout } from './components/Candidate/CandidateLayout';
import { CandidateDashboard } from './components/Candidate/CandidateDashboard';
import { JobBrowser } from './components/Candidate/JobBrowser';
import { ApplicationTracker } from './components/Candidate/ApplicationTracker';
import { AssessmentCenter } from './components/Candidate/AssessmentCenter';
import { CandidateProfile } from './components/Candidate/CandidateProfile';
import { Dashboard } from './components/Dashboard/Dashboard';
import { Inbox } from './components/Inbox/Inbox';
import { Calendar } from './components/Calendar/Calendar';
import { OpenHiring } from './components/OpenHiring/OpenHiring';
import { Candidates } from './components/Candidates/Candidates';
import { Assessments } from './components/Assessments/Assessments';
import { Referrals } from './components/Referrals/Referrals';
import { CareerSite } from './components/CareerSite/CareerSite';
import { OfferManagement } from './components/OfferManagement/OfferManagement';
import { TalentPool } from './components/TalentPool/TalentPool';
import { Projects } from './components/Projects/Projects';
import { Assignments } from './components/Assignments/Assignments';
import { Onboarding } from './components/Onboarding/Onboarding';
import { AccountSettings } from './components/Settings/AccountSettings';
import { AdminSettings } from './components/Settings/AdminSettings';
import type { NavItem } from './types';

const AppContent: React.FC = () => {
  const { profile } = useAuth();
  const [activeItem, setActiveItem] = useState<NavItem>('dashboard');
  const [candidateActiveItem, setCandidateActiveItem] = useState('dashboard');

  // Route to candidate interface if user is a candidate (only if profile exists)
  if (profile?.user_type === 'candidate') {
    const renderCandidateContent = () => {
      switch (candidateActiveItem) {
        case 'dashboard':
          return (
            <CandidateDashboard 
              onNavigateToJobs={() => setCandidateActiveItem('jobs')}
              onNavigateToApplications={() => setCandidateActiveItem('applications')}
              onNavigateToAssessments={() => setCandidateActiveItem('assessments')}
            />
          );
        case 'jobs':
          return <JobBrowser />;
        case 'applications':
          return <ApplicationTracker onNavigateToJobs={() => setCandidateActiveItem('jobs')} />;
        case 'assessments':
          return <AssessmentCenter onNavigateToJobs={() => setCandidateActiveItem('jobs')} />;
        case 'profile':
          return <CandidateProfile />;
        default:
          return <CandidateDashboard />;
      }
    };

    return (
      <CandidateLayout 
        activeItem={candidateActiveItem} 
        onItemChange={setCandidateActiveItem}
      >
        {renderCandidateContent()}
      </CandidateLayout>
    );
  }

  // Recruiter interface (existing functionality)
  const getPageTitle = (item: NavItem): string => {
    switch (item) {
      case 'dashboard': return 'Talent Management Dashboard';
      case 'inbox': return 'Message Center';
      case 'calendar': return 'Schedule & Task Management';
      case 'open-hiring': return 'Job Posting Management';
      case 'candidates': return 'Candidate Pipeline';
      case 'assessments': return 'Assessment Center';
      case 'referrals': return 'Employee Referral Program';
      case 'career-site': return 'Public Career Portal';
      case 'offer-management': return 'Job Offer Management';
      case 'talent-pool': return 'Employee Management';
      case 'projects': return 'Project Management';
      case 'assignments': return 'Resource Allocation';
      case 'onboarding': return 'New Employee Onboarding';
      case 'account-settings': return 'Personal Account Settings';
      case 'admin-settings': return 'System Administration';
      default: return 'Talent Management Dashboard';
    }
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveItem} />;
      case 'inbox':
        return <Inbox />;
      case 'calendar':
        return <Calendar />;
      case 'open-hiring':
        return <OpenHiring />;
      case 'candidates':
        return <Candidates />;
      case 'assessments':
        return <Assessments />;
      case 'referrals':
        return <Referrals />;
      case 'career-site':
        return <CareerSite />;
      case 'offer-management':
        return <OfferManagement />;
      case 'talent-pool':
        return <TalentPool />;
      case 'projects':
        return <Projects />;
      case 'assignments':
        return <Assignments />;
      case 'onboarding':
        return <Onboarding />;
      case 'account-settings':
        return <AccountSettings />;
      case 'admin-settings':
        return <AdminSettings />;
      default:
        return <Dashboard onNavigate={setActiveItem} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeItem={activeItem} onItemChange={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <Header title={getPageTitle(activeItem)} onNavigate={setActiveItem} />
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AuthWrapper>
        <AppContent />
      </AuthWrapper>
    </AuthProvider>
  );
};

export default App;