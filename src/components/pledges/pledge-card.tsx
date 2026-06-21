"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle } from "lucide-react"

interface PledgeCardProps {
  id?: string
  title: string
  description: string
  impact: number
  isCompleted?: boolean
  onAdopt?: () => void
  onToggleComplete?: (id: string, isCompleted: boolean) => void
}

export function PledgeCard({ id, title, description, impact, isCompleted, onAdopt, onToggleComplete }: PledgeCardProps) {
  const [loading, setLoading] = useState(false)

  const handleToggle = async () => {
    if (id && onToggleComplete) {
      setLoading(true)
      await onToggleComplete(id, !isCompleted)
      setLoading(false)
    }
  }

  const handleAdopt = async () => {
    if (onAdopt) {
      setLoading(true)
      await onAdopt()
      setLoading(false)
    }
  }

  return (
    <Card className={`relative overflow-hidden transition-all ${isCompleted ? 'bg-primary/5 border-primary/20' : ''}`}>
      {isCompleted && (
        <div className="absolute top-0 right-0 p-4">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
      )}
      <CardHeader>
        <CardTitle className="pr-8">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono bg-secondary text-secondary-foreground">
          Saves ~{impact} tonnes/year
        </div>
      </CardContent>
      <CardFooter>
        {id ? (
          <Button 
            variant={isCompleted ? "outline" : "default"} 
            className="w-full" 
            onClick={handleToggle}
            disabled={loading}
          >
            {isCompleted ? "Mark as Incomplete" : "Mark as Completed"}
          </Button>
        ) : (
          <Button className="w-full bg-primary" onClick={handleAdopt} disabled={loading}>
            Take this Pledge
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
