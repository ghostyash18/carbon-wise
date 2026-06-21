"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { badges, BadgeConfig } from "@/config/badges";
import { useCalculatorStore } from "@/store/calculatorStore";

export function SustainabilityBadges() {
  const { data, calculationCount } = useCalculatorStore();

  const evaluatedBadges = useMemo(() => {
    return badges.map((badge) => {
      const result = badge.unlockCondition(data, calculationCount);
      return { ...badge, ...result };
    });
  }, [data, calculationCount]);

  const unlockedCount = evaluatedBadges.filter((b) => b.unlocked).length;

  // Variants for staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <div className="mt-12 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-baseline gap-2 border-b border-border/50 pb-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your Achievements</h2>
          <p className="text-muted-foreground text-sm">
            Unlock badges by making sustainable choices and tracking your footprint.
          </p>
        </div>
        <div className="text-sm font-medium bg-secondary/50 text-secondary-foreground px-3 py-1 rounded-full">
          {unlockedCount} of {badges.length} Unlocked
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {evaluatedBadges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </motion.div>
    </div>
  );
}

function BadgeCard({ badge }: { badge: BadgeConfig & { unlocked: boolean; progress: number } }) {
  const Icon = badge.icon;
  const isUnlocked = badge.unlocked;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        show: { opacity: 1, scale: 1 },
      }}
      whileHover={{ scale: 1.05 }}
      className={`relative overflow-hidden rounded-2xl border p-5 flex flex-col items-center text-center transition-all duration-300 ${
        isUnlocked
          ? "bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-primary/30 shadow-lg shadow-primary/5"
          : "bg-muted/30 border-border/50 grayscale opacity-60"
      }`}
    >
      {/* Background Glow Effect for Unlocked */}
      {isUnlocked && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
      )}

      {/* Lock Icon Overlay for Locked */}
      {!isUnlocked && (
        <div className="absolute top-3 right-3 text-muted-foreground/50">
          <Lock className="h-4 w-4" />
        </div>
      )}

      {/* Badge Icon */}
      <div
        className={`p-4 rounded-full mb-4 relative ${
          isUnlocked ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        }`}
      >
        <Icon className="h-8 w-8" />
        
        {/* Progress Ring (SVG) */}
        {!isUnlocked && badge.progress > 0 && (
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-primary/30"
              strokeDasharray={`${badge.progress * 2.89} 289`} // 2 * pi * r = ~289
            />
          </svg>
        )}
      </div>

      <h3 className={`font-bold mb-1 ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
        {badge.name}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {badge.description}
      </p>

      {/* Category Tag */}
      <div className="mt-3 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70 bg-muted/50 px-2 py-0.5 rounded-sm">
        {badge.category}
      </div>
    </motion.div>
  );
}
