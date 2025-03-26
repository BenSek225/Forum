import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronRight, Clock, MessageSquare, Star, ThumbsUp, Trash } from "lucide-react"

export default function FavorisPage() {
  // Simulated favorites data
  const favoriteForums = [
    {
      id: 1,
      title: "Comment économiser à Abidjan ?",
      category: "Vie Pratique",
      posts: 24,
      lastActivity: "Il y a 3 heures",
    },
    {
      id: 7,
      title: "Le meilleur garba de Cocody",
      category: "Culture & Détente",
      posts: 45,
      lastActivity: "Il y a 1 jour",
    },
  ]

  const favoritePosts = [
    {
      id: 1,
      title: "Astuces pour économiser sur les transports",
      forum: "Vie Pratique",
      author: "Kouassi225",
      preview:
        "J'ai découvert qu'en prenant les gbaka tôt le matin (avant 6h30), on paie moins cher sur certaines lignes...",
      comments: 12,
      likes: 34,
      time: "Il y a 2 jours",
    },
    {
      id: 2,
      title: "Recette de garba maison",
      forum: "Culture & Détente",
      author: "ChefAya",
      preview: "Pour faire un bon garba à la maison, il faut d'abord bien préparer l'attiéké. Voici comment je fais...",
      comments: 18,
      likes: 42,
      time: "Il y a 4 jours",
    },
  ]

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Star className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Mes Favoris</h1>
          </div>
          <p className="text-muted-foreground">Retrouve facilement les forums et posts que tu as sauvegardés</p>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <Tabs defaultValue="forums">
          <TabsList className="mb-6">
            <TabsTrigger value="forums" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Forums</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="gap-2">
              <Star className="h-4 w-4" />
              <span>Posts</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forums">
            <div className="grid md:grid-cols-2 gap-4">
              {favoriteForums.length > 0 ? (
                favoriteForums.map((forum) => (
                  <Card key={forum.id} className="forum-card border-none shadow-md h-full">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {forum.category}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Supprimer des favoris</span>
                          </Button>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{forum.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{forum.posts} posts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Activité: {forum.lastActivity}</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Button asChild>
                            <Link href={`/forums/${forum.id}`} className="gap-1">
                              <span>Accéder</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12 bg-white rounded-xl shadow-md">
                  <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Pas encore de forums favoris</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Ajoute des forums à tes favoris pour y accéder rapidement.
                  </p>
                  <Button asChild>
                    <Link href="/forums">Parcourir les forums</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="posts">
            <div className="grid md:grid-cols-2 gap-4">
              {favoritePosts.length > 0 ? (
                favoritePosts.map((post) => (
                  <Card key={post.id} className="forum-card border-none shadow-md h-full">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-full">
                            {post.forum}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-muted-foreground hover:text-destructive"
                          >
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Supprimer des favoris</span>
                          </Button>
                        </div>
                        <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                        <p className="text-sm mb-1">Par {post.author}</p>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.preview}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{post.comments} commentaires</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{post.likes} likes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{post.time}</span>
                          </div>
                        </div>
                        <div className="mt-auto">
                          <Button asChild>
                            <Link href={`/forums/post/${post.id}`} className="gap-1">
                              <span>Lire</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-12 bg-white rounded-xl shadow-md">
                  <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Pas encore de posts favoris</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Ajoute des posts à tes favoris pour les retrouver facilement.
                  </p>
                  <Button asChild>
                    <Link href="/forums">Parcourir les forums</Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

