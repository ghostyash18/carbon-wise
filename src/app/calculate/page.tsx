import { CarbonCalculator } from "@/components/carbon-calculator/calculator";
import { ErrorBoundary } from "@/components/common/error-boundary";

export const metadata = {
  title: "Calculate Your Carbon Footprint - EcoTrack",
  description: "Find out your estimated annual CO2 emissions and get actionable tips to reduce them.",
};

export default function CalculatePage() {
  return (
    <main className="min-h-screen bg-muted/20 pb-12 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Calculate Your Impact</h1>
          <p className="text-lg text-muted-foreground">
            Complete this short assessment to understand your carbon footprint and discover personalized ways to reduce it.
          </p>
        </div>
        <ErrorBoundary>
          <CarbonCalculator />
        </ErrorBoundary>
      </div>
    </main>
  );
}
