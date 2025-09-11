import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Save, Upload, CheckCircle, Award, Edit, FileText, X, Plus } from 'lucide-react';
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
    bio: profile?.bio || '',
    skills: profile?.skills || [],
    certifications: profile?.certifications || []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [uploadedResumeUrl, setUploadedResumeUrl] = useState<string | null>(null);

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

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, DOCX, or TXT file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB.');
      return;
    }

    setIsUploadingResume(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const blobUrl = URL.createObjectURL(file);
      setUploadedResumeUrl(blobUrl);
      
      const resumeUrl = `uploaded-${Date.now()}-${file.name}`;
      await updateProfile({ resume_url: resumeUrl });
      
      setIsUploadingResume(false);
      setResumeUploaded(true);
      setTimeout(() => setResumeUploaded(false), 3000);
      
      e.target.value = '';
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume. Please try again.');
      setIsUploadingResume(false);
    }
  };

  const handleViewResume = () => {
    if (uploadedResumeUrl) {
      window.open(uploadedResumeUrl, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your professional information</p>
          </div>
          
          <div className="flex items-center space-x-3">
            {saved && (
              <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Saved</span>
              </div>
            )}
            
            {isEditing ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
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
                      <span>Saving</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>Save</span>
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
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={32} className="text-gray-600" />
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-1">{profile?.full_name}</h2>
              <p className="text-gray-600 text-sm mb-4">Job Seeker</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{profile?.full_name || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="your.email@example.com"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{profile?.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+1-555-0123"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{profile?.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="San Francisco, CA"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">{profile?.location || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                    {isEditing ? (
                      <input
                        type="url"
                        value={formData.linkedin_profile}
                        onChange={(e) => setFormData({ ...formData, linkedin_profile: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="https://linkedin.com/in/yourname"
                      />
                    ) : (
                      <p className="text-gray-900 py-2">
                        {profile?.linkedin_profile ? (
                          <a href={profile.linkedin_profile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                            View LinkedIn
                          </a>
                        ) : (
                          'Not provided'
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Professional Summary</h3>
              </div>
              <div className="p-6">
                {isEditing ? (
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    placeholder="Tell us about your background, experience, and career goals..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {profile?.bio || (
                      <span className="text-gray-500 italic">
                        Add a professional summary to help recruiters understand your background and career goals.
                      </span>
                    )}
                  </p>
                )}
              </div>
            </div>

            {/* Skills & Certifications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Skills */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Skills</h3>
                </div>
                <div className="p-6">
                  {isEditing && (
                    <div className="mb-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                          placeholder="Add a skill"
                        />
                        <button
                          onClick={addSkill}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200"
                      >
                        <span>{skill}</span>
                        {isEditing && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </span>
                    ))}
                  </div>

                  {formData.skills.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No skills added yet</p>
                  )}
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Certifications</h3>
                </div>
                <div className="p-6">
                  {isEditing && (
                    <div className="mb-4">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newCertification}
                          onChange={(e) => setNewCertification(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
                          placeholder="Add a certification"
                        />
                        <button
                          onClick={addCertification}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center"
                        >
                          <Plus size={16} />
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
                            className="text-red-600 hover:text-red-800 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {formData.certifications.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No certifications added yet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Section */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Resume</h3>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors bg-gray-50">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleResumeUpload}
                    disabled={isUploadingResume}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {isUploadingResume ? (
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                        <p className="text-sm font-medium text-blue-600">Uploading...</p>
                      </div>
                    ) : resumeUploaded ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle size={32} className="mx-auto text-green-600 mb-3" />
                        <p className="text-sm font-medium text-green-600">Upload successful!</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {uploadedResumeUrl || profile?.resume_url ? 'Update resume' : 'Upload resume'}
                        </p>
                        <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT (max 5MB)</p>
                      </div>
                    )}
                  </label>
                </div>
                
                {uploadedResumeUrl && !isUploadingResume && !resumeUploaded && (
                  <div className="mt-4">
                    <button
                      onClick={handleViewResume}
                      className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 border border-blue-200"
                    >
                      <FileText size={16} />
                      <span>View Resume</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};