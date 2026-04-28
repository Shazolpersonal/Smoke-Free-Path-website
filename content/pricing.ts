/**
 * Pricing Configuration
 * Source: .kiro/specs/03a-homepage-hero-pain.md (Section 1: Hero)
 */

export const pricing = {
  // Original price (before discount)
  original: 963,
  
  // Launch price (discounted)
  launch: 369,
  
  // Customer limit for launch pricing
  customerLimit: 963,
  
  // Currency symbol
  currency: "৳",
  
  // Discount percentage (calculated)
  discount: Math.round((1 - 369 / 963) * 100), // 62%
  
  // Days in the promise period
  promiseDays: 41,
} as const;

export type Pricing = typeof pricing;
