import React, { useState } from 'react';
import { 
  Users, Calendar, CheckCircle, Clock, User, Mail, FileText, 
  Award, Building, Phone, MapPin, Send 
} from 'lucide-react';

interface OnboardingEmployee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  startDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  avatar?: string;
  manager: string;
  location: string;
  tasks: OnboardingTask[];
}

interface OnboardingTask {
  id: string;
  title: string;
  description: string;
  category: 'documentation' | 'equipment' | 'access' | 'training' | 'meetings';
  isCompleted: boolean;
  dueDate?: Date;
  assignedTo?: string;
}

const defaultTasks: OnboardingTask[] = [
  { id: 'doc-1', title: 'Complete I-9 Form', description: 'Employment eligibility verification', category: 'documentation', isCompleted: false, dueDate: new Date('2025-01-20') },
  { id: 'doc-2', title: 'Sign Employment Contract', description: 'Review and sign employment agreement', category: 'documentation', isCompleted: false, dueDate: new Date('2025-01-18') },
  { id: 'doc-3', title: 'Complete Tax Forms (W-4)', description: 'Federal and state tax withholding forms', category: 'documentation', isCompleted: false, dueDate: new Date('2025-01-20') },
  { id: 'eq-1', title: 'Laptop Setup', description: 'Configure development environment and tools', category: 'equipment', isCompleted: false, assignedTo: 'IT Team' },
  { id: 'eq-2', title: 'Office Access Card', description: 'Receive and activate building access card', category: 'equipment', isCompleted: false, assignedTo: 'Security' },
  { id: 'acc-1', title: 'Email Account Setup', description: 'Corporate email and calendar access', category: 'access', isCompleted: false, assignedTo: 'IT Team' },
  { id: 'acc-2', title: 'System Access Permissions', description: 'Access to required systems and databases', category: 'access', isCompleted: false, assignedTo: 'IT Team' },
  { id: 'tr-1', title: 'Security Training', description: 'Complete mandatory security awareness training', category: 'training', isCompleted: false, dueDate: new Date('2025-01-25') },
  { id: 'tr-2', title: 'Company Orientation', description: 'Attend new employee orientation session', category: 'training', isCompleted: false, dueDate: new Date('2025-01-22') },
  { id: 'meet-1', title: 'Meet with Direct Manager', description: 'Initial one-on-one with direct supervisor', category: 'meetings', isCompleted: false, dueDate: new Date('2025-01-17') },
  { id: 'meet-2', title: 'Team Introduction Meeting', description: 'Meet the team and understand project structure', category: 'meetings', isCompleted: false, dueDate: new Date('2025-01-19') }
];

const mockOnboardingEmployees: OnboardingEmployee[] = [
  {
    id: '1',
    name: 'Emily Chen',
    email: 'emily.chen@company.com',
    department: 'Engineering',
    role: 'Senior Frontend Developer',
    startDate: new Date('2025-01-16'),
    status: 'in-progress',
    progress: 45,
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg',
    manager: 'Michael Rodriguez',
    location: 'San Francisco, CA',
    tasks: defaultTasks.map(task => ({ ...task, isCompleted: Math.random() > 0.6 }))
  },
  {
    id: '2',
    name: 'James Wilson',
    email: 'james.wilson@company.com',
    department: 'Product',
    role: 'Product Manager',
    startDate: new Date('2025-01-20'),
    status: 'pending',
    progress: 0,
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    manager: 'Emily Johnson',
    location: 'Remote',
    tasks: defaultTasks.map(task => ({ ...task, isCompleted: false }))
  },
  {
    id: '3',
    name: 'Anna Martinez',
    email: 'anna.martinez@company.com',
    department: 'Design',
    role: 'UX Designer',
    startDate: new Date('2025-01-22'),
    status: 'pending',
    progress: 0,
    avatar: 'https://images.pexels.com/photos/1484794/pexels-photo-1484794.jpeg',
    manager: 'David Kim',
    location: 'New York, NY',
    tasks: defaultTasks.map(task => ({ ...task, isCompleted: false }))
  },
  {
    id: '4',
    name: 'Robert Kim',
    email: 'robert.kim@company.com',
    department: 'Engineering',
    role: 'DevOps Engineer',
    startDate: new Date('2025-01-10'),
    status: 'completed',
    progress: 100,
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg',
    manager: 'Alex Thompson',
    location: 'Remote',
    tasks: defaultTasks.map(task => ({ ...task, isCompleted: true }))
  }
];

