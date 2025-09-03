import React, { useState } from 'react';
import { Scale, Shield, FileText, AlertTriangle, CheckCircle, Clock, Users, BarChart3, Search, Filter, Eye, Settings, Plus, Download, Calendar, Award, Target } from 'lucide-react';

interface ComplianceItem {
  id: string;
  title: string;
  description: string;
  category: 'legal' | 'security' | 'hr' | 'financial' | 'data-protection';
  status: 'compliant' | 'non-compliant' | 'pending-review' | 'action-required';
  lastReviewed: Date;
  nextReview: Date;
  owner: string;
  ownerAvatar?: string;
  documents: string[];
  riskLevel: 'low' | 'medium' | 'high';
  completionPercentage: number;
  priority: 'low' | 'medium' | 'high';
}

interface ComplianceFramework {
  id: string;
  name: string;
  description: string;
  items: number;
  compliance: number;
  lastAudit: Date;
  nextAudit: Date;
  auditor: string;
}

const mockComplianceItems: ComplianceItem[] = [
  {
    id: '1',
    title: 'GDPR Data Protection',
    description: 'General Data Protection Regulation compliance for EU data handling',
    category: 'data-protection',
    status: 'compliant',
    lastReviewed: new Date('2024-12-15'),
    nextReview: new Date('2025-06-15'),
    owner: 'Alex Thompson',
    ownerAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    documents: ['GDPR_Policy.pdf', 'Data_Processing_Agreement.pdf', 'Privacy_Notice.pdf'],
    riskLevel: 'high',
    completionPercentage: 100,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Equal Employment Opportunity',
    description: 'EEO compliance in hiring and employment practices',
    category: 'hr',
    status: 'compliant',
    lastReviewed: new Date('2025-01-01'),
    nextReview: new Date('2025-07-01'),
    owner: 'Sarah Chen',
    ownerAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    documents: ['EEO_Policy.pdf', 'Hiring_Guidelines.pdf', 'Training_Records.pdf'],
    riskLevel: 'medium',
    completionPercentage: 95,
    priority: 'medium'
  },
  {
    id: '3',
    title: 'SOC 2 Type II',
    description: 'Security and availability controls audit',
    category: 'security',
    status: 'pending-review',
    lastReviewed: new Date('2024-11-30'),
    nextReview: new Date('2025-02-28'),
    owner: 'Alex Thompson',
    ownerAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    documents: ['SOC2_Report.pdf', 'Security_Controls.pdf'],
    riskLevel: 'high',
    completionPercentage: 85,
    priority: 'high'
  },
  {
    id: '4',
    title: 'Wage and Hour Compliance',
    description: 'Fair Labor Standards Act compliance',
    category: 'legal',
    status: 'action-required',
    lastReviewed: new Date('2024-10-15'),
    nextReview: new Date('2025-01-15'),
    owner: 'Legal Team',
    documents: ['Wage_Policy.pdf', 'Overtime_Guidelines.pdf'],
    riskLevel: 'medium',
    completionPercentage: 70,
    priority: 'high'
  },
  {
    id: '5',
    title: 'ISO 27001 Information Security',
    description: 'Information security management system certification',
    category: 'security',
    status: 'compliant',
    lastReviewed: new Date('2024-09-20'),
    nextReview: new Date('2025-09-20'),
    owner: 'Alex Thompson',
    ownerAvatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
    documents: ['ISO27001_Certificate.pdf', 'ISMS_Manual.pdf', 'Risk_Assessment.pdf'],
    riskLevel: 'low',
    completionPercentage: 98,
    priority: 'medium'
  },
  {
    id: '6',
    title: 'Financial Reporting Standards',
    description: 'GAAP compliance for financial reporting',
    category: 'financial',
    status: 'compliant',
    lastReviewed: new Date('2024-12-31'),
    nextReview: new Date('2025-03-31'),
    owner: 'Finance Team',
    documents: ['Financial_Statements.pdf', 'Audit_Report.pdf'],
    riskLevel: 'low',
    completionPercentage: 92,
    priority: 'medium'
  }
];

