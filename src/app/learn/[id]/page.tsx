import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { articles } from "@/config/articles";

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  // Very basic Markdown to HTML parser for rendering the content
  // In a real app we'd use react-markdown or similar
  const renderContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return <h2 key={index} className="text-2xl md:text-3xl font-bold mt-12 mb-6 text-foreground">{line.substring(3)}</h2>;
      }
      if (line.startsWith("- ")) {
        // Handle bolding within lists
        const formattedLine = line.substring(2).split("**").map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
        return <li key={index} className="ml-6 list-disc mb-2">{formattedLine}</li>;
      }
      if (line.match(/^\d+\. /)) {
        // Handle bolding within numbered lists
        const listMatch = line.match(/^(\d+\. )(.+)/);
        if (listMatch) {
            const formattedLine = listMatch[2].split("**").map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
            return <li key={index} className="ml-6 list-decimal mb-2">{formattedLine}</li>;
        }
      }
      if (line.trim() === "") {
        return null;
      }
      
      // Handle bolding within paragraphs
      const formattedLine = line.split("**").map((part, i) => i % 2 === 1 ? <strong key={i}>{part}</strong> : part);
      return <p key={index} className="mb-6 leading-relaxed text-lg text-muted-foreground">{formattedLine}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-background pb-20 pt-16">
      {/* Hero Banner */}
      <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {article.image && (
          <Image 
            src={article.image} 
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 z-20 container mx-auto px-4 flex flex-col justify-end pb-12">
          <Link href="/learn" className="text-white/80 hover:text-white flex items-center gap-2 w-fit mb-8 transition-colors">
            <ArrowLeft className="h-5 w-5" /> Back to Learn
          </Link>
          <div className="flex items-center gap-3 text-white/90 mb-4 font-medium">
            <span className="bg-primary px-3 py-1 rounded-full text-primary-foreground text-sm">
              {article.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> {article.readTime}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl tracking-tight">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 max-w-3xl mt-12 md:mt-16">
        <div className="prose prose-lg dark:prose-invert prose-p:text-muted-foreground">
          {renderContent(article.content)}
        </div>
      </article>
    </main>
  );
}
