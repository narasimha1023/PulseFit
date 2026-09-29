/**
 * PulseFit Health Clubs — Authentication Service
 * Microservices Architecture Mapping:
 * Endpoint: POST /api/v1/auth/login, POST /api/v1/auth/logout, GET /api/v1/auth/me
 * Downstream Microservice: Auth Service via Spring Cloud API Gateway (Port 8080)
 * Service Discovery: Netflix Eureka (EUREKA-AUTH-SERVICE)
 * Security: JSON Web Token (JWT) with Bearer Authentication
 */

import { INITIAL_USER } from '../data/initialMockData';

const AUTH_STORAGE_KEY = 'pulsefit_auth_user';
const TOKEN_STORAGE_KEY = 'pulsefit_jwt_token';

export const authService = {
  /**
   * Log in member with credentials or demo access
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ user: Object, token: string }>}
   */
  async login(email, password) {
    // Simulate network latency (200ms)
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Get existing saved user or fallback to initial
    let storedUser = null;
    try {
      const item = localStorage.getItem(AUTH_STORAGE_KEY);
      storedUser = item ? JSON.parse(item) : null;
    } catch {
      storedUser = null;
    }

    const activeUser = storedUser || INITIAL_USER;
    const mockToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(JSON.stringify({ sub: activeUser.id, role: 'MEMBER' }))}.mockSignaturePulseFit2026`;

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeUser));
    localStorage.setItem(TOKEN_STORAGE_KEY, mockToken);

    return {
      user: activeUser,
      token: mockToken
    };
  },

  /**
   * Log out current session
   * @returns {Promise<void>}
   */
  async logout() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },

  /**
   * Get current authenticated user session
   * @returns {Promise<Object|null>}
   */
  async getCurrentUser() {
    try {
      const item = localStorage.getItem(AUTH_STORAGE_KEY);
      return item ? JSON.parse(item) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  },

  /**
   * Check if token is present
   */
  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_STORAGE_KEY);
  }
};
