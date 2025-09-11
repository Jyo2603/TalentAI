import React from 'react';
import { TrendingUp, Users, DollarSign, Award, Calendar, BarChart3, PieChart } from 'lucide-react';
import { mockReferralAnalytics, mockReferralStats, mockTopReferrers } from '../../data/referralData';

export const ReferralAnalytics: React.FC = () => {
  const { monthlyReferrals, departmentBreakdown, sourceBreakdown, rewardsPaid } = mockReferralAnalytics;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Referral Analytics & ROI</h2>
          <p className="text-gray-600 mt-2">Comprehensive performance insights and return on investment analysis</p>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl px-4 py-2">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span className="font-medium">Last 4 months</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Users size={20} className="text-blue-600" />
            <span className="font-bold text-blue-900">Total Referrals</span>
          </div>
          <p className="text-3xl font-bold text-blue-800 mb-1">{mockReferralStats.totalReferrals}</p>
          <p className="text-blue-600 font-medium">This quarter</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <TrendingUp size={20} className="text-green-600" />
            <span className="font-bold text-green-900">Conversion Rate</span>
          </div>
          <p className="text-3xl font-bold text-green-800 mb-1">{mockReferralStats.conversionRate}%</p>
          <p className="text-green-600 font-medium">Referral to hire</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <Award size={20} className="text-purple-600" />
            <span className="font-bold text-purple-900">Avg Time to Hire</span>
          </div>
          <p className="text-3xl font-bold text-purple-800 mb-1">{mockReferralStats.avgTimeToHire}</p>
          <p className="text-purple-600 font-medium">Days</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-3">
            <DollarSign size={20} className="text-orange-600" />
            <span className="font-bold text-orange-900">Cost per Hire</span>
          </div>
          <p className="text-3xl font-bold text-orange-800 mb-1">$2,100</p>
          <p className="text-orange-600 font-medium">Avg referral cost</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Referrals Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 size={20} className="text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Monthly Referral Trends</h3>
          </div>
          
          <div className="space-y-3">
            {monthlyReferrals.map((month) => {
              const conversionRate = month.count > 0 ? Math.round((month.hired / month.count) * 100) : 0;
              return (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{month.month}</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-blue-600">{month.count} referrals</span>
                      <span className="text-green-600">{month.hired} hired</span>
                      <span className="text-purple-600">{conversionRate}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(month.count / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Department Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <PieChart size={20} className="text-green-600" />
            <h3 className="text-lg font-semibold text-gray-900">Department Breakdown</h3>
          </div>
          
          <div className="space-y-3">
            {departmentBreakdown.map((dept) => {
              const conversionRate = dept.referrals > 0 ? Math.round((dept.hires / dept.referrals) * 100) : 0;
              return (
                <div key={dept.department} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{dept.department}</p>
                    <p className="text-sm text-gray-600">{dept.referrals} referrals • {dept.hires} hired</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{conversionRate}%</p>
                    <p className="text-xs text-gray-600">success rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">ROI Analysis</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">Cost Savings vs External Recruiting</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Avg Referral Cost:</span>
                <span className="font-bold text-green-800">$2,100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Avg Agency Fee:</span>
                <span className="font-bold text-green-800">$15,000</span>
              </div>
              <div className="flex justify-between border-t border-green-200 pt-2">
                <span className="text-green-700 font-medium">Savings per hire:</span>
                <span className="font-bold text-green-800">$12,900</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Quality Metrics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Referral Retention:</span>
                <span className="font-bold text-blue-800">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Direct Hire Retention:</span>
                <span className="font-bold text-blue-800">78%</span>
              </div>
              <div className="flex justify-between border-t border-blue-200 pt-2">
                <span className="text-blue-700 font-medium">Quality Advantage:</span>
                <span className="font-bold text-blue-800">+16%</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-3">Time to Hire</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-purple-700">Referral Hires:</span>
                <span className="font-bold text-purple-800">{mockReferralStats.avgTimeToHire} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-purple-700">Direct Hires:</span>
                <span className="font-bold text-purple-800">28 days</span>
              </div>
              <div className="flex justify-between border-t border-purple-200 pt-2">
                <span className="text-purple-700 font-medium">Time Saved:</span>
                <span className="font-bold text-purple-800">-{28 - mockReferralStats.avgTimeToHire} days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Source Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Sources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sourceBreakdown.map((source) => (
            <div key={source.source} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{source.source}</h4>
                <span className="text-lg font-bold text-gray-900">{source.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${source.percentage}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">{source.count} referrals</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};