import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Users, Briefcase, ArrowRight, Filter, Building, Calendar, Send, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { careerJobPostings } from '../../data/careerData';
import type { JobPosting, JobApplication } from '../../types/career';

interface JobApplicationFormProps {
  job: JobPosting;
  onSubmit: (application: Partial<JobApplication>) => void;
  onCancel: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ job, onSubmit, onCancel }) => {
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: profile?.full_name || '',
    candidateEmail: profile?.email || '',
    candidatePhone: profile?.phone || '',
    coverLetter: '',
    expectedSalary: '',
    availableStartDate: '',
    howDidYouHear: '',
    additionalInfo: '',
    linkedInProfile: profile?.linkedin_profile || '',
    portfolioUrl: profile?.portfolio_url || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.candidateName.trim()) newErrors.candidateName = 'Name is required';
    if (!formData.candidateEmail.trim()) newErrors.candidateEmail = 'Email is required';
    if (!formData.candidateEmail.includes('@')) newErrors.candidateEmail = 'Valid email is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.howDidYouHear) newErrors.howDidYouHear = 'Please tell us how you heard about us';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const application: Partial<JobApplication> = {
        jobId: job.id,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone || undefined,
        coverLetter: formData.coverLetter,
        linkedInProfile: formData.linkedInProfile || undefined,
        portfolioUrl: formData.portfolioUrl || undefined,
        expectedSalary: formData.expectedSalary ? parseInt(formData.expectedSalary) : undefined,
        availableStartDate: formData.availableStartDate ? new Date(formData.availableStartDate) : undefined,
        howDidYouHear: formData.howDidYouHear,
        additionalInfo: formData.additionalInfo,
        submittedAt: new Date(),
        status: 'submitted',
        source: 'career-site'
      };
      
      onSubmit(application);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Apply for {job.title}</h2>
              <p className="text-gray-600">{job.department} • {job.location}</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <span className="text-gray-600 text-xl">×</span>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.candidateName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.candidateName && <p className="text-red-600 text-xs mt-1">{errors.candidateName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                value={formData.candidateEmail}
                onChange={(e) => setFormData({ ...formData, candidateEmail: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.candidateEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="john.doe@email.com"
              />
              {errors.candidateEmail && <p className="text-red-600 text-xs mt-1">{errors.candidateEmail}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                value={formData.candidatePhone}
                onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
              <input
                type="number"
                value={formData.expectedSalary}
                onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="150000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.linkedInProfile}
                onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/yourname"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
              <input
                type="url"
                value={formData.portfolioUrl}
                onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://yourportfolio.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Start Date</label>
            <input
              type="date"
              value={formData.availableStartDate}
              onChange={(e) => setFormData({ ...formData, availableStartDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us? *</label>
            <select
              value={formData.howDidYouHear}
              onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.howDidYouHear ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select an option</option>
              <option value="Company website">Company website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Job board">Job board</option>
              <option value="Employee referral">Employee referral</option>
              <option value="Social media">Social media</option>
              <option value="Google search">Google search</option>
              <option value="Other">Other</option>
            </select>
            {errors.howDidYouHear && <p className="text-red-600 text-xs mt-1">{errors.howDidYouHear}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cover Letter *</label>
            <textarea
              value={formData.coverLetter}
              onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
              rows={6}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.coverLetter ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Tell us why you're interested in this position and how your skills and experience make you a great fit..."
            />
            {errors.coverLetter && <p className="text-red-600 text-xs mt-1">{errors.coverLetter}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
            <textarea
              value={formData.additionalInfo}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any additional information you'd like to share..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Submit Application</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const JobBrowser: React.FC = () => {
  const { profile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | string>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | string>('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState<JobPosting | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<string[]>(() => {
    const saved = localStorage.getItem('appliedJobs');
    return saved ? JSON.parse(saved) : [];
  });

  const filteredJobs = careerJobPostings.filter((job) => {
    const searchMatch =
      searchTerm === '' ||
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const departmentMatch = departmentFilter === 'all' || job.department === departmentFilter;
    const locationMatch = locationFilter === 'all' || job.location.includes(locationFilter);

    return searchMatch && departmentMatch && locationMatch;
  });

  const departments = Array.from(new Set(careerJobPostings.map((job) => job.department)));
  const locations = Array.from(new Set(careerJobPostings.map((job) => job.location)));

  const handleApply = (job: JobPosting) => {
    if (isJobApplied(job.id)) {
      alert('You have already applied for this position!');
      return;
    }
    setShowApplicationForm(job);
  };

  const handleApplicationSubmit = (application: Partial<JobApplication>) => {
    if (!profile) return;

    console.log('📝 Submitting application for user:', profile.id);
    console.log('👤 Current profile before submission:', profile);
    
    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem('candidateApplications') || '[]');
    const newApplication = {
      id: Date.now().toString(),
      ...application,
      candidateId: profile.id,
      jobTitle: showApplicationForm?.title, // Add the actual job title
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      updatedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    localStorage.setItem('candidateApplications', JSON.stringify(applications));
    console.log('💾 Application saved to localStorage');
    console.log('👤 Profile after saving application:', profile);

    // Add to applied jobs list
    const updatedAppliedJobs = [...appliedJobs, application.jobId!];
    setAppliedJobs(updatedAppliedJobs);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    console.log('✅ Applied jobs list updated');

    // Create assessment for this job
    const assessments = JSON.parse(localStorage.getItem('candidateAssessments') || '[]');
    const newAssessment = {
      id: Date.now().toString(),
      candidateId: profile.id,
      jobId: application.jobId,
      jobTitle: showApplicationForm?.title || 'Unknown Position',
      assessmentTitle: `${showApplicationForm?.title || 'Job'} Technical Assessment`,
      status: 'not-started',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeLimit: 60,
      totalQuestions: 15,
      passingScore: 70
    };
    assessments.push(newAssessment);
    localStorage.setItem('candidateAssessments', JSON.stringify(assessments));
    console.log('🎯 Assessment created for job');
    console.log('👤 Profile after creating assessment:', profile);

    setShowApplicationForm(null);
    setSelectedJob(null);
    
    // Show success message
    alert(`Application submitted successfully for ${showApplicationForm?.title}! Check your Applications tab to track progress.`);
    console.log('👤 Profile at end of submission:', profile);
  };

  const isJobApplied = (jobId: string) => {
    return appliedJobs.includes(jobId);
  };

  if (selectedJob) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <button
          onClick={() => setSelectedJob(null)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6"
        >
          <ArrowRight size={20} className="rotate-180" />
          <span>Back to Jobs</span>
        </button>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{selectedJob.title}</h1>
                  <div className="flex items-center space-x-6 text-gray-600 mb-4">
                    <div className="flex items-center space-x-2">
                      <Building size={18} className="text-gray-400" />
                      <span className="font-medium">{selectedJob.department}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={18} className="text-gray-400" />
                      <span className="font-medium">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-gray-400" />
                      <span>Posted {selectedJob.postedDate.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {selectedJob.salary && (
                    <div className="flex items-center space-x-2 text-green-700">
                      <DollarSign size={18} className="text-green-600" />
                      <span className="text-xl font-bold">
                        ${selectedJob.salary.min.toLocaleString()} - ${selectedJob.salary.max.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">annually</span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleApply(selectedJob)}
                  disabled={isJobApplied(selectedJob.id)}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-3 text-lg font-semibold min-w-[200px] shadow-lg hover:shadow-xl"
                >
                  {isJobApplied(selectedJob.id) ? (
                    <>
                      <CheckCircle size={20} />
                      <span>Already Applied</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Apply Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Job Details */}
                <div className="lg:col-span-2 space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Role</h2>
                    <p className="text-gray-700 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                    <ul className="space-y-3">
                      {selectedJob.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 leading-relaxed">{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                    <ul className="space-y-3">
                      {selectedJob.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700 leading-relaxed">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                    <div className="flex flex-wrap gap-3">
                      {selectedJob.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Department</span>
                        <span className="font-medium text-gray-900">{selectedJob.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-900">{selectedJob.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type</span>
                        <span className="font-medium text-gray-900 capitalize">{selectedJob.type.replace('-', ' ')}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Experience</span>
                        <span className="font-medium text-gray-900 capitalize">{selectedJob.experienceLevel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Remote Work</span>
                        <span className="font-medium text-gray-900">{selectedJob.isRemote ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                    <ul className="space-y-3">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
        <p className="text-gray-600">Discover exciting opportunities at QuantumCore Technologies</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search jobs, skills, or departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          >
            <option value="all">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
            <option value="Remote">Remote</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
            </span>
          </div>
        </div>
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 font-medium">{job.department}</p>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                  {job.experienceLevel}
                </span>
                {job.isRemote && (
                  <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-xs font-medium">
                    Remote
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-gray-400" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={14} className="text-gray-400" />
                  <span className="capitalize">{job.type.replace('-', ' ')}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users size={14} className="text-gray-400" />
                  <span>{job.applicationCount} applicants</span>
                </div>
                {job.salary && (
                  <div className="flex items-center space-x-2 text-green-700 font-medium">
                    <DollarSign size={14} className="text-green-600" />
                    <span>${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {job.description}
              </p>

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.skills.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      +{job.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 flex items-center space-x-1">
                <Calendar size={12} />
                <span>Posted {job.postedDate.toLocaleDateString()}</span>
              </span>
              <button
                onClick={() => handleApply(job)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium hover:shadow-md"
              >
                <span>View Details</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Briefcase size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No positions found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your search criteria or check back later for new openings.
          </p>
        </div>
      )}
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <JobApplicationForm job={showApplicationForm} onSubmit={handleApplicationSubmit} onCancel={() => setShowApplicationForm(null)} />
      )}
    </>
  );
};