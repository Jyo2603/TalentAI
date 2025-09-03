import React, { useState } from 'react';
import { TrendingUp, Users, Clock, Award, DollarSign, Target, BarChart3, Download, Calendar, Filter, Eye, RefreshCw, FileText, PieChart, Activity } from 'lucide-react';

interface ReportMetric {
  id: string;
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ComponentType<any>;
  color: string;
}

interface ReportCard {
  id: string;
  title: string;
  description: string;
  category: 'hiring' | 'performance' | 'financial' | 'operational';
  lastUpdated: Date;
  icon: React.ComponentType<any>;
  metrics: { label: string; value: string }[];
}

const keyMetrics: ReportMetric[] = [
  {
    id: '1',
    title: 'Time to Hire',
    value: '18 days',
    change: '-2 days vs last month',
    trend: 'up',
    icon: Clock,
    color: 'bg-blue-50 text-blue-600 border-blue-200'
  },
  {
    id: '2',
    title: 'Cost per Hire',
    value: '$4,200',
    change: '-$300 vs last month',
    trend: 'up',
    icon: DollarSign,
    color: 'bg-green-50 text-green-600 border-green-200'
  },
  {
    id: '3',
    title: 'Offer Acceptance',
    value: '87%',
    change: '+5% vs last month',
    trend: 'up',
    icon: Award,
    color: 'bg-purple-50 text-purple-600 border-purple-200'
  },
  {
    id: '4',
    title: 'Employee Retention',
    value: '94%',
    change: '+2% vs last quarter',
    trend: 'up',
    icon: Users,
    color: 'bg-orange-50 text-orange-600 border-orange-200'
  },
  {
    id: '5',
    title: 'Active Positions',
    value: 12,
    change: '+3 new this week',
    trend: 'up',
    icon: Target,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
  },
  {
    id: '6',
    title: 'Candidate Pipeline',
    value: 84,
    change: '+12 this week',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-pink-50 text-pink-600 border-pink-200'
  }
];

const reportCards: ReportCard[] = [
  {
    id: '1',
    title: 'Hiring Pipeline Analysis',
    description: 'Comprehensive analysis of recruitment funnel and conversion rates',
    category: 'hiring',
    lastUpdated: new Date('2025-01-15T10:30:00'),
    icon: TrendingUp,
    metrics: [
      { label: 'Applications', value: '284' },
      { label: 'Interviews', value: '67' },
      { label: 'Offers', value: '23' },
      { label: 'Hires', value: '18' }
    ]
  },
  {
    id: '2',
    title: 'Team Performance Dashboard',
    description: 'Employee productivity, satisfaction, and goal achievement metrics',
    category: 'performance',
    lastUpdated: new Date('2025-01-15T09:15:00'),
    icon: Award,
    metrics: [
      { label: 'Avg Performance', value: '4.2/5' },
      { label: 'Goal Achievement', value: '89%' },
      { label: 'Satisfaction', value: '4.6/5' },
      { label: 'Retention', value: '94%' }
    ]
  },
  {
    id: '3',
    title: 'Financial Impact Report',
    description: 'Cost analysis, budget utilization, and ROI on talent investments',
    category: 'financial',
    lastUpdated: new Date('2025-01-15T08:45:00'),
    icon: DollarSign,
    metrics: [
      { label: 'Total Spend', value: '$2.4M' },
      { label: 'Cost per Hire', value: '$4,200' },
      { label: 'ROI', value: '340%' },
      { label: 'Budget Used', value: '78%' }
    ]
  },
  {
    id: '4',
    title: 'Operational Efficiency',
    description: 'Process efficiency, automation impact, and workflow optimization',
    category: 'operational',
    lastUpdated: new Date('2025-01-15T07:20:00'),
    icon: BarChart3,
    metrics: [
      { label: 'Process Efficiency', value: '92%' },
      { label: 'Automation Rate', value: '67%' },
      { label: 'Response Time', value: '2.3h' },
      { label: 'SLA Compliance', value: '96%' }
    ]
  },
  {
    id: '5',
    title: 'Diversity & Inclusion',
    description: 'Diversity metrics, inclusion scores, and equity analysis',
    category: 'hiring',
    lastUpdated: new Date('2025-01-14T16:30:00'),
    icon: Users,
    metrics: [
      { label: 'Gender Diversity', value: '48%' },
      { label: 'Ethnic Diversity', value: '52%' },
      { label: 'Inclusion Score', value: '4.4/5' },
      { label: 'Pay Equity', value: '98%' }
    ]
  },
  {
    id: '6',
    title: 'Skills Gap Analysis',
    description: 'Current skill inventory vs future needs and training requirements',
    category: 'performance',
    lastUpdated: new Date('2025-01-14T14:15:00'),
    icon: Target,
    metrics: [
      { label: 'Critical Gaps', value: '7' },
      { label: 'Training Hours', value: '1,240' },
      { label: 'Skill Coverage', value: '83%' },
      { label: 'Readiness Score', value: '76%' }
    ]
  }
];

