import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Copy, Tag, Clock, Star, Award } from 'lucide-react';
import type { Question } from '../../types/assessment';

// Organized question bank by skills and categories
const questionBankData = {
  'React': [
    {
      id: 'react-1',
      type: 'multiple-choice' as const,
      title: 'React Hooks Fundamentals',
      description: 'Test basic understanding of React hooks',
      content: 'Which hook is used to perform side effects in functional components?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      correctAnswer: 'useEffect',
      points: 5,
      difficulty: 'easy' as const,
      skills: ['React'],
      category: 'technical' as const
    },
    {
      id: 'react-2',
      type: 'short-answer' as const,
      title: 'Component Architecture',
      description: 'Evaluate component design skills',
      content: 'Explain the difference between controlled and uncontrolled components in React. When would you use each?',
      points: 15,
      timeLimit: 10,
      difficulty: 'medium' as const,
      skills: ['React'],
      category: 'technical' as const
    }
  ],
  'JavaScript': [
    {
      id: 'js-1',
      type: 'multiple-choice' as const,
      title: 'JavaScript Fundamentals',
      description: 'Test core JavaScript knowledge',
      content: 'What is the output of: console.log(typeof null)?',
      options: ['null', 'undefined', 'object', 'boolean'],
      correctAnswer: 'object',
      points: 5,
      difficulty: 'medium' as const,
      skills: ['JavaScript'],
      category: 'technical' as const
    },
    {
      id: 'js-2',
      type: 'coding' as const,
      title: 'Async Programming',
      description: 'Test asynchronous JavaScript skills',
      content: 'Write a function that fetches data from multiple APIs concurrently and returns the combined results.',
      points: 20,
      timeLimit: 25,
      difficulty: 'hard' as const,
      skills: ['JavaScript'],
      category: 'technical' as const
    }
  ],
  'Python': [
    {
      id: 'python-1',
      type: 'multiple-choice' as const,
      title: 'Python Data Structures',
      description: 'Test Python data structure knowledge',
      content: 'Which Python data structure is ordered and allows duplicate values?',
      options: ['set', 'dict', 'list', 'tuple'],
      correctAnswer: 'list',
      points: 5,
      difficulty: 'easy' as const,
      skills: ['Python'],
      category: 'technical' as const
    }
  ],
  'SQL': [
    {
      id: 'sql-1',
      type: 'multiple-choice' as const,
      title: 'SQL Queries',
      description: 'Test SQL query knowledge',
      content: 'Which SQL clause is used to filter rows based on a condition?',
      options: ['SELECT', 'WHERE', 'GROUP BY', 'ORDER BY'],
      correctAnswer: 'WHERE',
      points: 5,
      difficulty: 'easy' as const,
      skills: ['SQL'],
      category: 'technical' as const
    }
  ],
  'Communication': [
    {
      id: 'comm-1',
      type: 'short-answer' as const,
      title: 'Conflict Resolution',
      description: 'Evaluate communication and leadership skills',
      content: 'Describe a time when you had to resolve a disagreement between team members. What was your approach?',
      points: 15,
      timeLimit: 10,
      difficulty: 'medium' as const,
      skills: ['Communication'],
      category: 'behavioral' as const
    }
  ]
};

export const QuestionBank: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState<'all' | string>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Question['category']>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | Question['difficulty']>('all');
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const allQuestions = Object.entries(questionBankData).flatMap(([skill, questions]) => 
    questions.map(q => ({ ...q, primarySkill: skill }))
  );

  const filteredQuestions = allQuestions.filter(question => {
    const searchMatch = searchTerm === '' ||
                       question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       question.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       question.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const skillMatch = skillFilter === 'all' || question.skills.includes(skillFilter);
    const categoryMatch = categoryFilter === 'all' || question.category === categoryFilter;
    const difficultyMatch = difficultyFilter === 'all' || question.difficulty === difficultyFilter;
    
    return searchMatch && skillMatch && categoryMatch && difficultyMatch;
  });

  const getTypeColor = (type: Question['type']) => {
    switch (type) {
      case 'multiple-choice': return 'bg-blue-100 text-blue-800';
      case 'coding': return 'bg-green-100 text-green-800';
      case 'short-answer': return 'bg-purple-100 text-purple-800';
      case 'file-upload': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: Question['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: Question['category']) => {
    switch (category) {
      case 'technical': return '⚙️';
      case 'behavioral': return '🧠';
      case 'problem-solving': return '🧩';
      case 'domain-specific': return '🎯';
      default: return '📝';
    }
  };

  const allSkills = Object.keys(questionBankData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Question Bank</h2>
          <p className="text-gray-600 mt-1">Repository of {allQuestions.length} questions organized by skills and categories</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Question</span>
        </button>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(questionBankData).map(([skill, questions]) => (
          <div key={skill} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg">{getCategoryIcon(questions[0].category)}</span>
              <h3 className="font-medium text-gray-900">{skill}</h3>
            </div>
            <p className="text-sm text-gray-600">{questions.length} questions</p>
            <p className="text-xs text-gray-500 capitalize">{questions[0].category}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Skills</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
            <option value="problem-solving">Problem Solving</option>
            <option value="domain-specific">Domain Specific</option>
          </select>

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value as typeof difficultyFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuestions.map((question) => (
          <div 
            key={question.id} 
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {question.title}
                </h4>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{question.content}</p>
              </div>
              
              <div className="flex space-x-1">
                <button
                  onClick={() => setSelectedQuestion(question)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="View Details"
                >
                  <Star size={14} className="text-gray-600" />
                </button>
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy Question"
                >
                  <Copy size={14} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(question.type)}`}>
                  {question.type.replace('-', ' ')}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center space-x-1">
                  <Award size={12} />
                  <span>{question.points} points</span>
                </div>
                {question.timeLimit && (
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{question.timeLimit}min</span>
                  </div>
                )}
              </div>

              <div>
                <div className="flex flex-wrap gap-1">
                  {question.skills.slice(0, 2).map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                  {question.skills.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{question.skills.length - 2}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2 rounded transition-colors">
                  Add to Assessment
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-2 rounded transition-colors">
                  <Edit size={12} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <Tag size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No questions found</p>
          <p className="text-gray-600 mt-1">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Question Detail Modal */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{selectedQuestion.title}</h3>
                <button
                  onClick={() => setSelectedQuestion(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded text-sm font-medium ${getTypeColor(selectedQuestion.type)}`}>
                  {selectedQuestion.type.replace('-', ' ')}
                </span>
                <span className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {selectedQuestion.difficulty}
                </span>
                <span className="text-sm text-gray-600">{selectedQuestion.points} points</span>
                {selectedQuestion.timeLimit && (
                  <span className="text-sm text-gray-600">{selectedQuestion.timeLimit} min</span>
                )}
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Question</h4>
                <p className="text-gray-700">{selectedQuestion.content}</p>
              </div>

              {selectedQuestion.options && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Answer Options</h4>
                  <div className="space-y-2">
                    {selectedQuestion.options.map((option, index) => (
                      <div 
                        key={index} 
                        className={`p-2 rounded text-sm ${
                          option === selectedQuestion.correctAnswer 
                            ? 'bg-green-50 text-green-800 border border-green-200' 
                            : 'bg-gray-50 text-gray-700'
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                        {option === selectedQuestion.correctAnswer && ' ✓'}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Skills & Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedQuestion.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  Add to Assessment
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                  Edit
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors">
                  Duplicate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};