const complianceFrameworks: ComplianceFramework[] = [
  {
    id: '1',
    name: 'SOC 2 Type II',
    description: 'Security, availability, and confidentiality controls',
    items: 8,
    compliance: 92,
    lastAudit: new Date('2024-11-15'),
    nextAudit: new Date('2025-11-15'),
    auditor: 'PwC'
  },
  {
    id: '2',
    name: 'GDPR',
    description: 'European data protection regulation',
    items: 12,
    compliance: 98,
    lastAudit: new Date('2024-12-01'),
    nextAudit: new Date('2025-12-01'),
    auditor: 'Internal Audit'
  },
  {
    id: '3',
    name: 'ISO 27001',
    description: 'Information security management',
    items: 15,
    compliance: 95,
    lastAudit: new Date('2024-09-20'),
    nextAudit: new Date('2025-09-20'),
    auditor: 'KPMG'
  }
];

export const Compliance: React.FC = () => {
  const [complianceItems, setComplianceItems] = useState(mockComplianceItems);
  const [categoryFilter, setCategoryFilter] = useState<'all' | ComplianceItem['category']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | ComplianceItem['status']>('all');
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeView, setActiveView] = useState<'overview' | 'frameworks'>('overview');

  const filteredItems = complianceItems.filter(item => {
    const categoryMatch = categoryFilter === 'all' || item.category === categoryFilter;
    const statusMatch = statusFilter === 'all' || item.status === statusFilter;
    const searchMatch = searchTerm === '' ||
                       item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       item.owner.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && statusMatch && searchMatch;
  });

  const getStatusColor = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant': return 'bg-green-50 text-green-700 border-green-200';
      case 'non-compliant': return 'bg-red-50 text-red-700 border-red-200';
      case 'pending-review': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'action-required': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'compliant': return <CheckCircle size={16} className="text-green-600" />;
      case 'non-compliant': return <AlertTriangle size={16} className="text-red-600" />;
      case 'pending-review': return <Clock size={16} className="text-yellow-600" />;
      case 'action-required': return <AlertTriangle size={16} className="text-orange-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getRiskColor = (risk: ComplianceItem['riskLevel']) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: ComplianceItem['category']) => {
    switch (category) {
      case 'legal': return <Scale size={20} className="text-purple-600" />;
      case 'security': return <Shield size={20} className="text-red-600" />;
      case 'hr': return <Users size={20} className="text-blue-600" />;
      case 'financial': return <BarChart3 size={20} className="text-green-600" />;
      case 'data-protection': return <FileText size={20} className="text-orange-600" />;
      default: return <FileText size={20} className="text-gray-600" />;
    }
  };

  const statusCounts = {
    compliant: complianceItems.filter(i => i.status === 'compliant').length,
    'non-compliant': complianceItems.filter(i => i.status === 'non-compliant').length,
    'pending-review': complianceItems.filter(i => i.status === 'pending-review').length,
    'action-required': complianceItems.filter(i => i.status === 'action-required').length
  };

  const overallCompliance = Math.round(
    (complianceItems.reduce((sum, item) => sum + item.completionPercentage, 0) / complianceItems.length)
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Compliance Management</h1>
            <p className="text-gray-600 mt-2">Monitor regulatory compliance and risk management</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl">
              <Download size={18} />
              <span>Export Report</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl">
              <Plus size={18} />
              <span>Add Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overall Compliance Score */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Overall Compliance Score</h2>
            <p className="text-gray-600">Aggregate compliance across all frameworks and requirements</p>
          </div>
          
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-2">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray={`${overallCompliance}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-gray-900">{overallCompliance}%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600">Compliance Rate</p>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts.compliant}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts['non-compliant']}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts['pending-review']}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Target size={24} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Action Required</p>
              <p className="text-2xl font-bold text-gray-900">{statusCounts['action-required']}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 mb-8 inline-flex">
        <button
          onClick={() => setActiveView('overview')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeView === 'overview'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Scale size={18} />
          <span>Compliance Items</span>
        </button>
        <button
          onClick={() => setActiveView('frameworks')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeView === 'frameworks'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <Award size={18} />
          <span>Frameworks</span>
        </button>
      </div>

      {activeView === 'overview' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search compliance items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="legal">Legal</option>
                <option value="security">Security</option>
                <option value="hr">HR</option>
                <option value="financial">Financial</option>
                <option value="data-protection">Data Protection</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="compliant">Compliant</option>
                <option value="non-compliant">Non-Compliant</option>
                <option value="pending-review">Pending Review</option>
                <option value="action-required">Action Required</option>
              </select>

              <button className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter size={18} />
                <span>Advanced</span>
              </button>
            </div>
          </div>

          {/* Compliance Items */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group">
                <div className="p-6">
                  {/* Item Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(item.riskLevel)}`}>
                        {item.riskLevel} risk
                      </span>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                        <Settings size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Status and Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(item.status)}
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(item.status)}`}>
                          {item.status.replace('-', ' ')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{item.completionPercentage}%</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          item.completionPercentage >= 95 ? 'bg-green-500' :
                          item.completionPercentage >= 80 ? 'bg-blue-500' :
                          item.completionPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Owner and Dates */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-600">Owner:</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden">
                          {item.ownerAvatar ? (
                            <img src={item.ownerAvatar} alt={item.owner} className="w-full h-full object-cover" />
                          ) : (
                            <User size={12} className="text-gray-600 mt-1.5 ml-1.5" />
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{item.owner}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-600">Next Review:</p>
                      <p className="font-medium text-gray-900 mt-1">{item.nextReview.toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Documents */}
                  <div className="mb-4">
                    <p className="text-xs font-medium text-gray-700 mb-2">Documents ({item.documents.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {item.documents.slice(0, 2).map((doc) => (
                        <span key={doc} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs border border-blue-200">
                          {doc}
                        </span>
                      ))}
                      {item.documents.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          +{item.documents.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                    >
                      <Eye size={16} />
                      <span>View Details</span>
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors">
                      <CheckCircle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'frameworks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {complianceFrameworks.map((framework) => (
            <div key={framework.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Award size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{framework.name}</h3>
                    <p className="text-sm text-gray-600">{framework.items} requirements</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{framework.description}</p>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Compliance</span>
                    <span className="text-lg font-bold text-gray-900">{framework.compliance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${framework.compliance}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Last Audit:</span>
                    <span className="font-medium text-gray-900">{framework.lastAudit.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Next Audit:</span>
                    <span className="font-medium text-gray-900">{framework.nextAudit.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Auditor:</span>
                    <span className="font-medium text-gray-900">{framework.auditor}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium">
                  <Eye size={16} />
                  <span>View Framework</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredItems.length === 0 && activeView === 'overview' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <Scale size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No compliance items found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || categoryFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your search criteria or filters'
              : 'Add your first compliance item to get started'}
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium">
            Add Compliance Item
          </button>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedItem.description}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-600 text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`rounded-xl p-4 border ${getStatusColor(selectedItem.status)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    {getStatusIcon(selectedItem.status)}
                    <span className="font-medium">Current Status</span>
                  </div>
                  <p className="text-lg font-bold capitalize">{selectedItem.status.replace('-', ' ')}</p>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">Completion</span>
                  </div>
                  <p className="text-lg font-bold text-blue-800">{selectedItem.completionPercentage}%</p>
                </div>

                <div className={`rounded-xl p-4 border ${getRiskColor(selectedItem.riskLevel).replace('bg-', 'bg-').replace('text-', 'text-').replace('100', '50').replace('800', '700')} border-opacity-50`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle size={16} />
                    <span className="font-medium">Risk Level</span>
                  </div>
                  <p className="text-lg font-bold capitalize">{selectedItem.riskLevel}</p>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Timeline</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Last Reviewed</p>
                    <p className="text-lg font-bold text-gray-900">{selectedItem.lastReviewed.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Review</p>
                    <p className="text-lg font-bold text-gray-900">{selectedItem.nextReview.toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedItem.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <FileText size={16} className="text-blue-600" />
                      <span className="text-sm text-gray-900">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-colors font-medium">
                  Update Status
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                  View Documents
                </button>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl transition-colors font-medium"
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