import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginForm } from './LoginForm';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthWrapperProps {
  children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    console.log('🔄 AuthWrapper: Still loading...');
    return <LoadingSpinner />;
  }

  if (!user) {
    console.log('👤 AuthWrapper: No user, showing login');
    return <LoginForm />;
  }

  console.log('✅ AuthWrapper: User exists, showing app');
  return <>{children}</>;
};