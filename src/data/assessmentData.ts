import type { Assessment, AssessmentTemplate, Question, QuestionBank } from '../types/assessment';

// Pre-built Assessment Templates
export const assessmentTemplates: AssessmentTemplate[] = [
  {
    id: '1',
    name: 'Frontend Developer Assessment',
    description: 'Comprehensive evaluation for React/JavaScript developers',
    role: 'Frontend Developer',
    department: 'Engineering',
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'],
    questionCount: 15,
    estimatedDuration: 45,
    difficulty: 'intermediate',
    isPopular: true,
    usageCount: 127,
    averageScore: 78,
    questions: [
      {
        id: 'q1',
        type: 'multiple-choice',
        title: 'React Hooks',
        description: 'Test understanding of React hooks',
        content: 'Which hook is used to manage component state in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 'useState',
        points: 5,
        difficulty: 'easy',
        skills: ['React'],
        category: 'technical'
      },
      {
        id: 'q2',
        type: 'coding',
        title: 'Array Manipulation',
        description: 'Implement a function to filter and transform data',
        content: 'Write a function that takes an array of objects and returns only items where age > 18, sorted by name',
        points: 15,
        timeLimit: 20,
        difficulty: 'medium',
        skills: ['JavaScript'],
        category: 'technical'
      }
    ]
  },
  {
    id: '2',
    name: 'Backend Developer Assessment',
    description: 'Server-side development and API design evaluation',
    role: 'Backend Developer',
    department: 'Engineering',
    skills: ['Node.js', 'Python', 'SQL', 'API Design', 'System Design'],
    questionCount: 12,
    estimatedDuration: 60,
    difficulty: 'intermediate',
    isPopular: true,
    usageCount: 89,
    averageScore: 72,
    questions: [
      {
        id: 'q3',
        type: 'multiple-choice',
        title: 'Database Optimization',
        description: 'Understanding of database performance',
        content: 'Which technique is most effective for improving query performance on large datasets?',
        options: ['Indexing', 'Normalization', 'Denormalization', 'Caching'],
        correctAnswer: 'Indexing',
        points: 8,
        difficulty: 'medium',
        skills: ['SQL'],
        category: 'technical'
      }
    ]
  },
  {
    id: '3',
    name: 'AI/ML Engineer Assessment',
    description: 'Machine learning and data science evaluation',
    role: 'AI/ML Engineer',
    department: 'AI/ML',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Data Analysis'],
    questionCount: 18,
    estimatedDuration: 90,
    difficulty: 'advanced',
    isPopular: true,
    usageCount: 45,
    averageScore: 81,
    questions: [
      {
        id: 'q4',
        type: 'multiple-choice',
        title: 'Neural Networks',
        description: 'Understanding of deep learning concepts',
        content: 'What is the primary purpose of the activation function in neural networks?',
        options: ['Normalize inputs', 'Introduce non-linearity', 'Reduce overfitting', 'Speed up training'],
        correctAnswer: 'Introduce non-linearity',
        points: 10,
        difficulty: 'medium',
        skills: ['Machine Learning'],
        category: 'technical'
      }
    ]
  },
  {
    id: '4',
    name: 'Product Manager Assessment',
    description: 'Product strategy and management evaluation',
    role: 'Product Manager',
    department: 'Product',
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile'],
    questionCount: 10,
    estimatedDuration: 40,
    difficulty: 'intermediate',
    isPopular: false,
    usageCount: 23,
    averageScore: 75,
    questions: [
      {
        id: 'q5',
        type: 'short-answer',
        title: 'Product Prioritization',
        description: 'Evaluate product thinking and prioritization skills',
        content: 'How would you prioritize features for a new mobile app with limited development resources?',
        points: 20,
        timeLimit: 15,
        difficulty: 'medium',
        skills: ['Product Strategy'],
        category: 'problem-solving'
      }
    ]
  }
];

