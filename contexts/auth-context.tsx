"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase-client"
import type { User as AppUser } from "@/lib/supabase-client"

type AuthContextType = {
  session: Session | null
  user: User | null
  profile: AppUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, username: string) => Promise<{ error: any; data?: any }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Récupérer la session initiale
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session initiale:", session)
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setIsLoading(false)
      }
    })

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Changement d'état d'authentification:", _event, session?.user?.id)
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        setProfile(null)
        setIsLoading(false)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      console.log("Récupération du profil pour l'utilisateur:", userId)
      // Utiliser maybeSingle() au lieu de single() pour éviter l'erreur 406
      const { data, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle()

      if (error) {
        console.error("Erreur lors de la récupération du profil:", error)
      } else {
        console.log("Profil récupéré:", data)
        if (!data) {
          console.log("Aucun profil trouvé, création d'un profil par défaut")
          // Si aucun profil n'existe, créer un profil par défaut
          await createDefaultProfile(userId)
        } else {
          setProfile(data)
        }
      }
    } catch (error) {
      console.error("Erreur inattendue:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const createDefaultProfile = async (userId: string) => {
    try {
      // Récupérer l'email de l'utilisateur depuis la session
      const { data: userData } = await supabase.auth.getUser(userId)
      const email = userData?.user?.email || ""
      const username = email.split("@")[0] || `user_${Math.floor(Math.random() * 10000)}`

      console.log("Création d'un profil par défaut pour:", userId, username)

      const { data, error } = await supabase
        .from("users")
        .insert({
          id: userId,
          username,
          created_at: new Date().toISOString(),
        })
        .select()

      if (error) {
        console.error("Erreur lors de la création du profil par défaut:", error)
      } else if (data && data.length > 0) {
        console.log("Profil par défaut créé:", data[0])
        setProfile(data[0])
      }
    } catch (error) {
      console.error("Erreur lors de la création du profil par défaut:", error)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Tentative de connexion pour:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Erreur de connexion:", error)
      } else {
        console.log("Connexion réussie:", data.user?.id)
      }

      return { error }
    } catch (error) {
      console.error("Erreur inattendue lors de la connexion:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, username: string) => {
    try {
      console.log("Tentative d'inscription pour:", email, username)

      // 1. Créer l'utilisateur dans auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error || !data.user) {
        console.error("Erreur lors de la création de l'utilisateur:", error)
        return { error }
      }

      console.log("Utilisateur créé avec succès:", data.user.id)

      // 2. Créer le profil dans la table users
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        username,
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Erreur lors de la création du profil:", profileError)
        // Si la création du profil échoue, on essaie de supprimer l'utilisateur auth
        // (bien que ce ne soit pas directement possible via l'API client)
        await supabase.auth.signOut()
        return { error: profileError }
      }

      console.log("Profil créé avec succès pour:", data.user.id, username)
      return { data, error: null }
    } catch (error) {
      console.error("Erreur inattendue lors de l'inscription:", error)
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'un AuthProvider")
  }
  return context
}

