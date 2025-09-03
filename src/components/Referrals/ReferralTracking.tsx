import React, { useState } from 'react';
import { Search, Filter, Eye, MessageSquare, Calendar, User, Award, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockReferrals, mockTopReferrers } from '../../data/referralData';
import { mockJobs } from '../../data/mockData';
import type { Referral } from '../../types/referral';

export const ReferralTracking: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Referral['status']>('all');
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);

  const filteredReferrals = mockReferrals.filter(referral => {
    const searchMatch = searchTerm === '' ||
                       referral.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       referral.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       referral.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const statusMatch = statusFilter === 'all' || referral.status === statusFilter;
    
    return searchMatch && statusMatch;
  });

  const getStatusColor = (status: Referral['status']) => {
    switch (status) {
      case 'submitted': return 'bg-gray-100 text-gray-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'screening': return 'bg-purple-100 text-purple-800';
      case 'interview': return 'bg-yellow-100 text-yellow-800';
      case 'hired': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Referral['status']) => {
    switch (status) {
      case 'submitted': return <Clock size={14} className="text-gray-600" />;
      case 'reviewed': return <Eye size={14} className="text-blue-600" />;
      case 'screening': return <User size={14} className="text-purple-600" />;
      case 'interview': return <Calendar size={14} className="text-yellow-600" />;
      case 'hired': return <CheckCircle size={14} className="text-green-600" />;
      case 'rejected': return <XCircle size={14} className="text-red-600" />;
      default: return <Clock size={14} className="text-gray-600" />;
    }
  };

  const getRewardStatusColor = (status: Referral['rewardStatus']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'paid': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysInPipeline = (submittedAt: Date, completedAt?: Date) => {
    const endDate = completedAt || new Date();
    const diffTime = endDate.getTime() - submittedAt.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const statusCounts = {
    submitted: mockReferrals.filter(r => r.status === 'submitted').length,
    reviewed: mockReferrals.filter(r => r.status === 'reviewed').length,
    screening: mockReferrals.filter(r => r.status === 'screening').length,
    interview: mockReferrals.filter(r => r.status === 'interview').length,
    hired: mockReferrals.filter(r => r.status === 'hired').length,
    rejected: mockReferrals.filter(r => r.status === 'rejected').length
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Referral Pipeline Tracking</h2>
          <p className="text-gray-600 mt-2">Monitor progress and status of all employee referrals</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 text-center">
          <p className="text-green-900 font-bold text-lg">
            {mockReferrals.filter(r => r.status === 'hired').length} successful hires this month
          </p>
          <p className="text-green-700 text-sm mt-1">Outstanding performance!</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-md transition-shadow">
            <div className="flex items-center justify-center mb-3">
              {getStatusIcon(status as Referral['status'])}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{count}</p>
            <p className="text-sm font-medium text-gray-600 capitalize">{status.replace('-', ' ')}</p>
          </div>
        ))}
      </div>

      {/* Top Referrers */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
            <Award size={20} className="text-yellow-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Top Referrers This Quarter</h3>
            <p className="text-gray-600 text-sm">Employees leading in successful referrals</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mockTopReferrers.slice(0, 4).map((referrer, index) => (
            <div key={referrer.employeeId} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                    {referrer.avatar ? (
                      <img src={referrer.avatar} alt={referrer.employeeName} className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} className="text-gray-600 mt-3 ml-3" />
                    )}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center border-2 border-white">
                      <span className="text-sm">👑</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{referrer.employeeName}</p>
                  <p className="text-sm text-gray-600 font-medium">{referrer.department}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Referrals:</span>
                  <span className="font-bold text-gray-900">{referrer.totalReferrals}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Hired:</span>
                  <span className="font-bold text-green-600">{referrer.successfulHires}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Success Rate:</span>
                  <span className="font-bold text-blue-600">{referrer.conversionRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Earned:</span>
                  <span className="font-bold text-purple-600">${referrer.totalRewardsEarned.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search referrals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">All Status</option>
            <option value="submitted">Submitted</option>
            <option value="reviewed">Reviewed</option>
            <option value="screening">Screening</option>
            <option value="interview">Interview</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Referrals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Candidate</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Referred By</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Position</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Days in Pipeline</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Reward</th>
                <th className="text-center py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReferrals.map((referral) => (
                <tr key={referral.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{referral.candidateName}</p>
                      <p className="text-sm text-gray-600">{referral.candidateEmail}</p>
                      {referral.candidatePhone && (
                        <p className="text-xs text-gray-500">{referral.candidatePhone}</p>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{referral.referrerName}</p>
                      <p className="text-xs text-gray-600">{referral.referrerEmail}</p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{referral.jobTitle}</p>
                      <p className="text-xs text-gray-600">
                        {mockJobs.find(j => j.id === referral.jobId)?.department}
                      </p>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                      {getStatusIcon(referral.status)}
                      <span className="capitalize">{referral.status.replace('-', ' ')}</span>
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <span className="text-sm text-gray-900">
                      {getDaysInPipeline(referral.submittedAt, referral.hiredAt)} days
                    </span>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <div>
                      <p className="text-sm font-bold text-gray-900">${referral.rewardAmount.toLocaleString()}</p>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRewardStatusColor(referral.rewardStatus)}`}>
                        {referral.rewardStatus}
                      </span>
                    </div>
                  </td>
                  
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => setSelectedReferral(referral)}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-2 rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button 
                        className="bg-green-100 hover:bg-green-200 text-green-800 p-2 rounded transition-colors"
                        title="Contact Candidate"
                      >
                        <MessageSquare size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredReferrals.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No referrals found</p>
          <p className="text-gray-600 mt-1">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Referral Detail Modal */}
      {selectedReferral && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Referral Details: {selectedReferral.candidateName}
                </h2>
                <button
                  onClick={() => setSelectedReferral(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Candidate Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="text-gray-600" />
                        <span className="text-gray-900">{selectedReferral.candidateName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MessageSquare size={14} className="text-gray-600" />
                        <span className="text-gray-900">{selectedReferral.candidateEmail}</span>
                      </div>
                      {selectedReferral.candidatePhone && (
                        <div className="flex items-center space-x-2">
                          <Calendar size={14} className="text-gray-600" />
                          <span className="text-gray-900">{selectedReferral.candidatePhone}</span>
                        </div>
                      )}
                      {selectedReferral.candidateLinkedIn && (
                        <div className="flex items-center space-x-2">
                          <Award size={14} className="text-gray-600" />
                          <a href={`https://${selectedReferral.candidateLinkedIn}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            LinkedIn Profile
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Referrer Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedReferral.referrerName}</p>
                      <p><span className="font-medium">Email:</span> {selectedReferral.referrerEmail}</p>
                      <p><span className="font-medium">Relationship:</span> {selectedReferral.relationship.replace('-', ' ')}</p>
                      <p><span className="font-medium">Submitted:</span> {selectedReferral.submittedAt.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Position Details</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-medium text-blue-900">{selectedReferral.jobTitle}</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        {mockJobs.find(j => j.id === selectedReferral.jobId)?.department}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Reward Information</h3>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-900">Reward Amount</span>
                        <span className="text-xl font-bold text-green-800">
                          ${selectedReferral.rewardAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-700">Status:</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRewardStatusColor(selectedReferral.rewardStatus)}`}>
                          {selectedReferral.rewardStatus}
                        </span>
                      </div>
                      {selectedReferral.rewardPaidAt && (
                        <p className="text-xs text-green-600 mt-2">
                          Paid on {selectedReferral.rewardPaidAt.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {selectedReferral.notes && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Referrer Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedReferral.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Contact Candidate
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
                  Move to Next Stage
                </button>
                <button 
                  onClick={() => setSelectedReferral(null)}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};