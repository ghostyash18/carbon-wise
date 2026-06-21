import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CarbonCalculator } from '@/components/carbon-calculator/calculator';

// Mock Zustand
jest.mock('@/store/calculatorStore', () => ({
  useCalculatorStore: () => ({
    data: {
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
    },
    currentStep: 1,
    setData: jest.fn(),
    setStep: jest.fn(),
    reset: jest.fn()
  }),
}));

// Mock Translation hook
jest.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => <>{children}</>,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
  };
});

describe('Carbon Calculator Integration', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders step 1 (Transportation) initially', async () => {
    render(<CarbonCalculator />);
    
    // Should wait for hydration
    await waitFor(() => {
      expect(screen.getByText('calculator.transport.title')).toBeInTheDocument();
    });
  });
});
