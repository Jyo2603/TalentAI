import React, { useState } from 'react';
import { Save, X, Wand2, CheckCircle } from 'lucide-react';
import { generateAssessmentWithAI } from '../../services/openai';
import type { Job } from '../../types';

interface JobFormProps {
  editingJob?: Job | null;
  onSave: (jobData: Partial<Job>) => void;
  onCancel: () => void;
}

export const JobForm: React.FC<JobFormProps> = ({ editingJob, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: editingJob?.title || '',
    description: editingJob?.description || '',
    department: editingJob?.department || '',
    location: editingJob?.location || '',
    type: (editingJob?.type || 'full-time') as Job['type'],
    skills: editingJob?.skills.join(', ') || '',
    minSalary: editingJob?.salary.min.toString() || '',
    maxSalary: editingJob?.salary.max.toString() || '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  });

  const [isGeneratingTest, setIsGeneratingTest] = useState(false);
  const [testGenerated, setTestGenerated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Job description is required';
    if (!formData.skills.trim()) newErrors.skills = 'Required skills are needed';
    if (!formData.minSalary || parseInt(formData.minSalary) <= 0) newErrors.minSalary = 'Valid minimum salary is required';
    if (!formData.maxSalary || parseInt(formData.maxSalary) <= 0) newErrors.maxSalary = 'Valid maximum salary is required';
    if (parseInt(formData.minSalary) >= parseInt(formData.maxSalary)) newErrors.maxSalary = 'Maximum salary must be greater than minimum';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const jobData: Partial<Job> = {
      title: formData.title.trim(),
      description: `${formData.description.trim()}\n\nKey Responsibilities:\n${formData.responsibilities.trim()}\n\nRequirements:\n${formData.requirements.trim()}\n\nBenefits:\n${formData.benefits.trim()}`,
      department: formData.department,
      location: formData.location.trim(),
      type: formData.type,
      skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
      salary: {
        min: parseInt(formData.minSalary),
        max: parseInt(formData.maxSalary),
        currency: 'USD'
      },
      status: 'active',
      createdAt: editingJob?.createdAt || new Date(),
      applicantCount: editingJob?.applicantCount || 0
    };
    
    onSave(jobData);
  };

  const generateAITest = async () => {
    if (!formData.skills.trim()) return;
    
    setIsGeneratingTest(true);
    
    try {
      // Generate assessment using OpenAI
      const questions = await generateAssessmentWithAI(
        formData.title,
        formData.description,
        formData.department,
        'mid', // Default to mid-level
        8 // Default question count
      );

      const assessment = {
        id: Date.now().toString(),
        title: `AI-Generated: ${formData.title} Assessment`,
        description: `Automatically generated assessment for ${formData.title} position`,
        type: 'ai-generated',
        role: formData.title,
        department: formData.department,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(Boolean),
        questions: questions.map((q, index) => ({
          ...q,
          id: `ai-q-${Date.now()}-${index}`
        })),
        timeLimit: 60,
        passingScore: 70,
        difficulty: 'intermediate',
        estimatedDuration: 60,
        isActive: true,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0
      };
      
      const existingAssessments = JSON.parse(localStorage.getItem('assessments') || '[]');
      localStorage.setItem('assessments', JSON.stringify([assessment, ...existingAssessments]));
      
      setIsGeneratingTest(false);
      setTestGenerated(true);
      setTimeout(() => setTestGenerated(false), 3000);
    } catch (error) {
      console.error('Assessment generation failed:', error);
      setIsGeneratingTest(false);
      alert('Failed to generate assessment. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {editingJob ? 'Edit Job Posting' : 'Create New Job Posting'}
          </h2>
          <p className="text-sm text-gray-600 mt-1">Fill in the details below to create your job posting</p>
        </div>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} className="text-gray-600" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.title ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Senior Frontend Developer"
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.department ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="AI/ML">AI/ML</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Customer Success">Customer Success</option>
              <option value="Security">Security</option>
            </select>
            {errors.department && <p className="text-red-600 text-xs mt-1">{errors.department}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.location ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="San Francisco, CA or Remote"
            />
            {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Job['type'] })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
            </select>
          </div>
        </div>

        {/* Job Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Provide an overview of the role and what the candidate will be working on..."
          />
          {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
        </div>

        {/* Requirements and Responsibilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="• 5+ years of experience with React&#10;• Strong TypeScript knowledge&#10;• Experience with modern CSS&#10;• Bachelor's degree or equivalent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>
            <textarea
              value={formData.responsibilities}
              onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="• Build user-facing web applications&#10;• Collaborate with design and backend teams&#10;• Optimize performance and user experience&#10;• Mentor junior developers"
            />
          </div>
        </div>

        {/* Skills and Salary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
            <textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              rows={3}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.skills ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="React, TypeScript, CSS, JavaScript"
            />
            {errors.skills && <p className="text-red-600 text-xs mt-1">{errors.skills}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary ($) *</label>
            <input
              type="number"
              value={formData.minSalary}
              onChange={(e) => setFormData({ ...formData, minSalary: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.minSalary ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="120000"
            />
            {errors.minSalary && <p className="text-red-600 text-xs mt-1">{errors.minSalary}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary ($) *</label>
            <input
              type="number"
              value={formData.maxSalary}
              onChange={(e) => setFormData({ ...formData, maxSalary: e.target.value })}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.maxSalary ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="150000"
            />
            {errors.maxSalary && <p className="text-red-600 text-xs mt-1">{errors.maxSalary}</p>}
          </div>
        </div>

        {/* Benefits */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Benefits & Perks</label>
          <textarea
            value={formData.benefits}
            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Health insurance, equity package, unlimited PTO, learning budget..."
          />
        </div>

        {/* AI Assessment Generation */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-blue-900">Generate AI Assessment</h4>
              <p className="text-xs text-blue-700 mt-1">Create automated candidate evaluation based on job requirements</p>
            </div>
            <button
              type="button"
              onClick={generateAITest}
              disabled={!formData.skills.trim() || isGeneratingTest}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm"
            >
              {isGeneratingTest ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating...</span>
                </>
              ) : testGenerated ? (
                <>
                  <CheckCircle size={16} />
                  <span>Generated!</span>
                </>
              ) : (
                <>
                  <Wand2 size={16} />
                  <span>Generate</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex space-x-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
          >
            <Save size={16} />
            <span>{editingJob ? 'Update Job' : 'Save & Publish'}</span>
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
  );
};