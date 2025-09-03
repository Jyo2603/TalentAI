import React, { useState } from 'react';
import { DollarSign, Edit, Save, Plus, Award, TrendingUp, Calendar, CheckCircle } from 'lucide-react';
import { mockReferralRewards, mockReferrals } from '../../data/referralData';
import { mockJobs } from '../../data/mockData';
import type { ReferralReward, Referral } from '../../types/referral';

export const RewardSystem: React.FC = () => {
  const [rewards, setRewards] = useState(mockReferralRewards);
  const [editingReward, setEditingReward] = useState<ReferralReward | null>(null);
  const [isCreatingReward, setIsCreatingReward] = useState(false);
  const [formData, setFormData] = useState({
    jobId: '',
    jobTitle: '',
    department: '',
    experienceLevel: 'mid' as ReferralReward['experienceLevel'],
    rewardAmount: 1000
  });

  const handleSaveReward = () => {
    if (editingReward) {
      setRewards(prev => prev.map(reward => 
        reward.id === editingReward.id 
          ? { ...reward, ...formData, updatedAt: new Date() }
          : reward
      ));
    } else {
      const newReward: ReferralReward = {
        id: Date.now().toString(),
        jobId: formData.jobId || `custom-${Date.now()}`,
        jobTitle: formData.jobTitle,
        department: formData.department,
        experienceLevel: formData.experienceLevel,
        rewardAmount: formData.rewardAmount,
        currency: 'USD',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setRewards(prev => [newReward, ...prev]);
    }
    
    setEditingReward(null);
    setIsCreatingReward(false);
    setFormData({
      jobId: '',
      jobTitle: '',
      department: '',
      experienceLevel: 'mid',
      rewardAmount: 1000
    });
  };

  const handleEditReward = (reward: ReferralReward) => {
    setFormData({
      jobId: reward.jobId,
      jobTitle: reward.jobTitle,
      department: reward.department,
      experienceLevel: reward.experienceLevel,
      rewardAmount: reward.rewardAmount
    });
    setEditingReward(reward);
    setIsCreatingReward(true);
  };

  const getExperienceLevelColor = (level: ReferralReward['experienceLevel']) => {
    switch (level) {
      case 'junior': return 'bg-green-100 text-green-800';
      case 'mid': return 'bg-blue-100 text-blue-800';
      case 'senior': return 'bg-purple-100 text-purple-800';
      case 'lead': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate reward statistics
  const totalRewardsPaid = mockReferrals
    .filter(r => r.rewardStatus === 'paid')
    .reduce((sum, r) => sum + r.rewardAmount, 0);

  const pendingRewards = mockReferrals
    .filter(r => r.rewardStatus === 'pending' && r.status === 'hired')
    .reduce((sum, r) => sum + r.rewardAmount, 0);

  const rewardsThisMonth = mockReferrals
    .filter(r => {
      const thisMonth = new Date().getMonth();
      const rewardMonth = r.rewardPaidAt?.getMonth();
      return r.rewardStatus === 'paid' && rewardMonth === thisMonth;
    })
    .reduce((sum, r) => sum + r.rewardAmount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Referral Reward System</h2>
          <p className="text-gray-600 mt-2">Configure referral bonuses and track reward payments</p>
        </div>
        
        <button 
          onClick={() => setIsCreatingReward(true)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus size={16} />
          <span>Add Reward Rule</span>
        </button>
      </div>

      {/* Reward Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-bold text-green-900">Total Paid</span>
          </div>
          <p className="text-3xl font-bold text-green-800 mb-1">${totalRewardsPaid.toLocaleString()}</p>
          <p className="text-green-600 font-medium">All time rewards</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Award size={20} className="text-yellow-600" />
            <span className="font-bold text-yellow-900">Pending</span>
          </div>
          <p className="text-3xl font-bold text-yellow-800 mb-1">${pendingRewards.toLocaleString()}</p>
          <p className="text-yellow-600 font-medium">Awaiting payment</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Calendar size={20} className="text-blue-600" />
            <span className="font-bold text-blue-900">This Month</span>
          </div>
          <p className="text-3xl font-bold text-blue-800 mb-1">${rewardsThisMonth.toLocaleString()}</p>
          <p className="text-blue-600 font-medium">January 2025</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp size={20} className="text-purple-600" />
            <span className="font-bold text-purple-900">Avg Reward</span>
          </div>
          <p className="text-3xl font-bold text-purple-800 mb-1">
            ${Math.round(rewards.reduce((sum, r) => sum + r.rewardAmount, 0) / rewards.length).toLocaleString()}
          </p>
          <p className="text-purple-600 font-medium">Per successful hire</p>
        </div>
      </div>

      {/* Reward Rules */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Rules by Position</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div key={reward.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{reward.jobTitle}</h4>
                  <p className="text-sm text-gray-600">{reward.department}</p>
                </div>
                <button
                  onClick={() => handleEditReward(reward)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit size={14} className="text-gray-600" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience Level:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getExperienceLevelColor(reward.experienceLevel)}`}>
                    {reward.experienceLevel}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Reward Amount:</span>
                  <span className="text-lg font-bold text-gray-900">${reward.rewardAmount.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    reward.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {reward.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reward Payments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Reward Payments</h3>
        
        <div className="space-y-3">
          {mockReferrals.filter(r => r.rewardStatus === 'paid').map((referral) => (
            <div key={referral.id} className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Award size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{referral.referrerName}</p>
                  <p className="text-sm text-gray-600">
                    Referred {referral.candidateName} for {referral.jobTitle}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-green-800">${referral.rewardAmount.toLocaleString()}</p>
                <p className="text-xs text-green-600">
                  {referral.rewardPaidAt?.toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Reward Modal */}
      {isCreatingReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingReward ? 'Edit Reward Rule' : 'Create New Reward Rule'}
              </h3>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value as ReferralReward['experienceLevel'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="junior">Junior (0-2 years)</option>
                    <option value="mid">Mid-level (3-5 years)</option>
                    <option value="senior">Senior (5+ years)</option>
                    <option value="lead">Lead/Principal (8+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reward Amount ($)</label>
                  <input
                    type="number"
                    value={formData.rewardAmount}
                    onChange={(e) => setFormData({ ...formData, rewardAmount: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="100"
                    max="10000"
                    step="100"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Reward Guidelines</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>• Junior roles: $500 - $1,000</p>
                  <p>• Mid-level roles: $1,000 - $2,000</p>
                  <p>• Senior roles: $2,000 - $3,000</p>
                  <p>• Leadership roles: $3,000 - $5,000</p>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleSaveReward}
                  disabled={!formData.jobTitle || !formData.department}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <Save size={16} />
                  <span>{editingReward ? 'Update Rule' : 'Create Rule'}</span>
                </button>
                <button
                  onClick={() => {
                    setIsCreatingReward(false);
                    setEditingReward(null);
                    setFormData({
                      jobId: '',
                      jobTitle: '',
                      department: '',
                      experienceLevel: 'mid',
                      rewardAmount: 1000
                    });
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
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