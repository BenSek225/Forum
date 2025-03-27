"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Filter, Lock, MessageSquare, Plus, Search, Users } from "lucide-react"
import { useForums } from "@/hooks/use-forums"
import { useAuth } from "@/contexts/auth-context"
import type { Forum } from "@/lib/supabase-client"

export default function ForumsPage() {
  const [forums, setForums] = useState<Forum[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const { getPublicForums, getUserPrivateForums, isLoading, error } = useForums()
  const { user, profile } = useAuth()

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const publicForums = await getPublicForums()
        setForums(publicForums || [])
      } catch (error) {
        console.error("Erreur lors de la récupération des forums:", error)
      } finally {
        // Arrêter le chargement initial après 2 secondes maximum
        setTimeout(() => {
          setIsInitialLoading(false)
        }, 2000)
      }
    }

    fetchForums()
  }, [getPublicForums])

  const filteredForums = forums.filter(
    (forum) =>
      forum.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      forum.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Forums</h1>
              <p className="text-muted-foreground">Découvre et participe aux discussions de la communauté</p>
            </div>
            <Button className="md:self-start" asChild>
              <Link href="/create-forum" className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Créer un Forum</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un forum..."
                className="pl-9 h-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filtres</span>
            </Button>
          </div>
        </div>

        {/* Correction du problème de responsive sur les onglets */}
        <div className="mb-8 overflow-x-auto pb-2">
          <Tabs defaultValue="public" className="w-full">
            <TabsList className="w-full md:w-auto inline-flex">
              <TabsTrigger value="public" className="gap-2 whitespace-nowrap">
                <MessageSquare className="h-4 w-4" />
                <span>Forums Publics</span>
              </TabsTrigger>
              <TabsTrigger value="private" className="gap-2 whitespace-nowrap">
                <Lock className="h-4 w-4" />
                <span>Forums Privés</span>
              </TabsTrigger>
              <TabsTrigger value="my" className="gap-2 whitespace-nowrap">
                <Users className="h-4 w-4" />
                <span>Mes Forums</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="public" className="mt-6">
              {isInitialLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                  <p className="mt-4">Chargement des forums...</p>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>Erreur lors du chargement des forums. Veuillez réessayer.</p>
                </div>
              ) : filteredForums.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredForums.map((forum) => (
                    <Link href={`/forums/${forum.id}`} key={forum.id}>
                      <Card className="forum-card border-none shadow-md h-full">
                        <CardContent className="p-5">
                          <div className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                  {forum.categories?.name || "Général"}
                                </span>
                                {forum.is_premium && (
                                  <Badge variant="premium" className="ml-2">
                                    Premium
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <h3 className="font-bold text-lg mb-1">{forum.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{forum.description}</p>
                            <div className="mt-auto flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MessageSquare className="h-4 w-4 mr-1" />
                                  {forum.post_count || 0} posts
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Users className="h-4 w-4 mr-1" />
                                  {forum.member_count || 0} membres
                                </div>
                              </div>
                              <ChevronRight className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                  <p className="text-muted-foreground mb-6">Aucun forum trouvé. Sois le premier à en créer un !</p>
                  <Button asChild>
                    <Link href="/create-forum">Créer un forum</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="private" className="mt-6">
              <div className="bg-white rounded-xl p-8 text-center">
                <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Rejoindre un Forum Privé</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Les forums privés sont accessibles uniquement avec un code d'accès. Si tu as un code, entre-le
                  ci-dessous.
                </p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input placeholder="Code d'accès du forum" />
                  <Button>Rejoindre</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="my" className="mt-6">
              {!user ? (
                <div className="bg-white rounded-xl p-8 text-center">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Connecte-toi pour voir tes forums</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Tu dois être connecté pour voir les forums que tu as créés ou rejoints.
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button asChild>
                      <Link href="/login">Se connecter</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/login?tab=register">S'inscrire</Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p>Fonctionnalité en cours de développement. Revenez bientôt !</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

