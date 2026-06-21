"use client";

import React, { useState, useEffect } from "react";
import { Trophy, Medal, Award, Crown, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalculatorStore } from "@/store/calculatorStore";
import { calculateCarbonFootprint } from "@/lib/calculateCarbonFootprint";
import { getLeaderboardWithUser, LeaderboardUser } from "@/lib/mockLeaderboard";
import { badges } from "@/config/badges";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LeaderboardPage() {
  const router = useRouter();
  const { data: storeData, calculationCount } = useCalculatorStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let userScore = null;
    if (calculationCount > 0) {
      const results = calculateCarbonFootprint(storeData);
      userScore = results.totalTonnes;
    }
    setLeaderboard(getLeaderboardWithUser(userScore));
    setIsLoaded(true);
  }, [storeData, calculationCount]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-muted/20 pb-12 pt-24" />;
  }

  const hasCalculated = calculationCount > 0;
  const userRank = leaderboard.findIndex(u => u.isCurrentUser) + 1;

  // Mock a recent badges feed
  const recentBadges = badges.slice(0, 5).map((badge, i) => ({
    id: `event-${i}`,
    user: leaderboard[Math.floor(Math.random() * 20) + 3], // Random user not in top 3
    badge,
    timeAgo: `${(i + 1) * 12} mins ago`
  }));

  return (
    <main className="min-h-screen bg-muted/20 pb-12 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-4 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            Global Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground">
            See how your carbon footprint compares to the global EcoTrack community. 
            Lower emissions rank higher!
          </p>
        </div>

        {!hasCalculated && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="border-primary/50 bg-primary/5 shadow-lg border-2 border-dashed">
              <CardContent className="flex flex-col items-center text-center p-8">
                <Crown className="h-12 w-12 text-primary/50 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Join the Ranks!</h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  You need to calculate your carbon footprint first to see where you stand on the global leaderboard.
                </p>
                <Button size="lg" onClick={() => router.push("/calculate")}>
                  Calculate Your Impact
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Leaderboard Table */}
          <div className="lg:col-span-2 space-y-4">
            {hasCalculated && (
              <div className="bg-primary text-primary-foreground p-4 rounded-xl flex items-center justify-between shadow-lg mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">Your Current Rank</div>
                    <div className="text-2xl font-bold">#{userRank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium opacity-90">Your Emissions</div>
                  <div className="text-xl font-bold">{leaderboard.find(u => u.isCurrentUser)?.scoreTonnes} t</div>
                </div>
              </div>
            )}

            <Card className="border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {leaderboard.map((user, index) => {
                  const rank = index + 1;
                  const isTop3 = rank <= 3;
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      key={user.id} 
                      className={`p-4 flex items-center justify-between transition-colors ${
                        user.isCurrentUser ? "bg-primary/10 border-l-4 border-l-primary" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 font-bold text-lg text-center ${
                          rank === 1 ? "text-yellow-500" : 
                          rank === 2 ? "text-slate-400" : 
                          rank === 3 ? "text-amber-600" : "text-muted-foreground"
                        }`}>
                          {rank === 1 ? <Crown className="mx-auto h-6 w-6" /> : 
                           rank === 2 ? <Medal className="mx-auto h-6 w-6" /> : 
                           rank === 3 ? <Award className="mx-auto h-6 w-6" /> : `#${rank}`}
                        </div>
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${user.avatarColor}`}>
                          {user.username.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold flex items-center gap-2">
                            {user.username}
                            {user.isCurrentUser && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">You</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-mono font-medium">
                        {user.scoreTonnes.toFixed(2)} <span className="text-muted-foreground text-sm">t</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar Feed */}
          <div className="space-y-6">
            <Card className="border-border shadow-sm sticky top-24">
              <CardHeader className="pb-3 border-b border-border/50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Community Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {recentBadges.map((event) => {
                    const Icon = event.badge.icon;
                    return (
                      <div key={event.id} className="p-4 flex gap-3 text-sm">
                        <div className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center text-white flex-shrink-0 ${event.user.avatarColor}`}>
                          {event.user.username.charAt(0)}
                        </div>
                        <div>
                          <p>
                            <span className="font-semibold">{event.user.username}</span> just unlocked the{" "}
                            <span className="font-semibold text-primary">{event.badge.name}</span> badge!
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Icon className="h-3 w-3" />
                            {event.timeAgo}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
