/**
 * Health Statistics - Smoking-related statistics for Bangladesh
 * Source: .kiro/specs/03a-homepage-hero-pain.md (Section 3: Reality)
 */

export const healthStats = {
  // Annual cost of smoking (in BDT)
  annualCost: 72000,
  
  // Minutes of life lost per cigarette
  minutesPerCigarette: 11,
  
  // Percentage of Bangladeshi men who smoke
  bangladeshSmokerPercent: 40,
  
  // Annual tobacco-related deaths in Bangladesh
  annualDeaths: 161000,
  
  // Average years of life lost for smokers
  yearsLost: 10,
  
  // Daily cost (one pack)
  dailyCost: 200,
  
  // Weekly cost
  weeklyCost: 1400,
  
  // Monthly cost
  monthlyCost: 6000,
} as const;

export type HealthStats = typeof healthStats;
