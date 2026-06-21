"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface EmissionsDonutChartProps {
  transportation: number;
  diet: number;
  homeEnergy: number;
}

export function EmissionsDonutChart({ transportation, diet, homeEnergy }: EmissionsDonutChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    { name: "Transportation", value: Math.round(transportation), color: "#16a34a" }, // Green 600
    { name: "Diet & Food", value: Math.round(diet), color: "#84cc16" }, // Lime 500
    { name: "Home Energy", value: Math.round(homeEnergy), color: "#14b8a6" }, // Teal 500
  ];

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-muted/50 rounded-xl"></div>;

  return (
    <Card className="shadow-sm border-border/50 bg-background/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Emission Breakdown</CardTitle>
        <CardDescription>Your carbon footprint by category (kg CO₂e)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => [`${value} kg`, 'Emissions']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
