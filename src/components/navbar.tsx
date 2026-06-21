"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Leaf } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import { useSession, signOut } from "next-auth/react";

import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const { data: session } = useSession();
  
  const routes = React.useMemo(() => [
    { href: "/", label: t("nav.home") },
    { href: "/dashboard", label: t("nav.dashboard") },
    { href: "/calculate", label: t("nav.calculate") },
    { href: "/learn", label: t("nav.learn") },
    { href: "/stories", label: t("nav.stories") },
    { href: "/leaderboard", label: t("nav.leaderboard") },
    { href: "/about", label: t("nav.about") },
  ], [t]);

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf className="h-6 w-6 text-primary group-hover:text-secondary transition-colors" />
          <span className="font-bold text-xl tracking-tight text-foreground">
            EcoTrack
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === route.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
          <Link href="/calculate" className={buttonVariants({ className: "ml-4" })}>
            {t("common.calculate_impact")}
          </Link>
          {session ? (
            <Button variant="ghost" className="ml-2" onClick={() => signOut()}>Sign out</Button>
          ) : (
            <Link href="/sign-in" className={buttonVariants({ variant: "ghost", className: "ml-2" })}>
              Sign in
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="text-left flex items-center gap-2">
                   <Leaf className="h-5 w-5 text-primary" />
                   EcoTrack
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "block px-2 py-1 text-lg font-medium transition-colors hover:text-primary",
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}
                <Link href="/calculate" className={buttonVariants({ className: "mt-4 w-full" })} onClick={() => setIsOpen(false)}>
                  {t("common.calculate_impact")}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
