import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { attendanceService } from '../services/attendanceService';
import { facilityService } from '../services/facilityService';
import { INITIAL_NOTIFICATIONS, INITIAL_RECENT_ACTIVITY } from '../data/initialMockData';
import { useToast } from './ToastContext';

const FitnessContext = createContext(null);
const NOTIF_STORAGE_KEY = 'pulsefit_notifications';
const ACTIVITY_STORAGE_KEY = 'pulsefit_recent_activity';

export const FitnessProvider = ({ children }) => {
  const { showToast } = useToast();

  const [subscription, setSubscription] = useState(null);
  const [attendanceStats, setAttendanceStats] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data from services
  useEffect(() => {
    const loadFitnessData = async () => {
      try {
        const [sub, stats, hist, facs] = await Promise.all([
          subscriptionService.getSubscription(),
          attendanceService.getStats(),
          attendanceService.getHistory(),
          facilityService.getFacilities()
        ]);

        setSubscription(sub);
        setAttendanceStats(stats);
        setAttendanceHistory(hist);
        setFacilities(facs);

        // Load notifications
        const savedNotifs = localStorage.getItem(NOTIF_STORAGE_KEY);
        setNotifications(savedNotifs ? JSON.parse(savedNotifs) : INITIAL_NOTIFICATIONS);

        // Load recent activities
        const savedActivity = localStorage.getItem(ACTIVITY_STORAGE_KEY);
        setRecentActivity(savedActivity ? JSON.parse(savedActivity) : INITIAL_RECENT_ACTIVITY);
      } catch (err) {
        console.error('Failed to load fitness context', err);
      } finally {
        setLoading(false);
      }
    };

    loadFitnessData();
  }, []);

  // Check in action
  const performCheckIn = async (facilityName = 'Main Gym') => {
    try {
      const result = await attendanceService.checkIn(facilityName);
      setAttendanceHistory((prev) => [result.record, ...prev]);
      setAttendanceStats(result.stats);

      // Create new activity entry
      const newAct = {
        id: `act-${Date.now()}`,
        type: 'checkin',
        title: 'Gym Check-in',
        description: `Checked in at ${facilityName}`,
        time: 'Just now',
        badge: 'Check-in'
      };
      setRecentActivity((prev) => {
        const updated = [newAct, ...prev.slice(0, 5)];
        localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      // Add notification
      const newNotif = {
        id: `notif-${Date.now()}`,
        title: 'Check-in Confirmed',
        message: `Check-in successful at ${facilityName} at ${result.record.checkIn}. Have an energizing session!`,
        time: 'Just now',
        read: false,
        type: 'success'
      };
      setNotifications((prev) => {
        const updated = [newNotif, ...prev];
        localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      showToast(`Check-in successful at ${facilityName}! (Time: ${result.record.checkIn})`, 'success');
      return result;
    } catch (err) {
      showToast('Check-in failed. Please try again.', 'error');
      throw err;
    }
  };

  // Choose / Change Plan
  const choosePlan = async (planId) => {
    try {
      const updatedSub = await subscriptionService.changePlan(planId);
      setSubscription(updatedSub);

      const newAct = {
        id: `act-${Date.now()}`,
        type: 'plan',
        title: `${updatedSub.tier} plan activated`,
        description: `Upgraded to ${updatedSub.planName}`,
        time: 'Just now',
        badge: 'Membership'
      };
      setRecentActivity((prev) => {
        const updated = [newAct, ...prev.slice(0, 5)];
        localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      showToast(`Congratulations! ${updatedSub.tier} plan activated successfully.`, 'success');
      return updatedSub;
    } catch (err) {
      showToast('Failed to change plan.', 'error');
      throw err;
    }
  };

  // Renew Plan
  const renewPlan = async () => {
    try {
      const renewedSub = await subscriptionService.renewCurrentPlan();
      setSubscription(renewedSub);

      const newAct = {
        id: `act-${Date.now()}`,
        type: 'renewal',
        title: 'Membership renewed',
        description: `${renewedSub.tier} plan renewed successfully until ${renewedSub.renewalDate}`,
        time: 'Just now',
        badge: 'Billing'
      };
      setRecentActivity((prev) => {
        const updated = [newAct, ...prev.slice(0, 5)];
        localStorage.setItem(ACTIVITY_STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });

      showToast(`Membership renewed successfully until ${renewedSub.renewalDate}!`, 'success');
      return renewedSub;
    } catch (err) {
      showToast('Failed to renew membership.', 'error');
      throw err;
    }
  };

  // Notification management
  const markNotificationAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem(NOTIF_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
    showToast('All notifications marked as read', 'info');
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <FitnessContext.Provider
      value={{
        subscription,
        attendanceStats,
        attendanceHistory,
        facilities,
        notifications,
        recentActivity,
        loading,
        performCheckIn,
        choosePlan,
        renewPlan,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadNotificationsCount
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
