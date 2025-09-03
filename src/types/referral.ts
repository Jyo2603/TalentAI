export interface Referral {
  id: string;
  referrerEmployeeId: string;
  referrerName: string;
  referrerEmail: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  candidateLinkedIn?: string;
  jobId: string;
  jobTitle: string;
  resumeUrl?: string;
  notes?: string;
  status: 'submitted' | 'reviewed' | 'screening' | 'interview' | 'hired' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  hiredAt?: Date;
  rewardAmount: number;
  rewardStatus: 'pending' | 'approved' | 'paid';
  rewardPaidAt?: Date;
  relationship: 'former-colleague' | 'friend' | 'linkedin-connection' | 'university' | 'other';
  source: 'internal-portal' | 'email' | 'slack';
}

export interface ReferralReward {
  id: string;
  jobId: string;
  jobTitle: string;
  department: string;
  experienceLevel: 'junior' | 'mid' | 'senior' | 'lead';
  rewardAmount: number;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReferralStats {
  totalReferrals: number;
  pendingReview: number;
  inProgress: number;
  hired: number;
  totalRewardsPaid: number;
  conversionRate: number;
  avgTimeToHire: number;
}

export interface TopReferrer {
  employeeId: string;
  employeeName: string;
  department: string;
  totalReferrals: number;
  successfulHires: number;
  conversionRate: number;
  totalRewardsEarned: number;
  avatar?: string;
}

export interface ReferralAnalytics {
  monthlyReferrals: { month: string; count: number; hired: number }[];
  departmentBreakdown: { department: string; referrals: number; hires: number }[];
  sourceBreakdown: { source: string; count: number; percentage: number }[];
  rewardsPaid: { month: string; amount: number }[];
}