"use client"

import { useState } from "react"
import { PledgeCard } from "./pledge-card"
import { useRouter } from "next/navigation"
import { useCalculatorStore } from "@/store/calculatorStore"

const SUGGESTED_PLEDGES = [
  {
    title: "Meatless Mondays",
    description: "Commit to eating zero meat for at least one day per week.",
    impact: 0.4
  },
  {
    title: "Commute by Bike",
    description: "Cycle to work or school at least twice a week instead of driving.",
    impact: 0.8
  },
  {
    title: "Switch to LEDs",
    description: "Replace all old bulbs in your house with energy-efficient LEDs.",
    impact: 0.15
  },
  {
    title: "Cold Water Wash",
    description: "Wash your clothes using only cold water.",
    impact: 0.1
  }
]

export function PledgeList() {
  const router = useRouter()
  const { userPledges: myPledges, addPledge, updatePledge } = useCalculatorStore()

  const handleAdopt = async (pledge: any) => {
    const newPledge = { ...pledge, id: Date.now().toString(), isCompleted: false, createdAt: new Date() }
    addPledge(newPledge)
  }

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    updatePledge(id, isCompleted)
  }

  // Filter out suggested pledges that are already adopted
  const availableSuggestions = SUGGESTED_PLEDGES.filter(
    suggested => !myPledges.some(my => my.title === suggested.title)
  )

  const totalImpact = myPledges
    .filter(p => p.isCompleted)
    .reduce((sum, p) => sum + p.impact, 0)

  return (
    <div className="space-y-12">
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">My Pledges</h2>
          <p className="text-muted-foreground">You have saved <span className="font-bold text-primary">{totalImpact.toFixed(2)} tonnes</span> of CO2 with your completed pledges!</p>
        </div>
        
        {myPledges.length === 0 ? (
          <div className="p-8 text-center border rounded-lg bg-muted/50 border-dashed">
            <p className="text-muted-foreground">You haven't taken any pledges yet. Choose one from below!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myPledges.map(pledge => (
              <PledgeCard
                key={pledge.id}
                id={pledge.id}
                title={pledge.title}
                description={pledge.description}
                impact={pledge.impact}
                isCompleted={pledge.isCompleted}
                onToggleComplete={handleToggleComplete}
              />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Suggested Actions</h2>
          <p className="text-muted-foreground">Small changes that make a big difference.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableSuggestions.map((pledge, i) => (
            <PledgeCard
              key={i}
              title={pledge.title}
              description={pledge.description}
              impact={pledge.impact}
              onAdopt={() => handleAdopt(pledge)}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
