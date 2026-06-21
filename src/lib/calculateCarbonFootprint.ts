export type TransportMode = "car" | "motorcycle" | "public" | "bike";
export type FuelType = "petrol" | "diesel" | "electric" | "hybrid" | "none";
export type DairyLevel = "high" | "medium" | "low" | "none";
export type HeatingType = "electric" | "gas" | "none";

export interface CalculatorData {
  // Transportation
  primaryTransport: TransportMode;
  weeklyDistance: number; // in km
  fuelType: FuelType;
  shortFlights: number; // per year
  longFlights: number; // per year

  // Diet
  beefServings: number; // per week
  chickenServings: number; // per week
  fishServings: number; // per week
  dairyLevel: DairyLevel;

  // Home Energy
  householdSize: number;
  monthlyElectricityKWh: number; // in kWh
  heatingType: HeatingType;
  renewablePercentage: number; // 0-100
}

export interface CarbonBreakdown {
  transportation: number; // in kg CO2e
  diet: number; // in kg CO2e
  homeEnergy: number; // in kg CO2e
  total: number; // in kg CO2e
  totalTonnes: number; // in Tonnes CO2e
  comparisonPercentage: number; // relative to average
}

// Baseline: Average Indian per capita CO2 emissions is ~1.9 tonnes (1900 kg)
export const AVERAGE_ANNUAL_EMISSIONS_KG = 1900;

export function calculateCarbonFootprint(data: CalculatorData): CarbonBreakdown {
  // --- 1. Transportation ---
  // Source: IPCC (Intergovernmental Panel on Climate Change) Guidelines for National Greenhouse Gas Inventories
  // Emission factors per km (kg CO2e / km)
  const transportFactors: Record<TransportMode, Record<FuelType, number>> = {
    car: {
      petrol: 0.192,
      diesel: 0.171,
      hybrid: 0.109,
      electric: 0.053,
      none: 0,
    },
    motorcycle: {
      petrol: 0.103,
      diesel: 0.103, // assume similar
      electric: 0.02,
      hybrid: 0.05,
      none: 0,
    },
    public: {
      petrol: 0.105, // average bus
      diesel: 0.105,
      electric: 0.04, // electric bus / train
      hybrid: 0.08,
      none: 0.105, // fallback
    },
    bike: {
      petrol: 0, diesel: 0, electric: 0, hybrid: 0, none: 0
    }
  };

  const weeklyTransportEmissions = (Number(data.weeklyDistance) || 0) * (transportFactors[data.primaryTransport]?.[data.fuelType] || 0);
  const annualTransportEmissions = weeklyTransportEmissions * 52;

  // Flights (kg CO2e per flight)
  const shortFlightEmissions = (Number(data.shortFlights) || 0) * 150;
  const longFlightEmissions = (Number(data.longFlights) || 0) * 500;

  const totalTransportation = annualTransportEmissions + shortFlightEmissions + longFlightEmissions;


  // --- 2. Diet ---
  // Base plant-based diet emissions (grains, veg, fruit) ~400 kg CO2/year
  const baseDietEmissions = 400;

  // Servings to kg CO2 per week (1 serving = ~150g)
  // Beef: ~27 kg CO2/kg -> ~4 kg per serving
  // Chicken: ~6.9 kg CO2/kg -> ~1.0 kg per serving
  // Fish: ~5 kg CO2/kg -> ~0.75 kg per serving
  const weeklyMeatEmissions = 
    ((Number(data.beefServings) || 0) * 4) +
    ((Number(data.chickenServings) || 0) * 1.0) +
    ((Number(data.fishServings) || 0) * 0.75);
  
  const annualMeatEmissions = weeklyMeatEmissions * 52;

  const dairyEmissionsMap: Record<DairyLevel, number> = {
    high: 400,   // e.g., milk/cheese daily
    medium: 200, // a few times a week
    low: 50,     // rarely
    none: 0      // vegan
  };
  const annualDairyEmissions = dairyEmissionsMap[data.dairyLevel] || 0;

  const totalDiet = baseDietEmissions + annualMeatEmissions + annualDairyEmissions;


  // --- 3. Home Energy ---
  // Source: EPA (Environmental Protection Agency) / CEA (Central Electricity Authority, India)
  // India's average grid emission factor is approx 0.71 kg CO2e / kWh
  const gridEmissionFactor = 0.71; 
  const monthlyEnergyEmissions = (Number(data.monthlyElectricityKWh) || 0) * gridEmissionFactor;
  let annualEnergyEmissions = monthlyEnergyEmissions * 12;

  // Apply renewable percentage reduction
  const renewableFraction = (Number(data.renewablePercentage) || 0) / 100;
  annualEnergyEmissions = annualEnergyEmissions * (1 - renewableFraction);

  // Divide by household size to get per capita
  const householdSize = Math.max(1, Number(data.householdSize) || 1);
  const perCapitaEnergyEmissions = annualEnergyEmissions / householdSize;

  // Heating (if any extra beyond electricity)
  let heatingEmissions = 0;
  if (data.heatingType === 'gas') {
    // Rough estimate for gas heating per year per person
    heatingEmissions = 300 / householdSize; 
  }
  // If electric, it's assumed to be part of the monthly electricity bill

  const totalHomeEnergy = perCapitaEnergyEmissions + heatingEmissions;


  // --- Total & Breakdown ---
  const totalKg = totalTransportation + totalDiet + totalHomeEnergy;
  const totalTonnes = Number((totalKg / 1000).toFixed(2)) || 0;

  // Comparison to average (e.g., if total is 3800 kg, you are 100% worse than 1900 kg)
  const comparisonPercentage = Math.round(((totalKg - AVERAGE_ANNUAL_EMISSIONS_KG) / AVERAGE_ANNUAL_EMISSIONS_KG) * 100);

  return {
    transportation: Math.round(totalTransportation),
    diet: Math.round(totalDiet),
    homeEnergy: Math.round(totalHomeEnergy),
    total: Math.round(totalKg),
    totalTonnes,
    comparisonPercentage
  };
}
