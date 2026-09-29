/**
 * PulseFit Health Clubs — Member Service
 * Microservices Architecture Mapping:
 * Endpoint: GET /api/v1/members/{id}, PUT /api/v1/members/{id}
 * Downstream Microservice: Member Service via Spring Cloud API Gateway (Port 8080)
 * Service Discovery: Netflix Eureka (EUREKA-MEMBER-SERVICE)
 * Database Entity: MemberEntity (JPA/MySQL: id, name, email, phone, member_id, status, joined_date)
 */

import { INITIAL_USER } from '../data/initialMockData';

const MEMBER_STORAGE_KEY = 'pulsefit_member_profile';

export const memberService = {
  /**
   * Fetch member profile by ID
   * @param {string} memberId
   * @returns {Promise<Object>}
   */
  async getProfile(memberId = 'PF-2400032664') {
    await new Promise((resolve) => setTimeout(resolve, 150));
    try {
      const saved = localStorage.getItem(MEMBER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse member profile', e);
    }
    return INITIAL_USER;
  },

  /**
   * Update member profile
   * @param {Object} updatedFields
   * @returns {Promise<Object>}
   */
  async updateProfile(updatedFields) {
    await new Promise((resolve) => setTimeout(resolve, 250));
    const current = await this.getProfile();
    const updated = {
      ...current,
      ...updatedFields,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(MEMBER_STORAGE_KEY, JSON.stringify(updated));
    // Also sync to auth user session
    localStorage.setItem('pulsefit_auth_user', JSON.stringify(updated));
    return updated;
  }
};
