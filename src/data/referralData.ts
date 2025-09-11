import type { Referral, ReferralReward, ReferralStats, TopReferrer, ReferralAnalytics } from '../types/referral';

export const mockReferrals: Referral[] = [
  {
    id: '1',
    referrerEmployeeId: '1',
    referrerName: 'Jennifer Walsh',
    referrerEmail: 'jennifer.walsh@company.com',
    candidateName: 'Emily Chen',
    candidateEmail: 'emily.chen@email.com',
    candidatePhone: '+1-555-0199',
    candidateLinkedIn: 'linkedin.com/in/emilychen',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    resumeUrl: 'https://example.com/resume-emily.pdf',
    notes: 'Worked with Emily at my previous company. Excellent React skills and great team player.',
    status: 'hired',
    submittedAt: new Date('2025-01-05T10:00:00'),
    reviewedAt: new Date('2025-01-06T14:00:00'),
    hiredAt: new Date('2025-01-12T16:00:00'),
    rewardAmount: 2000,
    rewardStatus: 'paid',
    rewardPaidAt: new Date('2025-01-15T10:00:00'),
    relationship: 'former-colleague',
    source: 'internal-portal'
  },
  {
    id: '2',
    referrerEmployeeId: '2',
    referrerName: 'Michael Chen',
    referrerEmail: 'michael.chen@company.com',
    candidateName: 'James Rodriguez',
    candidateEmail: 'james.rodriguez@email.com',
    candidatePhone: '+1-555-0188',
    jobId: '2',
    jobTitle: 'AI/ML Engineer',
    notes: 'PhD colleague from Stanford. Published several ML papers together.',
    status: 'interview',
    submittedAt: new Date('2025-01-08T15:30:00'),
    reviewedAt: new Date('2025-01-09T09:00:00'),
    rewardAmount: 3000,
    rewardStatus: 'pending',
    relationship: 'university',
    source: 'internal-portal'
  },
  {
    id: '3',
    referrerEmployeeId: '3',
    referrerName: 'Lisa Thompson',
    referrerEmail: 'lisa.thompson@company.com',
    candidateName: 'Sarah Kim',
    candidateEmail: 'sarah.kim@email.com',
    candidateLinkedIn: 'linkedin.com/in/sarahkim',
    jobId: '3',
    jobTitle: 'Product Manager',
    notes: 'Met at a product management conference. Very strategic thinker.',
    status: 'screening',
    submittedAt: new Date('2025-01-10T11:15:00'),
    reviewedAt: new Date('2025-01-11T10:00:00'),
    rewardAmount: 1500,
    rewardStatus: 'pending',
    relationship: 'linkedin-connection',
    source: 'internal-portal'
  },
  {
    id: '4',
    referrerEmployeeId: '1',
    referrerName: 'Jennifer Walsh',
    referrerEmail: 'jennifer.walsh@company.com',
    candidateName: 'Tom Wilson',
    candidateEmail: 'tom.wilson@email.com',
    candidatePhone: '+1-555-0177',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    notes: 'Former teammate with strong Vue.js background, learning React.',
    status: 'reviewed',
    submittedAt: new Date('2025-01-12T14:20:00'),
    reviewedAt: new Date('2025-01-13T16:00:00'),
    rewardAmount: 2000,
    rewardStatus: 'pending',
    relationship: 'former-colleague',
    source: 'internal-portal'
  },
  {
    id: '5',
    referrerEmployeeId: '4',
    referrerName: 'Robert Garcia',
    referrerEmail: 'robert.garcia@company.com',
    candidateName: 'Anna Martinez',
    candidateEmail: 'anna.martinez@email.com',
    jobId: '2',
    jobTitle: 'AI/ML Engineer',
    notes: 'Brilliant data scientist from my bootcamp cohort.',
    status: 'submitted',
    submittedAt: new Date('2025-01-14T09:45:00'),
    rewardAmount: 3000,
    rewardStatus: 'pending',
    relationship: 'friend',
    source: 'internal-portal'
  }
];

export const mockReferralRewards: ReferralReward[] = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    department: 'Engineering',
    experienceLevel: 'senior',
    rewardAmount: 2000,
    currency: 'USD',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'AI/ML Engineer',
    department: 'AI/ML',
    experienceLevel: 'senior',
    rewardAmount: 3000,
    currency: 'USD',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'Product Manager',
    department: 'Product',
    experienceLevel: 'mid',
    rewardAmount: 1500,
    currency: 'USD',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    id: '4',
    jobId: 'default-junior',
    jobTitle: 'Junior Positions',
    department: 'All',
    experienceLevel: 'junior',
    rewardAmount: 500,
    currency: 'USD',
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  }
];

export const mockReferralStats: ReferralStats = {
  totalReferrals: 5,
  pendingReview: 1,
  inProgress: 2,
  hired: 1,
  totalRewardsPaid: 2000,
  conversionRate: 20, // 1 hired out of 5 referrals
  avgTimeToHire: 7 // days
};

export const mockTopReferrers: TopReferrer[] = [
  {
    employeeId: '1',
    employeeName: 'Jennifer Walsh',
    department: 'Engineering',
    totalReferrals: 2,
    successfulHires: 1,
    conversionRate: 50,
    totalRewardsEarned: 2000,
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'
  },
  {
    employeeId: '2',
    employeeName: 'Michael Chen',
    department: 'AI/ML',
    totalReferrals: 1,
    successfulHires: 0,
    conversionRate: 0,
    totalRewardsEarned: 0,
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg'
  },
  {
    employeeId: '3',
    employeeName: 'Lisa Thompson',
    department: 'Product',
    totalReferrals: 1,
    successfulHires: 0,
    conversionRate: 0,
    totalRewardsEarned: 0,
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
  },
  {
    employeeId: '4',
    employeeName: 'Robert Garcia',
    department: 'Engineering',
    totalReferrals: 1,
    successfulHires: 0,
    conversionRate: 0,
    totalRewardsEarned: 0,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  }
];

export const mockReferralAnalytics: ReferralAnalytics = {
  monthlyReferrals: [
    { month: 'Oct 2024', count: 3, hired: 1 },
    { month: 'Nov 2024', count: 7, hired: 2 },
    { month: 'Dec 2024', count: 4, hired: 1 },
    { month: 'Jan 2025', count: 5, hired: 1 }
  ],
  departmentBreakdown: [
    { department: 'Engineering', referrals: 8, hires: 3 },
    { department: 'Product', referrals: 4, hires: 1 },
    { department: 'AI/ML', referrals: 3, hires: 1 },
    { department: 'Design', referrals: 2, hires: 0 },
    { department: 'Sales', referrals: 2, hires: 0 }
  ],
  sourceBreakdown: [
    { source: 'Internal Portal', count: 15, percentage: 75 },
    { source: 'Email', count: 3, percentage: 15 },
    { source: 'Slack', count: 2, percentage: 10 }
  ],
  rewardsPaid: [
    { month: 'Oct 2024', amount: 1500 },
    { month: 'Nov 2024', amount: 4000 },
    { month: 'Dec 2024', amount: 2000 },
    { month: 'Jan 2025', amount: 2000 }
  ]
};