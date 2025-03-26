"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Bell, Edit, Lock, MessageSquare, Settings, Star, User, PenSquare } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const handleSaveProfile = () => {
    // Simulate saving profile
    setTimeout(() => {
      setIsEditing(false)
      toast({
        title: "Profil mis à jour",
        description: "Tes informations ont été enregistrées avec succès.",
      })
    }, 500)
  }

  // Simulated user data
  const userData = {
    username: "Kouassi225",
    joinDate: "Avril 2023",
    bio: "Amateur de garba et de discussions sur la vie à Abidjan. Je suis là pour partager et apprendre.",
    location: "Cocody, Abidjan",
    stats: {
      posts: 34,
      comments: 128,
      likes: 256,
      forums: 3,
    },
    recentActivity: [
      {
        type: "post",
        title: "Comment économiser sur les transports à Abidjan",
        date: "Il y a 2 jours",
        forum: "Vie Pratique",
      },
      {
        type: "comment",
        title: "Réponse à 'Le meilleur garba de Cocody'",
        date: "Il y a 3 jours",
        forum: "Culture & Détente",
      },
      {
        type: "forum",
        title: "A créé le forum 'Les amis de Cocody'",
        date: "Il y a 1 semaine",
        forum: "Forum Privé",
      },
    ],
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarFallback className="bg-primary text-white text-xl">
                  {userData.username.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{userData.username}</h1>
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    Membre
                  </Badge>
                </div>
                <p className="text-muted-foreground">Membre depuis {userData.joinDate}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4" />
              <span>{isEditing ? "Annuler" : "Modifier le profil"}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Informations</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input id="bio" defaultValue={userData.bio} className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input id="location" defaultValue={userData.location} className="h-11" />
                    </div>
                    <Button onClick={handleSaveProfile}>Enregistrer</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm">{userData.bio}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{userData.location}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userData.stats.posts}</p>
                        <p className="text-xs text-muted-foreground">Posts</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userData.stats.comments}</p>
                        <p className="text-xs text-muted-foreground">Commentaires</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userData.stats.likes}</p>
                        <p className="text-xs text-muted-foreground">Likes</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userData.stats.forums}</p>
                        <p className="text-xs text-muted-foreground">Forums</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Navigation rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <Link
                    href="/mes-forums"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Mes Forums Privés</span>
                  </Link>
                  <Link
                    href="/favoris"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    <span>Mes Favoris</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Notifications</span>
                  </Link>
                  <Link
                    href="/parametres"
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Paramètres</span>
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="activity">
              <TabsList className="mb-6">
                <TabsTrigger value="activity" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Activité récente</span>
                </TabsTrigger>
                <TabsTrigger value="posts" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>Mes posts</span>
                </TabsTrigger>
                <TabsTrigger value="comments" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Mes commentaires</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="activity">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Activité récente</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {userData.recentActivity.map((activity, index) => (
                        <div key={index} className="border-b pb-4 last:border-0">
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-1 p-1.5 rounded-full ${
                                activity.type === "post"
                                  ? "bg-primary/10 text-primary"
                                  : activity.type === "comment"
                                    ? "bg-secondary/10 text-secondary"
                                    : "bg-nouchi-100 text-nouchi-600"
                              }`}
                            >
                              {activity.type === "post" ? (
                                <PenSquare className="h-4 w-4" />
                              ) : activity.type === "comment" ? (
                                <MessageSquare className="h-4 w-4" />
                              ) : (
                                <Lock className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span>{activity.date}</span>
                                <span>•</span>
                                <span>{activity.forum}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Mes posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Image
                        src="/placeholder.svg?height=120&width=120"
                        width={120}
                        height={120}
                        alt="Illustration"
                        className="mx-auto mb-4 opacity-50"
                      />
                      <h3 className="text-lg font-medium mb-2">Aucun post pour le moment</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Tu n'as pas encore créé de post. Commence à partager tes idées avec la communauté.
                      </p>
                      <Button asChild>
                        <Link href="/create-post">Créer un post</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Mes commentaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Image
                        src="/placeholder.svg?height=120&width=120"
                        width={120}
                        height={120}
                        alt="Illustration"
                        className="mx-auto mb-4 opacity-50"
                      />
                      <h3 className="text-lg font-medium mb-2">Aucun commentaire pour le moment</h3>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Tu n'as pas encore commenté de posts. Participe aux discussions pour interagir avec la
                        communauté.
                      </p>
                      <Button asChild>
                        <Link href="/forums">Explorer les forums</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

