import React, { useState } from 'react';
import { Users, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, Shield, Zap, Award, Globe } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="text-white space-y-10">
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Users size={40} className="text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  TalentAI
                </h1>
                <p className="text-blue-200 text-xl font-medium">Smart Recruitment Platform</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight">
                Revolutionize Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Talent Management
                </span>
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
                AI-powered recruitment and talent management platform that streamlines hiring, 
                optimizes team performance, and delivers exceptional candidate experiences.
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Zap size={28} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">AI-Powered</h3>
                <p className="text-blue-200">Smart assessments & matching</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Shield size={28} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Secure & Compliant</h3>
                <p className="text-blue-200">Enterprise-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-green-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Award size={28} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Best-in-Class</h3>
                <p className="text-blue-200">Industry leading features</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 bg-orange-500/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Globe size={28} className="text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Global Scale</h3>
                <p className="text-blue-200">Works worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          {/* Demo Login Buttons */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-4 mb-4 shadow-2xl">
            <h3 className="text-sm font-semibold text-white mb-3 text-center">Quick Demo Access</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleDemoLogin('recruiter')}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-blue-400 disabled:to-blue-500 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                <Users size={16} />
                <span>Login as Recruiter</span>
              </button>
              <button
                onClick={() => handleDemoLogin('candidate')}
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-500 text-white py-2 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium shadow-lg hover:shadow-xl"
              >
                <UserPlus size={16} />
                <span>Login as Candidate</span>
              </button>
            </div>
          </div>

          {/* Login/Register Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-sm text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Join thousands of professionals'}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isLogin 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          userType === 'candidate'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <UserPlus size={18} />
                          <span>Job Seeker</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUserType('recruiter')}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                          userType === 'recruiter'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-500 shadow-md'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <Users size={18} />
                          <span>Recruiter</span>
                        </div>
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email address"
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
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-800 text-sm font-medium">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-blue-400 disabled:to-indigo-500 text-white py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />}
                    <span>{isLogin ? 'Sign In to Account' : 'Create Account'}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {isLogin ? 'Create one here' : 'Sign in instead'}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-4 bg-gray-50 rounded-lg p-3 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3 text-center">Demo Credentials</h4>
              <div className="space-y-2 text-xs text-gray-600">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Recruiter:</span>
                  <span className="font-mono">sarah.chen@company.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Candidate:</span>
                  <span className="font-mono">demo.candidate@email.com</span>
                </div>
                <div className="text-center pt-2 border-t border-gray-200">
                  <span className="font-medium">Password:</span>
                  <span className="font-mono ml-2">demo123456</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};