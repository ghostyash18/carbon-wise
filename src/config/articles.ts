export interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  featured: boolean;
  content: string;
}

export const articles: Article[] = [
  {
    id: "transit",
    title: "The Future of Urban Mobility",
    description: "Discover how sleek, modern public transit systems are transforming eco-friendly cities and drastically reducing our carbon footprints.",
    category: "Transportation",
    readTime: "5 min read",
    image: "/learn-transit.png",
    featured: true,
    content: `
## A New Era of Connectivity

The reliance on personal vehicles has long been a primary driver of urban carbon emissions. However, the paradigm is rapidly shifting. Around the world, cities are investing heavily in futuristic, highly efficient public transit systems—ranging from high-speed light rail to experimental hyperloop technologies. 

These aren't the noisy, polluting buses of the past. Modern urban transit relies on clean electricity, often sourced from renewable energy grids. 

## The Environmental Impact

By choosing public transit over a personal car, an individual can reduce their daily transportation emissions by up to **80%**. When scaled across a metropolitan area, the reduction in greenhouse gases is staggering. 

Furthermore, reduced car dependency frees up urban space. Parking lots and multi-lane highways are being reclaimed to create lush green parks, pedestrian walkways, and dedicated bike lanes, drastically reducing the urban heat island effect.

## What You Can Do Today
- **Plan your route:** Familiarize yourself with local bus or train schedules.
- **Mix modes:** Combine biking with public transit for the "last mile" of your journey.
- **Advocate:** Support local policies that fund sustainable transit infrastructure.
    `,
  },
  {
    id: "diet",
    title: "Plant-Based Living: A Beginner's Guide",
    description: "Transitioning to a plant-based diet doesn't have to be hard. Learn how vibrant, farm-to-table meals can heal the planet.",
    category: "Diet",
    readTime: "4 min read",
    image: "/learn-diet.png",
    featured: false,
    content: `
## Why Diet Matters

What we put on our plates has a profound impact on the planet. The agricultural sector, particularly livestock farming, is responsible for a significant portion of global greenhouse gas emissions, deforestation, and water consumption. 

Beef and lamb, in particular, are incredibly resource-intensive. Producing a single pound of beef requires thousands of gallons of water and generates substantially more methane than plant-based alternatives.

## Starting the Transition

You don't have to become fully vegan overnight to make a difference. The key is progressive reduction.

1. **Meatless Mondays:** Dedicate one day a week to exploring plant-based recipes.
2. **Explore Alternatives:** Try incorporating lentils, chickpeas, tofu, and tempeh into your meals as primary protein sources.
3. **Eat Locally:** Support local farmers' markets to reduce the transportation emissions associated with your food.

## The Health Benefits

Beyond the environmental impact, transitioning to a diet rich in whole-food, plant-based ingredients has been linked to numerous health benefits, including lower risks of heart disease, improved digestion, and increased energy levels. 
    `,
  },
  {
    id: "energy",
    title: "Demystifying Renewable Home Energy",
    description: "Sleek solar panels and smart grids. See how integrating sustainable energy at home can slash your emissions to zero.",
    category: "Home Energy",
    readTime: "7 min read",
    image: "/learn-energy.png",
    featured: false,
    content: `
## The Power of the Sun

For decades, residential electricity has been primarily powered by burning fossil fuels like coal and natural gas. Today, the rapid advancement and decreasing cost of solar technology are making renewable energy accessible to the average homeowner.

Modern solar panels are sleek, highly efficient, and can often generate enough electricity to completely power a household, and in some cases, even feed excess energy back into the local grid.

## Smart Homes, Smart Grids

Renewable energy isn't just about generation; it's about efficiency. Modern smart homes utilize AI-driven thermostats, energy-efficient LED lighting, and smart appliances that run during off-peak hours to minimize grid strain.

## Renting? No Problem

Even if you don't own your home or can't install solar panels, you can still participate in the renewable energy revolution:
- **Community Solar:** Subscribe to a local solar farm to offset your electricity usage.
- **Green Energy Providers:** Many utility companies now offer the option to purchase your electricity exclusively from wind or solar sources for a small premium.
    `,
  },
  {
    id: "waste",
    title: "Zero Waste Basics: 5 Easy Swaps",
    description: "Simple, everyday swaps you can make today to drastically reduce your household waste and environmental impact.",
    category: "Lifestyle",
    readTime: "3 min read",
    image: "/learn-waste.png",
    featured: false,
    content: `
## The Zero Waste Philosophy

"Zero waste" isn't about perfectly fitting all your trash for a year into a single mason jar. It's a guiding philosophy aimed at redesigning the lifecycles of resources so that all products are reused. The goal is for no trash to be sent to landfills, incinerators, or the ocean.

## 5 Simple Swaps to Get Started

1. **The Reusable Water Bottle:** Stop buying single-use plastic bottles. Invest in a high-quality stainless steel or glass bottle.
2. **Canvas Shopping Bags:** Keep a stash of reusable bags in your car or backpack so you're never caught needing plastic at the checkout.
3. **Bamboo Toothbrushes:** Over a billion plastic toothbrushes are thrown away every year. Switch to a compostable bamboo alternative.
4. **Beeswax Wraps:** Ditch the plastic cling wrap and use washable, reusable beeswax wraps to store leftovers.
5. **Bulk Buying:** Bring your own jars to stores that offer bulk sections for grains, nuts, and spices to eliminate packaging entirely.

Small, consistent changes in our daily habits can collectively lead to massive environmental shifts.
    `,
  }
];
