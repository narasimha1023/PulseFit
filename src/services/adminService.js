/**
 * PulseFit Health Clubs — Admin & Analytics Service
 * Microservices Architecture Mapping:
 * Endpoint: GET /api/v1/admin/kpis, GET /api/v1/admin/analytics/facilities, GET /api/v1/admin/members
 * Downstream Microservice: Analytics & Reporting Aggregator Service
 * Service Discovery: Netflix Eureka (EUREKA-ADMIN-AGGREGATOR)
 */

import { ADMIN_STATS, FACILITY_USAGE_ANALYTICS, ADMIN_MEMBERS } from '../data/initialMockData';

export const adminService = {
  /**
   * Fetch top-level platform KPIs
   */
  async getKpis() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return ADMIN_STATS;
  },

  /**
   * Fetch facility usage comparison analytics
   */
  async getFacilityAnalytics() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return FACILITY_USAGE_ANALYTICS;
  },

  /**
   * Fetch list of members for administrative management
   */
  async getMembers() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return ADMIN_MEMBERS;
  },

  /**
   * Fetch members with expiring or expired memberships
   */
  async getExpiringMembers() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return ADMIN_MEMBERS.filter((m) => m.statusType === 'expiring' || m.statusType === 'expired');
  }
};
