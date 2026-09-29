/**
 * PulseFit Health Clubs — Subscription Service
 * Microservices Architecture Mapping:
 * Endpoint: GET /api/v1/subscriptions/{memberId}, POST /api/v1/subscriptions/renew, POST /api/v1/subscriptions/change-plan
 * Downstream Microservice: Subscription Service via Spring Cloud API Gateway (Port 8080)
 * Service Discovery: Netflix Eureka (EUREKA-SUBSCRIPTION-SERVICE)
 * Integration: Inter-service Feign Client to Member Service & Payment Gateway
 */

import { INITIAL_SUBSCRIPTION, INITIAL_RENEWAL_HISTORY, MEMBERSHIP_PLANS } from '../data/initialMockData';

const SUBSCRIPTION_STORAGE_KEY = 'pulsefit_active_subscription';
const RENEWAL_HISTORY_STORAGE_KEY = 'pulsefit_renewal_history';

export const subscriptionService = {
  /**
   * Fetch current subscription details
   */
  async getSubscription() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    try {
      const saved = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse subscription', e);
    }
    return INITIAL_SUBSCRIPTION;
  },

  /**
   * Fetch all available membership plans
   */
  async getPlans() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return MEMBERSHIP_PLANS;
  },

  /**
   * Fetch subscription renewal history
   */
  async getRenewalHistory() {
    await new Promise((resolve) => setTimeout(resolve, 150));
    try {
      const saved = localStorage.getItem(RENEWAL_HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse renewal history', e);
    }
    return INITIAL_RENEWAL_HISTORY;
  },

  /**
   * Change or activate a membership plan
   * @param {string} planId
   * @param {string} billingCycle
   */
  async changePlan(planId) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const targetPlan = MEMBERSHIP_PLANS.find((p) => p.id === planId) || MEMBERSHIP_PLANS[1];
    
    // Calculate new dates
    const today = new Date();
    const renewal = new Date();
    if (targetPlan.id === 'annual') {
      renewal.setFullYear(renewal.getFullYear() + 1);
    } else {
      renewal.setMonth(renewal.getMonth() + 1);
    }

    const formatDate = (d) => {
      const day = String(d.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const newSub = {
      planId: targetPlan.id,
      planName: `${targetPlan.name} PLAN`,
      status: "ACTIVE",
      startDate: formatDate(today),
      renewalDate: formatDate(renewal),
      price: targetPlan.numericPrice,
      billingCycle: targetPlan.cycle,
      currency: "₹",
      durationTotalDays: targetPlan.id === 'annual' ? 365 : 30,
      daysElapsed: 0,
      paymentMethod: "UPI AutoPay (Verified)",
      tier: targetPlan.name
    };

    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(newSub));

    // Also record in renewal history
    const history = await this.getRenewalHistory();
    const newEntry = {
      id: `RH-${Date.now().toString().slice(-4)}`,
      date: formatDate(today),
      plan: targetPlan.name,
      amount: `${targetPlan.price}`,
      status: "Renewed",
      invoiceNo: `PF-INV-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
    };
    const updatedHistory = [newEntry, ...history];
    localStorage.setItem(RENEWAL_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));

    return newSub;
  },

  /**
   * Renew current membership
   */
  async renewCurrentPlan() {
    await new Promise((resolve) => setTimeout(resolve, 350));
    const current = await this.getSubscription();
    
    // Extend by 30 days or 1 year
    const today = new Date();
    const renewal = new Date();
    if (current.planId === 'annual') {
      renewal.setFullYear(renewal.getFullYear() + 1);
    } else {
      renewal.setMonth(renewal.getMonth() + 1);
    }

    const formatDate = (d) => {
      const day = String(d.getDate()).padStart(2, '0');
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const updatedSub = {
      ...current,
      status: "ACTIVE",
      startDate: formatDate(today),
      renewalDate: formatDate(renewal),
      daysElapsed: 0
    };

    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(updatedSub));

    // Record renewal
    const history = await this.getRenewalHistory();
    const newEntry = {
      id: `RH-${Date.now().toString().slice(-4)}`,
      date: formatDate(today),
      plan: current.tier || "Premium",
      amount: `₹${current.price.toLocaleString('en-IN')}`,
      status: "Renewed",
      invoiceNo: `PF-INV-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`
    };
    const updatedHistory = [newEntry, ...history];
    localStorage.setItem(RENEWAL_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));

    return updatedSub;
  }
};
