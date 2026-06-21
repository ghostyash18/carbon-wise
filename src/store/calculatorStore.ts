import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";

// NOTE: Using localStorage + Zustand instead of Prisma for demo purposes.
// This ensures the application works purely client-side without requiring a database connection.

interface CalculatorState {
  data: CalculatorData;
  currentStep: number;
  calculationCount: number;
  userPledges: any[];
  calculationHistory: any[];
  setData: (data: Partial<CalculatorData>) => void;
  setStep: (step: number) => void;
  incrementCalculationCount: () => void;
  reset: () => void;
  addPledge: (pledge: any) => void;
  updatePledge: (id: string, isCompleted: boolean) => void;
  addCalculation: (calc: any) => void;
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
    }),
    {
      name: "carbon-wise-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage),
    }
  )
);
