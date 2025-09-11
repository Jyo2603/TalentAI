import React from 'react';
import { Mail, MailOpen, Clock, User, Briefcase, Calendar, FileText } from 'lucide-react';
import type { InboxMessage } from '../../types/inbox';

interface MessageListProps {
  messages: InboxMessage[];
  selectedMessage: InboxMessage | null;
  onMessageSelect: (message: InboxMessage) => void;
  viewType: 'all' | 'unread' | 'read' | 'sent' | 'archived' | 'deleted';
  onRestore?: (messageId: string) => void;
  onPermanentDelete?: (messageId: string) => void;
  onUnarchive?: (messageId: string) => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  selectedMessage,
  onMessageSelect,
  viewType,
  onRestore,
  onPermanentDelete,
  onUnarchive
}) => {
  const getTypeIcon = (type: InboxMessage['type']) => {
    switch (type) {
      case 'application': return <User size={14} className="text-blue-600" />;
      case 'interview': return <Calendar size={14} className="text-green-600" />;
      case 'task': return <FileText size={14} className="text-purple-600" />;
      case 'system': return <Briefcase size={14} className="text-orange-600" />;
      default: return <Mail size={14} className="text-gray-600" />;
    }
  };

  const getTypeColor = (type: InboxMessage['type']) => {
    switch (type) {
      case 'application': return 'bg-blue-50 border-blue-200';
      case 'interview': return 'bg-green-50 border-green-200';
      case 'task': return 'bg-purple-50 border-purple-200';
      case 'system': return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="space-y-1 p-2">
      {messages.map((message) => (
        <div
          key={message.id}
          onClick={() => {
            onMessageSelect(message);
          }}
          className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
            selectedMessage?.id === message.id
              ? 'bg-blue-50 border-blue-200 shadow-sm'
              : 'hover:bg-gray-50 border-transparent'
          }`}
        >
          <div className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${getTypeColor(message.type)}`}>
              {getTypeIcon(message.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-sm font-medium truncate ${
                  message.isRead ? 'text-gray-700' : 'text-gray-900'
                }`}>
                  {message.sender}
                </p>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  {!message.isRead && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
              
              <p className={`text-sm truncate mb-1 ${
                message.isRead ? 'text-gray-600' : 'text-gray-900 font-medium'
              }`}>
                {message.subject}
              </p>
              
              <p className="text-xs text-gray-500 line-clamp-2">
                {message.preview}
              </p>
              
              {message.priority === 'high' && (
                <div className="flex items-center mt-2">
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-medium">
                    High Priority
                  </span>
                </div>
              )}
              
              {viewType === 'sent' && (
                <div className="flex items-center mt-2">
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs font-medium">
                    Sent to: {(message as any).recipient || 'Unknown'}
                  </span>
                </div>
              )}
              
              {viewType === 'deleted' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('🔄 RESTORE BUTTON CLICKED for message:', message.id);
                      onRestore?.(message.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Restore
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('💀 PERMANENT DELETE BUTTON CLICKED for message:', message.id);
                      onPermanentDelete?.(message.id);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Delete Forever
                  </button>
                </div>
              )}
              
              {viewType === 'archived' && (
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onUnarchive?.(message.id);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Unarchive
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {messages.length === 0 && (
        <div className="text-center py-12">
          <Mail size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-900">No messages found</p>
          <p className="text-gray-600 mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};