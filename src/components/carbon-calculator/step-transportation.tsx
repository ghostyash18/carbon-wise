"use client";

import React, { memo } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { CalculatorData } from "@/lib/calculateCarbonFootprint";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Car, Bike, Bus, Train, Plane } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { StepNavigation } from "@/components/common/step-navigation";

export const StepTransportation = memo(function StepTransportation({ onNext }: { onNext: () => void }) {
  const { control, watch } = useFormContext<CalculatorData>();
  const { t } = useTranslation();
  const primaryTransport = watch("primaryTransport");
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <Car className="h-6 w-6 text-primary" />
          {t("calculator.transport.title")}
        </h2>
        <p className="text-muted-foreground">{t("calculator.transport.description")}</p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-base font-semibold">{t("calculator.transport.primary")}</Label>
          <Controller
            name="primaryTransport"
            control={control}
            render={({ field }) => (
              <RadioGroup 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { value: "car", icon: Car, label: t("calculator.transport.modes.car") },
                  { value: "motorcycle", icon: Bike, label: t("calculator.transport.modes.motorcycle") },
                  { value: "public", icon: Bus, label: t("calculator.transport.modes.public") },
                  { value: "bike", icon: Train, label: t("calculator.transport.modes.bike") },
                ].map((mode) => (
                  <div key={mode.value}>
                    <RadioGroupItem value={mode.value} id={`transport-${mode.value}`} className="peer sr-only" />
                    <Label
                      htmlFor={`transport-${mode.value}`}
                      className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                    >
                      <mode.icon className="mb-3 h-6 w-6" />
                      <span className="text-sm font-medium">{mode.label}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
        </div>

        {(primaryTransport === "car" || primaryTransport === "motorcycle") && (
          <div className="space-y-3 animate-in zoom-in-95 duration-300">
            <Label htmlFor="fuelType" className="text-base font-semibold">{t("calculator.transport.fuel")}</Label>
            <Controller
              name="fuelType"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger id="fuelType" className="h-12 rounded-xl">
                    <SelectValue placeholder={t("calculator.transport.fuel")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="petrol">{t("calculator.transport.fuels.petrol")}</SelectItem>
                    <SelectItem value="diesel">{t("calculator.transport.fuels.diesel")}</SelectItem>
                    <SelectItem value="electric">{t("calculator.transport.fuels.electric")}</SelectItem>
                    <SelectItem value="hybrid">{t("calculator.transport.fuels.hybrid")}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-semibold">{t("calculator.transport.distance")}</Label>
            <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
              {watch("weeklyDistance")} km
            </span>
          </div>
          <Controller
            name="weeklyDistance"
            control={control}
            render={({ field }) => (
              <Slider
                min={0}
                max={1000}
                step={10}
                value={[field.value]}
                onValueChange={(val) => field.onChange(val[0])}
                className="py-4"
              />
            )}
          />
          <div className="flex justify-between text-xs text-muted-foreground font-medium">
            <span>0 km</span>
            <span>1000+ km</span>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Plane className="h-4 w-4" />
            {t("calculator.transport.flights_year")}
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm">{t("calculator.transport.short_flights")}</Label>
                <span className="text-sm font-bold">{watch("shortFlights")}</span>
              </div>
              <Controller
                name="shortFlights"
                control={control}
                render={({ field }) => (
                  <Slider min={0} max={20} step={1} value={[field.value]} onValueChange={(val) => field.onChange(val[0])} />
                )}
              />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-sm">{t("calculator.transport.long_flights")}</Label>
                <span className="text-sm font-bold">{watch("longFlights")}</span>
              </div>
              <Controller
                name="longFlights"
                control={control}
                render={({ field }) => (
                  <Slider min={0} max={10} step={1} value={[field.value]} onValueChange={(val) => field.onChange(val[0])} />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <StepNavigation onNext={onNext} nextText={t("calculator.transport.continue")} />
    </div>
  );
});
