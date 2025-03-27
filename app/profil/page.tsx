"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { Bell, Edit, Lock, MessageSquare, Settings, Star, User, PenSquare } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [userPosts, setUserPosts] = useState<any[]>([])
  const [userComments, setUserComments] = useState<any[]>([])

  const { toast } = useToast()
  const { user, profile, refreshProfile } = useAuth()

  useEffect(() => {
    if (profile) {
      setBio(profile.bio || "")
      setLocation(profile.location || "")
    }

    if (user) {
      fetchUserActivity()
    }
  }, [user, profile])

  const fetchUserActivity = async () => {
    if (!user) return

    try {
      // Récupérer les posts de l'utilisateur
      const { data: posts, error: postsError } = await supabase
        .from("posts")
        .select(`
          id,
          title,
          content,
          created_at,
          is_anonymous,
          forums(id, title)
        `)
        .eq("author_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      if (postsError) throw postsError
      setUserPosts(posts || [])

      // Récupérer les commentaires de l'utilisateur
      const { data: comments, error: commentsError } = await supabase
        .from("comments")
        .select(`
          id,
          content,
          created_at,
          is_anonymous,
          posts(id, title, forums(id, title))
        `)
        .eq("author_id", user.id)
        .order("created_at", { ascending: false })
        .limit(5)

      if (commentsError) throw commentsError
      setUserComments(comments || [])

      // Combiner et trier par date
      const activity = [
        ...(posts || []).map((post) => ({
          type: "post",
          id: post.id,
          title: post.title,
          content: post.content,
          forum: post.forums?.title || "Forum inconnu",
          forum_id: post.forums?.id,
          date: post.created_at,
          is_anonymous: post.is_anonymous,
        })),
        ...(comments || []).map((comment) => ({
          type: "comment",
          id: comment.id,
          title: `Réponse à "${comment.posts?.title || "un post"}"`,
          content: comment.content,
          forum: comment.posts?.forums?.title || "Forum inconnu",
          forum_id: comment.posts?.forums?.id,
          post_id: comment.posts?.id,
          date: comment.created_at,
          is_anonymous: comment.is_anonymous,
        })),
      ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

      setRecentActivity(activity.slice(0, 5))
    } catch (error) {
      console.error("Erreur lors de la récupération de l'activité:", error)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setIsLoading(true)

    try {
      const { error } = await supabase
        .from("users")
        .update({
          bio,
          location,
        })
        .eq("id", user.id)

      if (error) throw error

      await refreshProfile()

      toast({
        title: "Profil mis à jour",
        description: "Tes informations ont été enregistrées avec succès.",
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du profil.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Fonction pour formater la date relative
  const formatRelativeDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSecs = Math.floor(diffMs / 1000)
    const diffMins = Math.floor(diffSecs / 60)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffSecs < 60) return "Il y a quelques secondes"
    if (diffMins < 60) return `Il y a ${diffMins} minute${diffMins > 1 ? "s" : ""}`
    if (diffHours < 24) return `Il y a ${diffHours} heure${diffHours > 1 ? "s" : ""}`
    if (diffDays < 7) return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`

    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Obtenir les initiales du nom d'utilisateur
  const getUserInitials = () => {
    if (!profile?.username) return "UN"
    return profile.username.substring(0, 2).toUpperCase()
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Connexion requise</h2>
            <p className="text-muted-foreground mb-6">Tu dois être connecté pour accéder à ton profil.</p>
            <Button asChild>
              <Link href="/login">Se connecter</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                {profile.avatar_url ? (
                  <AvatarImage src={profile.avatar_url} alt={profile.username} />
                ) : (
                  <AvatarFallback className="bg-primary text-white text-xl">{getUserInitials()}</AvatarFallback>
                )}
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profile.username}</h1>
                  <Badge variant="outline" className="text-xs border-primary text-primary">
                    {profile.is_premium ? "Premium" : "Membre"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">
                  Membre depuis{" "}
                  {new Date(profile.created_at).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                </p>
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
                      <Input
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="h-11"
                        placeholder="Parle-nous de toi"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Localisation</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-11"
                        placeholder="Ex: Cocody, Abidjan"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} disabled={isLoading}>
                      {isLoading ? "Enregistrement..." : "Enregistrer"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm">
                      {profile.bio || "Aucune bio renseignée. Clique sur 'Modifier le profil' pour ajouter une bio."}
                    </p>
                    {profile.location && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userPosts.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Posts</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">{userComments.length || 0}</p>
                        <p className="text-xs text-muted-foreground">Commentaires</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">0</p>
                        <p className="text-xs text-muted-foreground">Likes</p>
                      </div>
                      <div className="text-center p-2 bg-accent/50 rounded-lg">
                        <p className="text-2xl font-bold text-primary">0</p>
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
                    {recentActivity.length > 0 ? (
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-1 p-1.5 rounded-full ${
                                  activity.type === "post"
                                    ? "bg-primary/10 text-primary"
                                    : "bg-secondary/10 text-secondary"
                                }`}
                              >
                                {activity.type === "post" ? (
                                  <PenSquare className="h-4 w-4" />
                                ) : (
                                  <MessageSquare className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{activity.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <span>{formatRelativeDate(activity.date)}</span>
                                  <span>•</span>
                                  <Link href={`/forums/${activity.forum_id}`} className="hover:text-primary">
                                    {activity.forum}
                                  </Link>
                                  {activity.is_anonymous && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="outline" className="text-xs">
                                        Anonyme
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{activity.content}</p>
                                <div className="mt-2">
                                  {activity.type === "post" ? (
                                    <Button variant="ghost" size="sm" asChild>
                                      <Link href={`/forums/post/${activity.id}`}>Voir le post</Link>
                                    </Button>
                                  ) : (
                                    <Button variant="ghost" size="sm" asChild>
                                      <Link href={`/forums/post/${activity.post_id}#comment-${activity.id}`}>
                                        Voir le commentaire
                                      </Link>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Image
                          src="/placeholder.svg?height=120&width=120"
                          width={120}
                          height={120}
                          alt="Illustration"
                          className="mx-auto mb-4 opacity-50"
                        />
                        <h3 className="text-lg font-medium mb-2">Aucune activité récente</h3>
                        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                          Tu n'as pas encore participé aux discussions. Commence à partager tes idées avec la
                          communauté.
                        </p>
                        <Button asChild>
                          <Link href="/forums">Explorer les forums</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="posts">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Mes posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userPosts.length > 0 ? (
                      <div className="space-y-4">
                        {userPosts.map((post, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-1.5 rounded-full bg-primary/10 text-primary">
                                <PenSquare className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">{post.title}</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <span>{formatRelativeDate(post.created_at)}</span>
                                  <span>•</span>
                                  <Link href={`/forums/${post.forums?.id}`} className="hover:text-primary">
                                    {post.forums?.title || "Forum inconnu"}
                                  </Link>
                                  {post.is_anonymous && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="outline" className="text-xs">
                                        Anonyme
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.content}</p>
                                <div className="mt-2">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/forums/post/${post.id}`}>Voir le post</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
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
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comments">
                <Card className="border-none shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg">Mes commentaires</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userComments.length > 0 ? (
                      <div className="space-y-4">
                        {userComments.map((comment, index) => (
                          <div key={index} className="border-b pb-4 last:border-0">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-1.5 rounded-full bg-secondary/10 text-secondary">
                                <MessageSquare className="h-4 w-4" />
                              </div>
                              <div>
                                <p className="font-medium">Réponse à "{comment.posts?.title || "un post"}"</p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                  <span>{formatRelativeDate(comment.created_at)}</span>
                                  <span>•</span>
                                  <Link href={`/forums/${comment.posts?.forums?.id}`} className="hover:text-primary">
                                    {comment.posts?.forums?.title || "Forum inconnu"}
                                  </Link>
                                  {comment.is_anonymous && (
                                    <>
                                      <span>•</span>
                                      <Badge variant="outline" className="text-xs">
                                        Anonyme
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{comment.content}</p>
                                <div className="mt-2">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/forums/post/${comment.posts?.id}#comment-${comment.id}`}>
                                      Voir le commentaire
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
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
                    )}
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

