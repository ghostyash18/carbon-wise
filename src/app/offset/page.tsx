"use client";

import React from "react";
import { motion } from "framer-motion";
import { Leaf, TreePine, Sun, Wind, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

const offsetPrograms = [
  {
    title: "Reforestation & Afforestation",
    description: "Support verified projects that plant trees to absorb CO2 from the atmosphere.",
    icon: <TreePine className="h-6 w-6 text-emerald-500" />,
    link: "https://www.goldstandard.org",
    provider: "Gold Standard"
  },
  {
    title: "Renewable Energy Certificates",
    description: "Invest in solar and wind farms to accelerate the transition away from fossil fuels.",
    icon: <Sun className="h-6 w-6 text-amber-500" />,
    link: "https://verra.org",
    provider: "Verra (VCS)"
  },
  {
    title: "Methane Capture Projects",
    description: "Fund initiatives that capture methane from landfills and agricultural sites.",
    icon: <Wind className="h-6 w-6 text-blue-500" />,
    link: "https://www.climateactionreserve.org",
    provider: "Climate Action Reserve"
  }
];

export default function OffsetGuidePage() {
  return (
    <div className="container max-w-4xl py-12 space-y-12">
      <div className="text-center space-y-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mx-auto bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6"
        >
          <Leaf className="h-8 w-8 text-primary" />
        </motion.div>
        <h1 className="text-4xl font-extrabold tracking-tight">Carbon Offsetting Guide</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          You cannot eliminate 100% of your footprint. For the emissions you cannot reduce, high-quality carbon offsets provide a verified pathway to balance your impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {offsetPrograms.map((program, index) => (
          <motion.div
            key={program.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="mb-4 bg-muted w-12 h-12 rounded-lg flex items-center justify-center">
                  {program.icon}
                </div>
                <CardTitle>{program.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary">
                  Verified by {program.provider}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <p className="text-muted-foreground mb-6">{program.description}</p>
                <a 
                  href={program.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", className: "w-full gap-2 group" })}
                >
                  Explore Projects <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-muted rounded-2xl p-8 border text-center space-y-4">
        <h2 className="text-2xl font-semibold">How Does Offsetting Work?</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto">
          Carbon offsetting means compensating for the carbon dioxide pollution you make by preventing the same amount of pollution from happening somewhere else. We strongly recommend reducing your own emissions first (using our Dashboard and AI Coach) before purchasing offsets.
        </p>
      </div>
    </div>
  );
}
