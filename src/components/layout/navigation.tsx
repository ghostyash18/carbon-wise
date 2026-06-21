"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Leaf, Menu } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const links = [
    { href: "/calculate", label: "Calculator" },
    ...(session ? [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/pledges", label: "Pledges" },
      { href: "/community", label: "Community" }
    ] : [])
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">Carbon Wise</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-foreground/80 ${pathname === link.href ? "text-foreground" : "text-foreground/60"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {session ? (
            <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>Sign out</Button>
          ) : (
            <>
              <Link href="/sign-in"><Button variant="ghost">Sign in</Button></Link>
              <Link href="/sign-up"><Button>Sign up</Button></Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
