/**
 * PulseFit Health Clubs — Attendance Service
 * Microservices Architecture Mapping:
 * Endpoint: GET /api/v1/attendance/{memberId}, POST /api/v1/attendance/check-in, GET /api/v1/attendance/stats
 * Downstream Microservice: Attendance Service via Spring Cloud API Gateway (Port 8080)
 * Service Discovery: Netflix Eureka (EUREKA-ATTENDANCE-SERVICE)
 * High-Throughput Turnstile & NFC integration point
 */

import { INITIAL_ATTENDANCE_STATS, INITIAL_ATTENDANCE_HISTORY, WEEKLY_ATTENDANCE_DATA } from '../data/initialMockData';

const ATTENDANCE_HISTORY_STORAGE_KEY = 'pulsefit_attendance_history';
const ATTENDANCE_STATS_STORAGE_KEY = 'pulsefit_attendance_stats';

export const attendanceService = {
  /**
   * Fetch member attendance summary statistics
   */
  async getStats() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    try {
      const saved = localStorage.getItem(ATTENDANCE_STATS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse attendance stats', e);
    }
    return INITIAL_ATTENDANCE_STATS;
  },

  /**
   * Fetch attendance logs history
   */
  async getHistory() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    try {
      const saved = localStorage.getItem(ATTENDANCE_HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse attendance history', e);
    }
    return INITIAL_ATTENDANCE_HISTORY;
  },

  /**
   * Perform facility check-in
   * @param {string} facilityName
   * @returns {Promise<Object>}
   */
  async checkIn(facilityName = 'Main Gym') {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const now = new Date();
    
    // Format check-in time e.g., "07:30 AM"
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;

    // Format date e.g., "21 Sep 2026"
    const day = String(now.getDate()).padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dateStr = `${day} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newRecord = {
      id: `att-${Date.now()}`,
      date: dateStr,
      facility: facilityName,
      checkIn: timeStr,
      checkOut: "In Progress",
      duration: "Active Session",
      status: "In Progress",
      badgeColor: "amber"
    };

    const currentHistory = await this.getHistory();
    const updatedHistory = [newRecord, ...currentHistory];
    localStorage.setItem(ATTENDANCE_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));

    // Update stats
    const currentStats = await this.getStats();
    const updatedStats = {
      ...currentStats,
      totalVisits: currentStats.totalVisits + 1,
      thisMonth: currentStats.thisMonth + 1,
      thisWeek: currentStats.thisWeek + 1,
      favoriteFacility: facilityName
    };
    localStorage.setItem(ATTENDANCE_STATS_STORAGE_KEY, JSON.stringify(updatedStats));

    return {
      record: newRecord,
      stats: updatedStats
    };
  },

  /**
   * Fetch attendance chart data
   */
  async getWeeklyChart() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return WEEKLY_ATTENDANCE_DATA;
  }
};
