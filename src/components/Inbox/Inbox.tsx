import React, { useState } from 'react';
import { Search, Filter, Mail, MailOpen, Archive, Trash2, Clock } from 'lucide-react';
import { MessageList } from './MessageList';
import { MessagePreview } from './MessagePreview';
import { mockMessages } from '../../data/inboxData';
import type { InboxMessage } from '../../types/inbox';

export const Inbox: React.FC = () => {
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read' | 'sent' | 'archived' | 'deleted'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState(() => {
    const deletedIds = JSON.parse(localStorage.getItem('deletedMessageIds') || '[]');
    const readMessageIds = JSON.parse(localStorage.getItem('readMessageIds') || '[]');
    
    return mockMessages
      .filter(msg => !deletedIds.includes(msg.id))
      .map(msg => ({
        ...msg,
        isRead: readMessageIds.includes(msg.id)
      }));
  });
  const [sentMessages, setSentMessages] = useState<InboxMessage[]>([]);
  const [archivedMessages, setArchivedMessages] = useState<InboxMessage[]>(() => {
    const saved = localStorage.getItem('archivedMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [deletedMessages, setDeletedMessages] = useState<InboxMessage[]>(() => {
    const saved = localStorage.getItem('deletedMessages');
    if (saved) {
      try {
        const parsedMessages = JSON.parse(saved);
        return parsedMessages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          originalSection: msg.originalSection || 'inbox' // Track where it came from
        }));
      } catch (error) {
        console.error('Error loading deleted messages:', error);
        return [];
      }
    }
    return [];
  });
  const [viewMode, setViewMode] = useState<'message' | 'action' | 'details'>('message');

  const filteredMessages = messages.filter((message) => {
    const matchesFilter = filter === 'all' ||
                         (filter === 'unread' && !message.isRead) ||
                         (filter === 'read' && message.isRead);
    
    const matchesSearch = searchTerm === '' ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const displayMessages = filter === 'deleted' ? deletedMessages :
                          filter === 'sent' ? sentMessages :
                          filter === 'archived' ? archivedMessages : 
                          filteredMessages;

  console.log('📊 INBOX DEBUG:', {
    filter,
    messagesCount: messages.length,
    sentCount: sentMessages.length,
    archivedCount: archivedMessages.length,
    deletedCount: deletedMessages.length,
    displayCount: displayMessages.length
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  // Listen for sent messages from localStorage
  React.useEffect(() => {
    const handleStorageChange = () => {
      const stored = localStorage.getItem('sentMessages');
      if (stored) {
        try {
          const parsedMessages = JSON.parse(stored);
          setSentMessages(parsedMessages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
        } catch (error) {
          console.error('Error parsing sent messages:', error);
        }
      }
    };

    // Load initial sent messages
    handleStorageChange();

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleMarkAsRead = (messageId: string) => {
    console.log('📖 MARKING AS READ:', messageId);
    
    // Update read state in localStorage
    const readMessageIds = JSON.parse(localStorage.getItem('readMessageIds') || '[]');
    if (!readMessageIds.includes(messageId)) {
      const updatedReadIds = [...readMessageIds, messageId];
      localStorage.setItem('readMessageIds', JSON.stringify(updatedReadIds));
      console.log('💾 Saved read message IDs:', updatedReadIds);
    }
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: true } : msg
    ));
  };

  const handleMarkAsUnread = (messageId: string) => {
    console.log('📧 MARKING AS UNREAD:', messageId);
    
    // Remove from read state in localStorage
    const readMessageIds = JSON.parse(localStorage.getItem('readMessageIds') || '[]');
    const updatedReadIds = readMessageIds.filter((id: string) => id !== messageId);
    localStorage.setItem('readMessageIds', JSON.stringify(updatedReadIds));
    console.log('💾 Updated read message IDs after unread:', updatedReadIds);
    
    setMessages(prev => prev.map(msg => 
      msg.id === messageId ? { ...msg, isRead: false } : msg
    ));
  };

  const handleMessageSelect = (message: InboxMessage) => {
    setSelectedMessage(message);
    setViewMode('message'); // Reset to message view when selecting a new message
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const handleArchive = (messageId: string) => {
    const messageToArchive = messages.find(msg => msg.id === messageId);
    if (messageToArchive) {
      const updatedArchived = [{ ...messageToArchive, isRead: true }, ...archivedMessages];
      setArchivedMessages(updatedArchived);
      localStorage.setItem('archivedMessages', JSON.stringify(updatedArchived));
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    }
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleDelete = (messageId: string) => {
    console.log('🗑️ DELETING MESSAGE:', messageId, 'from filter:', filter);
    
    // Get current deleted IDs
    const deletedIds = JSON.parse(localStorage.getItem('deletedMessageIds') || '[]');
    console.log('📋 Current deleted IDs:', deletedIds);
    
    // Handle deletion from different sections
    if (filter === 'sent') {
      const messageToDelete = sentMessages.find(msg => msg.id === messageId);
      if (messageToDelete) {
        console.log('📤 Deleting from sent messages');
        const messageWithSection = { ...messageToDelete, originalSection: 'sent' };
        const updatedDeleted = [messageWithSection, ...deletedMessages];
        setDeletedMessages(updatedDeleted);
        localStorage.setItem('deletedMessages', JSON.stringify(updatedDeleted));
        
        // Add to deleted IDs list
        const updatedDeletedIds = [...deletedIds, messageId];
        localStorage.setItem('deletedMessageIds', JSON.stringify(updatedDeletedIds));
        console.log('💾 Saved deleted IDs:', updatedDeletedIds);
        
        setSentMessages(prev => prev.filter(msg => msg.id !== messageId));
        
        // Update sent messages in localStorage
        const updatedSentMessages = sentMessages.filter(msg => msg.id !== messageId);
        localStorage.setItem('sentMessages', JSON.stringify(updatedSentMessages));
      }
    } else if (filter === 'archived') {
      const messageToDelete = archivedMessages.find(msg => msg.id === messageId);
      if (messageToDelete) {
        console.log('📁 Deleting from archived messages');
        const messageWithSection = { ...messageToDelete, originalSection: 'archived' };
        const updatedDeleted = [messageWithSection, ...deletedMessages];
        setDeletedMessages(updatedDeleted);
        localStorage.setItem('deletedMessages', JSON.stringify(updatedDeleted));
        
        // Add to deleted IDs list
        const updatedDeletedIds = [...deletedIds, messageId];
        localStorage.setItem('deletedMessageIds', JSON.stringify(updatedDeletedIds));
        console.log('💾 Saved deleted IDs:', updatedDeletedIds);
        
        setArchivedMessages(prev => prev.filter(msg => msg.id !== messageId));
        localStorage.setItem('archivedMessages', JSON.stringify(archivedMessages.filter(msg => msg.id !== messageId)));
      }
    } else {
      const messageToDelete = messages.find(msg => msg.id === messageId);
      if (messageToDelete) {
        console.log('📥 Deleting from inbox messages');
        const messageWithSection = { ...messageToDelete, originalSection: 'inbox' };
        const updatedDeleted = [messageWithSection, ...deletedMessages];
        setDeletedMessages(updatedDeleted);
        localStorage.setItem('deletedMessages', JSON.stringify(updatedDeleted));
        console.log('💾 Saved to deleted messages:', updatedDeleted.length);
        
        // Add to deleted IDs list
        const updatedDeletedIds = [...deletedIds, messageId];
        localStorage.setItem('deletedMessageIds', JSON.stringify(updatedDeletedIds));
        console.log('💾 Saved deleted IDs:', updatedDeletedIds);
        
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
      }
    }
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleRestoreMessage = (messageId: string) => {
    console.log('🔄 RESTORING MESSAGE:', messageId);
    const messageToRestore = deletedMessages.find(msg => msg.id === messageId);
    console.log('📧 Message to restore:', messageToRestore);
    
    if (messageToRestore) {
      // Remove from deleted IDs list
      const deletedIds = JSON.parse(localStorage.getItem('deletedMessageIds') || '[]');
      const updatedDeletedIds = deletedIds.filter((id: string) => id !== messageId);
      localStorage.setItem('deletedMessageIds', JSON.stringify(updatedDeletedIds));
      console.log('💾 Updated deleted IDs after restore:', updatedDeletedIds);
      
      // Restore to original section
      const originalSection = (messageToRestore as any).originalSection || 'inbox';
      console.log('🎯 Restoring to original section:', originalSection);
      
      if (originalSection === 'sent') {
        setSentMessages(prev => {
          const restored = [{ ...messageToRestore, isRead: true }, ...prev];
          localStorage.setItem('sentMessages', JSON.stringify(restored));
          console.log('📤 Restored to sent messages, new count:', restored.length);
          return restored;
        });
      } else if (originalSection === 'archived') {
        setArchivedMessages(prev => {
          const restored = [{ ...messageToRestore, isRead: true }, ...prev];
          localStorage.setItem('archivedMessages', JSON.stringify(restored));
          console.log('📁 Restored to archived messages, new count:', restored.length);
          return restored;
        });
      } else {
        // Default to inbox
        setMessages(prev => {
          const restored = [{ ...messageToRestore, isRead: false }, ...prev];
          console.log('📥 Restored to inbox messages, new count:', restored.length);
          return restored;
        });
      }
      
      // Remove from deleted messages
      const updatedDeleted = deletedMessages.filter(msg => msg.id !== messageId);
      setDeletedMessages(updatedDeleted);
      localStorage.setItem('deletedMessages', JSON.stringify(updatedDeleted));
      console.log('🗑️ Updated deleted messages, new count:', updatedDeleted.length);
    }
    
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handlePermanentDelete = (messageId: string) => {
    console.log('💀 PERMANENTLY DELETING MESSAGE:', messageId);
    // Get current deleted IDs
    const deletedIds = JSON.parse(localStorage.getItem('deletedMessageIds') || '[]');
    
    // Add to permanently deleted IDs
    const updatedDeletedIds = [...deletedIds, messageId];
    localStorage.setItem('deletedMessageIds', JSON.stringify(updatedDeletedIds));
    console.log('💾 Updated permanently deleted IDs:', updatedDeletedIds);
    
    // Remove from deleted messages
    const updatedDeleted = deletedMessages.filter(msg => msg.id !== messageId);
    setDeletedMessages(updatedDeleted);
    localStorage.setItem('deletedMessages', JSON.stringify(updatedDeleted));
    console.log('🗂️ Remaining deleted messages:', updatedDeleted.length);
    
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleUnarchive = (messageId: string) => {
    const messageToUnarchive = archivedMessages.find(msg => msg.id === messageId);
    if (messageToUnarchive) {
      setMessages(prev => [messageToUnarchive, ...prev]);
      const updatedArchived = archivedMessages.filter(msg => msg.id !== messageId);
      setArchivedMessages(updatedArchived);
      localStorage.setItem('archivedMessages', JSON.stringify(updatedArchived));
    }
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
  };

  const handleReply = (message: InboxMessage) => {
    const replyMessage: InboxMessage = {
      id: Date.now().toString(),
      sender: 'You',
      subject: `Re: ${message.subject}`,
      preview: 'Reply message...',
      content: `Reply to: ${message.sender}\n\nThank you for your message. I will review your application and get back to you within 2 business days.\n\nBest regards,\nSarah Chen\nTalent Acquisition Team`,
      type: message.type,
      priority: 'medium',
      isRead: true,
      timestamp: new Date(),
      actionRequired: undefined
    };
    
    setMessages(prev => [replyMessage, ...prev]);
    setSelectedMessage(replyMessage);
  };

  const handleForward = (message: InboxMessage) => {
    const forwardMessage: InboxMessage = {
      id: Date.now().toString(),
      sender: 'You',
      subject: `Fwd: ${message.subject}`,
      preview: 'Forwarded message...',
      content: `---------- Forwarded message ----------\nFrom: ${message.sender}\nSubject: ${message.subject}\nDate: ${message.timestamp.toLocaleString()}\n\n${message.content}`,
      type: message.type,
      priority: 'medium',
      isRead: true,
      timestamp: new Date(),
      actionRequired: undefined
    };
    
    setMessages(prev => [forwardMessage, ...prev]);
    setSelectedMessage(forwardMessage);
  };

  const handleTakeAction = (message: InboxMessage) => {
    setViewMode('action');
  };

  const handleViewDetails = (message: InboxMessage) => {
    setViewMode('details');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-medium text-gray-900">Inbox</h1>
        <p className="text-sm text-gray-600 mt-1">Messages and notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel - Message List */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 flex flex-col">
          {/* Header with filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium text-gray-900">Messages</h2>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                  {unreadCount} unread
                </span>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
              />
            </div>

            {/* Filter buttons */}
            <div className="flex space-x-1 text-xs">
              {[
                { id: 'all', label: 'All' },
                { id: 'unread', label: 'Unread' },
                { id: 'read', label: 'Read' },
                { id: 'sent', label: 'Sent' },
                { id: 'archived', label: 'Archived' },
                { id: 'deleted', label: 'Deleted' }
              ].map((filterOption) => (
                <button
                  key={filterOption.id}
                  onClick={() => setFilter(filterOption.id as typeof filter)}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    filter === filterOption.id
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-auto">
            <MessageList 
              messages={displayMessages}
              selectedMessage={selectedMessage}
              onMessageSelect={handleMessageSelect}
              viewType={filter}
              onRestore={handleRestoreMessage}
              onPermanentDelete={handlePermanentDelete}
              onUnarchive={handleUnarchive}
            />
          </div>
        </div>

        {/* Right Panel - Message Preview */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200">
          <MessagePreview 
            message={selectedMessage}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onMarkAsRead={handleMarkAsRead}
            onMarkAsUnread={handleMarkAsUnread}
            onArchive={handleArchive}
            onDelete={handleDelete}
            onReply={handleReply}
            onForward={handleForward}
            onTakeAction={handleTakeAction}
            onViewDetails={handleViewDetails}
          />
        </div>
      </div>
    </div>
  );
};