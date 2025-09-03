import React, { useState } from 'react';
import { Plus, Send, Clock, CheckCircle, XCircle, DollarSign, Calendar, User, FileText, Mail, Phone, Edit, Trash2, Eye, Filter, Search, Download, Award, TrendingUp, AlertTriangle } from 'lucide-react';

interface Offer {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  jobTitle: string;
  department: string;
  salary: number;
  equity: number;
  startDate: Date;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'negotiating';
  sentAt?: Date;
  respondedAt?: Date;
  expiresAt: Date;
  benefits: string[];
  notes?: string;
  signingBonus?: number;
  vacationDays: number;
  workLocation: 'remote' | 'hybrid' | 'onsite';
}

interface OfferTemplate {
  id: string;
  name: string;
  department: string;
  level: 'junior' | 'mid' | 'senior' | 'staff' | 'principal';
  baseSalary: { min: number; max: number };
  equity: { min: number; max: number };
  benefits: string[];
  vacationDays: number;
}

const mockOffers: Offer[] = [
  {
    id: '1',
    candidateId: '1',
    candidateName: 'Alex Johnson',
    candidateEmail: 'alex.johnson@email.com',
    candidatePhone: '+1-555-0123',
    jobTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    salary: 145000,
    equity: 0.15,
    signingBonus: 10000,
    startDate: new Date('2025-02-15'),
    status: 'sent',
    sentAt: new Date('2025-01-14T10:00:00'),
    expiresAt: new Date('2025-01-21T23:59:59'),
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,000 Learning Budget', '401k Match'],
    notes: 'Strong technical skills, great cultural fit. Negotiated salary up from initial range.',
    vacationDays: 25,
    workLocation: 'remote'
  },
  {
    id: '2',
    candidateId: '2',
    candidateName: 'Maria Rodriguez',
    candidateEmail: 'maria.rodriguez@email.com',
    candidatePhone: '+1-555-0124',
    jobTitle: 'AI/ML Engineer',
    department: 'AI/ML',
    salary: 175000,
    equity: 0.25,
    signingBonus: 15000,
    startDate: new Date('2025-03-01'),
    status: 'accepted',
    sentAt: new Date('2025-01-12T14:00:00'),
    respondedAt: new Date('2025-01-13T09:30:00'),
    expiresAt: new Date('2025-01-19T23:59:59'),
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$3,000 Learning Budget', '401k Match', 'Research Budget'],
    notes: 'Exceptional ML background, PhD from Stanford. Quick acceptance.',
    vacationDays: 30,
    workLocation: 'hybrid'
  },
  {
    id: '3',
    candidateId: '3',
    candidateName: 'David Kim',
    candidateEmail: 'david.kim@email.com',
    jobTitle: 'Product Manager',
    department: 'Product',
    salary: 135000,
    equity: 0.12,
    startDate: new Date('2025-02-01'),
    status: 'negotiating',
    sentAt: new Date('2025-01-15T11:00:00'),
    expiresAt: new Date('2025-01-22T23:59:59'),
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,500 Learning Budget', '401k Match'],
    notes: 'Candidate requested higher equity percentage. In negotiation.',
    vacationDays: 25,
    workLocation: 'hybrid'
  },
  {
    id: '4',
    candidateId: '4',
    candidateName: 'Sarah Wilson',
    candidateEmail: 'sarah.wilson@email.com',
    jobTitle: 'DevOps Engineer',
    department: 'Engineering',
    salary: 125000,
    equity: 0.10,
    startDate: new Date('2025-01-30'),
    status: 'draft',
    expiresAt: new Date('2025-01-25T23:59:59'),
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,000 Learning Budget', '401k Match'],
    notes: 'Strong DevOps background. Offer being finalized.',
    vacationDays: 25,
    workLocation: 'remote'
  }
];

const offerTemplates: OfferTemplate[] = [
  {
    id: '1',
    name: 'Senior Engineer',
    department: 'Engineering',
    level: 'senior',
    baseSalary: { min: 140000, max: 180000 },
    equity: { min: 0.10, max: 0.20 },
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,000 Learning Budget', '401k Match'],
    vacationDays: 25
  },
  {
    id: '2',
    name: 'Product Manager',
    department: 'Product',
    level: 'mid',
    baseSalary: { min: 120000, max: 160000 },
    equity: { min: 0.08, max: 0.15 },
    benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,500 Learning Budget', '401k Match'],
    vacationDays: 25
  }
];

