"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { PledgeList } from "@/components/pledges/pledge-list"
import { Leaf } from "lucide-react"

export default function PledgesPage() {
  const { status } = useSession()
  
  if (status === "unauthenticated") {
    redirect("/sign-in")
  }

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center"><Leaf className="animate-pulse h-12 w-12 text-primary" /></div>
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-8 space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Action Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Taking action is the most important step. Adopt these pledges to lower your carbon footprint.
        </p>
      </div>

      <PledgeList />
    </div>
  )
}
