"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface HistoryChartProps {
  data: any[]
}

export function HistoryChart({ data }: HistoryChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>You haven't completed any calculations yet.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Format data for recharts
  const chartData = data.map(item => ({
    date: new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
    Footprint: item.totalFootprint
  }))

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Carbon Footprint History</CardTitle>
        <CardDescription>Track your emissions over time (in tonnes)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} />
              <YAxis axisLine={false} tickLine={false} tickMargin={10} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                itemStyle={{ color: 'hsl(var(--primary))' }}
              />
              <Line 
                type="monotone" 
                dataKey="Footprint" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
