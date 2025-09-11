import React from 'react';
import { BarChart3 } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { HiringPipeline } from './HiringPipeline';
import { JobsSummary } from './JobsSummary';
import { TaskSchedule } from './TaskSchedule';
import { EmployeeTeams } from './EmployeeTeams';
import { mockJobs, mockCandidates } from '../../data/mockData';
import { mockCalendarEvents, mockTasks } from '../../data/calendarData';
import type { NavItem } from '../../types';

interface DashboardProps {
  onNavigate: (item: NavItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  // Calculate real metrics from mock data
  const openPositions = mockJobs.filter(job => job.status === 'active').length;
  const activeCandidates = mockCandidates.length;
  
  // Get interviews scheduled in next 7 days
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const upcomingInterviews = mockCalendarEvents.filter(event => 
    event.type === 'interview' && 
    new Date(event.startTime) >= today && 
    new Date(event.startTime) <= nextWeek
  ).length;
  
  // Mock offers data (since we don't have offer management mock data yet)
  const pendingOffers = 7; // Keep as is for now
  const expiringOffers = 2; // Keep as is for now

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Sarah ✨
            </h1>
            <p className="text-gray-600">Here's what's happening with your talent pipeline today.</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Open Positions"
          value={openPositions.toString()}
          change={`${mockJobs.filter(job => job.status === 'draft').length} drafts`}
          trend="up"
          onClick={() => onNavigate('open-hiring')}
        />
        <MetricCard
          title="Active Candidates"
          value={activeCandidates.toString()}
          change={`${mockCandidates.filter(c => c.status === 'applied').length} new applications`}
          trend="up"
          onClick={() => onNavigate('candidates')}
        />
        <MetricCard
          title="Interviews Scheduled"
          value={upcomingInterviews.toString()}
          change="Next 7 days"
          trend="neutral"
          onClick={() => onNavigate('calendar')}
        />
        <MetricCard
          title="Offers Pending"
          value={pendingOffers.toString()}
          change={`${expiringOffers} expiring soon`}
          trend="warning"
          onClick={() => onNavigate('offer-management')}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="h-full">
          <HiringPipeline onNavigate={onNavigate} />
        </div>
        <div className="h-full">
          <JobsSummary onNavigate={onNavigate} />
        </div>
        <div className="h-full">
          <TaskSchedule onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
};