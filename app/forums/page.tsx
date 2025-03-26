import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Filter, Lock, MessageSquare, Plus, Search, Users } from "lucide-react"

export default function ForumsPage() {
  // Simulated forums data
  const publicForums = [
    {
      id: 1,
      title: "Comment économiser à Abidjan ?",
      category: "Vie Pratique",
      description: "Partagez vos astuces pour réduire les dépenses quotidiennes dans la capitale économique",
      posts: 24,
      members: 156,
      isHot: true,
    },
    {
      id: 2,
      title: "Parler de sexe, c'est dur ?",
      category: "Tabous et Sans Filtre",
      description: "Discussion ouverte sur les difficultés à aborder les sujets intimes dans notre société",
      posts: 18,
      members: 89,
      isNew: true,
    },
    {
      id: 3,
      title: "Le meilleur garba de Cocody",
      category: "Culture & Détente",
      description: "À la recherche du garba parfait dans le quartier chic d'Abidjan",
      posts: 32,
      members: 203,
      isPremium: true,
    },
    {
      id: 4,
      title: "Trouver un logement pas cher",
      category: "Vie Pratique",
      description: "Conseils et bons plans pour se loger à moindre coût à Abidjan et ses environs",
      posts: 15,
      members: 112,
    },
    {
      id: 5,
      title: "Relations amoureuses compliquées",
      category: "Tabous et Sans Filtre",
      description: "Partagez vos expériences et demandez des conseils sur vos relations",
      posts: 28,
      members: 134,
    },
    {
      id: 6,
      title: "Nouveaux sons zouglou à découvrir",
      category: "Culture & Détente",
      description: "Discussions et partages des dernières sorties musicales zouglou",
      posts: 22,
      members: 98,
    },
  ]

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
              <Input placeholder="Rechercher un forum..." className="pl-9 h-10" />
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
              <div className="grid md:grid-cols-2 gap-4">
                {publicForums.map((forum) => (
                  <Link href={`/forums/${forum.id}`} key={forum.id}>
                    <Card className="forum-card border-none shadow-md h-full">
                      <CardContent className="p-5">
                        <div className="flex flex-col h-full">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                                {forum.category}
                              </span>
                              {forum.isHot && (
                                <Badge variant="hot" className="ml-2">
                                  Populaire
                                </Badge>
                              )}
                              {forum.isNew && (
                                <Badge variant="new" className="ml-2">
                                  Nouveau
                                </Badge>
                              )}
                              {forum.isPremium && (
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
                                {forum.posts} posts
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Users className="h-4 w-4 mr-1" />
                                {forum.members} membres
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

