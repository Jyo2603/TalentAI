import React, { useState } from 'react';
import { Users, Mail, Lock, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'recruiter' | 'candidate'>('candidate');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, { full_name: fullName, user_type: userType });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoUserType: 'recruiter' | 'candidate') => {
    setLoading(true);
    setError('');

    try {
      const demoCredentials = {
        recruiter: { email: 'sarah.chen@company.com', password: 'demo123456', name: 'Sarah Chen' },
        candidate: { email: 'demo.candidate@email.com', password: 'demo123456', name: 'Demo Candidate' }
      };
      
      const creds = demoCredentials[demoUserType];
      
      // Just try to sign in directly
      await signIn(creds.email, creds.password);
    } catch (err: any) {
      // If sign in fails, try to create the user
      try {
        const creds = demoCredentials[demoUserType];
        console.log('Sign in failed, creating new user...');
        await signUp(creds.email, creds.password, { 
          full_name: creds.name, 
          user_type: demoUserType 
        });
        // After signup, try signing in again
        await signIn(creds.email, creds.password);
      } catch (signUpError: any) {
        setError('Demo login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TalentAI</h1>
          <p className="text-gray-600">Smart Recruitment & Talent Management</p>
        </div>

        {/* Demo Login Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Demo Access</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleDemoLogin('recruiter')}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <Users size={18} />
              <span>Login as Recruiter</span>
            </button>
            <button
              onClick={() => handleDemoLogin('candidate')}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              <UserPlus size={18} />
              <span>Login as Candidate</span>
            </button>
          </div>
        </div>

        {/* Login/Register Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-center space-x-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isLogin ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                !isLogin ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUserType('candidate')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        userType === 'candidate'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
                      }`}
                    >
                      Job Seeker
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType('recruiter')}
                      className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                        userType === 'recruiter'
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                      }`}
                    >
                      Recruiter
                    </button>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 rounded-lg transition-colors flex items-center justify-center space-x-2 font-medium"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-gray-50 rounded-lg p-4 mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p><strong>Recruiter:</strong> sarah.chen@company.com / demo123456</p>
            <p><strong>Candidate:</strong> demo.candidate@email.com / demo123456</p>
          </div>
        </div>
      </div>
    </div>
  );
};