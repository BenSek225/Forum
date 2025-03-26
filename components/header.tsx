"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Bell, Home, Info, Lock, LogIn, Menu, MessageSquare, Search, Star, User, Users, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Header() {
  const [showSearch, setShowSearch] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  // Simulate checking if user is logged in
  useEffect(() => {
    // This would be replaced with actual auth check
    const checkAuth = () => {
      const hasAuth = localStorage.getItem("isLoggedIn") === "true"
      setIsLoggedIn(hasAuth)
    }

    checkAuth()

    // For demo purposes, let's add a listener
    window.addEventListener("storage", checkAuth)
    return () => window.removeEventListener("storage", checkAuth)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogin = () => {
    // For demo purposes
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    // For demo purposes
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent",
      )}
    >
      <div className="container flex h-16 max-w-7xl items-center px-4">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Navigation</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="py-4 border-b">
                    <Link href="/" className="flex items-center gap-2 mb-6">
                      <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                        CN
                      </div>
                      <span className="font-bold text-xl">Chez Nous</span>
                    </Link>

                    {isLoggedIn ? (
                      <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-white">YA</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Yao225</p>
                          <p className="text-xs text-muted-foreground">Membre depuis 2 mois</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link href="/login">Connexion</Link>
                        </Button>
                        <Button variant="outline" asChild className="flex-1">
                          <Link href="/login?tab=register">Inscription</Link>
                        </Button>
                      </div>
                    )}
                  </div>

                  <nav className="flex flex-col gap-1 py-4 flex-1 overflow-auto">
                    <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Navigation
                    </p>
                    <Link
                      href="/"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                        pathname === "/" ? "bg-accent text-primary" : "hover:bg-muted/80",
                      )}
                    >
                      <Home className="size-4" />
                      Accueil
                    </Link>
                    <Link
                      href="/forums"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                        pathname.startsWith("/forums") ? "bg-accent text-primary" : "hover:bg-muted/80",
                      )}
                    >
                      <MessageSquare className="size-4" />
                      Forums
                    </Link>
                    <Link
                      href="/equipe"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                        pathname === "/equipe" ? "bg-accent text-primary" : "hover:bg-muted/80",
                      )}
                    >
                      <Users className="size-4" />
                      L'équipe
                    </Link>
                    <Link
                      href="/about"
                      className={cn(
                        "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                        pathname === "/about" ? "bg-accent text-primary" : "hover:bg-muted/80",
                      )}
                    >
                      <Info className="size-4" />À propos
                    </Link>

                    {isLoggedIn && (
                      <>
                        <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-6 mb-2">
                          Personnel
                        </p>
                        <Link
                          href="/mes-forums"
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                            pathname === "/mes-forums" ? "bg-accent text-primary" : "hover:bg-muted/80",
                          )}
                        >
                          <Lock className="size-4" />
                          Mes Forums Privés
                        </Link>
                        <Link
                          href="/favoris"
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                            pathname === "/favoris" ? "bg-accent text-primary" : "hover:bg-muted/80",
                          )}
                        >
                          <Star className="size-4" />
                          Mes Favoris
                        </Link>
                        <Link
                          href="/profil"
                          className={cn(
                            "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium",
                            pathname === "/profil" ? "bg-accent text-primary" : "hover:bg-muted/80",
                          )}
                        >
                          <User className="size-4" />
                          Mon Profil
                        </Link>
                      </>
                    )}
                  </nav>

                  {isLoggedIn && (
                    <div className="py-4 border-t">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        Déconnexion
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2 ml-2 md:ml-0">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                CN
              </div>
              <span className="font-bold text-xl hidden md:inline">Chez Nous</span>
            </Link>
          </div>

          {showSearch ? (
            <div className="flex items-center w-full max-w-md mx-4">
              <Input
                type="search"
                placeholder="Rechercher un forum, un sujet..."
                className="h-10 bg-muted/50 border-0 focus-visible:ring-primary"
              />
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(false)} className="ml-1">
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <nav className="hidden md:flex items-center gap-1 mx-4">
              <Link
                href="/"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/" ? "bg-accent text-primary" : "hover:bg-muted/80",
                )}
              >
                Accueil
              </Link>
              <Link
                href="/forums"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname.startsWith("/forums") ? "bg-accent text-primary" : "hover:bg-muted/80",
                )}
              >
                Forums
              </Link>
              <Link
                href="/equipe"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/equipe" ? "bg-accent text-primary" : "hover:bg-muted/80",
                )}
              >
                L'équipe
              </Link>
              <Link
                href="/about"
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === "/about" ? "bg-accent text-primary" : "hover:bg-muted/80",
                )}
              >
                À propos
              </Link>
            </nav>
          )}

          <div className="flex items-center gap-2">
            {!showSearch && (
              <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)} className="text-muted-foreground">
                <Search className="h-5 w-5" />
                <span className="sr-only">Rechercher</span>
              </Button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="relative text-muted-foreground">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 size-2 bg-primary rounded-full"></span>
                  <span className="sr-only">Notifications</span>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="size-8">
                        <AvatarFallback className="bg-primary text-white">YA</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profil" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/mes-forums" className="cursor-pointer">
                        <Lock className="mr-2 h-4 w-4" />
                        <span>Forums Privés</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/favoris" className="cursor-pointer">
                        <Star className="mr-2 h-4 w-4" />
                        <span>Favoris</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-500 focus:text-red-500" onClick={handleLogout}>
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Connexion
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/login?tab=register">Inscription</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

