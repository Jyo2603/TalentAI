import React, { useState } from 'react';
import { Send, Upload, User, Briefcase, Phone, Mail, Linkedin, FileText, CheckCircle, Award } from 'lucide-react';
import { mockJobs } from '../../data/mockData';
import { mockReferralRewards } from '../../data/referralData';
import type { Referral } from '../../types/referral';

export const ReferralPortal: React.FC = () => {
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    candidateLinkedIn: '',
    jobId: '',
    notes: '',
    relationship: 'former-colleague' as Referral['relationship'],
    resumeFile: null as File | null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.candidateName.trim()) newErrors.candidateName = 'Candidate name is required';
    if (!formData.candidateEmail.trim()) newErrors.candidateEmail = 'Email is required';
    if (!formData.candidateEmail.includes('@')) newErrors.candidateEmail = 'Valid email is required';
    if (!formData.jobId) newErrors.jobId = 'Please select a job position';
    if (!formData.notes.trim()) newErrors.notes = 'Please explain why you\'re referring this candidate';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const selectedJob = mockJobs.find(job => job.id === formData.jobId);
      const reward = mockReferralRewards.find(r => r.jobId === formData.jobId) || 
                    mockReferralRewards.find(r => r.jobId === 'default-junior');
      
      console.log('Referral submitted:', {
        ...formData,
        jobTitle: selectedJob?.title,
        rewardAmount: reward?.rewardAmount || 500,
        submittedAt: new Date()
      });
      
      setIsSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          candidateName: '',
          candidateEmail: '',
          candidatePhone: '',
          candidateLinkedIn: '',
          jobId: '',
          notes: '',
          relationship: 'former-colleague',
          resumeFile: null
        });
      }, 3000);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resumeFile: file });
    }
  };

  const selectedJob = mockJobs.find(job => job.id === formData.jobId);
  const selectedReward = mockReferralRewards.find(r => r.jobId === formData.jobId) || 
                         mockReferralRewards.find(r => r.jobId === 'default-junior');

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Referral Submitted Successfully!</h2>
        <p className="text-gray-600 mb-4">
          Thank you for referring {formData.candidateName} for the {selectedJob?.title} position.
        </p>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
          <p className="text-green-800 font-medium">
            Potential Reward: ${selectedReward?.rewardAmount.toLocaleString()}
          </p>
          <p className="text-green-600 text-sm mt-1">
            You'll receive this bonus if your referral gets hired!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Submit a Referral</h2>
          <p className="text-gray-600 mt-1">Know someone perfect for our open positions? Refer them and earn rewards!</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-900 font-medium">💰 Referral Rewards</p>
          <p className="text-blue-700 text-sm">$500 - $3,000 per successful hire</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Candidate Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
            <User size={20} className="text-blue-600" />
            <span>Candidate Information</span>
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name *</label>
              <input
                type="text"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  errors.candidateName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.candidateName && <p className="text-red-600 text-xs mt-1">{errors.candidateName}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address *</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.candidateEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="john.doe@email.com"
                />
              </div>
              {errors.candidateEmail && <p className="text-red-600 text-xs mt-1">{errors.candidateEmail}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={formData.candidatePhone}
                  onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1-555-0123"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">LinkedIn Profile</label>
              <div className="relative">
                <Linkedin size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="url"
                  value={formData.candidateLinkedIn}
                  onChange={(e) => setFormData({ ...formData, candidateLinkedIn: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Resume (PDF)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-all duration-200 bg-gray-50 hover:bg-blue-50">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {formData.resumeFile ? formData.resumeFile.name : 'Click to upload resume (optional)'}
                  </p>
                  <p className="text-xs text-gray-500">PDF format, max 10MB</p>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Relationship to Candidate *</label>
              <select
                value={formData.relationship}
                onChange={(e) => setFormData({ ...formData, relationship: e.target.value as Referral['relationship'] })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="former-colleague">Former Colleague</option>
                <option value="friend">Friend</option>
                <option value="linkedin-connection">LinkedIn Connection</option>
                <option value="university">University Connection</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column - Job Selection & Details */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-3">
              <Briefcase size={20} className="text-green-600" />
              <span>Position & Referral Details</span>
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Open Position *</label>
                <select
                  value={formData.jobId}
                  onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.jobId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                >
                  <option value="">Choose a position...</option>
                  {mockJobs.filter(job => job.status === 'active').map(job => (
                    <option key={job.id} value={job.id}>
                      {job.title} - {job.department}
                    </option>
                  ))}
                </select>
                {errors.jobId && <p className="text-red-600 text-xs mt-1">{errors.jobId}</p>}
              </div>

              {selectedJob && (
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-900 mb-4">{selectedJob.title}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin size={16} className="text-blue-600" />
                      </div>
                      <span className="text-blue-800 font-medium">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Building size={16} className="text-blue-600" />
                      </div>
                      <span className="text-blue-800 font-medium">{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DollarSign size={16} className="text-blue-600" />
                      </div>
                      <span className="text-blue-800 font-medium">
                        ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-blue-900 mb-3">Required Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedJob.skills.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-white text-blue-800 rounded-lg text-sm font-medium border border-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedReward && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-3">
                    <Award size={20} className="text-green-600" />
                    <span className="text-lg font-bold text-green-900">Referral Reward</span>
                  </div>
                  <p className="text-3xl font-bold text-green-800 mb-2">${selectedReward.rewardAmount.toLocaleString()}</p>
                  <p className="text-green-700 font-medium">Paid upon successful hire</p>
                  <p className="text-green-600 text-sm mt-1">After 90-day retention period</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Why are you referring this candidate? *
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                    errors.notes ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Describe their skills, experience, and why they would be an excellent fit for this role. Include specific examples of their work or achievements..."
                />
                {errors.notes && <p className="text-red-600 text-xs mt-1">{errors.notes}</p>}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Referral Guidelines</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <p className="text-gray-700 font-medium">Only refer candidates you know personally and can vouch for their skills</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <p className="text-gray-700 font-medium">Ensure the candidate is genuinely interested in the position</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <p className="text-gray-700 font-medium">Referral rewards are paid after successful hire and 90-day retention</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <p className="text-gray-700 font-medium">Track your referral's progress in the Referral Tracking section</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-400 text-white py-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-3 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting Referral...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Submit Referral</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};