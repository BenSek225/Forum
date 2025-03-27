"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import type { Post, Comment } from "@/lib/supabase-client"

export function usePosts() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Récupérer les posts d'un forum
  const getForumPosts = async (forumId: number): Promise<Post[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          users(id, username, avatar_url),
          post_comment_counts(comment_count),
          post_reaction_counts(likes, dislikes)
        `)
        .eq("forum_id", forumId)
        .order("created_at", { ascending: false })

      if (error) throw new Error(error.message)
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer un post par son ID
  const getPostById = async (postId: number): Promise<Post | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          users(id, username, avatar_url),
          forums(id, title, category_id, categories(id, name)),
          post_comment_counts(comment_count),
          post_reaction_counts(likes, dislikes)
        `)
        .eq("id", postId)
        .single()

      if (error) throw new Error(error.message)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer les commentaires d'un post
  const getPostComments = async (postId: number): Promise<Comment[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("comments")
        .select(`
          *,
          users(id, username, avatar_url),
          comment_reaction_counts(likes, dislikes)
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: true })

      if (error) throw new Error(error.message)
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Créer un nouveau post
  const createPost = async (postData: Partial<Post>): Promise<Post | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("posts").insert(postData).select().single()

      if (error) throw new Error(error.message)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Ajouter un commentaire à un post
  const addComment = async (commentData: Partial<Comment>): Promise<Comment | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("comments").insert(commentData).select().single()

      if (error) throw new Error(error.message)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Ajouter/supprimer une réaction (like/dislike) à un post
  const togglePostReaction = async (userId: string, postId: number, type: "like" | "dislike"): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      // Vérifier si une réaction existe déjà
      const { data: existing, error: checkError } = await supabase
        .from("reactions")
        .select("*")
        .eq("user_id", userId)
        .eq("content_type", "post")
        .eq("content_id", postId)
        .maybeSingle()

      if (checkError) throw new Error(checkError.message)

      if (existing) {
        if (existing.type === type) {
          // Si c'est la même réaction, la supprimer
          const { error } = await supabase.from("reactions").delete().eq("id", existing.id)

          if (error) throw new Error(error.message)
        } else {
          // Si c'est une réaction différente, la mettre à jour
          const { error } = await supabase.from("reactions").update({ type }).eq("id", existing.id)

          if (error) throw new Error(error.message)
        }
      } else {
        // Ajouter une nouvelle réaction
        const { error } = await supabase.from("reactions").insert({
          user_id: userId,
          type,
          content_type: "post",
          content_id: postId,
        })

        if (error) throw new Error(error.message)
      }
      return true
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    getForumPosts,
    getPostById,
    getPostComments,
    createPost,
    addComment,
    togglePostReaction,
  }
}

