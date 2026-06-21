"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Leaf, MessageCircle, ArrowRight, Zap, RefreshCw } from "lucide-react";
import { CalculatorData, CarbonBreakdown } from "@/lib/calculateCarbonFootprint";
import { generatePersonalizedTips, EcoTip } from "@/lib/carbon-tips";

type Message = {
  id: string;
  role: "coach" | "user";
  content: string | React.ReactNode;
  isTyping?: boolean;
};

export function EcoCoachChat({ data, results }: { data: CalculatorData; results: CarbonBreakdown }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tips = React.useMemo(() => generatePersonalizedTips(results, data), [results, data]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Initial chat flow
  useEffect(() => {
    if (isOpen && !hasAnalyzed) {
      setHasAnalyzed(true);
      setMessages([
        {
          id: "m1",
          role: "coach",
          content: "Hi! I'm EcoCoach 🌱 Your personal sustainability guide.",
        },
      ]);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: "typing", role: "coach", content: "", isTyping: true },
        ]);
      }, 1000);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== "typing"));
        setMessages((prev) => [
          ...prev,
          {
            id: "m2",
            role: "coach",
            content: `I've analyzed your footprint. Your highest emission area is ${
              results.transportation >= results.diet && results.transportation >= results.homeEnergy
                ? "Transportation"
                : results.diet >= results.homeEnergy
                ? "Diet"
                : "Home Energy"
            }. Here are 3 personalized tips tailored just for you:`,
          },
        ]);
      }, 3000);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: "typing2", role: "coach", content: "", isTyping: true },
        ]);
      }, 4500);

      setTimeout(() => {
        setMessages((prev) => prev.filter((m) => m.id !== "typing2"));
        
        // Present tips as a rich message
        setMessages((prev) => [
          ...prev,
          {
            id: "m3",
            role: "coach",
            content: (
              <div className="space-y-4 w-full">
                {tips.map((tip, idx) => (
                  <div key={tip.id} className="bg-background rounded-lg border p-3 text-sm shadow-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <p className="font-medium text-foreground mb-1">{tip.text}</p>
                    <p className="text-muted-foreground text-xs">{tip.impact}</p>
                    <div className="mt-3 flex justify-end">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-7 text-xs bg-secondary/50 hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          const rect = target.getBoundingClientRect();
                          confetti({
                            particleCount: 50,
                            spread: 60,
                            origin: { 
                              x: (rect.left + rect.width / 2) / window.innerWidth,
                              y: (rect.top + rect.height / 2) / window.innerHeight
                            },
                            colors: ['#16a34a', '#22c55e', '#4ade80']
                          });
                          target.innerText = "Committed! 🌿";
                          target.setAttribute('disabled', 'true');
                        }}
                      >
                        I'll try this
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ),
          },
        ]);
      }, 6000);
    }
  }, [isOpen, hasAnalyzed, results, tips]);

  const handleQuickReply = (text: string) => {
    setMessages((prev) => [...prev, { id: Date.now().toString(), role: "user", content: text }]);
    
    // Simulate generic coach response
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: "typing", role: "coach", content: "", isTyping: true }]);
    }, 500);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== "typing"));
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "coach",
          content: "That's a great question! While I'm just a demo coach right now, taking that first small step makes the biggest difference. You've got this!",
        },
      ]);
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={
        <Button className="gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white shadow-md hover:shadow-lg transition-all rounded-full px-6">
          <MessageCircle className="h-5 w-5" />
          Talk to EcoCoach
        </Button>
      } />
      
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden border-border/50 shadow-2xl rounded-2xl bg-muted/30 backdrop-blur-xl">
        <DialogHeader className="p-4 bg-background border-b border-border/50 flex flex-row items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarFallback className="bg-primary/10 text-primary"><Leaf className="h-5 w-5" /></AvatarFallback>
          </Avatar>
          <div>
            <DialogTitle className="text-base font-bold text-foreground">EcoCoach</DialogTitle>
            <p className="text-xs text-muted-foreground">Your personal sustainability guide</p>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[500px]">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4 pb-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex gap-2 max-w-[85%]">
                      {msg.role === "coach" && (
                         <Avatar className="h-8 w-8 mt-1 flex-shrink-0 border border-primary/10">
                           <AvatarFallback className="bg-primary/10 text-primary text-xs"><Leaf className="h-4 w-4" /></AvatarFallback>
                         </Avatar>
                      )}
                      
                      <div
                        className={`p-3 rounded-2xl ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-background border border-border shadow-sm rounded-tl-sm text-foreground"
                        }`}
                      >
                        {msg.isTyping ? (
                          <div className="flex gap-1 py-1 px-2">
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        ) : (
                          <div className="text-sm leading-relaxed">{msg.content}</div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>

          <div className="p-4 bg-background border-t border-border/50">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs rounded-full bg-muted/50"
                onClick={() => handleQuickReply("How do I start?")}
                disabled={messages[messages.length - 1]?.isTyping}
              >
                How do I start?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs rounded-full bg-muted/50"
                onClick={() => handleQuickReply("Show me more tips")}
                disabled={messages[messages.length - 1]?.isTyping}
              >
                Show me more tips
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
