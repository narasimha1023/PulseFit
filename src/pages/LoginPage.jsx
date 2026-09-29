import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Mail, Lock, ArrowRight, ShieldCheck, Dumbbell, Sparkles } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { PROJECT_METADATA } from '../data/initialMockData';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('narasimha@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back to PulseFit Health Clubs!', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Login failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoUser = async () => {
    setIsDemoLoading(true);
    try {
      await demoLogin();
      showToast('Signed in as Demo User: Narasimha Reddy', 'success');
      navigate('/dashboard');
    } catch (err) {
      showToast('Demo login failed.', 'error');
    } finally {
      setIsDemoLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    showToast(`Password reset link sent to ${forgotEmail || 'your email address'}!`, 'info');
    setShowForgotModal(false);
  };

  return (
    <div className="min-h-screen bg-pulse-bg text-slate-100 flex flex-col justify-between">
      <div className="flex-1 flex w-full">
        {/* Left Side: Form Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-12 z-10">
          <div className="max-w-md w-full mx-auto">
            {/* Brand Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-900 to-pulse-card border border-pulse-lime/40 flex items-center justify-center text-pulse-lime shadow-glow-lime">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center">
                  Pulse<span className="text-pulse-lime">Fit</span>
                </h1>
                <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
                  Health Clubs
                </p>
              </div>
            </div>

            {/* Heading & Subtitle */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                Member Portal
              </h2>
              <p className="text-sm sm:text-base text-pulse-lime font-medium mt-2">
                Smarter Membership. Seamless Access. Stronger You.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials or test the interactive platform via Demo Access.
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pulse-lime focus:ring-1 focus:ring-pulse-lime transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-xs text-pulse-lime hover:underline cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pulse-lime focus:ring-1 focus:ring-pulse-lime transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-pulse-lime focus:ring-pulse-lime accent-[#10f59a]"
                  />
                  <span>Remember Me on this turnstile terminal</span>
                </label>
              </div>

              <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  isLoading={isLoading}
                  iconRight={ArrowRight}
                >
                  Login to Club
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className="w-full border-pulse-cyan/40 hover:border-pulse-cyan text-pulse-cyan hover:text-white"
                  isLoading={isDemoLoading}
                  onClick={handleDemoUser}
                  icon={Sparkles}
                >
                  Continue as Demo User
                </Button>
              </div>
            </form>

            {/* Academic & microservices note */}
            <div className="mt-8 p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-pulse-lime shrink-0" />
              <span>
                {PROJECT_METADATA.code} Frontend Prototype • Designed for Spring Boot Microservices
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: High-Impact Fitness Image (Desktop Only) */}
        <div className="hidden lg:block lg:w-1/2 relative bg-slate-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&auto=format&fit=crop&q=85"
            alt="PulseFit Club Workout Floor"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-pulse-bg via-pulse-bg/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-pulse-bg via-transparent to-transparent" />

          {/* Floating Hero Card */}
          <div className="absolute bottom-12 left-12 right-12 p-6 rounded-2xl glass-card bg-slate-900/80 border border-slate-700/80 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-2 text-pulse-lime text-xs font-bold uppercase tracking-wider mb-2">
              <Dumbbell className="w-4 h-4" />
              <span>Multi-Facility Digital Access</span>
            </div>
            <h3 className="text-xl font-black text-white">
              6 Premium Zones. One Seamless Membership.
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Main Gym, Olympic Swimming Pool, Zen Yoga Sanctuary, Cardio Deck, and Performance Turf. Real-time turnstile sync & instant attendance tracking.
            </p>
            <div className="mt-4 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="text-white font-bold">1,248+ Active Members</span>
              <span>•</span>
              <span className="text-pulse-lime font-bold">4.9 ★ Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
        title="Reset Your Password"
        subtitle="We will send a secure password reset link to your registered email."
        icon={Mail}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Registered Email
            </label>
            <input
              type="email"
              required
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="narasimha@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-pulse-lime"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowForgotModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
