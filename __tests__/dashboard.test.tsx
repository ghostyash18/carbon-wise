import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { name: 'Eco Warrior' } },
    status: 'authenticated',
  }),
}));

// Mock recharts because its responsive containers fail in JSDOM environments without proper stubs
jest.mock('recharts', () => {
  const OriginalRechartsModule = jest.requireActual('recharts');
  return {
    ...OriginalRechartsModule,
    ResponsiveContainer: ({ children }: any) => (
      <div style={{ width: '100%', height: '300px' }}>
        {children}
      </div>
    ),
  };
});

// Mock Zustand store
const mockInitializeDailyActions = jest.fn();
const mockToggleDailyAction = jest.fn();
jest.mock('@/store/calculatorStore', () => ({
  useCalculatorStore: () => ({
    calculationHistory: [
      { id: '1', date: new Date().toISOString(), data: {}, result: { total: 4000, transportation: 1000, diet: 1000, homeEnergy: 2000, totalTonnes: 4.0, comparisonPercentage: 100 } }
    ],
    userPledges: [],
    calculationCount: 1,
    dailyActions: [],
    streak: 0,
    totalPoints: 0,
    initializeDailyActions: mockInitializeDailyActions,
    toggleDailyAction: mockToggleDailyAction,
  }),
}));

describe('Dashboard Component Rendering', () => {
  it('renders dashboard with historical data safely', () => {
    render(<DashboardPage />);
    
    // Check if main metrics render
    expect(screen.getByText('Latest Score')).toBeInTheDocument();
    expect(screen.getByText('Total Calculations')).toBeInTheDocument();
  });
});
