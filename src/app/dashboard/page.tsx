"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import dynamic from "next/dynamic"
const HistoryChart = dynamic(() => import("@/components/dashboard/history-chart").then(mod => mod.HistoryChart), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full animate-pulse bg-muted rounded-xl border flex items-center justify-center">Loading chart...</div>
})
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Award, TrendingDown } from "lucide-react"
import { useCalculatorStore } from "@/store/calculatorStore"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { calculationHistory } = useCalculatorStore()
  
  if (status === "unauthenticated") {
    redirect("/sign-in")
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center"><Leaf className="animate-pulse h-12 w-12 text-primary" /></div>
  }

  // Reverse to match the old orderBy asc behavior
  const calculations = [...calculationHistory].reverse()

  const latestCalculation = calculations[calculations.length - 1]
  const previousCalculation = calculations.length > 1 ? calculations[calculations.length - 2] : null
  
  let change = 0
  if (latestCalculation && previousCalculation) {
    change = latestCalculation.totalFootprint - previousCalculation.totalFootprint
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name?.split(" ")[0] || "Eco Warrior"}!</h1>
        <p className="text-muted-foreground">Here is an overview of your carbon footprint journey.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <Leaf className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestCalculation ? `${latestCalculation.totalFootprint} tonnes` : "N/A"}</div>
            {change !== 0 && (
              <p className={`text-xs ${change < 0 ? 'text-primary' : 'text-destructive'}`}>
                {change > 0 ? "+" : ""}{change.toFixed(2)} from last calculation
              </p>
            )}
            {!change && latestCalculation && <p className="text-xs text-muted-foreground">First calculation completed.</p>}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calculations</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calculations.length}</div>
            <p className="text-xs text-muted-foreground">Entries tracked over time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Early Adopter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <HistoryChart data={calculations} />
      </div>
    </div>
  )
}
