import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ImpactMetricProps {
  /** The title of the metric */
  title: string;
  /** The primary value to display */
  value: string | number;
  /** Optional unit to display next to the value (e.g. 'Tonnes') */
  unit?: string;
  /** Optional icon to render next to the title */
  icon?: LucideIcon;
  /** Visual variant affecting the color scheme */
  variant?: "default" | "primary" | "destructive" | "muted";
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Reusable component for displaying key impact metrics and statistics.
 * Built with atomic design principles for consistent visual language.
 */
export function ImpactMetric({ 
  title, 
  value, 
  unit, 
  icon: Icon, 
  variant = "default", 
  className 
}: ImpactMetricProps) {
  
  const variantStyles = {
    default: "bg-card text-card-foreground border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    muted: "bg-muted text-muted-foreground border-border",
  };

  return (
    <div className={cn("p-4 rounded-xl border flex flex-col items-start shadow-sm", variantStyles[variant], className)}>
      <div className="flex items-center gap-2 text-sm font-medium opacity-80 mb-1">
        {Icon && <Icon className="h-4 w-4" aria-hidden="true" />}
        <span>{title}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl md:text-3xl font-black tracking-tight">{value}</span>
        {unit && <span className="text-sm font-medium opacity-70">{unit}</span>}
      </div>
    </div>
  );
}
