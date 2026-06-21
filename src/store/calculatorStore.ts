import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";

// NOTE: Using localStorage + Zustand instead of Prisma for demo purposes.
// This ensures the application works purely client-side without requiring a database connection.

export interface IPledge {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
}

export interface ICalculationResult {
  id: string;
  totalFootprint: number;
  categoryData: CalculatorData;
  createdAt: Date;
}

export interface IDailyAction {
  id: string;
  title: string;
  points: number;
  isCompleted: boolean;
  date: string;
}

interface CalculatorState {
  data: CalculatorData;
  currentStep: number;
  calculationCount: number;
  userPledges: IPledge[];
  calculationHistory: ICalculationResult[];
  dailyActions: IDailyAction[];
  streak: number;
  totalPoints: number;
  setData: (data: Partial<CalculatorData>) => void;
  setStep: (step: number) => void;
  incrementCalculationCount: () => void;
  reset: () => void;
  addPledge: (pledge: IPledge) => void;
  updatePledge: (id: string, isCompleted: boolean) => void;
  addCalculation: (calc: ICalculationResult) => void;
  toggleDailyAction: (id: string, date: string) => void;
  initializeDailyActions: () => void;
}

const initialData: CalculatorData = {
  primaryTransport: "public",
  weeklyDistance: 50,
  fuelType: "none",
  shortFlights: 0,
  longFlights: 0,
  beefServings: 0,
  chickenServings: 2,
  fishServings: 1,
  dairyLevel: "medium",
  householdSize: 2,
  monthlyElectricityKWh: 150,
  heatingType: "none",
  renewablePercentage: 0,
};

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      data: initialData,
      currentStep: 1,
      calculationCount: 0,
      userPledges: [],
      calculationHistory: [],
      dailyActions: [],
      streak: 0,
      totalPoints: 0,
      setData: (newData) =>
        set((state) => ({
          data: { ...state.data, ...newData },
        })),
      setStep: (step) => set({ currentStep: step }),
      incrementCalculationCount: () => set((state) => ({ calculationCount: state.calculationCount + 1 })),
      reset: () => set({ data: initialData, currentStep: 1 }),
      addPledge: (pledge) => set((state) => ({ userPledges: [...state.userPledges, pledge] })),
      updatePledge: (id, isCompleted) => set((state) => ({
        userPledges: state.userPledges.map(p => p.id === id ? { ...p, isCompleted } : p)
      })),
      addCalculation: (calc) => set((state) => ({ calculationHistory: [calc, ...state.calculationHistory] })),
      toggleDailyAction: (id, date) => set((state) => {
        const action = state.dailyActions.find(a => a.id === id && a.date === date);
        if (!action) return state;
        
        const isCompleting = !action.isCompleted;
        const newPoints = isCompleting ? state.totalPoints + action.points : state.totalPoints - action.points;
        
        return {
          totalPoints: Math.max(0, newPoints),
          dailyActions: state.dailyActions.map(a => 
            (a.id === id && a.date === date) ? { ...a, isCompleted: isCompleting } : a
          )
        };
      }),
      initializeDailyActions: () => set((state) => {
        const today = new Date().toISOString().split('T')[0];
        const hasToday = state.dailyActions.some(a => a.date === today);
        if (hasToday) return state;

        const newActions: IDailyAction[] = [
          { id: '1', title: 'Used public transit or walked', points: 10, isCompleted: false, date: today },
          { id: '2', title: 'Ate a plant-based meal', points: 15, isCompleted: false, date: today },
          { id: '3', title: 'Switched off unused lights', points: 5, isCompleted: false, date: today }
        ];

        // Basic streak logic
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        const yesterdayCompleted = state.dailyActions.some(a => a.date === yesterday && a.isCompleted);
        
        return {
          dailyActions: [...newActions, ...state.dailyActions].slice(0, 30), // keep last 30 days
          streak: yesterdayCompleted ? state.streak + 1 : 0
        };
      }),
    }),
    {
      name: "carbon-wise-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
