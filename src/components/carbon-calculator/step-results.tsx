"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CalculatorData, calculateCarbonFootprint, AVERAGE_ANNUAL_EMISSIONS_KG } from "@/lib/calculateCarbonFootprint";
import { Button } from "@/components/ui/button";
import { Share2, RefreshCw, Car, Utensils, Zap, Leaf } from "lucide-react";
import { EcoCoachChat } from "@/components/ai-coach/eco-coach-chat";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/hooks/useTranslation";
import { ImpactMetric } from "@/components/common/impact-metric";
import { useCalculatorStore } from "@/store/calculatorStore";

export function StepResults({ onRecalculate }: { onRecalculate: () => void }) {
  const { getValues } = useFormContext<CalculatorData>();
  const router = useRouter();
  const { t } = useTranslation();
  const [isCalculating, setIsCalculating] = useState(true);
  const { addCalculation } = useCalculatorStore();

  const data = getValues();
  const results = useMemo(() => calculateCarbonFootprint(data), [data]);

  const isBetterThanAverage = results.comparisonPercentage < 0;

  useEffect(() => {
    let isSaved = false;
    
    // Simulate a brief calculation delay for UX
    const timer = setTimeout(() => {
      setIsCalculating(false);
      
      // Save to Zustand store
      if (!isSaved) {
        addCalculation({
          id: Date.now().toString(),
          totalFootprint: results.totalTonnes,
          categoryData: data,
          createdAt: new Date()
        });
        isSaved = true;
      }
      
      if (isBetterThanAverage) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#16a34a', '#22c55e', '#4ade80']
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isBetterThanAverage, results.totalTonnes, data]);

  if (isCalculating) {
    return (
      <div className="h-64 flex flex-col items-center justify-center space-y-4" aria-live="polite">
        <Leaf className="h-12 w-12 text-primary animate-pulse" />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">{t("common.loading")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 text-center" aria-live="polite">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t("calculator.results.title")}</h2>
        <p className="text-muted-foreground">{t("calculator.results.description")}</p>
      </div>

      {/* Main Result */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="py-6"
      >
        <div className="inline-flex flex-col items-center justify-center p-8 rounded-full border-8 border-primary/20 bg-background shadow-lg h-48 w-48 mx-auto relative">
          <span className="text-4xl font-extrabold text-foreground">{results.totalTonnes}</span>
          <span className="text-sm font-medium text-muted-foreground">{t("calculator.results.tonnes")}</span>
          {isBetterThanAverage && (
             <Leaf className="absolute -top-2 -right-2 h-8 w-8 text-primary drop-shadow" aria-hidden="true" />
          )}
        </div>
      </motion.div>

      {/* Comparison */}
      <div className={`p-4 rounded-lg font-medium ${isBetterThanAverage ? 'bg-primary/10 text-primary-foreground text-primary' : 'bg-destructive/10 text-destructive'}`}>
        You are {Math.abs(results.comparisonPercentage)}% {isBetterThanAverage ? "better" : "worse"} than the average Indian citizen ({(AVERAGE_ANNUAL_EMISSIONS_KG / 1000).toFixed(1)} tonnes).
      </div>

      {/* Breakdown Cards - using new ImpactMetric component */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
        <ImpactMetric 
          title={t("calculator.results.transportation")}
          value={Math.round(results.transportation)}
          unit="kg"
          icon={Car}
          variant="muted"
        />
        <ImpactMetric 
          title={t("calculator.results.diet")}
          value={Math.round(results.diet)}
          unit="kg"
          icon={Utensils}
          variant="muted"
        />
        <ImpactMetric 
          title={t("calculator.results.home_energy")}
          value={Math.round(results.homeEnergy)}
          unit="kg"
          icon={Zap}
          variant="muted"
        />
      </div>

      {/* Actionable Tips */}
      <div className="text-left space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-lg">Actionable Tips for You</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          {data.beefServings > 2 && (
            <li className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span> Swapping beef for chicken or plant-based meals twice a week can massively reduce your diet footprint.</li>
          )}
          {data.primaryTransport === "car" && data.fuelType !== "electric" && (
            <li className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span> Consider carpooling, using public transit, or switching to a hybrid/EV to cut down transport emissions.</li>
          )}
          {data.renewablePercentage < 20 && (
            <li className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span> Look into green energy tariffs from your provider or installing rooftop solar to offset home electricity.</li>
          )}
          {data.shortFlights > 2 && (
            <li className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span> Taking trains instead of short-haul flights is one of the most effective ways to lower your travel footprint.</li>
          )}
          {(data.beefServings <= 2 && data.primaryTransport !== "car" && data.renewablePercentage >= 20) && (
             <li className="flex gap-2"><span className="text-primary" aria-hidden="true">•</span> You are doing great! Share your impact to inspire others to make eco-friendly choices.</li>
          )}
        </ul>
      </div>

      {/* Actions */}
      <div className="pt-6 flex flex-col items-center gap-4 border-t">
        <EcoCoachChat data={data} results={results} />
        
        <div className="w-full max-w-sm mt-2 mb-4">
          <Button 
            className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground" 
            onClick={() => router.push("/dashboard")}
          >
            {t("calculator.results.view_dashboard")}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Button variant="outline" onClick={onRecalculate} className="gap-2 w-full sm:w-auto">
            <RefreshCw className="h-4 w-4" aria-hidden="true" /> {t("calculator.results.recalculate")}
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 w-full sm:w-auto hover:bg-[#1DA1F2] hover:text-white transition-colors"
            onClick={() => {
              const text = `I just calculated my carbon footprint! My score is ${results.totalTonnes} Tonnes CO2/yr on Carbon Wise 🌍🍃\n\nCalculate yours and join the community:`
              const url = `https://carbon-wise.example.com`
              window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current"><g><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></g></svg>
            Share on X
          </Button>
        </div>
      </div>
    </div>
  );
}
