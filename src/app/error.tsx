"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 text-center px-4 bg-gradient-to-b from-background to-primary/5">
      <div className="bg-primary/20 p-6 rounded-full animate-pulse shadow-lg shadow-primary/20">
        <Leaf className="h-16 w-16 text-primary" />
      </div>
      <div className="space-y-3 max-w-lg">
        <h2 className="text-4xl font-extrabold tracking-tight text-foreground">Oh snap! Our roots tangled up.</h2>
        <p className="text-lg text-muted-foreground">
          We encountered an unexpected error while trying to load this page. Don't worry, the earth is still spinning! Let's get you back on track.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button onClick={() => reset()} size="lg" className="bg-primary hover:bg-primary/90">
          Plant a new seed (Try again)
        </Button>
        <Button onClick={() => window.location.href = "/"} size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
          Return to Basecamp
        </Button>
      </div>
    </div>
  );
}
