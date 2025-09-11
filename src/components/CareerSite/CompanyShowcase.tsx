import React from 'react';
import { ArrowLeft, MapPin, Users, Calendar, Globe, Linkedin, Twitter, Github, Instagram, Award, Heart, Zap, Target, TrendingUp, Mail, Phone, Building, Star, CheckCircle } from 'lucide-react';
import { companyInfo, teamMembers, companyBenefits, officeLocations } from '../../data/careerData';

interface CompanyShowcaseProps {
  onBackToJobs: () => void;
}

export const CompanyShowcase: React.FC<CompanyShowcaseProps> = ({ onBackToJobs }) => {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin size={20} className="text-blue-600" />;
      case 'twitter': return <Twitter size={20} className="text-blue-400" />;
      case 'github': return <Github size={20} className="text-gray-700" />;
      case 'instagram': return <Instagram size={20} className="text-pink-500" />;
      default: return <Globe size={20} />;
    }
  };

  const getBenefitIcon = (category: string) => {
    switch (category) {
      case 'health': return '🏥';
      case 'financial': return '💰';
      case 'time-off': return '🏖️';
      case 'growth': return '📚';
      case 'perks': return '🎯';
      default: return '✨';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={onBackToJobs}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Jobs</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Users size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{companyInfo.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About {companyInfo.name}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {companyInfo.tagline}
            </p>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Calendar size={24} className="text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{companyInfo.founded}</p>
              <p className="text-sm text-gray-600 font-medium">Founded</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users size={24} className="text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{companyInfo.size.split('-')[0]}+</p>
              <p className="text-sm text-gray-600 font-medium">Employees</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Building size={24} className="text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">3</p>
              <p className="text-sm text-gray-600 font-medium">Global Offices</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Star size={24} className="text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">4.9</p>
              <p className="text-sm text-gray-600 font-medium">Employee Rating</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-20">
        {/* Company Story */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  {companyInfo.description}
                </p>
                <p>
                  Founded in {companyInfo.founded}, we've grown from a small team of passionate engineers to a global company serving thousands of businesses worldwide. Our journey has been driven by a simple belief: that great technology should empower people to build amazing things.
                </p>
                <p>
                  Today, we're proud to be at the forefront of cloud innovation, helping companies of all sizes scale their infrastructure with confidence and ease.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-8">
                {Object.entries(companyInfo.socialLinks).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center transition-colors border border-gray-200 hover:border-gray-300"
                  >
                    {getSocialIcon(platform)}
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {companyInfo.mission}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Innovation-driven solutions</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users size={16} className="text-green-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Global scale and reliability</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Heart size={16} className="text-purple-600" />
                  </div>
                  <span className="text-gray-700 font-medium">Customer-first approach</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our culture every day.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {companyInfo.values.map((value, index) => {
              const [title, description] = value.split(' - ');
              const icons = [Target, Users, CheckCircle, TrendingUp, Award];
              const Icon = icons[index] || Target;
              const colors = [
                'bg-blue-100 text-blue-600',
                'bg-green-100 text-green-600', 
                'bg-purple-100 text-purple-600',
                'bg-orange-100 text-orange-600',
                'bg-red-100 text-red-600'
              ];
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className={`w-12 h-12 ${colors[index]} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership Team */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced leaders driving our vision and building the future of cloud infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(0, 9).map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-200">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img 
                    src={member.avatar} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                
                <div className="flex items-center justify-center space-x-3">
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Linkedin size={16} className="text-blue-600" />
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <Twitter size={16} className="text-blue-400" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits & Culture */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits & Culture</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We invest in our people with comprehensive benefits and a culture that promotes growth, innovation, and work-life balance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyBenefits.map((benefit) => (
              <div key={benefit.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                <div className="text-3xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Office Locations */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Presence</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Beautiful workspaces designed for collaboration and creativity. Work from any of our offices or remotely from anywhere in the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {officeLocations.map((office) => (
              <div key={office.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={office.image} 
                    alt={office.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{office.name}</h3>
                    {office.isPrimary && (
                      <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">
                        HQ
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin size={16} className="mr-2 text-gray-400" />
                    <span className="text-sm">{office.address}, {office.city}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{office.description}</p>
                  
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-2">Amenities</p>
                    <div className="flex flex-wrap gap-1">
                      {office.amenities.slice(0, 3).map((amenity) => (
                        <span 
                          key={amenity}
                          className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs border border-gray-200"
                        >
                          {amenity}
                        </span>
                      ))}
                      {office.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                          +{office.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Company Culture */}
        <section className="bg-gray-50 rounded-2xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work With Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join a team that's passionate about technology, committed to excellence, and dedicated to making a positive impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target size={28} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Mission-Driven</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Work on technology that powers the world's most innovative companies and makes a real difference.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">World-Class Team</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Collaborate with exceptional engineers, designers, and leaders from top companies around the world.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Growth Focused</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Continuous learning opportunities, mentorship programs, and career advancement paths.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Inclusive Culture</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Diverse, inclusive environment where everyone's voice is heard and valued.
              </p>
            </div>
          </div>
        </section>

        {/* Engineering Culture */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Engineering Excellence</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Modern Tech Stack</p>
                    <p className="text-sm text-gray-600">Go, Kubernetes, React, TypeScript, and cutting-edge cloud technologies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ownership & Impact</p>
                    <p className="text-sm text-gray-600">Own your projects from conception to deployment and see real impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Continuous Learning</p>
                    <p className="text-sm text-gray-600">Regular tech talks, conferences, and learning budget for growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Work-Life Balance</p>
                    <p className="text-sm text-gray-600">Flexible hours, remote work, and unlimited PTO policy</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold text-blue-600 mb-2">99.9%</p>
                  <p className="text-sm text-gray-600 font-medium">Platform Uptime</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold text-green-600 mb-2">10M+</p>
                  <p className="text-sm text-gray-600 font-medium">API Requests/Day</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold text-purple-600 mb-2">500+</p>
                  <p className="text-sm text-gray-600 font-medium">Enterprise Customers</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                  <p className="text-3xl font-bold text-orange-600 mb-2">50+</p>
                  <p className="text-sm text-gray-600 font-medium">Countries Served</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Diversity & Inclusion */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Diversity & Inclusion</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to building a diverse, equitable, and inclusive workplace where everyone can thrive and do their best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Diverse Hiring</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We actively recruit from underrepresented communities and ensure fair, unbiased hiring processes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart size={28} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Inclusive Environment</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Employee resource groups, mentorship programs, and inclusive leadership training.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award size={28} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Equal Opportunity</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Equal pay, advancement opportunities, and support for all employees regardless of background.
              </p>
            </div>
          </div>
        </section>

        {/* Contact & CTA */}
        <section className="text-center">
          <div className="bg-gray-900 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Be part of a company that's reshaping the future of cloud infrastructure and helping millions of businesses scale with confidence.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <Mail size={20} className="text-gray-400" />
                <span className="text-gray-300">careers@quantumcore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={20} className="text-gray-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
            </div>
            
            <button 
              onClick={onBackToJobs}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Open Positions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};