// Question Bank organized by skills
export const questionBank: QuestionBank[] = [
  {
    id: '1',
    category: 'technical',
    skill: 'React',
    questions: [
      {
        id: 'react-1',
        type: 'multiple-choice',
        title: 'Component Lifecycle',
        description: 'Understanding React component lifecycle',
        content: 'When does the useEffect hook run by default?',
        options: ['Before render', 'After every render', 'Only on mount', 'Only on unmount'],
        correctAnswer: 'After every render',
        points: 5,
        difficulty: 'easy',
        skills: ['React'],
        category: 'technical'
      },
      {
        id: 'react-2',
        type: 'coding',
        title: 'Custom Hook',
        description: 'Create a reusable custom hook',
        content: 'Create a custom hook called useCounter that manages a counter state with increment, decrement, and reset functions',
        points: 15,
        timeLimit: 25,
        difficulty: 'medium',
        skills: ['React'],
        category: 'technical'
      }
    ]
  },
  {
    id: '2',
    category: 'technical',
    skill: 'JavaScript',
    questions: [
      {
        id: 'js-1',
        type: 'multiple-choice',
        title: 'Async/Await',
        description: 'Understanding asynchronous JavaScript',
        content: 'What does the await keyword do in JavaScript?',
        options: ['Pauses execution until Promise resolves', 'Creates a new Promise', 'Handles errors', 'Returns undefined'],
        correctAnswer: 'Pauses execution until Promise resolves',
        points: 5,
        difficulty: 'medium',
        skills: ['JavaScript'],
        category: 'technical'
      }
    ]
  },
  {
    id: '3',
    category: 'behavioral',
    skill: 'Leadership',
    questions: [
      {
        id: 'lead-1',
        type: 'short-answer',
        title: 'Team Conflict Resolution',
        description: 'Evaluate leadership and communication skills',
        content: 'Describe a time when you had to resolve a conflict between team members. What was your approach?',
        points: 15,
        timeLimit: 10,
        difficulty: 'medium',
        skills: ['Leadership'],
        category: 'behavioral'
      }
    ]
  }
];

// Sample Custom Assessments
export const customAssessments: Assessment[] = [
  {
    id: 'custom-1',
    title: 'Senior React Developer - Custom',
    description: 'Tailored assessment for senior React position with advanced concepts',
    type: 'custom',
    role: 'Senior Frontend Developer',
    department: 'Engineering',
    skills: ['React', 'TypeScript', 'Performance Optimization', 'Testing'],
    questions: [
      {
        id: 'custom-q1',
        type: 'coding',
        title: 'Performance Optimization',
        description: 'Optimize a React component for better performance',
        content: 'Given a component that renders a large list, optimize it to prevent unnecessary re-renders',
        points: 25,
        timeLimit: 30,
        difficulty: 'hard',
        skills: ['React', 'Performance Optimization'],
        category: 'technical'
      }
    ],
    timeLimit: 90,
    passingScore: 80,
    difficulty: 'advanced',
    estimatedDuration: 90,
    isActive: true,
    createdBy: '1',
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-12'),
    usageCount: 5,
    averageScore: 82,
    completionRate: 85
  }
];

// AI Assessment Generation Templates
export const aiAssessmentPrompts = {
  frontend: {
    skills: ['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Testing'],
    questionTypes: ['multiple-choice', 'coding', 'short-answer'],
    focusAreas: ['Component Design', 'State Management', 'Performance', 'Testing', 'Accessibility']
  },
  backend: {
    skills: ['Node.js', 'Python', 'SQL', 'API Design', 'System Design', 'Security'],
    questionTypes: ['multiple-choice', 'coding', 'short-answer'],
    focusAreas: ['API Development', 'Database Design', 'Security', 'Scalability', 'Testing']
  },
  aiml: {
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'Data Analysis', 'Machine Learning'],
    questionTypes: ['multiple-choice', 'coding', 'short-answer'],
    focusAreas: ['Model Development', 'Data Processing', 'Algorithm Selection', 'Performance Evaluation']
  },
  product: {
    skills: ['Product Strategy', 'Analytics', 'User Research', 'Agile', 'Market Analysis'],
    questionTypes: ['short-answer', 'multiple-choice'],
    focusAreas: ['Strategy', 'User Experience', 'Data Analysis', 'Stakeholder Management', 'Roadmap Planning']
  }
};