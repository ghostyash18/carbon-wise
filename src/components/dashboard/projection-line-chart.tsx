"use client";

import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectionLineChartProps {
  total: number;
}

export function ProjectionLineChart({ total }: ProjectionLineChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const monthlyAverage = total / 12;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  const data = months.map((month, index) => ({
    month,
    emissions: Math.round(monthlyAverage * (index + 1)),
  }));

  if (!mounted) return <div className="h-[300px] w-full animate-pulse bg-muted/50 rounded-xl"></div>;

  return (
    <Card className="shadow-sm border-border/50 bg-background/50 backdrop-blur-sm h-full md:col-span-2">
      <CardHeader>
        <CardTitle>12-Month Projection</CardTitle>
        <CardDescription>Estimated cumulative emissions over a year (kg CO₂e)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} unit=" kg" />
              <Tooltip 
                formatter={(value: any) => [`${value} kg`, 'Cumulative Emissions']}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area 
                type="monotone" 
                dataKey="emissions" 
                stroke="#16a34a" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorEmissions)" 
                activeDot={{ r: 6, fill: "#16a34a", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
