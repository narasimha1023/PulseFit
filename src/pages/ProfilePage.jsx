import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { PROJECT_METADATA } from '../data/initialMockData';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  CheckCircle2,
  Edit3,
  X,
  Save,
  QrCode,
  Shield,
  Award,
  Users,
  MapPin,
  Flame
} from 'lucide-react';

export const ProfilePage = () => {
  const { user, updateCurrentUser } = useAuth();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fitnessGoals: '',
    emergencyContact: '',
    homeClub: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || 'Narasimha Reddy',
        email: user.email || 'narasimha@example.com',
        phone: user.phone || '9876543210',
        fitnessGoals: user.fitnessGoals || 'Hypertrophy & Functional Endurance',
        emergencyContact: user.emergencyContact || '+91 98765 43211',
        homeClub: user.homeClub || 'PulseFit Main Gym — Downtown'
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateCurrentUser(formData);
      showToast('Profile updated successfully!', 'success');
      setIsEditing(false);
    } catch (err) {
      showToast('Failed to save profile changes.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name || 'Narasimha Reddy',
        email: user.email || 'narasimha@example.com',
        phone: user.phone || '9876543210',
        fitnessGoals: user.fitnessGoals || 'Hypertrophy & Functional Endurance',
        emergencyContact: user.emergencyContact || '+91 98765 43211',
        homeClub: user.homeClub || 'PulseFit Main Gym — Downtown'
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-pulse-lime" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Profile
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Personal identity credentials, digital club pass, and membership details.
          </p>
        </div>

        {!isEditing && (
          <Button
            variant="primary"
            size="md"
            icon={Edit3}
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Digital Pass & Avatar Card */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-800 text-center relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-pulse-lime/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden border-2 border-pulse-lime/50 mb-4 shadow-glow-lime">
              <img
                src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-xl font-extrabold text-white">{formData.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{formData.email}</p>

            <div className="mt-3 flex justify-center">
              <Badge variant="lime" size="sm">
                {user?.status || 'ACTIVE'} MEMBER
              </Badge>
            </div>

            {/* Member ID Pill */}
            <div className="mt-5 p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Member Turnstile ID
              </p>
              <p className="text-base font-mono font-bold text-pulse-cyan mt-0.5">
                {user?.memberId || 'PF-2400032664'}
              </p>
            </div>

            {/* Digital Gym Pass QR Simulation */}
            <div className="mt-5 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center">
              <div className="p-3 bg-white rounded-xl shadow-inner mb-2">
                <QrCode className="w-24 h-24 text-slate-950" />
              </div>
              <span className="text-[11px] font-mono text-pulse-lime font-bold">
                Scan for Turnstile Entry
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                NFC & Barcode Turnstile Compatible
              </span>
            </div>
          </div>

          {/* Academic Attribution Card */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-pulse-lime" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Project Creators (PS023)
              </h3>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                <p className="font-bold text-white">T. Narasimha Reddy</p>
                <p className="text-[11px] font-mono text-pulse-lime">2400032664</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                <p className="font-bold text-white">V. Siddardha</p>
                <p className="text-[11px] font-mono text-pulse-cyan">2400030756</p>
              </div>
              <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                <p className="font-bold text-white">B. Mahesh Babu</p>
                <p className="text-[11px] font-mono text-purple-400">2400031737</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Information Form */}
        <div className="lg:col-span-2">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Personal Information</h3>
                <p className="text-xs text-slate-400">
                  {isEditing ? 'Modify your member profile details below.' : 'Official membership profile records.'}
                </p>
              </div>
              {isEditing && (
                <span className="text-xs font-mono text-pulse-lime px-2.5 py-1 rounded-md bg-pulse-lime/10 border border-pulse-lime/30 animate-pulse">
                  Edit Mode Active
                </span>
              )}
            </div>

            <form onSubmit={handleSave} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      disabled={!isEditing}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      disabled={!isEditing}
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      name="phone"
                      disabled={!isEditing}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                    />
                  </div>
                </div>

                {/* Member ID (Read-only) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Member ID
                  </label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      disabled
                      value={user?.memberId || 'PF-2400032664'}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-sm font-mono text-pulse-cyan opacity-80 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Home Club */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Home Club Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="homeClub"
                      disabled={!isEditing}
                      value={formData.homeClub}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Emergency Contact
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="emergencyContact"
                      disabled={!isEditing}
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Fitness Goals */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Fitness Objectives & Coaching Notes
                </label>
                <textarea
                  name="fitnessGoals"
                  rows={3}
                  disabled={!isEditing}
                  value={formData.fitnessGoals}
                  onChange={handleInputChange}
                  className="w-full p-3.5 rounded-xl bg-slate-900/80 border border-slate-700 text-sm text-white disabled:opacity-75 disabled:cursor-not-allowed focus:outline-none focus:border-pulse-lime transition-all"
                />
              </div>

              {/* Edit Controls: Save Changes & Cancel */}
              {isEditing && (
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                  <Button
                    type="button"
                    variant="ghost"
                    size="md"
                    icon={X}
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSaving}
                    icon={Save}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
