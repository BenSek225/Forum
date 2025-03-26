"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import type { Forum, Post } from "@/lib/supabase-client"

export function useFavorites() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Récupérer les forums favoris d'un utilisateur
  const getFavoriteForums = async (userId: string): Promise<Forum[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          item_id,
          forums:item_id(
            *,
            categories(id, name, description),
            forum_post_counts(post_count),
            forum_member_counts(member_count)
          )
        `)
        .eq("user_id", userId)
        .eq("type", "forum")
        .order("created_at", { ascending: false })

      if (error) throw new Error(error.message)

      // Transformer les données pour extraire les forums
      return data?.map((item) => item.forums) || []
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer les posts favoris d'un utilisateur
  const getFavoritePosts = async (userId: string): Promise<Post[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select(`
          item_id,
          posts:item_id(
            *,
            users(id, username, avatar_url),
            forums(id, title, categories(id, name)),
            post_comment_counts(comment_count),
            post_reaction_counts(likes, dislikes)
          )
        `)
        .eq("user_id", userId)
        .eq("type", "post")
        .order("created_at", { ascending: false })

      if (error) throw new Error(error.message)

      // Transformer les données pour extraire les posts
      return data?.map((item) => item.posts) || []
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Vérifier si un élément est dans les favoris
  const isFavorite = async (userId: string, type: "forum" | "post", itemId: number): Promise<boolean> => {
    if (!userId) return false

    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", userId)
        .eq("type", type)
        .eq("item_id", itemId)
        .maybeSingle()

      if (error) throw new Error(error.message)
      return !!data
    } catch (err) {
      console.error("Erreur lors de la vérification des favoris:", err)
      return false
    }
  }

  // Ajouter/supprimer un favori
  const toggleFavorite = async (userId: string, type: "forum" | "post", itemId: number): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      const isCurrentlyFavorite = await isFavorite(userId, type, itemId)

      if (isCurrentlyFavorite) {
        // Supprimer des favoris
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("type", type)
          .eq("item_id", itemId)

        if (error) throw new Error(error.message)
      } else {
        // Ajouter aux favoris
        const { error } = await supabase.from("favorites").insert({
          user_id: userId,
          type,
          item_id: itemId,
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
    getFavoriteForums,
    getFavoritePosts,
    isFavorite,
    toggleFavorite,
  }
}

