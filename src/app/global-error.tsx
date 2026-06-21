"use client";

import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5`}>
        <div className="flex flex-col items-center space-y-6 text-center px-4">
          <div className="bg-primary/20 p-6 rounded-full animate-pulse shadow-lg shadow-primary/20">
            <Leaf className="h-16 w-16 text-primary" />
          </div>
          <div className="space-y-3 max-w-lg">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground">Critical Error</h2>
            <p className="text-lg text-muted-foreground">
              A major system issue occurred and the application crashed. Let's try reloading the environment.
            </p>
          </div>
          <Button onClick={() => window.location.reload()} size="lg" className="bg-primary hover:bg-primary/90 mt-4">
            Refresh Environment
          </Button>
        </div>
      </body>
    </html>
  );
}
