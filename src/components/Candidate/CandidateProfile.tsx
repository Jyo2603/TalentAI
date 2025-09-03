import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Save, Upload, CheckCircle, Award, Briefcase, Calendar, Edit, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const CandidateProfile: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    location: profile?.location || '',
    linkedin_profile: profile?.linkedin_profile || '',
    portfolio_url: profile?.portfolio_url || '',
    bio: profile?.bio || '',
    skills: profile?.skills || [],
    certifications: profile?.certifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      await updateProfile(formData);
      setIsEditing(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, newCertification.trim()]
      });
      setNewCertification('');
    }
  };

  const removeCertification = (cert: string) => {
    setFormData({
      ...formData,
      certifications: formData.certifications.filter(c => c !== cert)
    });
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your professional information and preferences</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {saved && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Profile updated!</span>
              </div>
            )}
            
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={48} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-blue-500 focus:outline-none w-full"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">{profile?.full_name}</h2>
                  )}
                  <p className="text-gray-600 mt-1">Job Seeker</p>
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Mail size={14} />
                      <span>{profile?.email}</span>
                    </div>
                    {profile?.location && (
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} />
                        <span>{profile.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1-555-0123"
                        />
                      ) : (
                        <p className="text-gray-900">{profile?.phone || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="San Francisco, CA"
                        />
                      ) : (
                        <p className="text-gray-900">{profile?.location || 'Not provided'}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.linkedin_profile}
                          onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/in/yourname"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {profile?.linkedin_profile ? (
                            <a href={profile.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              View LinkedIn
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.portfolio_url}
                          onChange={(e) => setFormData({ ...formData, portfolio_url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://yourportfolio.com"
                        />
                      ) : (
                        <p className="text-gray-900">
                          {profile?.portfolio_url ? (
                            <a href={profile.portfolio_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              View Portfolio
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
                  {isEditing ? (
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your background, experience, and career goals..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profile?.bio || 'Add a professional summary to help recruiters understand your background and career goals.'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills</h3>
              
              {isEditing && (
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Add a skill"
                    />
                    <button
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200"
                  >
                    <span>{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-600 hover:text-blue-800 ml-1"
                      >
                        ×
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {formData.skills.length === 0 && (
                <p className="text-gray-500 text-sm">No skills added yet</p>
              )}
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certifications</h3>
              
              {isEditing && (
                <div className="mb-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      placeholder="Add a certification"
                    />
                    <button
                      onClick={addCertification}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {formData.certifications.map((cert) => (
                  <div
                    key={cert}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex items-center space-x-2">
                      <Award size={16} className="text-green-600" />
                      <span className="text-sm text-green-800">{cert}</span>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(cert)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {formData.certifications.length === 0 && (
                <p className="text-gray-500 text-sm">No certifications added yet</p>
              )}
            </div>

            {/* Resume Upload */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume</h3>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-1">
                  {profile?.resume_url ? 'Update your resume' : 'Upload your resume'}
                </p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX (max 5MB)</p>
                
                {profile?.resume_url && (
                  <div className="mt-3">
                    <a
                      href={profile.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View Current Resume
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Completion */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Basic Information</span>
                  <CheckCircle size={16} className="text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Skills ({formData.skills.length})</span>
                  {formData.skills.length > 0 ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Clock size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Professional Summary</span>
                  {formData.bio ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Clock size={16} className="text-gray-400" />
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Resume</span>
                  {profile?.resume_url ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Clock size={16} className="text-gray-400" />
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.round(
                        (
                          (formData.full_name ? 25 : 0) +
                          (formData.skills.length > 0 ? 25 : 0) +
                          (formData.bio ? 25 : 0) +
                          (profile?.resume_url ? 25 : 0)
                        )
                      )}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  {Math.round(
                    (
                      (formData.full_name ? 25 : 0) +
                      (formData.skills.length > 0 ? 25 : 0) +
                      (formData.bio ? 25 : 0) +
                      (profile?.resume_url ? 25 : 0)
                    )
                  )}% complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};