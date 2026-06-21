"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Medal, User as UserIcon } from "lucide-react"
import { useCalculatorStore } from "@/store/calculatorStore"
import { useSession } from "next-auth/react"

// Mock leaderboard for demo purposes
const MOCK_LEADERBOARD = [
  { id: "1", name: "Sarah Jenkins", score: 2.4, date: "2024-01-15" },
  { id: "2", name: "David Chen", score: 2.8, date: "2024-02-20" },
  { id: "3", name: "Priya Sharma", score: 3.1, date: "2024-03-05" },
  { id: "4", name: "Alex Rodriguez", score: 3.5, date: "2024-04-10" },
  { id: "5", name: "Emma Wilson", score: 4.2, date: "2024-05-01" },
]

export default function CommunityPage() {
  const { data: session } = useSession()
  const { calculationHistory } = useCalculatorStore()

  let leaderboard = [...MOCK_LEADERBOARD]

  // Add the current user's best score to the mock leaderboard if they have one
  if (calculationHistory.length > 0) {
    const bestScore = Math.min(...calculationHistory.map(c => c.totalFootprint))
    leaderboard.push({
      id: "current-user",
      name: session?.user?.name || "You",
      score: bestScore,
      date: new Date().toISOString().split('T')[0]
    })
  }

  // Sort and take top 10
  leaderboard = leaderboard.sort((a, b) => a.score - b.score).slice(0, 10)

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 flex items-center justify-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-500" />
          Community Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how you stack up against the top eco-warriors in the Carbon Wise community. 
          The lower your footprint, the higher you rank!
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {leaderboard.length === 0 ? (
          <div className="text-center p-8 bg-muted/50 rounded-lg">
            No calculations yet. Be the first to join the leaderboard!
          </div>
        ) : (
          leaderboard.map((user, index) => (
            <Card key={user.id} className={`relative overflow-hidden transition-all hover:scale-[1.01] ${index === 0 ? 'bg-yellow-500/10 border-yellow-500/30' : index === 1 ? 'bg-slate-300/10 border-slate-300/30' : index === 2 ? 'bg-amber-700/10 border-amber-700/30' : ''}`}>
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className={`text-2xl font-bold w-8 text-center ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : index === 2 ? 'text-amber-700' : 'text-muted-foreground'}`}>
                    #{index + 1}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-secondary-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{user.name || "Anonymous User"}</div>
                      <div className="text-sm text-muted-foreground">Joined {new Date(user.date).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">
                    {user.score.toFixed(1)}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Tonnes CO₂/yr
                  </div>
                </div>
                
                {index < 3 && (
                  <Medal className={`absolute -right-4 -top-4 h-24 w-24 opacity-10 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : 'text-amber-700'}`} />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
