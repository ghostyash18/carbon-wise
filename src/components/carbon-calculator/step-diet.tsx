"use client";

import React from "react";
import React, { memo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Utensils, Egg, Milk, Fish, Beef, Drumstick } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { StepNavigation } from "@/components/common/step-navigation";

export const StepDiet = memo(function StepDiet({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const { control, watch } = useFormContext<CalculatorData>();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t("calculator.diet.title")}</h2>
        <p className="text-muted-foreground">{t("calculator.diet.description")}</p>
      </div>

      <div className="space-y-8">
        {/* Meat Consumption */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Utensils className="h-5 w-5" /> {t("calculator.diet.meat_consumption")}</h3>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><Beef className="h-4 w-4" /> Beef / Lamb</Label>
                <span className="font-mono text-sm">{watch("beefServings")}</span>
              </div>
              <Controller
                control={control}
                name="beefServings"
                render={({ field }) => (
                  <Slider min={0} max={14} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><Drumstick className="h-4 w-4" /> Chicken / Pork</Label>
                <span className="font-mono text-sm">{watch("chickenServings")}</span>
              </div>
              <Controller
                control={control}
                name="chickenServings"
                render={({ field }) => (
                  <Slider min={0} max={14} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="flex items-center gap-2"><Fish className="h-4 w-4" /> Fish / Seafood</Label>
                <span className="font-mono text-sm">{watch("fishServings")}</span>
              </div>
              <Controller
                control={control}
                name="fishServings"
                render={({ field }) => (
                  <Slider min={0} max={14} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
                )}
              />
            </div>
          </div>
        </div>

        {/* Dairy */}
        <div className="space-y-4 pt-4 border-t">
          <Label className="text-base flex items-center gap-2"><Milk className="h-5 w-5" /> Dairy & Egg Consumption</Label>
          <Controller
            control={control}
            name="dairyLevel"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "high", label: "High (Daily)" },
                  { value: "medium", label: "Medium (Few times/week)" },
                  { value: "low", label: "Low (Rarely)" },
                  { value: "none", label: "None (Vegan)" },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} className="sr-only" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </div>
      </div>

      <StepNavigation onNext={onNext} onBack={onBack} nextText={t("calculator.diet.continue")} />
    </div>
  );
});
