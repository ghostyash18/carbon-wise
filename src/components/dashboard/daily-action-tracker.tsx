"use client";

import React, { useEffect, memo } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Leaf, Flame, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";

export const DailyActionTracker = memo(function DailyActionTracker() {
  const { dailyActions, streak, totalPoints, toggleDailyAction, initializeDailyActions } = useCalculatorStore();
  const { t } = useTranslation();

  useEffect(() => {
    initializeDailyActions();
  }, [initializeDailyActions]);

  const today = new Date().toISOString().split('T')[0];
  const todaysActions = dailyActions.filter(a => a.date === today);

  const completedToday = todaysActions.filter(a => a.isCompleted).length;
  const progressPercentage = todaysActions.length > 0 ? (completedToday / todaysActions.length) * 100 : 0;

  return (
    <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Daily Impact Tracker
          </CardTitle>
          <div className="flex items-center gap-4 text-sm font-semibold">
            <div className="flex items-center gap-1 text-orange-500 bg-orange-500/10 px-2 py-1 rounded-full">
              <Flame className="h-4 w-4" />
              <span>{streak} Day Streak</span>
            </div>
            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-full">
              <Star className="h-4 w-4" />
              <span>{totalPoints} Pts</span>
            </div>
          </div>
        </div>
        <CardDescription>Complete daily eco-actions to earn points and badges.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="w-full bg-muted rounded-full h-2.5 mb-4">
            <motion.div 
              className="bg-primary h-2.5 rounded-full" 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          
          <div className="space-y-3">
            {todaysActions.map((action) => (
              <label 
                key={action.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/50 ${
                  action.isCompleted ? "bg-primary/5 border-primary/20" : "bg-card border-border"
                }`}
              >
                <Checkbox 
                  id={`action-${action.id}`}
                  checked={action.isCompleted} 
                  onCheckedChange={() => toggleDailyAction(action.id, today)}
                  className="mt-0.5 data-[state=checked]:bg-primary"
                />
                <div className="flex-1 space-y-1">
                  <p className={`text-sm font-medium leading-none ${action.isCompleted ? "line-through text-muted-foreground" : "text-foreground"}`}>
                    {action.title}
                  </p>
                  <p className="text-xs text-primary font-semibold">+{action.points} pts</p>
                </div>
              </label>
            ))}
          </div>
          
          {completedToday === todaysActions.length && todaysActions.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-green-500/10 text-green-600 rounded-lg text-sm text-center font-medium"
            >
              🎉 Amazing! You completed all eco-actions today!
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
