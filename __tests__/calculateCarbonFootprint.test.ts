import { calculateCarbonFootprint, CalculatorData } from '@/lib/calculateCarbonFootprint';

describe('Carbon Footprint Calculator Logic', () => {
  const baseData: CalculatorData = {
    primaryTransport: 'none',
    weeklyDistance: 0,
    fuelType: 'none',
    shortFlights: 0,
    longFlights: 0,
    beefServings: 0,
    chickenServings: 0,
    fishServings: 0,
    dairyLevel: 'none',
    householdSize: 1,
    monthlyElectricityKWh: 0,
    heatingType: 'none',
    renewablePercentage: 0
  };

  it('calculates the baseline vegan, no-travel, no-energy footprint correctly', () => {
    const result = calculateCarbonFootprint(baseData);
    // Baseline vegan diet = 400kg. Transportation = 0, Energy = 0.
    expect(result.total).toBe(400);
    expect(result.diet).toBe(400);
    expect(result.transportation).toBe(0);
    expect(result.homeEnergy).toBe(0);
  });

  it('calculates transportation emissions accurately for a petrol car', () => {
    const data: CalculatorData = { ...baseData, primaryTransport: 'car', fuelType: 'petrol', weeklyDistance: 100 };
    const result = calculateCarbonFootprint(data);
    
    // 100km * 0.192 kgCO2/km * 52 weeks = 998.4 kg
    expect(result.transportation).toBeCloseTo(998); // using Math.round internally
  });

  it('calculates flight emissions correctly', () => {
    const data: CalculatorData = { ...baseData, shortFlights: 2, longFlights: 1 };
    const result = calculateCarbonFootprint(data);
    
    // 2 * 150 + 1 * 500 = 800 kg
    expect(result.transportation).toBe(800);
  });

  it('calculates high meat and dairy diet emissions correctly', () => {
    const data: CalculatorData = { ...baseData, beefServings: 3, chickenServings: 5, fishServings: 2, dairyLevel: 'high' };
    const result = calculateCarbonFootprint(data);
    
    // Beef: 3 * 4kg = 12kg/week
    // Chicken: 5 * 1kg = 5kg/week
    // Fish: 2 * 0.75kg = 1.5kg/week
    // Total meat/week = 18.5kg/week => 962kg/year
    // Dairy: High = 400kg/year
    // Base plant = 400kg/year
    // Total = 400 + 962 + 400 = 1762 kg
    expect(result.diet).toBe(1762);
  });

  it('calculates home energy with renewable percentage reduction correctly', () => {
    const data: CalculatorData = { 
      ...baseData, 
      monthlyElectricityKWh: 200, 
      householdSize: 2, 
      renewablePercentage: 50 
    };
    const result = calculateCarbonFootprint(data);
    
    // 200 * 0.71 = 142 kg/month
    // 142 * 12 = 1704 kg/year
    // 50% renewable -> 1704 * 0.5 = 852 kg/year total household
    // Per capita (size 2) = 426 kg
    expect(result.homeEnergy).toBe(426);
  });

  it('handles gas heating correctly', () => {
    const data: CalculatorData = { 
      ...baseData, 
      heatingType: 'gas',
      householdSize: 3 
    };
    const result = calculateCarbonFootprint(data);
    
    // Gas = 300 / 3 = 100 kg
    expect(result.homeEnergy).toBe(100);
  });
});
