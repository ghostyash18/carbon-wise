"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, Users, Zap, Sun } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { StepNavigation } from "@/components/common/step-navigation";

export function StepHomeEnergy({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const { control, watch } = useFormContext<CalculatorData>();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t("calculator.home.title")}</h2>
        <p className="text-muted-foreground">{t("calculator.home.description")}</p>
      </div>

      <div className="space-y-6">
        {/* Household Size */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2"><Users className="h-4 w-4" /> {t("calculator.home.household_size")}</Label>
            <span className="font-mono text-sm">{watch("householdSize")} {t("calculator.home.people")}</span>
          </div>
          <Controller
            control={control}
            name="householdSize"
            render={({ field }) => (
              <Slider min={1} max={10} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
            )}
          />
          <p className="text-xs text-muted-foreground">Home energy emissions are divided equally among household members.</p>
        </div>

        {/* Electricity */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2"><Zap className="h-4 w-4" /> Monthly Electricity Usage (kWh)</Label>
            <span className="font-mono text-sm">{watch("monthlyElectricityKWh")} kWh</span>
          </div>
          <Controller
            control={control}
            name="monthlyElectricityKWh"
            render={({ field }) => (
              <Slider min={0} max={2000} step={50} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
            )}
          />
          <p className="text-xs text-muted-foreground">Tip: Check your recent utility bill. Average Indian household uses around 150-250 kWh/month.</p>
        </div>

        {/* Heating Type */}
        <div className="space-y-4">
          <Label className="text-base flex items-center gap-2"><Home className="h-4 w-4" /> Heating/Cooking Fuel</Label>
          <Controller
            control={control}
            name="heatingType"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select primary fuel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None / Mostly Electric</SelectItem>
                  <SelectItem value="gas">LPG / Piped Gas</SelectItem>
                  <SelectItem value="electric">Electric Heater/Induction</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Renewable Percentage */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="flex items-center gap-2"><Sun className="h-4 w-4" /> Renewable Energy Share</Label>
            <span className="font-mono text-sm text-primary">{watch("renewablePercentage")}%</span>
          </div>
          <Controller
            control={control}
            name="renewablePercentage"
            render={({ field }) => (
              <Slider min={0} max={100} step={5} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
            )}
          />
          <p className="text-xs text-muted-foreground">What percentage of your electricity comes from solar/wind? (e.g. rooftop solar)</p>
        </div>
      </div>

      <StepNavigation onNext={onNext} onBack={onBack} nextText={t("calculator.home.calculate")} />
    </div>
  );
}
