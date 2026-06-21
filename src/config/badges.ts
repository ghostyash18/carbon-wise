import { CalculatorData, calculateCarbonFootprint, AVERAGE_ANNUAL_EMISSIONS_KG } from "@/lib/calculateCarbonFootprint";
import { Train, Leaf, Zap, Plane, ShieldCheck, Flag, Target, Recycle } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface BadgeUnlockResult {
  unlocked: boolean;
  progress: number;
}

export interface BadgeConfig {
  id: string;
  name: string;
  description: string;
  category: "Transport" | "Diet" | "Energy" | "General";
  icon: LucideIcon;
  unlockCondition: (data: CalculatorData, calculationCount: number) => BadgeUnlockResult;
}

export const badges: BadgeConfig[] = [
  {
    id: "first-step",
    name: "First Step",
    description: "Completed the carbon footprint calculator for the first time.",
    category: "General",
    icon: Flag,
    unlockCondition: (data, count) => ({
      unlocked: count >= 1,
      progress: count >= 1 ? 100 : 0,
    }),
  },
  {
    id: "consistent-tracker",
    name: "Consistent Tracker",
    description: "Calculated footprint 3 times to track progress.",
    category: "General",
    icon: Target,
    unlockCondition: (data, count) => ({
      unlocked: count >= 3,
      progress: Math.min((count / 3) * 100, 100),
    }),
  },
  {
    id: "carbon-warrior",
    name: "Carbon Warrior",
    description: "Total footprint is below the national average.",
    category: "General",
    icon: ShieldCheck,
    unlockCondition: (data, count) => {
      const results = calculateCarbonFootprint(data);
      const isBelow = results.total < AVERAGE_ANNUAL_EMISSIONS_KG;
      return {
        unlocked: isBelow && count > 0,
        progress: count > 0 ? (isBelow ? 100 : 50) : 0,
      };
    },
  },
  {
    id: "public-transit-hero",
    name: "Public Transit Hero",
    description: "Primary transport is public transit or walking/biking.",
    category: "Transport",
    icon: Train,
    unlockCondition: (data, count) => {
      const isHero = data.primaryTransport === "public" || data.primaryTransport === "bike";
      return {
        unlocked: isHero && count > 0,
        progress: count > 0 ? (isHero ? 100 : 25) : 0,
      };
    },
  },
  {
    id: "flight-minimalist",
    name: "Flight Minimalist",
    description: "Zero long-haul flights and less than 2 short flights.",
    category: "Transport",
    icon: Plane,
    unlockCondition: (data, count) => {
      const isMinimalist = data.longFlights === 0 && data.shortFlights <= 1;
      return {
        unlocked: isMinimalist && count > 0,
        progress: count > 0 ? (isMinimalist ? 100 : 50) : 0,
      };
    },
  },
  {
    id: "plant-pioneer",
    name: "Plant-Based Pioneer",
    description: "Consumes very low or zero meat.",
    category: "Diet",
    icon: Leaf,
    unlockCondition: (data, count) => {
      const totalMeat = data.beefServings + data.chickenServings + data.fishServings;
      const isPioneer = totalMeat <= 2;
      return {
        unlocked: isPioneer && count > 0,
        progress: count > 0 ? (isPioneer ? 100 : Math.max(100 - (totalMeat * 10), 0)) : 0,
      };
    },
  },
  {
    id: "energy-saver",
    name: "Energy Saver",
    description: "Electricity usage below 100 kWh or high renewable use.",
    category: "Energy",
    icon: Zap,
    unlockCondition: (data, count) => {
      const isSaver = data.monthlyElectricityKWh <= 100 || data.renewablePercentage >= 50;
      return {
        unlocked: isSaver && count > 0,
        progress: count > 0 ? (isSaver ? 100 : 40) : 0,
      };
    },
  },
  {
    id: "zero-waste-advocate",
    name: "Eco Conscious",
    description: "A balanced footprint across all major categories.",
    category: "General",
    icon: Recycle,
    unlockCondition: (data, count) => {
      const results = calculateCarbonFootprint(data);
      const isBalanced = results.transportation < 800 && results.diet < 800 && results.homeEnergy < 800;
      return {
        unlocked: isBalanced && count > 0,
        progress: count > 0 ? (isBalanced ? 100 : 60) : 0,
      };
    },
  },
];
