"use client"

import { createClient } from "@supabase/supabase-js"

// Utilisation des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types des modèles de données
export type User = {
  id: string
  username: string
  bio?: string
  location?: string
  avatar_url?: string
  is_premium?: boolean
  created_at: string
}

export type Category = {
  id: number
  name: string
  description: string
  created_at?: string
}

export type Forum = {
  id: number
  title: string
  description: string | null
  category_id: number | null
  is_private: boolean
  access_code: string | null
  creator_id: string
  member_limit?: number
  is_premium: boolean
  created_at: string
  member_count?: number
  post_count?: number
}

export type Post = {
  id: number
  title: string
  content: string
  forum_id: number
  author_id: string
  is_anonymous: boolean
  created_at: string
  likes?: number
  dislikes?: number
  comment_count?: number
}

export type Comment = {
  id: number
  content: string
  post_id: number
  author_id: string
  is_anonymous: boolean
  created_at: string
  likes?: number
  dislikes?: number
}

export type ForumMember = {
  id: number
  forum_id: number
  user_id: string
  is_admin: boolean
  joined_at: string
}

export type Favorite = {
  id: number
  user_id: string
  type: "forum" | "post"
  item_id: number
  created_at: string
}

export type Reaction = {
  id: number
  user_id: string
  type: "like" | "dislike"
  content_type: "post" | "comment"
  content_id: number
  created_at: string
}

// Fonction pour récupérer le profil de l'utilisateur courant
export async function getCurrentUser() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  if (!session) return null

  const { data } = await supabase.from("users").select("*").eq("id", session.user.id).single()

  return data
}

// Fonction pour récupérer les catégories
export async function getCategories() {
  const { data, error } = await supabase.from("categories").select("*").order("id", { ascending: true })

  if (error) throw error
  return data as Category[]
}

// Fonction pour récupérer les forums publics
export async function getPublicForums() {
  const { data, error } = await supabase
    .from("forums")
    .select(`
      *,
      categories(name),
      forum_post_counts(post_count),
      forum_member_counts(member_count)
    `)
    .eq("is_private", false)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Fonction pour récupérer un forum par son ID
export async function getForumById(id: number) {
  const { data, error } = await supabase
    .from("forums")
    .select(`
      *,
      categories(name),
      forum_post_counts(post_count),
      forum_member_counts(member_count)
    `)
    .eq("id", id)
    .single()

  if (error) throw error
  return data
}

// Fonction pour récupérer les posts d'un forum
export async function getForumPosts(forumId: number) {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *,
      users(username, avatar_url),
      post_comment_counts(comment_count),
      post_reaction_counts(likes, dislikes)
    `)
    .eq("forum_id", forumId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data
}

// Fonction pour récupérer les commentaires d'un post
export async function getPostComments(postId: number) {
  const { data, error } = await supabase
    .from("comments")
    .select(`
      *,
      users(username, avatar_url),
      comment_reaction_counts(likes, dislikes)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  if (error) throw error
  return data
}

// Fonction pour créer un nouveau forum
export async function createForum(forum: Partial<Forum>) {
  const { data, error } = await supabase.from("forums").insert(forum).select().single()

  if (error) throw error
  return data
}

// Fonction pour créer un nouveau post
export async function createPost(post: Partial<Post>) {
  const { data, error } = await supabase.from("posts").insert(post).select().single()

  if (error) throw error
  return data
}

// Fonction pour ajouter un commentaire
export async function addComment(comment: Partial<Comment>) {
  const { data, error } = await supabase.from("comments").insert(comment).select().single()

  if (error) throw error
  return data
}

// Fonction pour rejoindre un forum privé
export async function joinPrivateForum(forumId: number, accessCode: string, userId: string) {
  // Vérifier d'abord le code d'accès
  const { data: forum, error: forumError } = await supabase
    .from("forums")
    .select("*")
    .eq("id", forumId)
    .eq("access_code", accessCode)
    .single()

  if (forumError || !forum) throw new Error("Code d'accès invalide")

  // Ajouter l'utilisateur comme membre
  const { data, error } = await supabase
    .from("forum_members")
    .insert({ forum_id: forumId, user_id: userId })
    .select()
    .single()

  if (error) throw error
  return data
}

// Fonction pour ajouter/supprimer un favori
export async function toggleFavorite(userId: string, type: "forum" | "post", itemId: number) {
  // Vérifier si le favori existe déjà
  const { data: existing, error: checkError } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("type", type)
    .eq("item_id", itemId)
    .maybeSingle()

  if (checkError) throw checkError

  if (existing) {
    // Supprimer le favori existant
    const { error } = await supabase.from("favorites").delete().eq("id", existing.id)

    if (error) throw error
    return null
  } else {
    // Ajouter un nouveau favori
    const { data, error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, type, item_id: itemId })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Fonction pour ajouter/modifier une réaction
export async function addReaction(
  userId: string,
  type: "like" | "dislike",
  contentType: "post" | "comment",
  contentId: number,
) {
  // Vérifier si une réaction existe déjà
  const { data: existing, error: checkError } = await supabase
    .from("reactions")
    .select("*")
    .eq("user_id", userId)
    .eq("content_type", contentType)
    .eq("content_id", contentId)
    .maybeSingle()

  if (checkError) throw checkError

  if (existing) {
    if (existing.type === type) {
      // Si c'est la même réaction, la supprimer
      const { error } = await supabase.from("reactions").delete().eq("id", existing.id)

      if (error) throw error
      return null
    } else {
      // Si c'est une réaction différente, la mettre à jour
      const { data, error } = await supabase.from("reactions").update({ type }).eq("id", existing.id).select().single()

      if (error) throw error
      return data
    }
  } else {
    // Ajouter une nouvelle réaction
    const { data, error } = await supabase
      .from("reactions")
      .insert({ user_id: userId, type, content_type: contentType, content_id: contentId })
      .select()
      .single()

    if (error) throw error
    return data
  }
}