export const Reports: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ReportCard['category']>('all');
  const [selectedReport, setSelectedReport] = useState<ReportCard | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  const filteredReports = reportCards.filter(report => 
    selectedCategory === 'all' || report.category === selectedCategory
  );

  const getCategoryColor = (category: ReportCard['category']) => {
    switch (category) {
      case 'hiring': return 'bg-blue-100 text-blue-800';
      case 'performance': return 'bg-green-100 text-green-800';
      case 'financial': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: ReportMetric['trend']) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="text-green-600" />;
      case 'down': return <TrendingUp size={16} className="text-red-600 rotate-180" />;
      default: return <Activity size={16} className="text-gray-600" />;
    }
  };

  const handleExportReport = (reportId: string) => {
    const report = reportCards.find(r => r.id === reportId);
    if (!report) return;

    const csvContent = [
      ['Metric', 'Value'],
      ...report.metrics.map(m => [m.label, m.value])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-gray-600 mt-2">Comprehensive insights into talent management performance</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2 font-medium shadow-lg hover:shadow-xl">
              <Download size={18} />
              <span>Export All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {keyMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${metric.color}`}>
                  <Icon size={24} />
                </div>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.title}</h3>
                <p className="text-2xl font-bold text-gray-900 mb-2">{metric.value}</p>
                <p className="text-sm text-gray-500">{metric.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          <div className="flex space-x-2">
            {[
              { id: 'all', label: 'All Reports' },
              { id: 'hiring', label: 'Hiring' },
              { id: 'performance', label: 'Performance' },
              { id: 'financial', label: 'Financial' },
              { id: 'operational', label: 'Operational' }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id as typeof selectedCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReports.map((report) => {
          const Icon = report.icon;
          return (
            <div key={report.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 group">
              <div className="p-6">
                {/* Report Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <Icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {report.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(report.category)}`}>
                        {report.category}
                      </span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => handleExportReport(report.id)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Download size={16} className="text-gray-600" />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{report.description}</p>

                {/* Report Metrics */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {report.metrics.map((metric, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-600">{metric.label}</p>
                      <p className="text-sm font-bold text-gray-900">{metric.value}</p>
                    </div>
                  ))}
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <RefreshCw size={12} />
                    <span>Updated {report.lastUpdated.toLocaleDateString()}</span>
                  </div>
                  <span>{report.lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedReport(report)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                  >
                    <Eye size={16} />
                    <span>View Report</span>
                  </button>
                  <button 
                    onClick={() => handleExportReport(report.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Detail Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedReport.title}</h2>
                  <p className="text-gray-600 mt-1">{selectedReport.description}</p>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="text-gray-600 text-2xl">×</span>
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Report Visualization Placeholder */}
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BarChart3 size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    This would display interactive charts and visualizations for {selectedReport.title.toLowerCase()}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    {selectedReport.metrics.map((metric, index) => (
                      <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                        <p className="text-sm text-gray-600">{metric.label}</p>
                        <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button 
                  onClick={() => handleExportReport(selectedReport.id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                >
                  Export Data
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                  Schedule Report
                </button>
                <button 
                  onClick={() => setSelectedReport(null)}
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