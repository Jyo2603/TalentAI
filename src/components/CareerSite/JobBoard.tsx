import React, { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  ArrowRight,
  Building,
  Calendar,
  Send,
  CheckCircle,
  Globe,
  Award,
  Target,
  Heart,
  Star,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { careerJobPostings, companyInfo } from '../../data/careerData';
import { ApplicationStatusChecker } from './ApplicationStatusChecker';
import type { JobPosting, JobApplication } from '../../types/career';

interface JobBoardProps {
  onViewChange: (view: 'job-board' | 'company' | 'general-application') => void;
}

interface JobCardProps {
  job: JobPosting;
  onSelect: (job: JobPosting) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onSelect }) => {
  const getExperienceLevelColor = (level: JobPosting['experienceLevel']) => {
    switch (level) {
      case 'entry': return 'bg-green-50 text-green-700 border-green-200';
      case 'mid': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'senior': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'executive': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
            {job.title}
          </h3>
          <p className="text-gray-600 font-medium">{job.department}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getExperienceLevelColor(job.experienceLevel)}`}>
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
          onClick={() => onSelect(job)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 text-sm font-medium hover:shadow-md"
        >
          <span>View Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

interface JobDetailsProps {
  job: JobPosting;
  onBack: () => void;
  onApply: (job: JobPosting) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onBack, onApply }) => {
  const [isApplying, setIsApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    
    // Simulate application submission
    setTimeout(() => {
      setIsApplying(false);
      setApplied(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setApplied(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8 group"
      >
        <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Jobs</span>
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200 p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{job.title}</h1>
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Building size={18} className="text-gray-400" />
                  <span className="font-medium">{job.department}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin size={18} className="text-gray-400" />
                  <span className="font-medium">{job.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={18} className="text-gray-400" />
                  <span>Posted {job.postedDate.toLocaleDateString()}</span>
                </div>
              </div>
              
              {job.salary && (
                <div className="flex items-center space-x-2 text-green-700">
                  <DollarSign size={18} className="text-green-600" />
                  <span className="text-xl font-bold">
                    ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-600">annually</span>
                </div>
              )}
            </div>

            <button
              onClick={handleApply}
              disabled={isApplying || applied}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl transition-all duration-200 flex items-center space-x-3 text-lg font-semibold min-w-[200px] shadow-lg hover:shadow-xl"
            >
              {isApplying ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Applying...</span>
                </>
              ) : applied ? (
                <>
                  <CheckCircle size={20} />
                  <span>Applied!</span>
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
            {/* Left Column - Job Details */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About This Role</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((responsibility, index) => (
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
                  {job.requirements.map((requirement, index) => (
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
                  {job.skills.map((skill) => (
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

            {/* Right Column - Job Info & Benefits */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Department</span>
                    <span className="font-medium text-gray-900">{job.department}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location</span>
                    <span className="font-medium text-gray-900">{job.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium text-gray-900 capitalize">{job.type.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900 capitalize">{job.experienceLevel}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Remote Work</span>
                    <span className="font-medium text-gray-900">{job.isRemote ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
                <ul className="space-y-3">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Stats</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total Applications</span>
                    <span className="font-bold text-gray-900">{job.applicationCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Posted Date</span>
                    <span className="font-medium text-gray-900">{job.postedDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      Active
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Share This Job</h3>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                    LinkedIn
                  </button>
                  <button className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-3 rounded-lg transition-colors text-sm font-medium">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const JobBoard: React.FC<JobBoardProps> = ({ onViewChange }) => {
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState<'all' | string>('all');
  const [locationFilter, setLocationFilter] = useState<'all' | string>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | string>('all');
  const [showStatusChecker, setShowStatusChecker] = useState(false);

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
    const typeMatch = typeFilter === 'all' || job.type === typeFilter;

    return searchMatch && departmentMatch && locationMatch && typeMatch;
  });

  const departments = Array.from(new Set(careerJobPostings.map((job) => job.department)));
  const locations = Array.from(new Set(careerJobPostings.map((job) => job.location)));

  const handleApplicationSubmit = (application: Partial<JobApplication>) => {
    console.log('Application submitted:', application);
    // In a real app, this would send to your backend
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{companyInfo.name}</h1>
                <p className="text-sm text-gray-600">{companyInfo.tagline}</p>
              </div>
            </div>
            
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => onViewChange('company')}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                About Us
              </button>
              <button
                onClick={() => setShowStatusChecker(true)}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Application Status
              </button>
              <button
                onClick={() => onViewChange('general-application')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
              >
                Join Talent Pool
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Build the Future of<br />
            <span className="text-blue-600">Cloud Infrastructure</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Join our mission to revolutionize how businesses scale in the cloud. We're looking for passionate engineers, designers, and leaders to help shape the next generation of infrastructure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{careerJobPostings.length}</p>
              <p className="text-sm text-gray-600 font-medium">Open Positions</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe size={24} className="text-green-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">100%</p>
              <p className="text-sm text-gray-600 font-medium">Remote-First</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award size={24} className="text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">Top 1%</p>
              <p className="text-sm text-gray-600 font-medium">Benefits Package</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart size={24} className="text-orange-600" />
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-1">4.9/5</p>
              <p className="text-sm text-gray-600 font-medium">Employee Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        {selectedJob ? (
          <JobDetails
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
            onApply={handleApplicationSubmit}
          />
        ) : (
          <div className="space-y-8">
            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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

                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="all">All Types</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>

            {/* Job Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Open Positions
                </h2>
                <p className="text-gray-600 mt-1">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} available
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowStatusChecker(true)}
                  className="text-blue-600 hover:text-blue-700 transition-colors font-medium flex items-center space-x-1"
                >
                  <span>Check Application Status</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>

            {/* Job Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} onSelect={setSelectedJob} />
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
                <button
                  onClick={() => onViewChange('general-application')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Join Our Talent Pool
                </button>
              </div>
            )}

            {/* Company Values Section */}
            <section className="bg-gray-50 rounded-2xl p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join {companyInfo.name}?</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We're building the future of cloud infrastructure with a team of passionate innovators.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Mission-Driven</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Work on technology that powers the world's most innovative companies
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Users size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">World-Class Team</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Collaborate with exceptional engineers and designers from top companies
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Award size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Top Benefits</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Competitive salary, equity, unlimited PTO, and comprehensive health coverage
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart size={24} className="text-orange-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Inclusive Culture</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Diverse, inclusive, and growth-focused environment where everyone thrives
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Don't See the Perfect Role?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Join our talent pool and we'll reach out when positions matching your background become available.
                </p>
                <button 
                  onClick={() => onViewChange('general-application')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <span>Join Our Talent Pool</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold">{companyInfo.name}</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                {companyInfo.description}
              </p>
              <div className="flex items-center space-x-4">
                {Object.entries(companyInfo.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
                  >
                    {platform === 'linkedin' && <span className="text-blue-400">💼</span>}
                    {platform === 'twitter' && <span className="text-blue-400">🐦</span>}
                    {platform === 'github' && <span className="text-gray-300">💻</span>}
                    {platform === 'instagram' && <span className="text-pink-400">📷</span>}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <div className="space-y-3">
                <button
                  onClick={() => onViewChange('company')}
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  About Us
                </button>
                <button
                  onClick={() => setShowStatusChecker(true)}
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Application Status
                </button>
                <button
                  onClick={() => onViewChange('general-application')}
                  className="block text-gray-300 hover:text-white transition-colors font-medium"
                >
                  Join Talent Pool
                </button>
                <a href="#" className="block text-gray-300 hover:text-white transition-colors font-medium">
                  Privacy Policy
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-3 text-gray-300">
                <p className="font-medium">careers@quantumcore.com</p>
                <p>San Francisco, CA</p>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 {companyInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Application Status Checker Modal */}
      {showStatusChecker && (
        <ApplicationStatusChecker onClose={() => setShowStatusChecker(false)} />
      )}
    </div>
  );
};