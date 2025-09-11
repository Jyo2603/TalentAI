import React from 'react';
import { Mail, Archive, Trash2, Reply, Forward, MoreHorizontal, Clock, User, Star, Award, Calendar, FileText, Phone, MapPin, Briefcase, CheckCircle } from 'lucide-react';
import type { InboxMessage } from '../../types/inbox';

interface MessagePreviewProps {
  message: InboxMessage | null;
  viewMode: 'message' | 'action' | 'details';
  onViewModeChange: (mode: 'message' | 'action' | 'details') => void;
  onMarkAsRead: (messageId: string) => void;
  onMarkAsUnread: (messageId: string) => void;
  onArchive: (messageId: string) => void;
  onDelete: (messageId: string) => void;
  onReply: (message: InboxMessage) => void;
  onForward: (message: InboxMessage) => void;
  onTakeAction: (message: InboxMessage) => void;
  onViewDetails: (message: InboxMessage) => void;
}

export const MessagePreview: React.FC<MessagePreviewProps> = ({
  message,
  viewMode,
  onViewModeChange,
  onMarkAsRead,
  onMarkAsUnread,
  onArchive,
  onDelete,
  onReply,
  onForward,
  onTakeAction,
  onViewDetails
}) => {
  if (!message) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">Select a message</p>
          <p className="text-gray-600 mt-1">Choose a message from the list to view its content</p>
        </div>
      </div>
    );
  }

  const getTypeColor = (type: InboxMessage['type']) => {
    switch (type) {
      case 'application': return 'bg-blue-100 text-blue-800';
      case 'interview': return 'bg-green-100 text-green-800';
      case 'task': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderActionView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Take Action</h3>
        <button 
          onClick={() => onViewModeChange('message')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to Message
        </button>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-1">{message.subject}</h4>
        <p className="text-sm text-blue-700">From: {message.sender}</p>
      </div>

      <div>
        <h4 className="font-medium text-gray-900 mb-4">Complete these steps:</h4>
        <div className="space-y-3">
          {message.type === 'application' && [
            'Review Resume & Portfolio',
            'Check ATS Score & Assessment', 
            'Schedule Initial Screening Call',
            'Update Candidate Status'
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-900">{step}</span>
            </div>
          ))}

          {message.type === 'interview' && [
            'Prepare Interview Questions',
            'Review Candidate Portfolio',
            'Confirm Meeting Room & Zoom Link',
            'Send Calendar Invite to Panel'
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-900">{step}</span>
            </div>
          ))}

          {message.type === 'task' && [
            'Review Task Requirements',
            'Set Priority Level',
            'Assign Resources',
            'Update Task Status'
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-900">{step}</span>
            </div>
          ))}

          {message.type === 'system' && [
            'Review System Notification',
            'Take Appropriate Action',
            'Update Status'
          ].map((step, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-900">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={() => {
          onTakeAction(message);
          onViewModeChange('message');
        }}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors"
      >
        Complete Action
      </button>
    </div>
  );

  const renderDetailsView = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Message Details</h3>
        <button 
          onClick={() => onViewModeChange('message')}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← Back to Message
        </button>
      </div>

      {message.type === 'application' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-3">Candidate Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <User size={16} className="text-blue-600" />
                <span className="text-gray-700">Alex Johnson</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-blue-600" />
                <span className="text-gray-700">alex.johnson@email.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-blue-600" />
                <span className="text-gray-700">+1-555-0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase size={16} className="text-blue-600" />
                <span className="text-gray-700">5 years experience</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Award size={16} className="text-green-600" />
                <span className="font-medium text-green-900">ATS Score</span>
              </div>
              <p className="text-2xl font-bold text-green-800">92%</p>
              <p className="text-xs text-green-600">Resume quality</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star size={16} className="text-purple-600" />
                <span className="font-medium text-purple-900">Assessment</span>
              </div>
              <p className="text-2xl font-bold text-purple-800">87%</p>
              <p className="text-xs text-purple-600">Technical test</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Skills</h5>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'CSS', 'JavaScript'].map((skill) => (
                <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Documents</h5>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm">
                <FileText size={14} className="text-gray-600" />
                <a 
                  href="/documents/alex-johnson-resume.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Resume.pdf
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FileText size={14} className="text-gray-600" />
                <a 
                  href="/documents/alex-johnson-cover-letter.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Cover_Letter.pdf
                </a>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <FileText size={14} className="text-gray-600" />
                <a 
                  href="/documents/alex-johnson-portfolio.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Portfolio_Link
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {message.type === 'interview' && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">Interview Schedule</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar size={16} className="text-green-600" />
                <span className="text-gray-700">January 16, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-green-600" />
                <span className="text-gray-700">2:00 PM - 3:00 PM PST</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-green-600" />
                <span className="text-gray-700">Conference Room B / Zoom</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h5 className="font-medium text-blue-900 mb-2">Interview Panel</h5>
            <div className="space-y-1 text-sm">
              <p className="text-blue-700">• Sarah Chen (Recruiter)</p>
              <p className="text-blue-700">• Michael Chen (AI/ML Lead)</p>
              <p className="text-blue-700">• David Park (Engineering Manager)</p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h5 className="font-medium text-purple-900 mb-2">Candidate Background</h5>
            <div className="space-y-1 text-sm text-purple-700">
              <p>• 6 years ML experience</p>
              <p>• PhD Computer Science - Stanford</p>
              <p>• Previous: Google AI, OpenAI</p>
              <p>• Test Score: 94%</p>
            </div>
          </div>
        </div>
      )}

      {message.type === 'task' && (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-3">Task Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-purple-600" />
                <span className="text-gray-700">Deadline: Today 5:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <User size={16} className="text-purple-600" />
                <span className="text-gray-700">Assigned to: You</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-purple-600" />
                <span className="text-gray-700">Priority: High</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h5 className="font-medium text-yellow-900 mb-2">Progress</h5>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
            <p className="text-sm text-yellow-700">60% Complete</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h5 className="font-medium text-gray-900 mb-2">Dependencies</h5>
            <div className="space-y-1 text-sm text-gray-700">
              <p>• Review Alex Johnson application</p>
              <p>• Complete assessment scoring</p>
            </div>
          </div>
        </div>
      )}

      {message.type === 'system' && (
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-3">System Information</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <FileText size={16} className="text-orange-600" />
                <span className="text-gray-700">Type: {message.type}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={16} className="text-orange-600" />
                <span className="text-gray-700">Received: {message.timestamp.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-orange-600" />
                <span className="text-gray-700">Priority: {message.priority}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">{message.subject}</h2>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(message.type)}`}>
                {message.type}
              </span>
              {message.priority === 'high' && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  High Priority
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <User size={14} />
                <span>{message.sender}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={14} />
                <span>{message.timestamp.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreHorizontal size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => message.isRead ? onMarkAsUnread(message.id) : onMarkAsRead(message.id)}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
          >
            <Mail size={14} />
            <span>{message.isRead ? 'Mark Unread' : 'Mark Read'}</span>
          </button>
          
          <button
            onClick={() => onArchive(message.id)}
            className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
          >
            <Archive size={14} />
            <span>Archive</span>
          </button>
          
          <button
            onClick={() => onDelete(message.id)}
            className="flex items-center space-x-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors text-sm"
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Message Content */}
      <div className="flex-1 p-6 overflow-auto">
        {viewMode === 'message' && (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                {message.content}
              </div>
            </div>
            
            {message.actionRequired && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Action Required</h4>
                <p className="text-blue-800 mb-4">{message.actionRequired}</p>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => onViewModeChange('action')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Take Action
                  </button>
                  <button 
                    onClick={() => onViewModeChange('details')}
                    className="bg-white border border-blue-300 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {viewMode === 'action' && renderActionView()}
        {viewMode === 'details' && renderDetailsView()}
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-gray-200">
        {viewMode === 'message' && (
          <div className="flex space-x-2">
            <button 
              onClick={() => onReply(message)}
              className="flex items-center space-x-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              <Reply size={14} />
              <span>Reply</span>
            </button>
            <button 
              onClick={() => onForward(message)}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors text-sm"
            >
              <Forward size={14} />
              <span>Forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};