export const Onboarding: React.FC = () => {
  const [employees, setEmployees] = useState(() => {
    // Load from localStorage or use mock data
    const saved = localStorage.getItem('onboardingEmployees');
    if (saved) {
      try {
        const parsedEmployees = JSON.parse(saved);
        return parsedEmployees.map((emp: any) => ({
          ...emp,
          startDate: new Date(emp.startDate),
          tasks: emp.tasks.map((task: any) => ({
            ...task,
            dueDate: task.dueDate ? new Date(task.dueDate) : undefined
          }))
        }));
      } catch (error) {
        console.error('Error loading onboarding employees:', error);
      }
    }
    return mockOnboardingEmployees;
  });
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<string | null>(null);

  const selectedEmployee = employees.find(e => e.id === selectedEmployeeId) || null;

  // Save employees to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem('onboardingEmployees', JSON.stringify(employees));
  }, [employees]);

  const handleTaskToggle = (employeeId: string, taskId: string) => {
    console.log('Toggling task:', taskId, 'for employee:', employeeId);
    setEmployees(prev =>
      prev.map(employee => {
        if (employee.id === employeeId) {
          const updatedTasks = employee.tasks.map(task =>
            task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
          );
          const completedTasks = updatedTasks.filter(task => task.isCompleted).length;
          const progress = Math.round((completedTasks / updatedTasks.length) * 100);

          let status: OnboardingEmployee['status'] = 'pending';
          if (progress > 0 && progress < 100) status = 'in-progress';
          if (progress === 100) status = 'completed';

          console.log('Updated progress:', progress, 'status:', status);
          return { ...employee, tasks: updatedTasks, progress, status };
        }
        return employee;
      })
    );
  };

  const getCategoryIcon = (category: OnboardingTask['category']) => {
    switch (category) {
      case 'documentation': return <FileText size={16} className="text-blue-600" />;
      case 'equipment': return <Building size={16} className="text-green-600" />;
      case 'access': return <User size={16} className="text-purple-600" />;
      case 'training': return <Award size={16} className="text-orange-600" />;
      case 'meetings': return <Calendar size={16} className="text-red-600" />;
      default: return <CheckCircle size={16} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category: OnboardingTask['category']) => {
    switch (category) {
      case 'documentation': return 'bg-blue-50 border-blue-200';
      case 'equipment': return 'bg-green-50 border-green-200';
      case 'access': return 'bg-purple-50 border-purple-200';
      case 'training': return 'bg-orange-50 border-orange-200';
      case 'meetings': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: OnboardingEmployee['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendWelcomeEmail = async (employee: OnboardingEmployee) => {
    // Only allow sending email if 100% complete
    if (employee.progress < 100) {
      alert('Email can only be sent when onboarding is 100% complete!');
      return;
    }

    setIsSendingEmail(employee.id);
    
    setTimeout(() => {
      // Create welcome email message for inbox
      const welcomeEmail = {
        id: `welcome-${employee.id}-${Date.now()}`,
        sender: 'You',
        subject: `Welcome to QuantumCore Technologies - ${employee.name}`,
        preview: `Welcome email sent to ${employee.name} for completing onboarding...`,
        content: `Dear ${employee.name},

Congratulations on completing your onboarding process! We're thrilled to have you join our team as a ${employee.role} in the ${employee.department} department.

Your onboarding journey is now complete, and you're all set to begin making an impact at QuantumCore Technologies. Your manager, ${employee.manager}, will be reaching out soon to discuss your first projects and goals.

Welcome to the team!

Best regards,
HR Team
QuantumCore Technologies`,
        type: 'system' as const,
        priority: 'medium' as const,
        isRead: true,
        timestamp: new Date(),
        recipient: employee.email
      };

      // Save to localStorage for sent messages
      const existingSentMessages = JSON.parse(localStorage.getItem('sentMessages') || '[]');
      const updatedSentMessages = [welcomeEmail, ...existingSentMessages];
      localStorage.setItem('sentMessages', JSON.stringify(updatedSentMessages));
      
      // Trigger storage event for inbox to update
      window.dispatchEvent(new Event('storage'));

      setIsSendingEmail(null);
      setEmailSent(employee.id);
      
      setTimeout(() => {
        setEmailSent(null);
      }, 3000);
    }, 2000);
  };

  const statusCounts = {
    pending: employees.filter(e => e.status === 'pending').length,
    'in-progress': employees.filter(e => e.status === 'in-progress').length,
    completed: employees.filter(e => e.status === 'completed').length
  };

  const totalEmployees = employees.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Onboarding</h1>
          <p className="text-gray-600 mt-2">Track new employee onboarding progress and tasks</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users size={20} className="text-blue-600" />
            <span className="font-medium text-blue-900">Total</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{totalEmployees}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Clock size={20} className="text-yellow-600" />
            <span className="font-medium text-yellow-900">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{statusCounts.pending}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar size={20} className="text-purple-600" />
            <span className="font-medium text-purple-900">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{statusCounts['in-progress']}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-medium text-green-900">Completed</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{statusCounts.completed}</p>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map(employee => (
          <div key={employee.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                  {employee.avatar ? (
                    <img src={employee.avatar} alt={employee.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={24} className="text-gray-600 mt-3 ml-3" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                  <p className="text-sm text-gray-600">{employee.role}</p>
                  <p className="text-xs text-gray-500">{employee.department}</p>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(employee.status)}`}>
                {employee.status.replace('-', ' ')}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium text-gray-900">{employee.startDate.toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Manager:</span>
                <span className="font-medium text-gray-900">{employee.manager}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium text-gray-900">{employee.location}</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{employee.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${employee.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    setSelectedEmployeeId(employee.id);
                    setShowProgressModal(true);
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Update Progress
                </button>
                
                <button
                  onClick={() => handleSendWelcomeEmail(employee)}
                  disabled={isSendingEmail === employee.id || employee.progress < 100}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    employee.progress < 100 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white'
                  }`}
                  title={employee.progress < 100 ? 'Complete all tasks first' : 'Send Welcome Email'}
                >
                  {isSendingEmail === employee.id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : emailSent === employee.id ? (
                    <CheckCircle size={16} />
                  ) : (
                    <div className="flex items-center space-x-1">
                      <Send size={14} />
                      <span className="text-xs font-medium">SEND WELCOME EMAIL</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Modal */}
      {showProgressModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Onboarding Progress</h2>
                  <p className="text-gray-600">{selectedEmployee.name} • {selectedEmployee.role}</p>
                </div>
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <User size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">Employee Info</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-blue-800"><span className="font-medium">Email:</span> {selectedEmployee.email}</p>
                    <p className="text-blue-800"><span className="font-medium">Manager:</span> {selectedEmployee.manager}</p>
                    <p className="text-blue-800"><span className="font-medium">Location:</span> {selectedEmployee.location}</p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="font-medium text-green-900">Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-green-800">{selectedEmployee.progress}%</p>
                  <p className="text-sm text-green-600">
                    {selectedEmployee.tasks.filter(t => t.isCompleted).length} of {selectedEmployee.tasks.length} completed
                  </p>
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar size={16} className="text-purple-600" />
                    <span className="font-medium text-purple-900">Start Date</span>
                  </div>
                  <p className="text-lg font-bold text-purple-800">
                    {selectedEmployee.startDate.toLocaleDateString()}
                  </p>
                  <p className="text-sm text-purple-600">
                    {Math.ceil((selectedEmployee.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                  </p>
                </div>
              </div>

              <div className="mb-6 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-700">Overall Progress</span>
                  <span className="text-lg font-bold text-blue-600">{selectedEmployee.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${selectedEmployee.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Task Categories */}
              {['documentation', 'equipment', 'access', 'training', 'meetings'].map(category => {
                const tasks = selectedEmployee.tasks.filter(t => t.category === category);
                if (!tasks.length) return null;
                
                return (
                  <div key={category} className={`border rounded-lg p-4 ${getCategoryColor(category as OnboardingTask['category'])}`}>
                    <div className="flex items-center space-x-2 mb-4">
                      {getCategoryIcon(category as OnboardingTask['category'])}
                      <h4 className="font-semibold text-gray-900 capitalize">{category}</h4>
                      <span className="text-xs bg-white px-2 py-1 rounded text-gray-600">
                        {tasks.filter(t => t.isCompleted).length}/{tasks.length}
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      {tasks.map(task => (
                        <label
                          key={task.id}
                          className="flex items-start space-x-3 p-3 bg-white rounded border cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={task.isCompleted}
                            onChange={() => handleTaskToggle(selectedEmployee.id, task.id)}
                            className="w-5 h-5 rounded border-2 cursor-pointer accent-green-600 mt-0.5"
                          />
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-medium ${
                                task.isCompleted ? 'text-green-700 line-through' : 'text-gray-900'
                              }`}
                            >
                              {task.title}
                            </p>
                            <p
                              className={`text-xs ${
                                task.isCompleted ? 'text-green-600' : 'text-gray-600'
                              }`}
                            >
                              {task.description}
                            </p>
                            {task.dueDate && (
                              <p className="text-xs text-gray-500 mt-1">
                                Due: {task.dueDate.toLocaleDateString()}
                              </p>
                            )}
                            {task.assignedTo && (
                              <p className="text-xs text-gray-500">
                                Assigned to: {task.assignedTo}
                              </p>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
                >
                  Save Progress
                </button>
                <button
                  onClick={() => setShowProgressModal(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};