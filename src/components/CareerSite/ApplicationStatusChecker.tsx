import React, { useState } from 'react';
import { X, Search, CheckCircle, Clock, AlertTriangle, Calendar, Mail, Phone, FileText, User, ArrowRight } from 'lucide-react';

interface ApplicationStatusCheckerProps {
  onClose: () => void;
}

interface ApplicationStatus {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  submittedAt: Date;
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'interview-scheduled' | 'rejected' | 'hired';
  lastUpdated: Date;
  nextSteps?: string;
  interviewDate?: Date;
  feedback?: string;
  applicationDetails?: {
    coverLetter: string;
    resume: string;
    skills: string[];
    experience: string;
    expectedSalary: string;
    availableStartDate: string;
  };
}

const mockApplications: ApplicationStatus[] = [
  {
    id: 'APP-2025-001',
    candidateName: 'John Doe',
    candidateEmail: 'john.doe@email.com',
    jobTitle: 'Senior Cloud Platform Engineer',
    submittedAt: new Date('2025-01-10T14:30:00'),
    status: 'interview-scheduled',
    lastUpdated: new Date('2025-01-14T10:00:00'),
    nextSteps: 'Technical interview scheduled with the engineering team',
    interviewDate: new Date('2025-01-18T15:00:00'),
    applicationDetails: {
      coverLetter: 'I am excited to apply for the Senior Cloud Platform Engineer position at QuantumCore Technologies. With over 6 years of experience in cloud infrastructure and distributed systems, I believe I would be a valuable addition to your team. My expertise in Go, Kubernetes, and AWS aligns perfectly with your requirements.',
      resume: 'Senior Software Engineer with 6+ years experience in cloud platforms, Go programming, and Kubernetes orchestration. Previously worked at Google Cloud and Amazon Web Services.',
      skills: ['Go', 'Kubernetes', 'AWS', 'Docker', 'Terraform', 'Python'],
      experience: '6 years in cloud infrastructure and distributed systems',
      expectedSalary: '$180,000',
      availableStartDate: 'February 15, 2025'
    }
  },
  {
    id: 'APP-2025-002',
    candidateName: 'Jane Smith',
    candidateEmail: 'jane.smith@email.com',
    jobTitle: 'Product Manager',
    submittedAt: new Date('2025-01-08T09:15:00'),
    status: 'reviewing',
    lastUpdated: new Date('2025-01-12T16:30:00'),
    nextSteps: 'Your application is being reviewed by our hiring team',
    applicationDetails: {
      coverLetter: 'I am passionate about building products that solve real customer problems. With 4 years of product management experience at B2B SaaS companies, I have led cross-functional teams to deliver features that increased user engagement by 40% and reduced churn by 25%.',
      resume: 'Product Manager with 4+ years experience in B2B SaaS, specializing in enterprise software and developer tools. MBA from Stanford.',
      skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'SQL'],
      experience: '4 years in product management for B2B SaaS',
      expectedSalary: '$160,000',
      availableStartDate: 'March 1, 2025'
    }
  },
  {
    id: 'APP-2025-003',
    candidateName: 'Alex Johnson',
    candidateEmail: 'alex.johnson@email.com',
    jobTitle: 'Frontend Engineer',
    submittedAt: new Date('2025-01-05T11:45:00'),
    status: 'shortlisted',
    lastUpdated: new Date('2025-01-13T14:20:00'),
    nextSteps: 'Congratulations! You have been shortlisted. We will contact you soon to schedule an interview.',
    applicationDetails: {
      coverLetter: 'I am excited about the opportunity to join QuantumCore Technologies as a Frontend Engineer. My 5 years of experience with React, TypeScript, and modern web technologies, combined with my passion for creating exceptional user experiences, makes me a strong fit for this role.',
      resume: 'Frontend Engineer with 5+ years experience building scalable React applications. Strong background in TypeScript, performance optimization, and component architecture.',
      skills: ['React', 'TypeScript', 'JavaScript', 'CSS', 'Node.js', 'GraphQL'],
      experience: '5 years in frontend development',
      expectedSalary: '$145,000',
      availableStartDate: 'February 1, 2025'
    }
  }
];

