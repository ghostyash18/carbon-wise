import { Leaf, Users, Globe, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About Carbon Wise</h1>
          <p className="text-xl text-muted-foreground">
            Our mission is to empower individuals to understand, track, and significantly reduce their environmental impact.
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="lead text-lg">
            Climate change is the defining challenge of our time. While systemic change is crucial, individual actions collectively make a massive difference. Carbon Wise was built to bridge the gap between awareness and action.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Awareness</h3>
            <p className="text-muted-foreground">We provide an accurate, easy-to-use calculator to help you understand exactly where your emissions are coming from.</p>
          </div>
          
          <div className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Action</h3>
            <p className="text-muted-foreground">Through personalized tips and actionable pledges, we guide you step-by-step toward a more sustainable lifestyle.</p>
          </div>

          <div className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Community</h3>
            <p className="text-muted-foreground">Join thousands of others on the leaderboard. See how you compare and get inspired by the collective impact.</p>
          </div>

          <div className="space-y-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Global Impact</h3>
            <p className="text-muted-foreground">When millions of people make small changes, the global impact is undeniable. Start your journey today.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
