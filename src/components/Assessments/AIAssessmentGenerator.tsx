import React, { useState } from 'react';
import { Wand2, Sparkles, CheckCircle, RefreshCw, Save, Brain, Target, Clock, Award } from 'lucide-react';
import { generateAssessmentWithAI } from '../../services/openai';
import type { Assessment, Question } from '../../types/assessment';

interface AIAssessmentGeneratorProps {
  onSaveAssessment: (assessmentData: Partial<Assessment>) => void;
}

export const AIAssessmentGenerator: React.FC<AIAssessmentGeneratorProps> = ({ onSaveAssessment }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [experienceLevel, setExperienceLevel] = useState<'junior' | 'mid' | 'senior'>('mid');
  const [questionCount, setQuestionCount] = useState(10);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAssessment, setGeneratedAssessment] = useState<Assessment | null>(null);

  const generateAssessment = async () => {
    if (!jobDescription.trim() || !jobTitle.trim()) return;

    setIsGenerating(true);

    try {
      // Generate questions using OpenAI
      const questions = await generateAssessmentWithAI(
        jobTitle,
        jobDescription,
        department,
        experienceLevel,
        questionCount
      );

      // Extract skills from job description for the assessment metadata
      const skillKeywords = [
        'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'SQL', 'CSS', 'HTML',
        'Vue.js', 'Angular', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
        'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Analysis', 'Statistics'
      ];
      
      const detectedSkills = skillKeywords.filter(skill => 
        jobDescription.toLowerCase().includes(skill.toLowerCase())
      );

      const assessment: Assessment = {
        id: `ai-${Date.now()}`,
        title: `AI-Generated: ${jobTitle} Assessment`,
        description: `Automatically generated assessment for ${jobTitle} position based on job requirements`,
        type: 'ai-generated',
        role: jobTitle,
        department: department,
        skills: detectedSkills.length > 0 ? detectedSkills : ['General'],
        questions: questions.map((q, index) => ({
          ...q,
          id: `ai-q-${Date.now()}-${index}`
        })),
        timeLimit: questionCount * 4,
        passingScore: 70,
        difficulty: experienceLevel === 'junior' ? 'beginner' : experienceLevel === 'senior' ? 'advanced' : 'intermediate',
        estimatedDuration: questionCount * 4,
        isActive: false,
        createdBy: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        usageCount: 0
      };

      setGeneratedAssessment(assessment);
      setIsGenerating(false);
    } catch (error) {
      console.error('Assessment generation failed:', error);
      setIsGenerating(false);
      alert('Failed to generate assessment. Please try again.');
    }
  };

  const handlePublishAssessment = () => {
    if (generatedAssessment) {
      onSaveAssessment({ ...generatedAssessment, isActive: true });
      
      // Reset form
      setGeneratedAssessment(null);
      setJobDescription('');
      setJobTitle('');
      setDepartment('');
      setQuestionCount(10);
      setExperienceLevel('mid');
    }
  };

  if (isGenerating) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Brain size={32} className="text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">AI Generating Assessment...</h2>
          <p className="text-gray-600 mb-6">
            Analyzing job description and creating {questionCount} tailored questions
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <CheckCircle size={16} className="text-green-600 mx-auto mb-1" />
                <p className="text-green-600">Skills Extracted</p>
              </div>
              <div className="text-center">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                <p className="text-blue-600">Generating Questions</p>
              </div>
              <div className="text-center">
                <Clock size={16} className="text-gray-400 mx-auto mb-1" />
                <p className="text-gray-400">Finalizing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (generatedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Generated Assessment</h2>
            <p className="text-gray-600 mt-1">Review and publish your AI-generated assessment</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setGeneratedAssessment(null)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <RefreshCw size={16} />
              <span>Start Over</span>
            </button>
            <button 
              onClick={handlePublishAssessment}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save Assessment</span>
            </button>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle size={24} className="text-green-600" />
            <h3 className="text-lg font-semibold text-green-900">Assessment Generated Successfully!</h3>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">{generatedAssessment.questions.length}</p>
              <p className="text-sm text-green-600">Questions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">{generatedAssessment.timeLimit}</p>
              <p className="text-sm text-green-600">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">{generatedAssessment.skills.length}</p>
              <p className="text-sm text-green-600">Skills</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-800">{generatedAssessment.passingScore}%</p>
              <p className="text-sm text-green-600">Pass Score</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Questions</h3>
          
          <div className="space-y-4">
            {generatedAssessment.questions.slice(0, 5).map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    Q{index + 1}: {question.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {question.type.replace('-', ' ')}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {question.points}pts
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{question.content}</p>
                
                {question.options && (
                  <div className="space-y-1">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex} 
                        className={`text-xs p-2 rounded ${
                          option === question.correctAnswer 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {String.fromCharCode(65 + optIndex)}. {option}
                        {option === question.correctAnswer && ' ✓'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {generatedAssessment.questions.length > 5 && (
              <p className="text-sm text-gray-600 text-center">
                +{generatedAssessment.questions.length - 5} more questions
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">AI Assessment Generator</h2>
          <p className="text-gray-600 mt-1">Generate custom assessments from job descriptions</p>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Sparkles size={16} className="text-blue-500" />
          <span>Powered by AI</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="AI/ML">AI/ML</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as typeof experienceLevel)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="junior">Junior (0-2 years)</option>
                  <option value="mid">Mid-level (3-5 years)</option>
                  <option value="senior">Senior (5+ years)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Count</label>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={5}>5 questions</option>
                  <option value={10}>10 questions</option>
                  <option value={15}>15 questions</option>
                  <option value={20}>20 questions</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paste the complete job description here. The AI will analyze required skills, responsibilities, and generate relevant questions..."
              />
            </div>

            <button
              onClick={generateAssessment}
              disabled={!jobDescription.trim() || !jobTitle.trim() || !department}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
            >
              <Wand2 size={20} />
              <span>Generate Assessment</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">AI Analysis Process</h4>
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Extracts required skills from job description</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Generates role-specific questions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Calibrates difficulty to experience level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span>Balances question types for comprehensive evaluation</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-2">Question Types</h4>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex items-center justify-between">
                  <span>Multiple Choice</span>
                  <span className="font-medium">Auto-scored</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Short Answer</span>
                  <span className="font-medium">Manual review</span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-900 mb-2">Best Practices</h4>
              <div className="space-y-1 text-sm text-yellow-800">
                <p>• Include specific technologies in job description</p>
                <p>• Mention required experience level clearly</p>
                <p>• Review generated questions before publishing</p>
                <p>• Test assessment yourself first</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};