export const ApplicationStatusChecker: React.FC<ApplicationStatusCheckerProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [applicationId, setApplicationId] = useState('');
  const [searchResults, setSearchResults] = useState<ApplicationStatus[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<ApplicationStatus | null>(null);
  const [showContactForm, setShowContactForm] = useState<ApplicationStatus | null>(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSubject, setContactSubject] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const getStatusColor = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'submitted': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reviewing': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'shortlisted': return 'bg-green-50 text-green-700 border-green-200';
      case 'interview-scheduled': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'hired': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'submitted': return <Clock size={18} className="text-blue-600" />;
      case 'reviewing': return <Search size={18} className="text-yellow-600" />;
      case 'shortlisted': return <CheckCircle size={18} className="text-green-600" />;
      case 'interview-scheduled': return <Calendar size={18} className="text-purple-600" />;
      case 'rejected': return <AlertTriangle size={18} className="text-red-600" />;
      case 'hired': return <CheckCircle size={18} className="text-emerald-600" />;
      default: return <Clock size={18} className="text-gray-600" />;
    }
  };

  const getStatusLabel = (status: ApplicationStatus['status']) => {
    switch (status) {
      case 'submitted': return 'Application Submitted';
      case 'reviewing': return 'Under Review';
      case 'shortlisted': return 'Shortlisted';
      case 'interview-scheduled': return 'Interview Scheduled';
      case 'rejected': return 'Not Selected';
      case 'hired': return 'Offer Extended';
      default: return status;
    }
  };

  const handleSearch = async () => {
    if (!email.trim()) return;
    
    setIsSearching(true);
    setSearchPerformed(true);
    
    // Simulate API search
    setTimeout(() => {
      const results = mockApplications.filter(app => 
        app.candidateEmail.toLowerCase() === email.toLowerCase() ||
        (applicationId && app.id === applicationId)
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleViewApplication = (application: ApplicationStatus) => {
    setSelectedApplication(application);
  };

  const handleContactHR = (application: ApplicationStatus) => {
    setShowContactForm(application);
    setContactSubject(`Regarding Application: ${application.jobTitle} (${application.id})`);
    setContactMessage('');
  };

  const handleSubmitContact = async () => {
    if (!contactMessage.trim()) return;
    
    setIsSubmittingContact(true);
    
    // Simulate sending message
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactSubmitted(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setContactSubmitted(false);
        setShowContactForm(null);
        setContactMessage('');
        setContactSubject('');
      }, 3000);
    }, 1500);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Check Application Status</h2>
              <p className="text-gray-600 mt-1">
                Enter your email address to check the status of your job applications
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Search Form */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="john.doe@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Application ID (Optional)</label>
                <div className="relative">
                  <FileText size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={applicationId}
                    onChange={(e) => setApplicationId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="APP-2025-001"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!email.trim() || isSearching}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
            >
              {isSearching ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search size={20} />
                  <span>Check Application Status</span>
                </>
              )}
            </button>
          </div>

          {/* Search Results */}
          {searchPerformed && (
            <div>
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">Your Applications</h3>
                  
                  {searchResults.map((application) => (
                    <div key={application.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold text-gray-900 mb-2">{application.jobTitle}</h4>
                          <p className="text-sm text-gray-600 font-medium">Application ID: {application.id}</p>
                        </div>
                        
                        <div className={`flex items-center space-x-2 px-4 py-2 rounded-full border ${getStatusColor(application.status)}`}>
                          {getStatusIcon(application.status)}
                          <span className="font-medium">
                            {getStatusLabel(application.status)}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Calendar size={16} className="text-gray-400" />
                          <span><strong>Submitted:</strong> {application.submittedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-600">
                          <Clock size={16} className="text-gray-400" />
                          <span><strong>Last Updated:</strong> {application.lastUpdated.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {application.nextSteps && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-blue-900 mb-2">Next Steps</h5>
                          <p className="text-blue-800 text-sm leading-relaxed">{application.nextSteps}</p>
                        </div>
                      )}

                      {application.interviewDate && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-green-900 mb-2">Interview Scheduled</h5>
                          <div className="flex items-center space-x-2 text-green-800">
                            <Calendar size={16} />
                            <span className="text-sm font-medium">
                              {application.interviewDate.toLocaleDateString()} at {application.interviewDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      )}

                      {application.feedback && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Feedback</h5>
                          <p className="text-gray-700 text-sm leading-relaxed">{application.feedback}</p>
                        </div>
                      )}

                      <div className="flex space-x-3 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => handleContactHR(application)}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                        >
                          <Mail size={16} />
                          <span>Contact HR Team</span>
                        </button>
                        <button 
                          onClick={() => handleViewApplication(application)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
                        >
                          <FileText size={16} />
                          <span>View Application</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">No Applications Found</h3>
                  <p className="text-gray-600 mb-2">
                    We couldn't find any applications associated with this email address.
                  </p>
                  <p className="text-sm text-gray-500">
                    Make sure you're using the same email address you used to apply.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Demo Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h4 className="font-semibold text-yellow-900 mb-3">Demo Data Available</h4>
            <p className="text-yellow-800 text-sm mb-4">
              Try these demo email addresses to see sample application statuses:
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => setEmail('john.doe@email.com')}
                className="flex items-center justify-between w-full p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">john.doe@email.com</p>
                  <p className="text-xs text-gray-600">Interview Scheduled</p>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </button>
              <button 
                onClick={() => setEmail('jane.smith@email.com')}
                className="flex items-center justify-between w-full p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">jane.smith@email.com</p>
                  <p className="text-xs text-gray-600">Under Review</p>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </button>
              <button 
                onClick={() => setEmail('alex.johnson@email.com')}
                className="flex items-center justify-between w-full p-3 bg-white border border-yellow-200 rounded-lg hover:bg-yellow-50 transition-colors text-left"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">alex.johnson@email.com</p>
                  <p className="text-xs text-gray-600">Shortlisted</p>
                </div>
                <ArrowRight size={16} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Application Details Modal */}
        {selectedApplication && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Application Details</h3>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mt-1">{selectedApplication.jobTitle} - {selectedApplication.id}</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Candidate Information</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedApplication.candidateName}</p>
                      <p><span className="font-medium">Email:</span> {selectedApplication.candidateEmail}</p>
                      <p><span className="font-medium">Experience:</span> {selectedApplication.applicationDetails?.experience}</p>
                      <p><span className="font-medium">Expected Salary:</span> {selectedApplication.applicationDetails?.expectedSalary}</p>
                      <p><span className="font-medium">Available:</span> {selectedApplication.applicationDetails?.availableStartDate}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Application Status</h4>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Status:</span> {getStatusLabel(selectedApplication.status)}</p>
                      <p><span className="font-medium">Submitted:</span> {selectedApplication.submittedAt.toLocaleDateString()}</p>
                      <p><span className="font-medium">Last Updated:</span> {selectedApplication.lastUpdated.toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {selectedApplication.applicationDetails?.skills && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplication.applicationDetails.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Cover Letter</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedApplication.applicationDetails?.coverLetter}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleContactHR(selectedApplication)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                  >
                    Contact HR Team
                  </button>
                  <button 
                    onClick={() => setSelectedApplication(null)}
                    className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact HR Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">Contact HR Team</h3>
                  <button
                    onClick={() => setShowContactForm(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>
                <p className="text-gray-600 mt-1">Send a message regarding your application</p>
              </div>
              
              {contactSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h4>
                  <p className="text-gray-600">
                    Our HR team will review your message and respond within 1-2 business days.
                  </p>
                </div>
              ) : (
                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Please enter your message or question about your application..."
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSubmitContact}
                      disabled={!contactMessage.trim() || isSubmittingContact}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                    >
                      {isSubmittingContact ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Mail size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowContactForm(null)}
                      className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};