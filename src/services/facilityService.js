/**
 * PulseFit Health Clubs — Facility Service
 * Microservices Architecture Mapping:
 * Endpoint: GET /api/v1/facilities, GET /api/v1/facilities/{id}
 * Downstream Microservice: Facility & Resource Service via Spring Cloud API Gateway
 * Service Discovery: Netflix Eureka (EUREKA-FACILITY-SERVICE)
 */

import { FACILITIES } from '../data/initialMockData';

export const facilityService = {
  /**
   * Get all club facilities
   */
  async getFacilities() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    return FACILITIES;
  },

  /**
   * Get facility details by ID
   * @param {string} id
   */
  async getFacilityById(id) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return FACILITIES.find((f) => f.id === id) || null;
  }
};
