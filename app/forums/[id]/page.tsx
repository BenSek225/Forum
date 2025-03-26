import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, Plus, Share, Star, ThumbsDown, ThumbsUp, Users } from "lucide-react"

const forums = [
  {
    id: 1,
    title: "Comment économiser à Abidjan ?",
    category: "Vie Pratique",
    description: "Partagez vos astuces pour réduire les dépenses quotidiennes dans la capitale économique",
    members: 156,
    createdAt: "Il y a 2 semaines",
    posts: [
      {
        id: 1,
        author: "Kouassi225",
        avatar: "KO",
        content:
          "Salut les gars, je viens d'arriver à Abidjan et je trouve que tout est cher. Vous avez des astuces pour économiser sur le loyer, la nourriture, etc. ?",
        likes: 15,
        dislikes: 2,
        comments: 8,
        isAnonymous: false,
        timestamp: "Il y a 2 jours",
      },
      {
        id: 2,
        author: "AyaC",
        avatar: "AC",
        content:
          "Pour la nourriture, va au grand marché de Marcory tôt le matin. Les prix sont meilleurs et les produits plus frais. Évite Cocody pour les courses, c'est toujours plus cher.",
        likes: 24,
        dislikes: 0,
        comments: 3,
        isAnonymous: false,
        timestamp: "Il y a 1 jour",
      },
      {
        id: 3,
        author: "Anonyme",
        avatar: "AN",
        content:
          "Moi j'ai trouvé une colocation à Yopougon, on est 3 et on paie 25 000 FCFA chacun par mois. C'est pas le grand luxe mais c'est propre et y a l'électricité stable.",
        likes: 18,
        dislikes: 1,
        comments: 5,
        isAnonymous: true,
        timestamp: "Il y a 20 heures",
      },
      {
        id: 4,
        author: "DjoDjo",
        avatar: "DJ",
        content:
          "Pour les transports, utilise Yango ou InDrive au lieu des taxis classiques. Tu peux économiser jusqu'à 40% sur tes trajets. Et si tu peux, prends les gbaka pour les longues distances, c'est beaucoup moins cher.",
        likes: 32,
        dislikes: 0,
        comments: 7,
        isAnonymous: false,
        timestamp: "Il y a 12 heures",
      },
    ],
  },
]

export default function ForumPage({ params }: { params: { id: string } }) {
  const forumId = Number.parseInt(params.id)
  const forum = forums.find((f) => f.id === forumId) || forums[0]

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/forums" className="text-sm text-muted-foreground hover:text-primary">
                  Forums
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-medium">{forum.category}</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{forum.title}</h1>
              <p className="text-muted-foreground">{forum.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Star className="h-4 w-4" />
                <span>Favoris</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share className="h-4 w-4" />
                <span>Partager</span>
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{forum.members} membres</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Créé {forum.createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button className="w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Nouveau Post</span>
          </Button>
        </div>

        <div className="space-y-6">
          {forum.posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border-none shadow-md">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <Avatar className="mt-0.5">
                    <AvatarFallback className={post.isAnonymous ? "bg-muted" : "bg-primary text-white"}>
                      {post.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.isAnonymous ? "Anonyme" : post.author}</span>
                        {post.isAnonymous && (
                          <Badge variant="outline" className="text-xs">
                            Anonyme
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.timestamp}
                      </span>
                    </div>
                    <p className="mt-2 mb-4">{post.content}</p>
                    <div className="flex flex-wrap items-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-muted-foreground hover:text-primary hover:bg-accent"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      >
                        <ThumbsDown className="h-4 w-4" />
                        <span>{post.dislikes}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 text-muted-foreground hover:text-primary hover:bg-accent"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments} commentaires</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 ml-auto text-muted-foreground hover:text-primary hover:bg-accent"
                      >
                        <Share className="h-4 w-4" />
                        <span className="sr-only">Partager</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-medium mb-4">Répondre</h2>
          <div className="space-y-4">
            <Textarea placeholder="Ton commentaire..." className="min-h-[120px]" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="anonymous" className="text-sm">
                  Poster anonymement
                </label>
              </div>
              <Button>Publier</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

