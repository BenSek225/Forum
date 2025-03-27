"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, Plus, Share, Star, ThumbsDown, ThumbsUp, Users } from "lucide-react"
import { useForums } from "@/hooks/use-forums"
import { usePosts } from "@/hooks/use-posts"
import { useFavorites } from "@/hooks/use-favorites"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import type { Forum, Post } from "@/lib/supabase-client"

export default function ForumPage({ params }: { params: { id: string } }) {
  const forumId = Number.parseInt(params.id)
  const [forum, setForum] = useState<Forum | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [newComment, setNewComment] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { getForumById } = useForums()
  const { getForumPosts, createPost, togglePostReaction } = usePosts()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { user, profile } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      // Récupérer les détails du forum
      const forumData = await getForumById(forumId)
      if (!forumData) {
        toast({
          title: "Erreur",
          description: "Forum introuvable",
          variant: "destructive",
        })
        router.push("/forums")
        return
      }
      setForum(forumData)

      // Récupérer les posts du forum
      const postsData = await getForumPosts(forumId)
      setPosts(postsData)

      // Vérifier si le forum est dans les favoris
      if (user) {
        const favorited = await isFavorite(user.id, "forum", forumId)
        setIsFavorited(favorited)
      }
    }

    fetchData()
  }, [forumId, getForumById, getForumPosts, isFavorite, user, router, toast])

  const handleCreatePost = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un post.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    router.push(`/create-post?forum=${forumId}`)
  }

  const handleToggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour ajouter aux favoris.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const success = await toggleFavorite(user.id, "forum", forumId)
    if (success) {
      setIsFavorited(!isFavorited)
      toast({
        title: isFavorited ? "Retiré des favoris" : "Ajouté aux favoris",
        description: isFavorited ? "Ce forum a été retiré de vos favoris." : "Ce forum a été ajouté à vos favoris.",
      })
    }
  }

  const handleReaction = async (postId: number, type: "like" | "dislike") => {
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour réagir.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    const success = await togglePostReaction(user.id, postId, type)
    if (success) {
      // Rafraîchir les posts pour mettre à jour les compteurs
      const updatedPosts = await getForumPosts(forumId)
      setPosts(updatedPosts)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent, postId: number) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour commenter.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "Commentaire vide",
        description: "Veuillez entrer un commentaire.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Créer un nouveau post (commentaire)
      await createPost({
        title: `Réponse à ${posts.find((p) => p.id === postId)?.title || "un post"}`,
        content: newComment,
        forum_id: forumId,
        author_id: user.id,
        is_anonymous: isAnonymous,
      })

      // Réinitialiser le formulaire
      setNewComment("")
      setIsAnonymous(false)

      // Rafraîchir les posts
      const updatedPosts = await getForumPosts(forumId)
      setPosts(updatedPosts)

      toast({
        title: "Commentaire publié",
        description: "Votre commentaire a été publié avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la publication du commentaire.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!forum) {
    return (
      <div className="min-h-screen bg-accent/30 flex items-center justify-center">
        <p>Chargement du forum...</p>
      </div>
    )
  }

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
                <span className="text-sm font-medium">{forum.categories?.name || "Général"}</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">{forum.title}</h1>
              <p className="text-muted-foreground">{forum.description}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={handleToggleFavorite}>
                <Star className={`h-4 w-4 ${isFavorited ? "fill-primary text-primary" : ""}`} />
                <span>{isFavorited ? "Favori" : "Favoris"}</span>
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
              <span>{forum.member_count || 0} membres</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Créé le {new Date(forum.created_at).toLocaleDateString("fr-FR")}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-4 py-8 max-w-4xl mx-auto">
        <div className="mb-6">
          <Button className="w-full flex items-center justify-center gap-2" onClick={handleCreatePost}>
            <Plus className="h-4 w-4" />
            <span>Nouveau Post</span>
          </Button>
        </div>

        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="overflow-hidden border-none shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <Avatar className="mt-0.5">
                      {post.is_anonymous ? (
                        <AvatarFallback className="bg-muted">AN</AvatarFallback>
                      ) : post.users?.avatar_url ? (
                        <AvatarImage src={post.users.avatar_url} alt={post.users.username} />
                      ) : (
                        <AvatarFallback className="bg-primary text-white">
                          {post.users?.username?.substring(0, 2).toUpperCase() || "UN"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {post.is_anonymous ? "Anonyme" : post.users?.username || "Utilisateur"}
                          </span>
                          {post.is_anonymous && (
                            <Badge variant="outline" className="text-xs">
                              Anonyme
                            </Badge>
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(post.created_at).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="mt-2 mb-4">{post.content}</p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-muted-foreground hover:text-primary hover:bg-accent"
                          onClick={() => handleReaction(post.id, "like")}
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.likes || 0}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleReaction(post.id, "dislike")}
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>{post.dislikes || 0}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 text-muted-foreground hover:text-primary hover:bg-accent"
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comment_count || 0} commentaires</span>
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
            ))
          ) : (
            <div className="text-center py-8 bg-white rounded-xl shadow-md">
              <p className="text-muted-foreground mb-4">Aucun post dans ce forum pour le moment.</p>
              <Button onClick={handleCreatePost}>Créer le premier post</Button>
            </div>
          )}
        </div>

        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-medium mb-4">Répondre</h2>
          <form onSubmit={(e) => handleSubmitComment(e, posts[0]?.id || 0)} className="space-y-4">
            <Textarea
              placeholder="Ton commentaire..."
              className="min-h-[120px]"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="anonymous"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  disabled={isSubmitting}
                />
                <label htmlFor="anonymous" className="text-sm">
                  Poster anonymement
                </label>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publication..." : "Publier"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

