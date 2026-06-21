"use client";

import { buttonVariants } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Leaf, ArrowRight, Earth, Zap, Calculator, Trophy } from "lucide-react";
import Link from "next/link";
import { FadeInUp } from "@/components/animations/FadeInUp";
import { SplitTextHeading } from "@/components/animations/SplitTextHeading";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden min-h-screen flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-32 pb-20 flex flex-col items-center text-center relative z-10 flex-grow justify-center min-h-[calc(100vh-8rem)]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-sm font-medium border border-secondary/30"
        >
          <Leaf className="h-4 w-4 text-primary" />
          <span>Join 50,000+ climate-conscious users</span>
        </motion.div>

        {/* Using the new SplitTextHeading for the stagger effect */}
        <SplitTextHeading 
          text="Discover Your Carbon Footprint. Shape a Greener Tomorrow."
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl text-foreground mb-6 leading-tight"
          delayOffset={0.1}
        />

        <motion.p 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }} // Delayed to appear after the text finishes splitting
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Understand your environmental impact, track your daily emissions, and take actionable steps towards a sustainable lifestyle. Every small change makes a difference.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/calculate" className={buttonVariants({ size: "lg", className: "h-14 px-8 text-lg rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group" })}>
            Calculate Your Impact
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/learn" className={buttonVariants({ size: "lg", variant: "outline", className: "h-14 px-8 text-lg rounded-full" })}>
            Learn How It Works
          </Link>
        </motion.div>

        {/* Floating elements animation */}
        {!shouldReduceMotion && (
          <>
            <div className="absolute top-1/3 -left-10 md:left-10 opacity-20 pointer-events-none hidden sm:block">
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Leaf className="h-24 w-24 text-primary" />
              </motion.div>
            </div>
            
            <div className="absolute bottom-1/4 -right-10 md:right-10 opacity-20 pointer-events-none hidden sm:block">
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <Earth className="h-32 w-32 text-secondary" />
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Feature Section with FadeInUp animations */}
      <div className="bg-muted/30 py-24 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeInUp className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to make an impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              EcoTrack provides a comprehensive suite of tools designed to help you understand, track, and reduce your carbon emissions.
            </p>
          </FadeInUp>

          <div className="grid md:grid-cols-3 gap-8">
            <FadeInUp delay={0.1}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <Calculator className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Precise Calculator</h3>
                  <p className="text-muted-foreground">
                    Our dynamic multi-step calculator evaluates your diet, transportation, and home energy usage to provide a highly accurate footprint score.
                  </p>
                </CardContent>
              </Card>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-14 w-14 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <Zap className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Interactive Dashboard</h3>
                  <p className="text-muted-foreground">
                    Visualize your impact with beautiful, responsive charts. See exactly which areas of your life contribute the most to your footprint.
                  </p>
                </CardContent>
              </Card>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="h-14 w-14 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                    <Trophy className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Gamified Progress</h3>
                  <p className="text-muted-foreground">
                    Earn beautiful sustainability badges and climb the global leaderboard by making real-world, eco-friendly lifestyle choices.
                  </p>
                </CardContent>
              </Card>
            </FadeInUp>
          </div>
        </div>
      </div>
    </div>
  );
}