export const OfferManagement: React.FC = () => {
  const [offers, setOffers] = useState(mockOffers);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [showCreateOffer, setShowCreateOffer] = useState(false);
  const [showOfferDetails, setShowOfferDetails] = useState<Offer | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | Offer['status']>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [newOfferData, setNewOfferData] = useState({
    candidateName: '',
    candidateEmail: '',
    candidatePhone: '',
    jobTitle: '',
    department: '',
    salary: '',
    equity: '',
    signingBonus: '',
    startDate: '',
    workLocation: 'remote' as Offer['workLocation'],
    vacationDays: 25,
    notes: '',
    benefits: [] as string[]
  });

  const filteredOffers = offers.filter(offer => {
    const statusMatch = statusFilter === 'all' || offer.status === statusFilter;
    const searchMatch = searchTerm === '' ||
                       offer.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       offer.department.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  const getStatusColor = (status: Offer['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'sent': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'negotiating': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'accepted': return 'bg-green-50 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
      case 'expired': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Offer['status']) => {
    switch (status) {
      case 'draft': return <FileText size={16} className="text-gray-600" />;
      case 'sent': return <Send size={16} className="text-blue-600" />;
      case 'negotiating': return <TrendingUp size={16} className="text-purple-600" />;
      case 'accepted': return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected': return <XCircle size={16} className="text-red-600" />;
      case 'expired': return <Clock size={16} className="text-orange-600" />;
      default: return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getDaysUntilExpiry = (expiresAt: Date) => {
    const today = new Date();
    const diffTime = expiresAt.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleCreateOffer = () => {
    if (!newOfferData.candidateName.trim() || !newOfferData.candidateEmail.trim() || !newOfferData.jobTitle.trim() || !newOfferData.salary || !newOfferData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    const newOffer: Offer = {
      id: Date.now().toString(),
      candidateId: Date.now().toString(),
      candidateName: newOfferData.candidateName.trim(),
      candidateEmail: newOfferData.candidateEmail.trim(),
      candidatePhone: newOfferData.candidatePhone?.trim() || undefined,
      jobTitle: newOfferData.jobTitle.trim(),
      department: newOfferData.department || 'Engineering',
      salary: parseInt(newOfferData.salary),
      equity: newOfferData.equity ? parseFloat(newOfferData.equity) : 0,
      signingBonus: newOfferData.signingBonus ? parseInt(newOfferData.signingBonus) : undefined,
      startDate: new Date(newOfferData.startDate),
      status: 'draft',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      benefits: ['Health Insurance', 'Dental & Vision', 'Unlimited PTO', '$2,000 Learning Budget', '401k Match'],
      notes: newOfferData.notes.trim() || undefined,
      vacationDays: newOfferData.vacationDays,
      workLocation: newOfferData.workLocation
    };

    setOffers(prev => [newOffer, ...prev]);
    setShowCreateOffer(false);
    
    // Reset form
    setNewOfferData({
      candidateName: '',
      candidateEmail: '',
      candidatePhone: '',
      jobTitle: '',
      department: '',
      salary: '',
      equity: '',
      signingBonus: '',
      startDate: '',
      workLocation: 'remote',
      vacationDays: 25,
      notes: ''
    });
  };

  const handleSendOffer = (offerId: string) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, status: 'sent', sentAt: new Date() }
        : offer
    ));
  };

  const handleUpdateOfferStatus = (offerId: string, newStatus: Offer['status']) => {
    setOffers(prev => prev.map(offer => 
      offer.id === offerId 
        ? { 
            ...offer, 
            status: newStatus,
            respondedAt: newStatus === 'accepted' || newStatus === 'rejected' ? new Date() : offer.respondedAt
          }
        : offer
    ));
  };

  const handleDeleteOffer = (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(prev => prev.filter(offer => offer.id !== offerId));
    }
  };

  const statusCounts = {
    draft: offers.filter(o => o.status === 'draft').length,
    sent: offers.filter(o => o.status === 'sent').length,
    negotiating: offers.filter(o => o.status === 'negotiating').length,
    accepted: offers.filter(o => o.status === 'accepted').length,
    rejected: offers.filter(o => o.status === 'rejected').length,
    expired: offers.filter(o => o.status === 'expired').length
  };

  const totalOfferValue = offers.reduce((sum, offer) => sum + offer.salary + (offer.signingBonus || 0), 0);
  const acceptanceRate = offers.length > 0 ? Math.round((statusCounts.accepted / offers.length) * 100) : 0;
  const avgTimeToAccept = 3; // Mock data

  const handleExportOffers = () => {
    const csvHeaders = [
      'Candidate Name',
      'Email',
      'Phone',
      'Job Title',
      'Department',
      'Base Salary',
      'Equity %',
      'Signing Bonus',
      'Start Date',
      'Status',
      'Sent Date',
      'Response Date',
      'Expires Date',
      'Work Location',
      'Vacation Days',
      'Benefits',
      'Notes'
    ];

    const csvData = filteredOffers.map(offer => [
      offer.candidateName,
      offer.candidateEmail,
      offer.candidatePhone || '',
      offer.jobTitle,
      offer.department,
      offer.salary.toString(),
      offer.equity.toString(),
      offer.signingBonus?.toString() || '',
      offer.startDate.toLocaleDateString(),
      offer.status,
      offer.sentAt?.toLocaleDateString() || '',
      offer.respondedAt?.toLocaleDateString() || '',
      offer.expiresAt.toLocaleDateString(),
      offer.workLocation,
      offer.vacationDays.toString(),
      offer.benefits.join('; '),
      offer.notes || ''
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `offers-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Offer Management</h1>
          <p className="text-gray-600 mt-1">Create, send, and track job offers</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleExportOffers}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowCreateOffer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>Create Offer</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Offers</p>
              <p className="text-2xl font-semibold text-gray-900">{offers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Acceptance Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{acceptanceRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Value</p>
              <p className="text-2xl font-semibold text-gray-900">${(totalOfferValue / 1000000).toFixed(1)}M</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response</p>
              <p className="text-2xl font-semibold text-gray-900">{avgTimeToAccept} days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Offer Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="flex items-center justify-center mb-2">
                {getStatusIcon(status as Offer['status'])}
              </div>
              <p className="text-2xl font-semibold text-gray-900">{count}</p>
              <p className="text-sm text-gray-600 capitalize">{status.replace('-', ' ')}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search offers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="negotiating">Negotiating</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => {
          const daysUntilExpiry = getDaysUntilExpiry(offer.expiresAt);
          
          return (
            <div key={offer.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{offer.candidateName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(offer.status)}`}>
                      {offer.status}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">{offer.jobTitle}</p>
                  <p className="text-sm text-gray-500">{offer.department}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowOfferDetails(offer)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => setSelectedOffer(offer)}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit Offer"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteOffer(offer.id)}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Offer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
                <div className="flex items-center space-x-2">
                  <DollarSign size={16} className="text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Base Salary</p>
                    <p className="font-semibold text-gray-900">${offer.salary.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Award size={16} className="text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Equity</p>
                    <p className="font-semibold text-gray-900">{offer.equity}%</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar size={16} className="text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold text-gray-900">{offer.startDate.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <User size={16} className="text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Work Style</p>
                    <p className="font-semibold text-gray-900 capitalize">{offer.workLocation}</p>
                  </div>
                </div>
              </div>

              {offer.status === 'sent' && (
                <div className={`mb-4 p-3 rounded-lg border ${
                  daysUntilExpiry <= 2 ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                }`}>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className={daysUntilExpiry <= 2 ? 'text-red-600' : 'text-yellow-600'} />
                    <span className={`text-sm font-medium ${
                      daysUntilExpiry <= 2 ? 'text-red-800' : 'text-yellow-800'
                    }`}>
                      {daysUntilExpiry <= 0 ? 'Expired' : 
                       daysUntilExpiry === 1 ? 'Expires tomorrow' :
                       `Expires in ${daysUntilExpiry} days`}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {offer.benefits.slice(0, 3).map((benefit) => (
                    <span key={benefit} className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs border border-gray-200">
                      {benefit}
                    </span>
                  ))}
                  {offer.benefits.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{offer.benefits.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {offer.status === 'draft' && (
                    <button
                      onClick={() => handleSendOffer(offer.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Send size={16} />
                      <span>Send Offer</span>
                    </button>
                  )}
                  
                  {offer.status === 'sent' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateOfferStatus(offer.id, 'negotiating')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        Mark Negotiating
                      </button>
                      <button
                        onClick={() => handleUpdateOfferStatus(offer.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        Mark Accepted
                      </button>
                    </div>
                  )}

                  {offer.status === 'negotiating' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateOfferStatus(offer.id, 'accepted')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateOfferStatus(offer.id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredOffers.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No offers found</h3>
          <p className="text-gray-600 mb-6">
            {statusFilter === 'all' 
              ? "Create your first job offer to get started" 
              : "No offers match your current filters"}
          </p>
          <button
            onClick={() => setShowCreateOffer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Create First Offer
          </button>
        </div>
      )}

      {/* Create Offer Modal */}
      {showCreateOffer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Create New Offer</h2>
                <button
                  onClick={() => setShowCreateOffer(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Candidate Name *</label>
                  <input
                    type="text"
                    value={newOfferData.candidateName}
                    onChange={(e) => setNewOfferData({ ...newOfferData, candidateName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={newOfferData.candidateEmail}
                    onChange={(e) => setNewOfferData({ ...newOfferData, candidateEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john.doe@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={newOfferData.jobTitle}
                    onChange={(e) => setNewOfferData({ ...newOfferData, jobTitle: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Senior Frontend Developer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={newOfferData.department}
                    onChange={(e) => setNewOfferData({ ...newOfferData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Design">Design</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Base Salary ($) *</label>
                  <input
                    type="number"
                    value={newOfferData.salary}
                    onChange={(e) => setNewOfferData({ ...newOfferData, salary: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Equity (%)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newOfferData.equity}
                    onChange={(e) => setNewOfferData({ ...newOfferData, equity: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.15"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Signing Bonus ($)</label>
                  <input
                    type="number"
                    value={newOfferData.signingBonus}
                    onChange={(e) => setNewOfferData({ ...newOfferData, signingBonus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="10000"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                  <input
                    type="date"
                    value={newOfferData.startDate}
                    onChange={(e) => setNewOfferData({ ...newOfferData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Location</label>
                  <select
                    value={newOfferData.workLocation}
                    onChange={(e) => setNewOfferData({ ...newOfferData, workLocation: e.target.value as Offer['workLocation'] })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="onsite">On-site</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vacation Days</label>
                  <input
                    type="number"
                    value={newOfferData.vacationDays}
                    onChange={(e) => setNewOfferData({ ...newOfferData, vacationDays: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="15"
                    max="50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={newOfferData.notes}
                  onChange={(e) => setNewOfferData({ ...newOfferData, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Internal notes about this offer..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCreateOffer}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors font-medium"
                >
                  Create Offer
                </button>
                <button
                  onClick={() => setShowCreateOffer(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Offer Details Modal */}
      {showOfferDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{showOfferDetails.candidateName}</h2>
                  <p className="text-gray-600">{showOfferDetails.jobTitle}</p>
                </div>
                <button
                  onClick={() => setShowOfferDetails(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XCircle size={20} className="text-gray-600" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Candidate Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User size={16} className="text-gray-600" />
                        <span>{showOfferDetails.candidateName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail size={16} className="text-gray-600" />
                        <span>{showOfferDetails.candidateEmail}</span>
                      </div>
                      {showOfferDetails.candidatePhone && (
                        <div className="flex items-center space-x-2">
                          <Phone size={16} className="text-gray-600" />
                          <span>{showOfferDetails.candidatePhone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Position Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="font-medium">Title:</span> {showOfferDetails.jobTitle}</p>
                      <p><span className="font-medium">Department:</span> {showOfferDetails.department}</p>
                      <p><span className="font-medium">Start Date:</span> {showOfferDetails.startDate.toLocaleDateString()}</p>
                      <p><span className="font-medium">Work Location:</span> {showOfferDetails.workLocation}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Compensation Package</h3>
                    <div className="space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-green-700 font-medium">Base Salary</span>
                          <span className="text-xl font-bold text-green-800">
                            ${showOfferDetails.salary.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-700 font-medium">Equity</span>
                          <span className="text-xl font-bold text-purple-800">
                            {showOfferDetails.equity}%
                          </span>
                        </div>
                      </div>

                      {showOfferDetails.signingBonus && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <span className="text-blue-700 font-medium">Signing Bonus</span>
                            <span className="text-xl font-bold text-blue-800">
                              ${showOfferDetails.signingBonus.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-orange-700 font-medium">Vacation Days</span>
                          <span className="text-xl font-bold text-orange-800">
                            {showOfferDetails.vacationDays}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Benefits Package</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {showOfferDetails.benefits.map((benefit) => (
                    <span key={benefit} className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm border border-blue-200">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {showOfferDetails.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Internal Notes</h3>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-sm text-gray-700">{showOfferDetails.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                {showOfferDetails.status === 'draft' && (
                  <button
                    onClick={() => {
                      handleSendOffer(showOfferDetails.id);
                      setShowOfferDetails(null);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Send size={16} />
                    <span>Send Offer</span>
                  </button>
                )}
                
                <button
                  onClick={() => setShowOfferDetails(null)}
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