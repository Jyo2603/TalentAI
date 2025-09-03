export interface InboxMessage {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  content: string;
  type: 'application' | 'interview' | 'task' | 'system';
  priority: 'low' | 'medium' | 'high';
  isRead: boolean;
  timestamp: Date;
  actionRequired?: string;
}