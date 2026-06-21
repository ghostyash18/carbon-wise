import { CalculatorData, CarbonBreakdown } from "./calculateCarbonFootprint";

export type EcoTip = {
  id: string;
  category: "immediate" | "medium" | "long";
  text: string;
  impact: string;
};

export function generatePersonalizedTips(results: CarbonBreakdown, data: CalculatorData): EcoTip[] {
  const { transportation, diet, homeEnergy } = results;
  const categories = [
    { name: "transportation", value: transportation },
    { name: "diet", value: diet },
    { name: "homeEnergy", value: homeEnergy }
  ];

  // Find the highest emission category
  categories.sort((a, b) => b.value - a.value);
  const highestCategory = categories[0].name;

  const tips: EcoTip[] = [];

  switch (highestCategory) {
    case "transportation":
      if (data.primaryTransport === "car" && data.fuelType !== "electric") {
        tips.push({
          id: "t1",
          category: "immediate",
          text: "Try carpooling or taking public transit just 2 days a week instead of driving alone.",
          impact: "Could save ~400 kg CO₂e per year."
        });
        tips.push({
          id: "t2",
          category: "medium",
          text: "Ensure your car tires are properly inflated and you avoid aggressive acceleration.",
          impact: "Could improve fuel efficiency by 3-10%, saving ~100 kg CO₂e."
        });
        tips.push({
          id: "t3",
          category: "long",
          text: "Consider switching to a hybrid or fully electric vehicle (EV) for your next car purchase.",
          impact: "Could cut your transport emissions by over 50%."
        });
      } else if (data.shortFlights > 2 || data.longFlights > 0) {
        tips.push({
          id: "t1",
          category: "immediate",
          text: "Offset your upcoming flights through verified carbon offsetting programs.",
          impact: "Neutralizes your flight emissions."
        });
        tips.push({
          id: "t2",
          category: "medium",
          text: "Replace one short-haul flight per year with a train journey.",
          impact: "Could save ~150 kg CO₂e per trip."
        });
        tips.push({
          id: "t3",
          category: "long",
          text: "Prioritize local vacations or digital meetings to permanently reduce air travel.",
          impact: "Saves ~500+ kg CO₂e per avoided long-haul flight."
        });
      } else {
        tips.push({
          id: "t1",
          category: "immediate",
          text: "Walk or bike for trips under 2 km instead of using motorized transport.",
          impact: "Could save ~50 kg CO₂e per year and improve health."
        });
        tips.push({
          id: "t2",
          category: "medium",
          text: "Use eco-routing on your GPS to find the most fuel-efficient routes.",
          impact: "Could reduce emissions by 5-10% per trip."
        });
        tips.push({
          id: "t3",
          category: "long",
          text: "Advocate for better public transit and cycling infrastructure in your city.",
          impact: "Systemic change benefits the entire community."
        });
      }
      break;

    case "diet":
      if (data.beefServings > 0) {
        tips.push({
          id: "d1",
          category: "immediate",
          text: "Replace one beef or lamb meal a week with chicken or a plant-based alternative.",
          impact: "Could save ~150 kg CO₂e per year."
        });
        tips.push({
          id: "d2",
          category: "medium",
          text: "Try 'Meatless Mondays' to systematically introduce more vegetarian meals.",
          impact: "Could save ~200 kg CO₂e per year."
        });
        tips.push({
          id: "d3",
          category: "long",
          text: "Transition towards a flexitarian diet, reserving high-impact meats for special occasions.",
          impact: "Could cut your diet footprint by up to 40%."
        });
      } else if (data.dairyLevel === "high" || data.dairyLevel === "medium") {
        tips.push({
          id: "d1",
          category: "immediate",
          text: "Swap cow's milk for oat, soy, or almond milk in your daily coffee or tea.",
          impact: "Could save ~50 kg CO₂e per year."
        });
        tips.push({
          id: "d2",
          category: "medium",
          text: "Reduce cheese consumption by exploring plant-based cheeses or nutritional yeast.",
          impact: "Could save ~100 kg CO₂e per year."
        });
        tips.push({
          id: "d3",
          category: "long",
          text: "Experiment with fully vegan days to discover new low-impact recipes.",
          impact: "Could save ~200+ kg CO₂e per year."
        });
      } else {
        tips.push({
          id: "d1",
          category: "immediate",
          text: "Focus on reducing food waste by planning meals and storing food properly.",
          impact: "Could save ~100 kg CO₂e per year."
        });
        tips.push({
          id: "d2",
          category: "medium",
          text: "Buy locally grown, seasonal produce to reduce transportation emissions.",
          impact: "Supports local economy and saves ~50 kg CO₂e."
        });
        tips.push({
          id: "d3",
          category: "long",
          text: "Start a home composting system for organic waste.",
          impact: "Reduces methane emissions from landfills."
        });
      }
      break;

    case "homeEnergy":
      if (data.renewablePercentage < 20) {
        tips.push({
          id: "e1",
          category: "immediate",
          text: "Switch to LED bulbs and unplug phantom power drains (chargers, standby electronics).",
          impact: "Could save ~50 kg CO₂e and lower bills."
        });
        tips.push({
          id: "e2",
          category: "medium",
          text: "Check if your energy provider offers a 'green tariff' to source electricity from renewables.",
          impact: "Could instantly decarbonize your electricity use."
        });
        tips.push({
          id: "e3",
          category: "long",
          text: "Investigate rooftop solar panels or community solar projects.",
          impact: "Could eliminate home electricity emissions entirely."
        });
      } else {
        tips.push({
          id: "e1",
          category: "immediate",
          text: "Optimize your AC/Heater thermostat by 1-2 degrees.",
          impact: "Could save ~80 kg CO₂e per year."
        });
        tips.push({
          id: "e2",
          category: "medium",
          text: "Improve home insulation by sealing drafty windows and doors.",
          impact: "Could reduce heating/cooling energy by 15%."
        });
        tips.push({
          id: "e3",
          category: "long",
          text: "Upgrade old appliances to highly energy-efficient models (e.g., 5-star rated).",
          impact: "Saves significant energy over the appliance's lifetime."
        });
      }
      break;
  }

  return tips;
}
