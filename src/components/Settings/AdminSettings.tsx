import React, { useState } from 'react';
import { Shield, Users, Database, Bell, Save, CheckCircle } from 'lucide-react';

interface SystemSetting {
  id: string;
  category: 'security' | 'users' | 'system' | 'notifications';
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'boolean' | 'number' | 'select';
  options?: string[];
}

const defaultSettings: SystemSetting[] = [
  {
    id: '1',
    category: 'security',
    name: 'Password Policy',
    description: 'Minimum password requirements',
    value: 'strong',
    type: 'select',
    options: ['basic', 'strong']
  },
  {
    id: '2',
    category: 'security',
    name: 'Two-Factor Authentication',
    description: 'Require 2FA for all users',
    value: true,
    type: 'boolean'
  },
  {
    id: '3',
    category: 'users',
    name: 'Auto-deactivate Users',
    description: 'Automatically deactivate users after inactivity (days)',
    value: 90,
    type: 'number'
  },
  {
    id: '4',
    category: 'users',
    name: 'New User Approval',
    description: 'Require approval for new user accounts',
    value: false,
    type: 'boolean'
  },
  {
    id: '5',
    category: 'system',
    name: 'Data Retention Period',
    description: 'How long to keep candidate data (months)',
    value: 24,
    type: 'number'
  },
  {
    id: '6',
    category: 'system',
    name: 'Default Timezone',
    description: 'System default timezone',
    value: 'IST',
    type: 'select',
    options: ['IST', 'PST', 'EST', 'CST', 'MST', 'UTC']
  },
  {
    id: '7',
    category: 'notifications',
    name: 'Email Notifications',
    description: 'Send email notifications to users',
    value: true,
    type: 'boolean'
  },
  {
    id: '8',
    category: 'notifications',
    name: 'System Alerts',
    description: 'Show system-wide alerts and warnings',
    value: true,
    type: 'boolean'
  }
];

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSettingChange = (settingId: string, newValue: string | boolean | number) => {
    setSettings(prev => prev.map(setting => 
      setting.id === settingId ? { ...setting, value: newValue } : setting
    ));
  };

  const handleSaveAll = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      
      // Reset saved state after 3 seconds
      setTimeout(() => {
        setSaved(false);
      }, 3000);
    }, 1000);
  };

  const getCategoryIcon = (category: SystemSetting['category']) => {
    switch (category) {
      case 'security': return <Shield size={20} className="text-red-600" />;
      case 'users': return <Users size={20} className="text-blue-600" />;
      case 'system': return <Database size={20} className="text-green-600" />;
      case 'notifications': return <Bell size={20} className="text-purple-600" />;
      default: return <Database size={20} className="text-gray-600" />;
    }
  };

  const getCategoryColor = (category: SystemSetting['category']) => {
    switch (category) {
      case 'security': return 'bg-red-50 border-red-200';
      case 'users': return 'bg-blue-50 border-blue-200';
      case 'system': return 'bg-green-50 border-green-200';
      case 'notifications': return 'bg-purple-50 border-purple-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const renderSettingInput = (setting: SystemSetting) => {
    switch (setting.type) {
      case 'boolean':
        return (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={setting.value as boolean}
              onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={setting.value as number}
            onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
            className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        );
      
      case 'select':
        return (
          <select
            value={setting.value as string}
            onChange={(e) => handleSettingChange(setting.id, e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {setting.options?.map(option => (
              <option key={option} value={option} className="capitalize">{option}</option>
            ))}
          </select>
        );
      
      default:
        return null;
    }
  };

  const categories = ['security', 'users', 'system', 'notifications'] as const;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Settings</h1>
          <p className="text-gray-600 mt-2">Configure system-wide settings and policies</p>
        </div>
        
        <button 
          onClick={handleSaveAll}
          disabled={isSaving || saved}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 font-medium"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </>
          ) : saved ? (
            <>
              <CheckCircle size={18} />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save size={18} />
              <span>Save All</span>
            </>
          )}
        </button>
      </div>

      {/* Settings by Category */}
      <div className="space-y-6">
        {categories.map(category => {
          const categorySettings = settings.filter(s => s.category === category);
          
          return (
            <div key={category} className={`border rounded-xl p-6 ${getCategoryColor(category)}`}>
              <div className="flex items-center space-x-3 mb-6">
                {getCategoryIcon(category)}
                <h2 className="text-xl font-semibold text-gray-900 capitalize">{category}</h2>
              </div>
              
              <div className="space-y-4">
                {categorySettings.map(setting => (
                  <div key={setting.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{setting.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      </div>
                      
                      <div className="ml-4">
                        {renderSettingInput(setting)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};