import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Clock, Copy, Edit, Lock, MessageSquare, Plus, Trash, Users } from "lucide-react"

export default function MesForumsPage() {
  // Simulated private forums data
  const privateForums = [
    {
      id: 1,
      title: "Les amis de Cocody",
      description: "Forum privé pour notre groupe d'amis du quartier",
      members: 12,
      posts: 45,
      lastActivity: "Il y a 2 heures",
      accessCode: "Cocody2023",
      isOwner: true,
    },
    {
      id: 2,
      title: "Groupe d'étude Université FHB",
      description: "Discussions et partage de ressources pour nos cours",
      members: 8,
      posts: 23,
      lastActivity: "Il y a 1 jour",
      accessCode: "FHB2023",
      isOwner: true,
    },
    {
      id: 3,
      title: "Équipe de foot du quartier",
      description: "Organisation des matchs et discussions tactiques",
      members: 15,
      posts: 67,
      lastActivity: "Il y a 3 heures",
      accessCode: "FootYop",
      isOwner: false,
    },
  ]

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mes Forums Privés</h1>
              <p className="text-muted-foreground">
                Gère tes espaces privés de discussion avec tes amis, ta famille ou tes collègues
              </p>
            </div>
            <Button asChild>
              <Link href="/create-forum" className="gap-2">
                <Plus className="h-4 w-4" />
                <span>Créer un Forum Privé</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-bold mb-4">Mes forums</h2>

            {privateForums.length > 0 ? (
              <div className="space-y-4">
                {privateForums.map((forum) => (
                  <Card key={forum.id} className="forum-card border-none shadow-md overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex flex-col h-full">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Lock className="h-4 w-4 text-primary" />
                            <h3 className="font-bold text-lg">{forum.title}</h3>
                            {forum.isOwner && (
                              <Badge variant="outline" className="text-xs border-primary text-primary">
                                Créateur
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{forum.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{forum.members} membres</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{forum.posts} posts</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Activité: {forum.lastActivity}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-center mt-auto">
                          <div className="flex items-center gap-2">
                            {forum.isOwner && (
                              <>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-muted-foreground">
                                  <Edit className="h-4 w-4" />
                                  <span className="hidden sm:inline">Modifier</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 gap-1 text-destructive">
                                  <Trash className="h-4 w-4" />
                                  <span className="hidden sm:inline">Supprimer</span>
                                </Button>
                              </>
                            )}
                          </div>
                          <Button asChild>
                            <Link href={`/forums-prives/${forum.id}`} className="gap-1">
                              <span>Accéder</span>
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">Pas encore de forums privés</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Crée ton premier forum privé pour discuter avec tes amis en toute confidentialité.
                </p>
                <Button asChild>
                  <Link href="/create-forum">Créer un Forum Privé</Link>
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-5">
                <h3 className="text-lg font-bold mb-4">Rejoindre un Forum Privé</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Si quelqu'un t'a partagé un code d'accès, entre-le ci-dessous pour rejoindre son forum privé.
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Code d'accès" className="flex-1" />
                  <Button>Rejoindre</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-5">
                <h3 className="text-lg font-bold mb-4">Mes codes d'accès</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Partage ces codes avec tes amis pour qu'ils puissent rejoindre tes forums privés.
                </p>
                <div className="space-y-3">
                  {privateForums
                    .filter((forum) => forum.isOwner)
                    .map((forum) => (
                      <div key={forum.id} className="bg-accent/50 p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{forum.title}</span>
                          <Button variant="ghost" size="sm" className="h-8 gap-1">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Copier</span>
                          </Button>
                        </div>
                        <div className="flex items-center mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm">{forum.accessCode}</code>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-primary text-white">
              <CardContent className="p-5">
                <h3 className="text-lg font-bold mb-2">Devenir Premium</h3>
                <p className="text-white/90 text-sm mb-4">Avec le compte Premium à 500 FCFA/mois, tu peux :</p>
                <ul className="space-y-2 mb-4 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 bg-white rounded-full p-0.5">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Créer jusqu'à 10 forums privés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 bg-white rounded-full p-0.5">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Inviter jusqu'à 100 membres par forum</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 bg-white rounded-full p-0.5">
                      <svg className="h-3 w-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span>Accéder aux forums Premium exclusifs</span>
                  </li>
                </ul>
                <Button variant="secondary" className="w-full">
                  Devenir Premium
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

