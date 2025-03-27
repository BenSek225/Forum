"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, Flame, Lock, MessageSquare, Star, TrendingUp, Users } from "lucide-react"
import { CreateActionButtonV2 } from "@/components/create-action-button-v2"
import { useForums } from "@/hooks/use-forums"
import type { Forum, Category } from "@/lib/supabase-client"

export default function Home() {
  const [topForums, setTopForums] = useState<Forum[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { getPublicForums, getCategories } = useForums()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // Récupérer les forums publics
        const forums = await getPublicForums()

        // Trier par nombre de posts (décroissant)
        const sortedForums = [...forums].sort((a, b) => (b.post_count || 0) - (a.post_count || 0))

        // Prendre les 3 premiers
        setTopForums(sortedForums.slice(0, 3))

        // Récupérer les catégories
        const categoriesData = await getCategories()
        setCategories(categoriesData)
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [getPublicForums, getCategories])

  // Fonction pour obtenir la classe CSS de la catégorie
  const getCategoryClass = (categoryId: number | null) => {
    if (!categoryId) return "category-card-vie"

    switch (categoryId) {
      case 1:
        return "category-card-vie"
      case 2:
        return "category-card-tabous"
      case 3:
        return "category-card-culture"
      default:
        return "category-card-vie"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 pattern-bg overflow-hidden">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <Badge variant="hot" className="mb-2">
                Nouveau en Côte d'Ivoire
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold hero-text">
                Chez Nous, on parle, on rigole, on avance – <span className="text-primary">ensemble</span>.
              </h1>
              <p className="text-lg text-muted-foreground">
                Le premier forum en ligne pour les Ivoiriens, où tu peux discuter de tout, sans filtre mais avec
                respect, dans un espace 100% local.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button size="lg" asChild>
                  <Link href="/login?tab=register">Rejoins-nous</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/forums">Découvrir les forums</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl opacity-30"></div>
              <div className="relative bg-white p-4 rounded-2xl shadow-xl">
                <div className="bg-accent/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      CN
                    </div>
                    <div>
                      <h3 className="font-bold">Chez Nous</h3>
                      <p className="text-xs text-muted-foreground">La communauté ivoirienne</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="size-6 rounded-full bg-nouchi-100 flex items-center justify-center text-nouchi-600 text-xs font-bold">
                          K
                        </div>
                        <span className="text-sm font-medium">Kouassi225</span>
                      </div>
                      <p className="text-sm">Qui connaît un bon garba à Cocody pas cher ?</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="size-6 rounded-full bg-ivoire-100 flex items-center justify-center text-ivoire-600 text-xs font-bold">
                          A
                        </div>
                        <span className="text-sm font-medium">AyaC</span>
                      </div>
                      <p className="text-sm">Vers l'université, y a un bon à 500 FCFA !</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top du Jour Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-primary h-6 w-6" />
              <h2 className="text-2xl font-bold">Top du Jour</h2>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/forums" className="gap-1">
                <span>Voir tout</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Card key={index} className="h-full forum-card border-none shadow-md animate-pulse">
                    <CardContent className="p-5">
                      <div className="h-4 w-24 bg-muted rounded mb-2"></div>
                      <div className="h-6 w-full bg-muted rounded mb-2"></div>
                      <div className="h-4 w-3/4 bg-muted rounded mb-4"></div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div className="h-4 w-16 bg-muted rounded"></div>
                          <div className="h-4 w-16 bg-muted rounded"></div>
                        </div>
                        <div className="h-4 w-4 bg-muted rounded-full"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : topForums.length > 0 ? (
              topForums.map((forum, index) => (
                <Link href={`/forums/${forum.id}`} key={forum.id}>
                  <Card className="h-full forum-card border-none shadow-md">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={index === 0 ? "hot" : index === 1 ? "new" : "premium"} className="mb-2">
                            {index === 0 ? "Populaire" : index === 1 ? "Nouveau" : "Premium"}
                          </Badge>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(forum.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                            })}
                          </div>
                        </div>
                        <h3 className="font-medium text-lg mb-2">{forum.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{forum.categories?.name || "Général"}</p>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-sm">
                              <MessageSquare className="h-4 w-4 mr-1 text-primary" />
                              {forum.post_count || 0}
                            </div>
                            <div className="flex items-center text-sm">
                              <Users className="h-4 w-4 mr-1 text-primary" />
                              {forum.member_count || 0}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-muted-foreground">Aucun forum disponible pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-accent/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Catégories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Link href={`/categories/${category.id}`} key={category.id}>
                <div className={`category-card ${getCategoryClass(category.id)} p-6 h-full`}>
                  <div className="flex flex-col h-full">
                    <div className="mb-4 opacity-90">
                      {index === 0 ? (
                        <MessageSquare className="h-6 w-6" />
                      ) : index === 1 ? (
                        <Users className="h-6 w-6" />
                      ) : (
                        <Star className="h-6 w-6" />
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-sm opacity-90">
                        {topForums.filter((f) => f.category_id === category.id).length} forums
                      </span>
                      <ChevronRight className="h-5 w-5 opacity-90" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Pourquoi Chez Nous ?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Une plateforme conçue par des Ivoiriens, pour des Ivoiriens, avec des fonctionnalités adaptées à nos
              besoins.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Forums Privés Gratuits",
                description: "Crée ton espace privé pour discuter avec tes amis, ta famille ou tes collègues.",
                icon: <Lock className="h-10 w-10 text-primary" />,
              },
              {
                title: "Anonymat Garanti",
                description: "Parle librement des sujets sensibles sans révéler ton identité.",
                icon: <Users className="h-10 w-10 text-primary" />,
              },
              {
                title: "100% Ivoirien",
                description: "Contenu local, expressions nouchi, et sujets qui nous concernent vraiment.",
                icon: <Flame className="h-10 w-10 text-primary" />,
              },
            ].map((feature, index) => (
              <div key={index} className="bg-accent/30 p-6 rounded-xl">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 nouchi-gradient text-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à nous rejoindre ?</h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-8">
              Crée ton compte gratuitement et commence à participer aux discussions ou lance ton propre forum.
            </p>
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/login?tab=register">Créer un compte</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <CreateActionButtonV2 />
    </div>
  )
}

