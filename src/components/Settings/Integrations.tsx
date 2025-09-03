import React, { useState } from 'react';
import { Puzzle, Plus, Settings, CheckCircle, XCircle, AlertTriangle, Globe, Key, Database } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: 'ats' | 'communication' | 'analytics' | 'hr-systems' | 'development';
  status: 'connected' | 'disconnected' | 'error' | 'pending';
  provider: string;
  logo: string;
  lastSync?: Date;
  features: string[];
  isPopular?: boolean;
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'Slack',
    description: 'Send notifications and updates to Slack channels',
    category: 'communication',
    status: 'connected',
    provider: 'Slack Technologies',
    logo: '💬',
    lastSync: new Date('2025-01-15T10:30:00'),
    features: ['Notifications', 'Candidate Updates', 'Team Alerts'],
    isPopular: true
  },
  {
    id: '2',
    name: 'GitHub',
    description: 'Sync with GitHub for technical assessments and code reviews',
    category: 'development',
    status: 'connected',
    provider: 'GitHub Inc.',
    logo: '🐙',
    lastSync: new Date('2025-01-15T09:15:00'),
    features: ['Code Assessment', 'Repository Access', 'Commit History'],
    isPopular: true
  },
  {
    id: '3',
    name: 'Google Workspace',
    description: 'Calendar integration and document management',
    category: 'hr-systems',
    status: 'pending',
    provider: 'Google LLC',
    logo: '📧',
    features: ['Calendar Sync', 'Document Storage', 'Email Integration']
  },
  {
    id: '4',
    name: 'Workday',
    description: 'HRIS integration for employee data synchronization',
    category: 'hr-systems',
    status: 'disconnected',
    provider: 'Workday Inc.',
    logo: '🏢',
    features: ['Employee Data', 'Payroll Integration', 'Benefits Management']
  },
  {
    id: '5',
    name: 'Tableau',
    description: 'Advanced analytics and reporting dashboards',
    category: 'analytics',
    status: 'error',
    provider: 'Salesforce',
    logo: '📊',
    lastSync: new Date('2025-01-10T14:20:00'),
    features: ['Custom Dashboards', 'Data Visualization', 'Report Automation']
  }
];

export const Integrations: React.FC = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [categoryFilter, setCategoryFilter] = useState<'all' | Integration['category']>('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const filteredIntegrations = integrations.filter(integration =>
    categoryFilter === 'all' || integration.category === categoryFilter
  );

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Integration['status']) => {
    switch (status) {
      case 'connected': return <CheckCircle size={14} className="text-green-600" />;
      case 'disconnected': return <XCircle size={14} className="text-gray-600" />;
      case 'error': return <AlertTriangle size={14} className="text-red-600" />;
      case 'pending': return <AlertTriangle size={14} className="text-yellow-600" />;
      default: return <XCircle size={14} className="text-gray-600" />;
    }
  };

  const getCategoryIcon = (category: Integration['category']) => {
    switch (category) {
      case 'ats': return <Database size={16} className="text-blue-600" />;
      case 'communication': return <Globe size={16} className="text-green-600" />;
      case 'analytics': return <BarChart3 size={16} className="text-purple-600" />;
      case 'hr-systems': return <Users size={16} className="text-orange-600" />;
      case 'development': return <Key size={16} className="text-red-600" />;
      default: return <Puzzle size={16} className="text-gray-600" />;
    }
  };

  const statusCounts = {
    connected: integrations.filter(i => i.status === 'connected').length,
    disconnected: integrations.filter(i => i.status === 'disconnected').length,
    error: integrations.filter(i => i.status === 'error').length,
    pending: integrations.filter(i => i.status === 'pending').length
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
          <p className="text-gray-600 mt-2">Connect with external tools and services</p>
        </div>
        
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
          <Plus size={16} />
          <span>Add Integration</span>
        </button>
      </div>

      {/* Integration Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="font-medium text-green-900">Connected</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{statusCounts.connected}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <XCircle size={20} className="text-gray-600" />
            <span className="font-medium text-gray-900">Disconnected</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{statusCounts.disconnected}</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-red-600" />
            <span className="font-medium text-red-900">Errors</span>
          </div>
          <p className="text-2xl font-bold text-red-800">{statusCounts.error}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle size={20} className="text-yellow-600" />
            <span className="font-medium text-yellow-900">Pending</span>
          </div>
          <p className="text-2xl font-bold text-yellow-800">{statusCounts.pending}</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="all">All Categories</option>
          <option value="ats">ATS Systems</option>
          <option value="communication">Communication</option>
          <option value="analytics">Analytics</option>
          <option value="hr-systems">HR Systems</option>
          <option value="development">Development Tools</option>
        </select>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl">
                  {integration.logo}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    {integration.isPopular && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{integration.provider}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {getStatusIcon(integration.status)}
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(integration.status)}`}>
                  {integration.status}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>

            <div className="space-y-3">
              {integration.lastSync && (
                <div className="text-xs text-gray-500">
                  Last sync: {integration.lastSync.toLocaleString()}
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">Features</p>
                <div className="flex flex-wrap gap-1">
                  {integration.features.slice(0, 2).map((feature) => (
                    <span key={feature} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                  {integration.features.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{integration.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-3 border-t border-gray-100">
                {integration.status === 'connected' ? (
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded transition-colors">
                    Disconnect
                  </button>
                ) : (
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded transition-colors">
                    Connect
                  </button>
                )}
                <button 
                  onClick={() => setSelectedIntegration(integration)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm px-3 py-2 rounded transition-colors"
                >
                  <Settings size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <Puzzle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No integrations found</p>
          <p className="text-gray-600 mt-1">Try adjusting your category filter</p>
        </div>
      )}
    </div>
  );
};