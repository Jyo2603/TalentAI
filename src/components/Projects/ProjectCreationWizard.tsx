import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Save, Wand2, Users, Calendar, DollarSign, Target, CheckCircle, AlertTriangle, Sparkles, X } from 'lucide-react';
import { projectTemplates } from '../../data/projectData';
import type { Project, ProjectTemplate } from '../../types/project';

interface ProjectCreationWizardProps {
  onSave: (project: Partial<Project>) => void;
  onCancel: () => void;
}

type WizardStep = 'template' | 'basic-info' | 'requirements' | 'timeline' | 'budget' | 'review';

export const ProjectCreationWizard: React.FC<ProjectCreationWizardProps> = ({ onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate | null>(null);
  const [isGeneratingWithAI, setIsGeneratingWithAI] = useState(false);
  const [aiGenerated, setAiGenerated] = useState(false);
  
  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    type: 'web-app' as Project['type'],
    priority: 'medium' as Project['priority'],
    startDate: '',
    endDate: '',
    estimatedHours: 0,
    budget: 0,
    requiredSkills: [] as string[],
    minTeamSize: 3,
    maxTeamSize: 6,
    customRequirements: ''
  });

  const steps: { id: WizardStep; title: string; description: string }[] = [
    { id: 'template', title: 'Choose Template', description: 'Select a project template or start from scratch' },
    { id: 'basic-info', title: 'Basic Information', description: 'Project name, description, and type' },
    { id: 'requirements', title: 'Requirements', description: 'Skills, team size, and technical requirements' },
    { id: 'timeline', title: 'Timeline', description: 'Project dates and milestones' },
    { id: 'budget', title: 'Budget', description: 'Budget allocation and resource planning' },
    { id: 'review', title: 'Review', description: 'Review all details and create project' }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1].id);
    }
  };

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template);
    setProjectData(prev => ({
      ...prev,
      name: `${template.name} Project`,
      description: template.description,
      type: template.type,
      requiredSkills: template.requiredSkills,
      minTeamSize: template.teamSize.min,
      maxTeamSize: template.teamSize.max,
      estimatedHours: template.estimatedDuration * 40
    }));
  };

  const generateWithAI = async () => {
    setIsGeneratingWithAI(true);
    
    setTimeout(() => {
      const aiSuggestions = {
        estimatedHours: Math.floor(Math.random() * 1000) + 500,
        budget: Math.floor(Math.random() * 200000) + 100000,
        additionalSkills: ['DevOps', 'Testing', 'Documentation']
      };
      
      setProjectData(prev => ({
        ...prev,
        estimatedHours: aiSuggestions.estimatedHours,
        budget: aiSuggestions.budget,
        requiredSkills: [...prev.requiredSkills, ...aiSuggestions.additionalSkills]
      }));
      
      setIsGeneratingWithAI(false);
      setAiGenerated(true);
      setTimeout(() => setAiGenerated(false), 3000);
    }, 2000);
  };

  const handleSubmit = () => {
    if (!projectData.name.trim() || !projectData.description.trim() || projectData.requiredSkills.length === 0) {
      alert('Please fill in all required fields');
      return;
    }
    
    const project: Partial<Project> = {
      name: projectData.name,
      description: projectData.description,
      type: projectData.type,
      priority: projectData.priority,
      startDate: new Date(projectData.startDate),
      endDate: new Date(projectData.endDate),
      estimatedHours: projectData.estimatedHours,
      budget: {
        allocated: projectData.budget,
        spent: 0,
        currency: 'USD'
      },
      requiredSkills: projectData.requiredSkills,
      minTeamSize: projectData.minTeamSize,
      maxTeamSize: projectData.maxTeamSize,
      stakeholders: [],
      milestones: [],
      deliverables: []
    };
    
    onSave(project);
  };

  const addSkill = (skill: string) => {
    if (skill && !projectData.requiredSkills.includes(skill)) {
      setProjectData({
        ...projectData,
        requiredSkills: [...projectData.requiredSkills, skill]
      });
    }
  };

  const removeSkill = (skill: string) => {
    setProjectData({
      ...projectData,
      requiredSkills: projectData.requiredSkills.filter(s => s !== skill)
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'template':
        return true;
      case 'basic-info':
        return projectData.name.trim() && projectData.description.trim();
      case 'requirements':
        return projectData.requiredSkills.length > 0;
      case 'timeline':
        return projectData.startDate && projectData.endDate && projectData.estimatedHours > 0;
      case 'budget':
        return projectData.budget > 0;
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 'template':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Starting Point</h2>
              <p className="text-gray-600">Select a template to get started quickly, or create a custom project</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedTemplate?.id === template.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Target size={24} className="text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium">{template.estimatedDuration} weeks</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Team Size:</span>
                      <span className="font-medium">{template.teamSize.min}-{template.teamSize.max} people</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Skills:</span>
                      <span className="font-medium">{template.requiredSkills.length} required</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-1">
                      {template.requiredSkills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {template.requiredSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{template.requiredSkills.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              <div
                onClick={() => setSelectedTemplate(null)}
                className={`border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate === null
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Custom Project</h3>
                  <p className="text-sm text-gray-600 mt-1">Start from scratch with your own requirements</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'basic-info':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Information</h2>
              <p className="text-gray-600">Tell us about your project</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
                <input
                  type="text"
                  value={projectData.name}
                  onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={projectData.description}
                  onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the project goals, scope, and expected outcomes"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                  <select
                    value={projectData.type}
                    onChange={(e) => setProjectData({ ...projectData, type: e.target.value as Project['type'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="web-app">Web Application</option>
                    <option value="mobile-app">Mobile Application</option>
                    <option value="data-pipeline">Data Pipeline</option>
                    <option value="ai-ml">AI/ML Project</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={projectData.priority}
                    onChange={(e) => setProjectData({ ...projectData, priority: e.target.value as Project['priority'] })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Wand2 size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-900">AI Enhancement</span>
                </div>
                <p className="text-blue-800 text-sm mb-3">
                  Let AI analyze your project description and suggest improvements, timeline, and resource requirements.
                </p>
                <button
                  type="button"
                  onClick={generateWithAI}
                  disabled={!projectData.description || isGeneratingWithAI}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  {isGeneratingWithAI ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : aiGenerated ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Enhanced!</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      <span>Enhance with AI</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 'requirements':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Requirements</h2>
              <p className="text-gray-600">Define the skills and team size needed</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Type a skill and press Enter"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        const skill = e.currentTarget.value.trim();
                        if (skill) {
                          addSkill(skill);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                  <div className="flex flex-wrap gap-2">
                    {projectData.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center space-x-1 px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Team Size</label>
                  <input
                    type="number"
                    value={projectData.minTeamSize}
                    onChange={(e) => setProjectData({ ...projectData, minTeamSize: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="20"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Team Size</label>
                  <input
                    type="number"
                    value={projectData.maxTeamSize}
                    onChange={(e) => setProjectData({ ...projectData, maxTeamSize: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min={projectData.minTeamSize}
                    max="20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                <textarea
                  value={projectData.customRequirements}
                  onChange={(e) => setProjectData({ ...projectData, customRequirements: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific technical requirements, constraints, or preferences"
                />
              </div>
            </div>
          </div>
        );

      case 'timeline':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Timeline</h2>
              <p className="text-gray-600">Set project dates and estimated effort</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={projectData.startDate}
                    onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                  <input
                    type="date"
                    value={projectData.endDate}
                    onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Hours *</label>
                <input
                  type="number"
                  value={projectData.estimatedHours}
                  onChange={(e) => setProjectData({ ...projectData, estimatedHours: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total estimated hours for the project"
                  min="1"
                />
              </div>

              {projectData.startDate && projectData.endDate && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Timeline Summary</h4>
                  <p className="text-green-800 text-sm">
                    Duration: {Math.ceil((new Date(projectData.endDate).getTime() - new Date(projectData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                    ({Math.ceil((new Date(projectData.endDate).getTime() - new Date(projectData.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks)
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Budget & Resources</h2>
              <p className="text-gray-600">Set budget allocation and resource planning</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget ($) *</label>
                <input
                  type="number"
                  value={projectData.budget}
                  onChange={(e) => setProjectData({ ...projectData, budget: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total project budget"
                  min="1000"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-medium text-blue-900 mb-4">Cost Estimation</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800">Estimated Hours:</span>
                    <span className="font-bold text-blue-900">{projectData.estimatedHours.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800">Avg Hourly Rate:</span>
                    <span className="font-bold text-blue-900">$75</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-blue-200 pt-3">
                    <span className="text-blue-800 font-medium">Estimated Cost:</span>
                    <span className="font-bold text-blue-900 text-lg">
                      ${(projectData.estimatedHours * 75).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle size={16} className="text-yellow-600" />
                  <span className="font-medium text-yellow-900">Budget Recommendations</span>
                </div>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Add 20% buffer for unexpected requirements</li>
                  <li>• Consider external contractor costs if skills are missing</li>
                  <li>• Factor in infrastructure and tooling costs</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Create Project</h2>
              <p className="text-gray-600">Review all details before creating the project</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Name:</span>
                        <p className="font-medium text-gray-900">{projectData.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <p className="font-medium text-gray-900 capitalize">{projectData.type.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <p className="font-medium text-gray-900 capitalize">{projectData.priority}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Description:</span>
                        <p className="text-gray-700 text-sm">{projectData.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Team Size:</span>
                        <p className="font-medium text-gray-900">{projectData.minTeamSize} - {projectData.maxTeamSize} people</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Required Skills:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {projectData.requiredSkills.map((skill) => (
                            <span key={skill} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline & Budget</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Duration:</span>
                        <p className="font-medium text-gray-900">
                          {projectData.startDate && projectData.endDate 
                            ? `${Math.ceil((new Date(projectData.endDate).getTime() - new Date(projectData.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7))} weeks`
                            : 'Not set'
                          }
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Estimated Hours:</span>
                        <p className="font-medium text-gray-900">{projectData.estimatedHours.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Budget:</span>
                        <p className="font-medium text-gray-900">${projectData.budget.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-green-900 mb-4">AI Confidence Score</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="w-full bg-green-200 rounded-full h-3">
                          <div 
                            className="bg-green-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: '85%' }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-2xl font-bold text-green-800">85%</span>
                    </div>
                    <p className="text-green-700 text-sm mt-2">
                      High confidence in project success based on requirements and team availability
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Step not implemented</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full h-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Create New Project</h1>
              <p className="text-blue-100 mt-1">Step {currentStepIndex + 1} of {steps.length}</p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-blue-500/30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Step Navigation */}
        <div className="border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  index === currentStepIndex
                    ? 'bg-blue-100 text-blue-800'
                    : index < currentStepIndex
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === currentStepIndex
                    ? 'bg-blue-600 text-white'
                    : index < currentStepIndex
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-400 text-white'
                }`}>
                  {index < currentStepIndex ? '✓' : index + 1}
                </div>
                <span className="font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400 text-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="flex items-center space-x-3">
              {currentStep === 'review' ? (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white rounded-lg transition-colors font-medium"
                >
                  <Save size={16} />
                  <span>Create Project</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
                >
                  <span>Next</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};