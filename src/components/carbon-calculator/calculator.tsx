"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StepTransportation } from "./step-transportation";
import { StepDiet } from "./step-diet";
import { StepHomeEnergy } from "./step-home-energy";
import { StepResults } from "./step-results";
import { Leaf } from "lucide-react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { useTranslation } from "@/hooks/useTranslation";

const calculatorSchema = z.object({
  primaryTransport: z.enum(["car", "motorcycle", "public", "bike"]),
  weeklyDistance: z.number().min(0, "Distance must be 0 or more").default(0),
  fuelType: z.enum(["petrol", "diesel", "electric", "hybrid", "none"]),
  shortFlights: z.number().min(0).default(0),
  longFlights: z.number().min(0).default(0),
  beefServings: z.number().min(0).max(21).default(0),
  chickenServings: z.number().min(0).max(21).default(0),
  fishServings: z.number().min(0).max(21).default(0),
  dairyLevel: z.enum(["high", "medium", "low", "none"]),
  householdSize: z.number().min(1).max(20).default(1),
  monthlyElectricityKWh: z.number().min(0).default(0),
  heatingType: z.enum(["electric", "gas", "none"]),
  renewablePercentage: z.number().min(0).max(100).default(0),
});

const STEPS = 4;

export function CarbonCalculator() {
  const { data: storeData, currentStep, setData, setStep, reset: resetStore } = useCalculatorStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation();

  const methods = useForm<CalculatorData>({
    resolver: zodResolver(calculatorSchema) as any,
    defaultValues: storeData,
    mode: "onChange",
  });

  // Handle hydration for Zustand persist
  useEffect(() => {
    try {
      if (storeData) {
        // Validate storeData against schema before using to prevent crashes from corrupted localStorage
        const validatedData = calculatorSchema.parse(storeData);
        methods.reset(validatedData);
      } else {
        methods.reset();
      }
    } catch (e) {
      console.warn("Corrupted calculator state found, resetting to defaults", e);
      methods.reset();
      resetStore();
    }
    setIsLoaded(true);
  }, [storeData, methods, resetStore]); // Run only once on mount to hydrate the form with persisted store data

  const handleNext = useCallback(async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await methods.trigger(fieldsToValidate as any);
    
    if (isStepValid && currentStep < STEPS) {
      setData(methods.getValues()); // sync to global store
      if (currentStep === 3) {
        // Increment calculation count when finishing the last form step (step 3 to step 4)
        useCalculatorStore.getState().incrementCalculationCount();
      }
      setStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, methods, setData, setStep]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, setStep]);

  const getFieldsForStep = (step: number): string[] => {
    switch (step) {
      case 1: return ["primaryTransport", "weeklyDistance", "fuelType", "shortFlights", "longFlights"];
      case 2: return ["beefServings", "chickenServings", "fishServings", "dairyLevel"];
      case 3: return ["householdSize", "monthlyElectricityKWh", "heatingType", "renewablePercentage"];
      default: return [];
    }
  };

  if (!isLoaded) return <div className="h-96 flex items-center justify-center" aria-live="polite"><Leaf className="h-8 w-8 text-primary animate-pulse" /></div>;

  const progressPercentage = Math.round((currentStep / (STEPS - 1)) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      {currentStep < STEPS && (
        <div className="mb-8 space-y-4" role="region" aria-label="Progress">
          <div className="flex justify-between items-center text-sm font-medium">
            <span className="text-muted-foreground">{t("calculator.step_of", { current: currentStep, total: STEPS - 1 })}</span>
            <span className="text-primary">{t("calculator.completed", { percent: progressPercentage })}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" aria-label={`${progressPercentage}% completed`} />
        </div>
      )}

      <Card className="border-border/50 shadow-sm overflow-hidden bg-background/50 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8">
          <FormProvider {...methods}>
            <form onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <StepTransportation onNext={handleNext} />
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <StepDiet onNext={handleNext} onBack={handleBack} />
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <StepHomeEnergy onNext={handleNext} onBack={handleBack} />
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <StepResults 
                      onRecalculate={() => {
                        methods.reset();
                        resetStore();
                      }} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
