import React, { useState } from 'react';
import { Plus, Save, Eye, Trash2, Edit, Clock, Award, FileText } from 'lucide-react';
import type { Assessment, Question } from '../../types/assessment';

interface CustomAssessmentBuilderProps {
  onSave: (assessmentData: Partial<Assessment>) => void;
  existingAssessments: Assessment[];
}

export const CustomAssessmentBuilder: React.FC<CustomAssessmentBuilderProps> = ({ 
  onSave, 
  existingAssessments 
}) => {
  const [assessmentData, setAssessmentData] = useState({
    title: '',
    description: '',
    role: '',
    department: '',
    skills: '',
    timeLimit: 60,
    passingScore: 70,
    difficulty: 'intermediate' as Assessment['difficulty']
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    type: 'multiple-choice',
    title: '',
    description: '',
    content: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 5,
    difficulty: 'medium',
    skills: [],
    category: 'technical'
  });

  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  const handleAddQuestion = () => {
    if (!currentQuestion.title || !currentQuestion.content) return;

    const newQuestion: Question = {
      id: Date.now().toString(),
      type: currentQuestion.type || 'multiple-choice',
      title: currentQuestion.title,
      description: currentQuestion.description || '',
      content: currentQuestion.content,
      options: currentQuestion.type === 'multiple-choice' ? currentQuestion.options?.filter(Boolean) : undefined,
      correctAnswer: currentQuestion.correctAnswer,
      points: currentQuestion.points || 5,
      timeLimit: currentQuestion.timeLimit,
      difficulty: currentQuestion.difficulty || 'medium',
      skills: typeof currentQuestion.skills === 'string' 
        ? currentQuestion.skills.split(',').map(s => s.trim()).filter(Boolean)
        : currentQuestion.skills || [],
      category: currentQuestion.category || 'technical'
    };

    if (editingQuestionId) {
      setQuestions(prev => prev.map(q => q.id === editingQuestionId ? newQuestion : q));
      setEditingQuestionId(null);
    } else {
      setQuestions(prev => [...prev, newQuestion]);
    }

    setCurrentQuestion({
      type: 'multiple-choice',
      title: '',
      description: '',
      content: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 5,
      difficulty: 'medium',
      skills: [],
      category: 'technical'
    });
    setIsAddingQuestion(false);
  };

  const handleEditQuestion = (question: Question) => {
    setCurrentQuestion({
      ...question,
      skills: question.skills.join(', ')
    });
    setEditingQuestionId(question.id);
    setIsAddingQuestion(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
  };

  const handleSaveAssessment = () => {
    if (!assessmentData.title || questions.length === 0) return;

    const assessment: Partial<Assessment> = {
      title: assessmentData.title,
      description: assessmentData.description,
      type: 'custom',
      role: assessmentData.role,
      department: assessmentData.department,
      skills: assessmentData.skills.split(',').map(s => s.trim()).filter(Boolean),
      questions: questions,
      timeLimit: assessmentData.timeLimit,
      passingScore: assessmentData.passingScore,
      difficulty: assessmentData.difficulty,
      estimatedDuration: assessmentData.timeLimit
    };

    onSave(assessment);
    
    setAssessmentData({
      title: '',
      description: '',
      role: '',
      department: '',
      skills: '',
      timeLimit: 60,
      passingScore: 70,
      difficulty: 'intermediate'
    });
    setQuestions([]);
  };

  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Custom Assessment Builder</h2>
          <p className="text-gray-600 mt-1">Create tailored assessments with custom questions and settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleSaveAssessment}
            disabled={!assessmentData.title || questions.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save Assessment</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Assessment Title</label>
              <input
                type="text"
                value={assessmentData.title}
                onChange={(e) => setAssessmentData({ ...assessmentData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. Senior React Developer Assessment"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={assessmentData.description}
                onChange={(e) => setAssessmentData({ ...assessmentData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of what this assessment evaluates"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={assessmentData.role}
                  onChange={(e) => setAssessmentData({ ...assessmentData, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={assessmentData.department}
                  onChange={(e) => setAssessmentData({ ...assessmentData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Product">Product</option>
                  <option value="Design">Design</option>
                  <option value="AI/ML">AI/ML</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
              <input
                type="text"
                value={assessmentData.skills}
                onChange={(e) => setAssessmentData({ ...assessmentData, skills: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, TypeScript, CSS (comma separated)"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (min)</label>
                <input
                  type="number"
                  value={assessmentData.timeLimit}
                  onChange={(e) => setAssessmentData({ ...assessmentData, timeLimit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="15"
                  max="180"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passing Score (%)</label>
                <input
                  type="number"
                  value={assessmentData.passingScore}
                  onChange={(e) => setAssessmentData({ ...assessmentData, passingScore: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="50"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  value={assessmentData.difficulty}
                  onChange={(e) => setAssessmentData({ ...assessmentData, difficulty: e.target.value as Assessment['difficulty'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{questions.length}</p>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{totalPoints}</p>
                <p className="text-sm text-gray-600">Total Points</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{assessmentData.timeLimit}</p>
                <p className="text-sm text-gray-600">Minutes</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Questions ({questions.length})</h3>
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Question</span>
            </button>
          </div>

          <div className="space-y-3 max-h-96 overflow-auto">
            {questions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      Q{index + 1}: {question.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{question.content}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {question.type}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {question.points}pts
                    </span>
                    <button
                      onClick={() => handleEditQuestion(question)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit size={14} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="p-1 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 size={14} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {question.options && (
                  <div className="mt-2 space-y-1">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className={`text-xs p-2 rounded ${
                        option === question.correctAnswer ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'
                      }`}>
                        {String.fromCharCode(65 + optIndex)}. {option}
                        {option === question.correctAnswer && ' ✓'}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center space-x-4 mt-3 text-xs text-gray-600">
                  <span>Difficulty: {question.difficulty}</span>
                  <span>Category: {question.category}</span>
                  {question.timeLimit && <span>Time: {question.timeLimit}min</span>}
                </div>
              </div>
            ))}

            {questions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <FileText size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No questions added yet</p>
                <p className="text-xs mt-1">Click "Add Question" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAddingQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingQuestionId ? 'Edit Question' : 'Add New Question'}
              </h3>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
                  <select
                    value={currentQuestion.type}
                    onChange={(e) => setCurrentQuestion({ 
                      ...currentQuestion, 
                      type: e.target.value as Question['type'],
                      options: e.target.value === 'multiple-choice' ? ['', '', '', ''] : undefined
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="coding">Coding Challenge</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="file-upload">File Upload</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={currentQuestion.category}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, category: e.target.value as Question['category'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="problem-solving">Problem Solving</option>
                    <option value="domain-specific">Domain Specific</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Title</label>
                <input
                  type="text"
                  value={currentQuestion.title}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g. React State Management"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question Content</label>
                <textarea
                  value={currentQuestion.content}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the question content..."
                />
              </div>

              {currentQuestion.type === 'multiple-choice' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer Options</label>
                  <div className="space-y-2">
                    {currentQuestion.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-600 w-6">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            const newOptions = [...(currentQuestion.options || [])];
                            newOptions[index] = e.target.value;
                            setCurrentQuestion({ ...currentQuestion, options: newOptions });
                          }}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={`Option ${index + 1}`}
                        />
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={currentQuestion.correctAnswer === option}
                          onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: option })}
                          className="w-4 h-4 text-blue-600"
                        />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select the radio button next to the correct answer</p>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                  <input
                    type="number"
                    value={currentQuestion.points}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={currentQuestion.difficulty}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, difficulty: e.target.value as Question['difficulty'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time Limit (min)</label>
                  <input
                    type="number"
                    value={currentQuestion.timeLimit || ''}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, timeLimit: e.target.value ? parseInt(e.target.value) : undefined })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Optional"
                    min="1"
                    max="60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills Tested</label>
                <input
                  type="text"
                  value={typeof currentQuestion.skills === 'string' ? currentQuestion.skills : currentQuestion.skills?.join(', ')}
                  onChange={(e) => setCurrentQuestion({ ...currentQuestion, skills: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="React, JavaScript (comma separated)"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleAddQuestion}
                  disabled={!currentQuestion.title || !currentQuestion.content}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-2 rounded-lg transition-colors"
                >
                  {editingQuestionId ? 'Update Question' : 'Add Question'}
                </button>
                <button
                  onClick={() => {
                    setIsAddingQuestion(false);
                    setEditingQuestionId(null);
                    setCurrentQuestion({
                      type: 'multiple-choice',
                      title: '',
                      description: '',
                      content: '',
                      options: ['', '', '', ''],
                      correctAnswer: '',
                      points: 5,
                      difficulty: 'medium',
                      skills: [],
                      category: 'technical'
                    });
                  }}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};