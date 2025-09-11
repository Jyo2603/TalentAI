import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// Create a mock client that works offline
const createMockClient = () => ({
  auth: {
    signUp: async (credentials: any) => ({ 
      data: { 
        user: { 
          id: 'demo-user-' + Date.now(), 
          email: credentials.email,
          created_at: new Date().toISOString()
        } 
      }, 
      error: null 
    }),
    signInWithPassword: async (credentials: any) => ({ 
      data: { 
        user: { 
          id: 'demo-user-' + Date.now(), 
          email: credentials.email,
          created_at: new Date().toISOString()
        } 
      }, 
      error: null 
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: (table: string) => ({
    select: (columns?: string) => ({
      eq: () => ({ data: [], error: null }),
      order: () => ({ data: [], error: null }),
      data: [],
      error: null
    }),
    insert: (data: any) => ({ data: [data], error: null }),
    update: (data: any) => ({
      eq: () => ({ data: [data], error: null })
    }),
    eq: () => ({ data: [], error: null }),
    order: () => ({ data: [], error: null })
  })
});

// Always use mock client for demo
export const supabase = createMockClient() as any;

// Database types
export interface UserProfile {
  id: string;
  user_type: 'recruiter' | 'candidate';
  full_name: string;
  email: string;
  phone?: string;
  department?: string;
  role?: string;
  location?: string;
  skills?: string[];
  certifications?: string[];
  resume_url?: string;
  linkedin_profile?: string;
  portfolio_url?: string;
  bio?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateApplication {
  id: string;
  candidate_id: string;
  job_id: string;
  job_title: string;
  cover_letter?: string;
  expected_salary?: number;
  available_start_date?: string;
  how_did_you_hear?: string;
  additional_info?: string;
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'interview' | 'rejected' | 'hired';
  submitted_at: string;
  updated_at: string;
}

export interface AssessmentAttempt {
  id: string;
  candidate_id: string;
  assessment_id: string;
  assessment_title: string;
  job_id?: string;
  started_at: string;
  completed_at?: string;
  total_score: number;
  max_score: number;
  percentage: number;
  time_spent_minutes: number;
  status: 'not-started' | 'in-progress' | 'completed' | 'expired';
  results?: any;
  feedback?: string;
  passed: boolean;
  created_at: string;
  updated_at: string;
}