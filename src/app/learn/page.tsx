"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { articles } from "@/config/articles";

export default function LearnPage() {
  const featuredArticle = articles.find(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <main className="min-h-screen bg-muted/20 pb-20 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 flex items-center justify-center gap-4">
            <BookOpen className="h-10 w-10 text-primary" />
            Learn
          </h1>
          <p className="text-lg text-muted-foreground">
            A curated library of premium resources to help you understand climate change, 
            carbon emissions, and actionable sustainability practices.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link href={`/learn/${featuredArticle.id}`} className="block">
              <Card className="overflow-hidden border-border/50 shadow-md group cursor-pointer hover:shadow-lg transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <div className="relative h-64 md:h-full overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                    <Image 
                      src={featuredArticle.image!} 
                      alt={featuredArticle.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <Badge className="absolute top-4 left-4 z-20">Featured</Badge>
                  </div>
                  <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                      <span className="text-primary font-medium">{featuredArticle.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {featuredArticle.readTime}</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 line-clamp-3">
                      {featuredArticle.description}
                    </p>
                    <div className="flex items-center text-primary font-medium group-hover:gap-2 transition-all">
                      Read Article <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </motion.div>
        )}

        {/* Article Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/learn/${article.id}`} className="block h-full">
                <Card className="h-full overflow-hidden border-border/50 shadow-sm group cursor-pointer hover:shadow-md transition-all duration-300 flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    {article.image ? (
                      <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
                        <Image 
                          src={article.image} 
                          alt={article.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <BookOpen className="h-12 w-12 text-primary/40" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                      <span className="text-primary font-medium">{article.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                      {article.description}
                    </p>
                    <div className="flex items-center text-sm text-primary font-medium group-hover:gap-2 transition-all mt-auto">
                      Read Article <ArrowRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
