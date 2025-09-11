import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Inbox as InboxIcon, 
  Calendar,
  Briefcase,
  Users,
  FileText,
  UserPlus,
  Globe,
  Building,
  FolderKanban,
  UserCheck,
  BarChart3,
  Settings,
  HelpCircle,
  Zap,
  HandHeart,
  GraduationCap,
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  activeItem: NavItem;
  onItemChange: (item: NavItem) => void;
}

const mainItems = [
  { id: 'dashboard' as NavItem, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'inbox' as NavItem, label: 'Inbox', icon: InboxIcon },
  { id: 'calendar' as NavItem, label: 'Calendar & Tasks', icon: Calendar }
];

const recruitmentItems = [
  { id: 'open-hiring' as NavItem, label: 'Jobs', icon: Briefcase },
  { id: 'candidates' as NavItem, label: 'Candidates', icon: Users },
  { id: 'assessments' as NavItem, label: 'Assessments', icon: FileText },
  { id: 'referrals' as NavItem, label: 'Referrals', icon: UserPlus },
  { id: 'career-site' as NavItem, label: 'Career Site', icon: Globe },
  { id: 'offer-management' as NavItem, label: 'Offer Management', icon: HandHeart }
];

const talentPoolItems = [
  { id: 'talent-pool' as NavItem, label: 'Employees', icon: Building },
  { id: 'projects' as NavItem, label: 'Projects', icon: FolderKanban },
  { id: 'assignments' as NavItem, label: 'Assignments', icon: UserCheck },
  { id: 'onboarding' as NavItem, label: 'Onboarding', icon: GraduationCap },
];

const organizationItems = [
];

const settingsItems = [
  { id: 'account-settings' as NavItem, label: 'Account Settings', icon: User },
  { id: 'admin-settings' as NavItem, label: 'Admin Settings', icon: Settings }
];

const Sidebar: React.FC<SidebarProps> = ({ activeItem, onItemChange }) => {
  const [showHelp, setShowHelp] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderNavSection = (items: any[], title: string) => (
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <li key={item.id}>
              <button
                onClick={() => onItemChange(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm ${
                  isActive 
                    ? 'bg-gray-800 text-white border-l-4 border-blue-400 shadow-lg shadow-blue-400/30 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-r before:from-blue-400 before:to-transparent before:blur-sm' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );

  return (
    <aside className="w-64 bg-black text-white flex flex-col min-h-screen shadow-xl">
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <Users size={16} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">TalentAI</h2>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        {renderNavSection(mainItems, 'MAIN')}
        {renderNavSection(recruitmentItems, 'RECRUITMENT')}
        {renderNavSection(talentPoolItems, 'TALENT POOL')}
        {renderNavSection(settingsItems, 'SETTINGS')}
      </nav>
      
      <div className="p-4 border-t border-gray-800 space-y-2">
        <button 
          onClick={handleSignOut}
          className="w-full text-left text-sm text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-gray-800 flex items-center space-x-2"
        >
          <span>🚪</span>
          <span>Sign Out</span>
        </button>
        <button 
          onClick={() => setShowHelp(true)}
          className="w-full text-left text-xs text-gray-400 hover:text-white transition-colors"
        >
          Need Help?
        </button>
        <p className="text-xs text-gray-500">© 2025 TalentAI Inc.</p>
      </div>
      
      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Need Help?</h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 text-xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HelpCircle size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Welcome to TalentAI</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Your comprehensive talent management platform for hiring, managing employees, and optimizing team performance.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Getting Started</h4>
                  <div className="space-y-1 text-sm text-blue-800">
                    <p>• Start with the Dashboard for an overview</p>
                    <p>• Create job postings in the Jobs section</p>
                    <p>• Review candidates and track their progress</p>
                    <p>• Use AI to generate assessments automatically</p>
                  </div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-medium text-green-900 mb-2">Need Support?</h4>
                  <p className="text-sm text-green-800">
                    Contact our support team at <strong>support@talentai.com</strong> for assistance.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowHelp(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;