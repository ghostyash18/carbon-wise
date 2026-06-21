"use client";

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Car, Bike, Bus, Train, Plane } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { StepNavigation } from "@/components/common/step-navigation";

export function StepTransportation({ onNext }: { onNext: () => void }) {
  const { control, watch } = useFormContext<CalculatorData>();
  const { t } = useTranslation();
  const primaryTransport = watch("primaryTransport");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{t("calculator.transport.title")}</h2>
        <p className="text-muted-foreground">{t("calculator.transport.description")}</p>
      </div>

      <div className="space-y-6">
        {/* Primary Transport Mode */}
        <div className="space-y-4">
          <Label className="text-base">{t("calculator.transport.primary_mode")}</Label>
          <Controller
            control={control}
            name="primaryTransport"
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { value: "car", label: "Car", icon: Car },
                  { value: "motorcycle", label: "Motorcycle", icon: Bike },
                  { value: "public", label: "Public Transit", icon: Bus },
                  { value: "bike", label: "Walk / Bike", icon: Bike },
                ].map((option) => (
                  <Label
                    key={option.value}
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} className="sr-only" />
                    <option.icon className="mb-3 h-6 w-6" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </Label>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        {/* Weekly Distance */}
        {primaryTransport !== "bike" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label className="text-base">Weekly distance traveled (km)</Label>
              <span className="font-mono text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                {watch("weeklyDistance")} km
              </span>
            </div>
            <Controller
              control={control}
              name="weeklyDistance"
              render={({ field }) => (
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[field.value || 0]}
                  onValueChange={(vals: any) => field.onChange(vals[0])}
                />
              )}
            />
          </div>
        )}

        {/* Fuel Type */}
        {(primaryTransport === "car" || primaryTransport === "motorcycle") && (
          <div className="space-y-4">
            <Label className="text-base">Fuel Type</Label>
            <Controller
              control={control}
              name="fuelType"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fuel type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">Petrol</SelectItem>
                    <SelectItem value="diesel">Diesel</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="electric">Electric (EV)</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        {/* Flights */}
        <div className="pt-4 border-t space-y-6">
          <h3 className="text-lg font-medium flex items-center gap-2"><Plane className="h-5 w-5" /> Air Travel (Past 12 months)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Short flights (&lt; 3 hrs)</Label>
                <span className="font-mono text-sm">{watch("shortFlights")}</span>
              </div>
              <Controller
                control={control}
                name="shortFlights"
                render={({ field }) => (
                  <Slider min={0} max={20} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
                )}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Long flights (&gt; 3 hrs)</Label>
                <span className="font-mono text-sm">{watch("longFlights")}</span>
              </div>
              <Controller
                control={control}
                name="longFlights"
                render={({ field }) => (
                  <Slider min={0} max={10} step={1} value={[field.value || 0]} onValueChange={(vals: any) => field.onChange(vals[0])} />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <StepNavigation onNext={onNext} nextText={t("calculator.transport.continue")} />
    </div>
  );
}
