"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MessageSquareHeart, Quote, Leaf, ArrowRight, Share2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

const mockStories = [
  {
    id: 1,
    name: "Marcus T.",
    avatarColor: "bg-amber-500",
    impact: "-3.2 Tonnes/Year",
    category: "Home Energy",
    story: "Switching to a heat pump seemed daunting at first, but the community resources here helped me take the plunge. Not only did it drastically lower my footprint, but my energy bills are actually down 40% year-over-year. It's the best investment I've made for my home and the planet.",
  },
  {
    id: 2,
    name: "Elena R.",
    avatarColor: "bg-emerald-500",
    impact: "-1.8 Tonnes/Year",
    category: "Diet & Lifestyle",
    story: "I started with 'Meatless Mondays' just to see if I could do it. Fast forward a year, and my entire family has transitioned to a 90% plant-based diet. The recipes on EcoTrack made the transition seamless and delicious. We feel healthier, and it's incredible to see the tangible impact in our dashboard.",
  },
  {
    id: 3,
    name: "David K.",
    avatarColor: "bg-blue-500",
    impact: "-2.1 Tonnes/Year",
    category: "Transportation",
    story: "Selling my second car and committing to an e-bike for my daily 5-mile commute was life-changing. I get fresh air every morning, I never worry about parking, and watching my transportation emissions drop to near-zero has been incredibly motivating.",
  },
  {
    id: 4,
    name: "Sarah M.",
    avatarColor: "bg-purple-500",
    impact: "-4.5 Tonnes/Year",
    category: "Total Lifestyle",
    story: "I completely overhauled my life after taking the calculator. From composting everything to installing solar and exclusively buying second-hand clothing. It sounds like a lot, but taking it one step at a time made it manageable. EcoTrack gamified the process and kept me accountable.",
  }
];

export default function StoriesPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-muted/20 pb-20 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-3">
              <MessageSquareHeart className="h-10 w-10 text-primary" />
              Impact Stories
            </h1>
            <p className="text-lg text-muted-foreground">
              Real-world inspiration from members of our community who have successfully 
              transformed their lifestyles to protect the planet.
            </p>
          </div>

          <Dialog>
            <DialogTrigger render={<Button size="lg" className="flex items-center gap-2 group" />}>
              <Share2 className="h-4 w-4" />
              Share Your Story
              <ArrowRight className="h-4 w-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <DialogHeader>
                      <DialogTitle className="text-2xl flex items-center gap-2">
                        <MessageSquareHeart className="h-6 w-6 text-primary" />
                        Share Your Journey
                      </DialogTitle>
                      <DialogDescription>
                        Have you made changes to reduce your carbon footprint? We'd love to hear about it!
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                        <input 
                          id="name" 
                          required 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="e.g. Elena R." 
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category" className="text-sm font-medium">Main Area of Impact</label>
                        <select 
                          id="category" 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="transport">Transportation</option>
                          <option value="diet">Diet & Lifestyle</option>
                          <option value="energy">Home Energy</option>
                          <option value="all">Total Lifestyle</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="story" className="text-sm font-medium">Your Story</label>
                        <textarea 
                          id="story" 
                          required 
                          rows={4}
                          className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us what changes you made and how it felt..." 
                        />
                      </div>
                      <Button type="submit" className="w-full mt-4">
                        Submit Story
                      </Button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">Story Submitted!</h3>
                    <p className="text-muted-foreground">
                      Thank you for sharing your eco-journey with the community. Our team will review it shortly!
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </DialogContent>
          </Dialog>
        </div>

        {/* Featured Story */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Card className="overflow-hidden border-primary/20 bg-primary/5 shadow-lg relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
              <Quote className="h-32 w-32 text-primary" />
            </div>
            <div className="grid md:grid-cols-5 gap-0">
              <div className="md:col-span-2 relative h-72 md:h-full min-h-[400px]">
                <Image 
                  src="/story-hero.png" 
                  alt="Featured Community Member"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-6 w-fit">
                  <Leaf className="h-4 w-4" />
                  Featured Journey • -5.2 Tonnes/Year
                </div>
                <h2 className="text-3xl font-bold mb-6 text-foreground">
                  "I never realized how much of an impact one person could have until I started tracking it. Ditching my car for a bike completely changed my relationship with the city."
                </h2>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    J
                  </div>
                  <div>
                    <div className="font-bold text-lg">Jordan Lee</div>
                    <div className="text-muted-foreground">Joined 2 years ago</div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Stories Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {mockStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-lg leading-relaxed text-muted-foreground mb-8 flex-grow italic">
                    "{story.story}"
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold ${story.avatarColor}`}>
                        {story.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{story.name}</div>
                        <div className="text-xs text-muted-foreground">{story.category}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">{story.impact}</div>
                      <div className="text-xs text-muted-foreground">Impact</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
