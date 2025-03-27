"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase-client"
import type { Forum, Category } from "@/lib/supabase-client"

export function useForums() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  // Récupérer toutes les catégories
  const getCategories = async (): Promise<Category[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true })

      if (error) throw new Error(error.message)
      return data || []
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Récupérer tous les forums publics
  const getPublicForums = async (): Promise<Forum[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("forums")
        .select(`
          *,
          categories(id, name, description),
          forum_post_counts(post_count),
          forum_member_counts(member_count)
        `)
        .eq("is_private", false)
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

  // Récupérer les forums par catégorie
  const getForumsByCategory = async (categoryId: number): Promise<Forum[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("forums")
        .select(`
          *,
          categories(id, name, description),
          forum_post_counts(post_count),
          forum_member_counts(member_count)
        `)
        .eq("category_id", categoryId)
        .eq("is_private", false)
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

  // Récupérer un forum par son ID
  const getForumById = async (id: number): Promise<Forum | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("forums")
        .select(`
          *,
          categories(id, name, description),
          forum_post_counts(post_count),
          forum_member_counts(member_count)
        `)
        .eq("id", id)
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

  // Récupérer les forums privés d'un utilisateur
  const getUserPrivateForums = async (userId: string): Promise<Forum[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from("forum_members")
        .select(`
          forum_id,
          is_admin,
          forums(
            *,
            categories(id, name, description),
            forum_post_counts(post_count),
            forum_member_counts(member_count)
          )
        `)
        .eq("user_id", userId)
        .eq("forums.is_private", true)
        .order("joined_at", { ascending: false })

      if (error) throw new Error(error.message)

      // Transformer les données pour extraire les forums
      return (
        data?.map((item) => ({
          ...item.forums,
          is_admin: item.is_admin,
        })) || []
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return []
    } finally {
      setIsLoading(false)
    }
  }

  // Créer un nouveau forum
  const createForum = async (forumData: Partial<Forum>): Promise<Forum | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from("forums").insert(forumData).select().single()

      if (error) throw new Error(error.message)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Une erreur est survenue"))
      return null
    } finally {
      setIsLoading(false)
    }
  }

  // Rejoindre un forum privé
  const joinPrivateForum = async (forumId: number, accessCode: string, userId: string): Promise<boolean> => {
    setIsLoading(true)
    setError(null)
    try {
      // Vérifier d'abord le code d'accès
      const { data: forum, error: forumError } = await supabase
        .from("forums")
        .select("*")
        .eq("id", forumId)
        .eq("access_code", accessCode)
        .single()

      if (forumError || !forum) throw new Error("Code d'accès invalide")

      // Ajouter l'utilisateur comme membre
      const { error } = await supabase.from("forum_members").insert({ forum_id: forumId, user_id: userId })

      if (error) throw new Error(error.message)
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
    getCategories,
    getPublicForums,
    getForumsByCategory,
    getForumById,
    getUserPrivateForums,
    createForum,
    joinPrivateForum,
  }
}

