"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AVERAGE_ANNUAL_EMISSIONS_KG } from "@/lib/calculateCarbonFootprint";

interface ComparisonBarChartProps {
  total: number;
}

export function ComparisonBarChart({ total }: ComparisonBarChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const data = [
    {
      name: "Your Footprint",
      value: Math.round(total),
      color: total > AVERAGE_ANNUAL_EMISSIONS_KG ? "#ef4444" : "#16a34a", // Red 500 if above, Green 600 if below
    },
    {
      name: "National Average",
      value: AVERAGE_ANNUAL_EMISSIONS_KG,
      color: "#94a3b8", // Slate 400
    },
  ];

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-muted/50 rounded-xl"></div>;

  return (
    <Card className="shadow-sm border-border/50 bg-background/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>National Comparison</CardTitle>
        <CardDescription>How you stack up against the average citizen</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} unit=" kg" />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                formatter={(value: any) => [`${value} kg`, 'Emissions']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
