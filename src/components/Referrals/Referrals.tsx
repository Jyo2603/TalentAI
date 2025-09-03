import React, { useState } from 'react';
import { Users, Award, TrendingUp, DollarSign } from 'lucide-react';
import { ReferralPortal } from './ReferralPortal';
import { ReferralTracking } from './ReferralTracking';
import { RewardSystem } from './RewardSystem';
import { ReferralAnalytics } from './ReferralAnalytics';
import { mockReferralStats } from '../../data/referralData';

type TabType = 'portal' | 'tracking' | 'rewards' | 'analytics';

export const Referrals: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('portal');

  const tabs = [
    { 
      id: 'portal' as TabType, 
      label: 'Referral Portal', 
      icon: Users,
      description: 'Submit new referrals'
    },
    { 
      id: 'tracking' as TabType, 
      label: 'Referral Tracking', 
      icon: TrendingUp,
      description: 'Track referral progress'
    },
    { 
      id: 'rewards' as TabType, 
      label: 'Reward System', 
      icon: Award,
      description: 'Manage referral bonuses'
    },
    { 
      id: 'analytics' as TabType, 
      label: 'Analytics', 
      icon: DollarSign,
      description: 'ROI and performance metrics'
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'portal':
        return <ReferralPortal />;
      case 'tracking':
        return <ReferralTracking />;
      case 'rewards':
        return <RewardSystem />;
      case 'analytics':
        return <ReferralAnalytics />;
      default:
        return <ReferralPortal />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Referrals</h1>
          <p className="text-gray-600 mt-2">Leverage your team's network to find top talent</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Active: {mockReferralStats.inProgress}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Hired: {mockReferralStats.hired}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">Rewards: ${mockReferralStats.totalRewardsPaid.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-3 px-6 py-4 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className="text-xs opacity-75 mt-0.5">{tab.description}</div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};