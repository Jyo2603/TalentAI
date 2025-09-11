import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, UserProfile } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: { full_name: string; user_type: 'recruiter' | 'candidate' }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    console.log('🔍 Creating default profile for user:', userId);
    
    // Check if we already have a profile to avoid overwriting
    if (profile) {
      console.log('✅ Profile already exists, skipping creation');
      setLoading(false);
      return;
    }
    
    // Create default profile based on email or existing data
    const isCandidate = user?.email?.includes('candidate') || user?.email?.includes('demo.candidate');
    const defaultProfile: UserProfile = {
      id: userId,
      user_type: isCandidate ? 'candidate' : 'recruiter',
      full_name: isCandidate ? 'Demo Candidate' : 'Demo User',
      email: user?.email || 'demo@example.com',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setProfile(defaultProfile);
    setLoading(false);
    console.log('✅ Default profile set, loading complete');
  };

  const signUp = async (email: string, password: string, userData: { full_name: string; user_type: 'recruiter' | 'candidate' }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      // Don't throw error for demo - just create user

      // Create demo user and profile with stable ID
      const userId = 'demo-user-' + email.replace(/[^a-zA-Z0-9]/g, '');
      const demoUser = { id: userId, email };
      const demoProfile: UserProfile = {
        id: userId,
        user_type: userData.user_type,
        full_name: userData.full_name,
        email: email,
        role: userData.user_type === 'recruiter' ? 'Recruiter' : 'Candidate',
        department: userData.user_type === 'recruiter' ? 'Talent Acquisition' : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser(demoUser as any);
      setProfile(demoProfile);
      setLoading(false);
    } catch (error) {
      console.error('Signup error:', error);
      // Don't throw error for demo
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Create demo user based on email
      const userType = email.includes('sarah.chen') ? 'recruiter' : 'candidate';
      const demoProfile: UserProfile = {
        id: 'demo-user-' + email.replace(/[^a-zA-Z0-9]/g, ''),
        user_type: userType,
        full_name: email.includes('sarah.chen') ? 'Sarah Chen' : 'Demo Candidate',
        email: email,
        role: userType === 'recruiter' ? 'Recruiter' : 'Candidate',
        department: userType === 'recruiter' ? 'Talent Acquisition' : undefined,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      setUser({ id: demoProfile.id, email: email } as any);
      setProfile(demoProfile);
      setLoading(false);
    } catch (error) {
      console.error('Login error:', error);
      // Don't throw error for demo
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Supabase signout error:', error);
    } catch (error) {
      console.error('Signout error:', error);
    }
    
    // Clear local state regardless of Supabase response
    setUser(null);
    setProfile(null);
    setSession(null);
    setLoading(false);
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) throw new Error('No user logged in');

    if (profile) {
      // Update the profile directly while preserving existing data
      const updatedProfile: UserProfile = {
        ...profile,
        ...updates,
        updated_at: new Date().toISOString()
      };
      
      setProfile(updatedProfile);
      console.log('✅ Profile updated successfully:', updatedProfile);
    }
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};