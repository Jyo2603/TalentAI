import type { InboxMessage } from '../types/inbox';

export const mockMessages: InboxMessage[] = [
  {
    id: '1',
    sender: 'Alex Johnson',
    subject: 'Application for Senior Frontend Developer',
    preview: 'Thank you for considering my application. I have 5 years of experience...',
    content: `Dear Hiring Team,

Thank you for considering my application for the Senior Frontend Developer position. I have 5 years of experience working with React, TypeScript, and modern web technologies.

I'm particularly excited about this opportunity because of your company's focus on innovative user experiences and cutting-edge technology stack.

My recent projects include:
- Building a scalable e-commerce platform serving 100k+ users
- Implementing real-time collaboration features using WebSockets
- Leading a team of 4 developers on a mobile-first redesign

I would love to discuss how my experience can contribute to your team's success.

Best regards,
Alex Johnson`,
    type: 'application',
    priority: 'medium',
    isRead: false,
    timestamp: new Date('2025-01-15T09:30:00'),
    actionRequired: 'Review application and schedule initial screening'
  },
  {
    id: '2',
    sender: 'System Notification',
    subject: 'Interview scheduled with Maria Rodriguez',
    preview: 'Your interview with Maria Rodriguez for AI/ML Engineer position has been...',
    content: `Interview Confirmation

Your interview with Maria Rodriguez for the AI/ML Engineer position has been scheduled for:

Date: January 16, 2025
Time: 2:00 PM - 3:00 PM PST
Location: Conference Room B / Zoom (hybrid)

Candidate Background:
- 6 years of experience in machine learning
- PhD in Computer Science from Stanford
- Previous work at Google AI and OpenAI
- Test score: 94%

Interview Panel:
- Sarah Chen (Recruiter)
- Michael Chen (AI/ML Lead)
- David Park (Engineering Manager)

Please review the candidate's portfolio and prepare technical questions.`,
    type: 'interview',
    priority: 'high',
    isRead: false,
    timestamp: new Date('2025-01-15T08:15:00'),
    actionRequired: 'Prepare interview questions and review candidate portfolio'
  },
  {
    id: '3',
    sender: 'Task Manager',
    subject: 'Deadline reminder: Review applications',
    preview: 'You have 3 pending application reviews due today...',
    content: `Task Deadline Reminder

You have the following pending tasks due today:

1. Review Alex Johnson's application (Senior Frontend Developer)
   - Due: Today, 5:00 PM
   - Status: Pending review

2. Complete assessment scoring for David Kim
   - Due: Today, 6:00 PM  
   - Status: Test completed, awaiting review

3. Update job posting for Product Manager role
   - Due: Today, 4:00 PM
   - Status: Draft ready for approval

Please prioritize these tasks to meet today's deadlines.`,
    type: 'task',
    priority: 'high',
    isRead: true,
    timestamp: new Date('2025-01-15T07:00:00')
  },
  {
    id: '4',
    sender: 'Jennifer Walsh',
    subject: 'Project completion - Available for new assignment',
    preview: 'I have successfully completed the E-commerce Platform project and am now...',
    content: `Project Update

I have successfully completed the E-commerce Platform project and am now available for new assignments.

Project Summary:
- Duration: 3 months
- Team size: 5 developers
- Key achievements: 40% performance improvement, mobile-first redesign
- Technologies used: React, Node.js, PostgreSQL, AWS

I'm ready to take on new challenges and would be interested in:
- AI/ML integration projects
- Mobile application development
- Backend architecture improvements

Please let me know about upcoming projects that might be a good fit.

Best regards,
Jennifer Walsh
Senior Frontend Developer`,
    type: 'system',
    priority: 'medium',
    isRead: true,
    timestamp: new Date('2025-01-14T16:45:00')
  },
  {
    id: '5',
    sender: 'David Kim',
    subject: 'Follow-up on Frontend Developer application',
    preview: 'I wanted to follow up on my application submitted last week...',
    content: `Dear Hiring Team,

I wanted to follow up on my application for the Senior Frontend Developer position that I submitted last week.

I'm very excited about the opportunity to join your team and contribute to your innovative projects. Since submitting my application, I've:

- Completed an additional React certification
- Published a new open-source component library
- Gained experience with your tech stack through personal projects

I understand you receive many applications, but I believe my passion for frontend development and quick learning ability would make me a valuable addition to your team.

I'm available for an interview at your convenience and would be happy to provide any additional information you might need.

Thank you for your time and consideration.

Best regards,
David Kim`,
    type: 'application',
    priority: 'low',
    isRead: true,
    timestamp: new Date('2025-01-13T14:20:00')
  },
  {
    id: '6',
    sender: 'System Notification',
    subject: 'New assessment results available',
    preview: 'Assessment results for 3 candidates are now available for review...',
    content: `Assessment Results Summary

New assessment results are available for review:

1. Maria Rodriguez - AI/ML Engineer Position
   - Overall Score: 94%
   - Technical Skills: 96%
   - Problem Solving: 92%
   - Communication: 94%
   - Recommendation: Strong hire

2. Alex Johnson - Senior Frontend Developer
   - Overall Score: 87%
   - Technical Skills: 89%
   - Problem Solving: 85%
   - Communication: 87%
   - Recommendation: Hire

3. David Kim - Senior Frontend Developer
   - Overall Score: 76%
   - Technical Skills: 78%
   - Problem Solving: 74%
   - Communication: 76%
   - Recommendation: Consider

Please review these results and update candidate statuses accordingly.`,
    type: 'system',
    priority: 'medium',
    isRead: false,
    timestamp: new Date('2025-01-15T11:30:00'),
    actionRequired: 'Review assessment results and update candidate pipeline status'
  }
];