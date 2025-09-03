import React, { useState } from 'react';
import { ArrowLeft, Upload, Send, CheckCircle, User, Mail, Phone, Linkedin, Globe, FileText } from 'lucide-react';
import { companyInfo } from '../../data/careerData';
import type { JobApplication } from '../../types/career';

interface GeneralApplicationProps {
  onSubmit: (application: Partial<JobApplication>) => void;
  onBack: () => void;
}

export const GeneralApplication: React.FC<GeneralApplicationProps> = ({ onSubmit, onBack }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    linkedInProfile: '',
    portfolioUrl: '',
    coverLetter: '',
    expectedSalary: '',
    availableStartDate: '',
    howDidYouHear: '',
    additionalInfo: '',
    resumeFile: null as File | null,
    interestedDepartments: [] as string[],
    preferredLocation: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const departments = ['Engineering', 'Product', 'Design', 'Data Science', 'Sales', 'Marketing', 'Customer Success', 'Security'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.candidateName.trim()) newErrors.candidateName = 'Name is required';
    if (!formData.candidateEmail.trim()) newErrors.candidateEmail = 'Email is required';
    if (!formData.candidateEmail.includes('@')) newErrors.candidateEmail = 'Valid email is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Please tell us about yourself';
    if (formData.interestedDepartments.length === 0) newErrors.interestedDepartments = 'Select at least one department';
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
        jobId: 'general-application',
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone || undefined,
        coverLetter: formData.coverLetter,
        linkedInProfile: formData.linkedInProfile || undefined,
        portfolioUrl: formData.portfolioUrl || undefined,
        expectedSalary: formData.expectedSalary ? parseInt(formData.expectedSalary) : undefined,
        availableStartDate: formData.availableStartDate ? new Date(formData.availableStartDate) : undefined,
        howDidYouHear: formData.howDidYouHear,
        additionalInfo: `Interested Departments: ${formData.interestedDepartments.join(', ')}\nPreferred Location: ${formData.preferredLocation}\n\n${formData.additionalInfo}`,
        submittedAt: new Date(),
        status: 'submitted',
        source: 'career-site'
      };
      
      onSubmit(application);
      setIsSubmitting(false);
      setSubmitted(true);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, resumeFile: file });
      setErrors({ ...errors, resumeFile: '' });
    }
  };

  const handleDepartmentToggle = (department: string) => {
    setFormData(prev => ({
      ...prev,
      interestedDepartments: prev.interestedDepartments.includes(department)
        ? prev.interestedDepartments.filter(d => d !== department)
        : [...prev.interestedDepartments, department]
    }));
  };

  if (submitted) {
    return (
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your interest in {companyInfo.name}. We'll review your profile and reach out when suitable positions become available.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-900 font-medium">What's Next?</p>
            <p className="text-blue-700 text-sm mt-1">
              We'll keep your profile in our talent pool and contact you when positions matching your interests open up.
            </p>
          </div>
          <button 
            onClick={onBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Career Site
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#AEC6FF] via-white to-[#FFF7AE]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
  <div className="min-h-screen bg-gradient-to-br from-[#AEC6FF] via-white to-[#FFF7AE]">
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft size={20} />
            <span>Back to Career Site</span>
          </button>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{companyInfo.name}</h1>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Join Our Talent Pool</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't see the perfect role right now? Submit a general application and we'll reach out when positions matching your background become available.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Personal Information</h3>
                <p className="text-gray-600 mb-6">Tell us about yourself and your career interests.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.candidateName}
                    onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.candidateEmail ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="john.doe@email.com"
                  />
                  {errors.candidateEmail && <p className="text-red-600 text-xs mt-1">{errors.candidateEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.candidatePhone}
                    onChange={(e) => setFormData({ ...formData, candidatePhone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1-555-0123"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={formData.linkedInProfile}
                    onChange={(e) => setFormData({ ...formData, linkedInProfile: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/johndoe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://johndoe.dev"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-sm text-gray-600 mb-1">
                      {formData.resumeFile ? formData.resumeFile.name : 'Click to upload your resume'}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Interested Departments *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {departments.map((department) => (
                    <button
                      key={department}
                      type="button"
                      onClick={() => handleDepartmentToggle(department)}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        formData.interestedDepartments.includes(department)
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      {department}
                    </button>
                  ))}
                </div>
                {errors.interestedDepartments && <p className="text-red-600 text-xs mt-1">{errors.interestedDepartments}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expected Salary</label>
                  <input
                    type="number"
                    value={formData.expectedSalary}
                    onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Any Location</option>
                    <option value="San Francisco, CA">San Francisco, CA</option>
                    <option value="New York, NY">New York, NY</option>
                    <option value="London, UK">London, UK</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Start Date</label>
                <input
                  type="date"
                  value={formData.availableStartDate}
                  onChange={(e) => setFormData({ ...formData, availableStartDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us? *</label>
                <select
                  value={formData.howDidYouHear}
                  onChange={(e) => setFormData({ ...formData, howDidYouHear: e.target.value })}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
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
                  <option value="Tech conference">Tech conference</option>
                  <option value="University career fair">University career fair</option>
                  <option value="Other">Other</option>
                </select>
                {errors.howDidYouHear && <p className="text-red-600 text-xs mt-1">{errors.howDidYouHear}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself *</label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={6}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.coverLetter ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your background, skills, and what type of role you're looking for at Nexus Technologies..."
                />
                {errors.coverLetter && <p className="text-red-600 text-xs mt-1">{errors.coverLetter}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Information</label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Anything else you'd like us to know? (Optional)"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-lg transition-colors flex items-center justify-center space-x-2 text-lg font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Submit General Application</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Why Join {companyInfo.name}?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Talent Pool</p>
                    <p className="text-sm text-gray-600">We'll keep your profile and reach out for relevant opportunities</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Priority Access</p>
                    <p className="text-sm text-gray-600">Get early access to new positions before they're posted publicly</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Personalized Matching</p>
                    <p className="text-sm text-gray-600">We'll match you with roles that fit your skills and interests</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-3">What We're Looking For</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>• Passionate technologists who love solving complex problems</p>
                <p>• Collaborative team players with strong communication skills</p>
                <p>• Growth-minded individuals who embrace learning</p>
                <p>• Diverse perspectives that challenge the status quo</p>
                <p>• Leaders who can drive innovation and excellence</p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h4 className="font-medium text-green-900 mb-3">Our Commitment</h4>
              <p className="text-sm text-green-800">
                We're committed to building a diverse, inclusive team. We encourage applications from candidates of all backgrounds and experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};