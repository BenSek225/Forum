"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Copy, Database, Github } from "lucide-react"

export default function DatabaseSetupClientPage() {
  return (
    <div className="min-h-screen bg-accent/30 py-12">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Configuration de la Base de Données</h1>
        </div>

        <p className="text-muted-foreground mb-8">
          Ce guide vous aidera à configurer votre base de données Supabase pour l'application Chez Nous. Suivez les
          étapes ci-dessous pour initialiser toutes les tables nécessaires.
        </p>

        <Tabs defaultValue="installation" className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="schema">Structure des Tables</TabsTrigger>
            <TabsTrigger value="sql">Script SQL</TabsTrigger>
          </TabsList>

          <TabsContent value="installation" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Configuration des Variables d'Environnement</CardTitle>
                <CardDescription>
                  Créez un fichier <code>.env.local</code> à la racine de votre projet avec les informations suivantes :
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted p-4 rounded-lg font-mono text-sm mb-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase\nNEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon`,
                      )
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copier</span>
                  </Button>
                  <pre>
                    <code>
                      NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
                      <br />
                      NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anon
                    </code>
                  </pre>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Vous trouverez ces informations dans les paramètres de votre projet Supabase, sous l'onglet "API".
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Intégration de Supabase</CardTitle>
                <CardDescription>
                  Le fichier <code>lib/supabase-client.ts</code> est déjà configuré pour utiliser ces variables
                  d'environnement.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-auto">
                  <pre>
                    <code>
                      {`import { createClient } from "@supabase/supabase-js"

// Utilisation des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types des modèles de données
export type User = {
  id: string
  username: string
  created_at: string
}

export type Forum = {
  id: number
  title: string
  description: string | null
  category_id: number | null
  is_private: boolean
  password: string | null
  creator_id: string
  created_at: string
  member_count: number
  post_count: number
}

export type Post = {
  id: number
  forum_id: number
  author_id: string
  content: string
  is_anonymous: boolean
  created_at: string
  likes: number
  dislikes: number
  comment_count: number
}

export type Comment = {
  id: number
  post_id: number
  author_id: string
  content: string
  is_anonymous: boolean
  created_at: string
  likes: number
  dislikes: number
}

export type Category = {
  id: number
  name: string
  description: string
}`}
                    </code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Exécution du Script SQL</CardTitle>
                <CardDescription>
                  Connectez-vous à la console SQL de votre projet Supabase et exécutez le script SQL complet fourni dans
                  l'onglet "Script SQL".
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Accédez à votre projet Supabase</li>
                  <li>Allez dans l'onglet "SQL Editor"</li>
                  <li>Créez une nouvelle requête</li>
                  <li>Copiez et collez le script SQL complet</li>
                  <li>Exécutez le script</li>
                </ol>
                <div className="flex justify-center mt-4">
                  <Button asChild>
                    <Link
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        const tab = document.querySelector('[data-value="sql"]')
                        if (tab) (tab as HTMLElement).click()
                      }}
                    >
                      Voir le Script SQL <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schema" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Structure des Tables</CardTitle>
                <CardDescription>Voici la structure complète des tables pour l'application Chez Nous.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">users</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les informations des utilisateurs.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique de l'utilisateur</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">username</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Nom d'utilisateur unique</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">bio</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Biographie de l'utilisateur</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">location</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Localisation de l'utilisateur</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">avatar_url</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">URL de l'avatar</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_premium</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si l'utilisateur a un compte premium</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création du compte</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">categories</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les catégories de forums.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique de la catégorie</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">name</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Nom de la catégorie</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">description</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Description de la catégorie</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création de la catégorie</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">forums</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les forums publics et privés.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique du forum</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">title</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Titre du forum</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">description</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Description du forum</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">category_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table categories</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_private</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si le forum est privé</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">access_code</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Code d'accès pour les forums privés</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">creator_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">member_limit</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">Limite de membres pour les forums privés</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_premium</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si le forum est premium</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création du forum</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">posts</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les publications dans les forums.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique du post</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">title</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Titre du post</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">content</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Contenu du post</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">forum_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table forums</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">author_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_anonymous</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si le post est anonyme</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création du post</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">comments</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les commentaires sur les posts.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique du commentaire</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">content</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Contenu du commentaire</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">post_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table posts</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">author_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_anonymous</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si le commentaire est anonyme</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création du commentaire</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">forum_members</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les membres des forums privés.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique de l'appartenance</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">forum_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table forums</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">user_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">is_admin</td>
                          <td className="py-2 pr-4 font-mono">boolean</td>
                          <td className="py-2 pr-4">Indique si l'utilisateur est administrateur du forum</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">joined_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date à laquelle l'utilisateur a rejoint le forum</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">favorites</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Stocke les favoris des utilisateurs.</p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique du favori</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">user_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">type</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Type de favori (forum, post)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">item_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">ID de l'élément favori (forum_id ou post_id)</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création du favori</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Table</Badge>
                    <h3 className="font-bold">reactions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Stocke les réactions (likes, dislikes) aux posts et commentaires.
                  </p>
                  <div className="bg-muted p-4 rounded-lg overflow-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 pr-4 font-medium">Colonne</th>
                          <th className="text-left py-2 pr-4 font-medium">Type</th>
                          <th className="text-left py-2 pr-4 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">id</td>
                          <td className="py-2 pr-4 font-mono">serial</td>
                          <td className="py-2 pr-4">Clé primaire, identifiant unique de la réaction</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">user_id</td>
                          <td className="py-2 pr-4 font-mono">uuid</td>
                          <td className="py-2 pr-4">Clé étrangère référençant la table users</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">type</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Type de réaction (like, dislike)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">content_type</td>
                          <td className="py-2 pr-4 font-mono">text</td>
                          <td className="py-2 pr-4">Type de contenu (post, comment)</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 pr-4 font-mono">content_id</td>
                          <td className="py-2 pr-4 font-mono">integer</td>
                          <td className="py-2 pr-4">ID du contenu (post_id ou comment_id)</td>
                        </tr>
                        <tr>
                          <td className="py-2 pr-4 font-mono">created_at</td>
                          <td className="py-2 pr-4 font-mono">timestamp</td>
                          <td className="py-2 pr-4">Date de création de la réaction</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sql" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-primary" />
                  Script SQL Complet
                </CardTitle>
                <CardDescription>
                  Ce script crée toutes les tables nécessaires pour l'application Chez Nous. Copiez ce script et
                  exécutez-le dans la console SQL de Supabase.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted p-4 rounded-lg font-mono text-sm mb-4 max-h-[600px] overflow-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 h-8 w-8"
                    onClick={() => {
                      const sqlCode = document.getElementById("sql-code")?.textContent || ""
                      navigator.clipboard.writeText(sqlCode)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span className="sr-only">Copier</span>
                  </Button>
                  <pre id="sql-code">
                    <code>
                      {`-- Création de la table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT auth.uid(),
    username TEXT UNIQUE NOT NULL,
    bio TEXT,
    location TEXT,
    avatar_url TEXT,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

-- Création de la table des catégories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Création de la table des forums
CREATE TABLE IF NOT EXISTS forums (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category_id INTEGER REFERENCES categories(id),
    is_private BOOLEAN DEFAULT FALSE,
    access_code TEXT,
    creator_id UUID REFERENCES users(id) NOT NULL,
    member_limit INTEGER DEFAULT 25,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 100)
);

-- Création de la table des posts
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    forum_id INTEGER REFERENCES forums(id) NOT NULL,
    author_id UUID REFERENCES users(id) NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT title_length CHECK (char_length(title) >= 5 AND char_length(title) <= 100),
    CONSTRAINT content_length CHECK (char_length(content) >= 10)
);

-- Création de la table des commentaires
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    post_id INTEGER REFERENCES posts(id) NOT NULL,
    author_id UUID REFERENCES users(id) NOT NULL,
    is_anonymous BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    CONSTRAINT content_length CHECK (char_length(content) >= 2)
);

-- Création de la table des membres des forums
CREATE TABLE IF NOT EXISTS forum_members (
    id SERIAL PRIMARY KEY,
    forum_id INTEGER REFERENCES forums(id) NOT NULL,
    user_id UUID REFERENCES users(id) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(forum_id, user_id)
);

-- Création de la table des favoris
CREATE TABLE IF NOT EXISTS favorites (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('forum', 'post')),
    item_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, type, item_id)
);

-- Création de la table des réactions
CREATE TABLE IF NOT EXISTS reactions (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('like', 'dislike')),
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'comment')),
    content_id INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(user_id, content_type, content_id)
);

-- Insertion des catégories initiales
INSERT INTO categories (name, description)
VALUES 
    ('Vie Pratique', 'Astuces quotidiennes, petites annonces, conseils pour économiser'),
    ('Tabous et Sans Filtre', 'Sujets sensibles avec anonymat, parle sans drap'),
    ('Culture & Détente', 'Humour, musique, cuisine ivoirienne, zouglou, coupé-décalé')
ON CONFLICT DO NOTHING;

-- Création des vues pour faciliter les requêtes

-- Vue pour compter le nombre de posts par forum
CREATE OR REPLACE VIEW forum_post_counts AS
SELECT 
    forum_id,
    COUNT(*) as post_count
FROM 
    posts
GROUP BY 
    forum_id;

-- Vue pour compter le nombre de membres par forum
CREATE OR REPLACE VIEW forum_member_counts AS
SELECT 
    forum_id,
    COUNT(*) as member_count
FROM 
    forum_members
GROUP BY 
    forum_id;

-- Vue pour compter le nombre de commentaires par post
CREATE OR REPLACE VIEW post_comment_counts AS
SELECT 
    post_id,
    COUNT(*) as comment_count
FROM 
    comments
GROUP BY 
    post_id;

-- Vue pour compter les likes et dislikes par post
CREATE OR REPLACE VIEW post_reaction_counts AS
SELECT 
    content_id as post_id,
    SUM(CASE WHEN type = 'like' THEN 1 ELSE 0 END) as likes,
    SUM(CASE WHEN type = 'dislike' THEN 1 ELSE 0 END) as dislikes
FROM 
    reactions
WHERE 
    content_type = 'post'
GROUP BY 
    content_id;

-- Vue pour compter les likes et dislikes par commentaire
CREATE OR REPLACE VIEW comment_reaction_counts AS
SELECT 
    content_id as comment_id,
    SUM(CASE WHEN type = 'like' THEN 1 ELSE 0 END) as likes,
    SUM(CASE WHEN type = 'dislike' THEN 1 ELSE 0 END) as dislikes
FROM 
    reactions
WHERE 
    content_type = 'comment'
GROUP BY 
    content_id;

-- Fonction pour ajouter automatiquement le créateur d'un forum comme membre
CREATE OR REPLACE FUNCTION add_forum_creator_as_member()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO forum_members (forum_id, user_id, is_admin)
    VALUES (NEW.id, NEW.creator_id, TRUE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour ajouter le créateur d'un forum comme membre
CREATE TRIGGER add_forum_creator_trigger
AFTER INSERT ON forums
FOR EACH ROW
EXECUTE FUNCTION add_forum_creator_as_member();

-- Politiques RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE forums ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Politiques pour users
CREATE POLICY "Les utilisateurs peuvent lire tous les profils"
ON users FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Les utilisateurs peuvent modifier leur propre profil"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Politiques pour forums
CREATE POLICY "Tout le monde peut lire les forums publics"
ON forums FOR SELECT
TO authenticated, anon
USING (NOT is_private);

CREATE POLICY "Les membres peuvent lire les forums privés"
ON forums FOR SELECT
TO authenticated
USING (
    is_private AND EXISTS (
        SELECT 1 FROM forum_members 
        WHERE forum_id = id AND user_id = auth.uid()
    )
);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des forums"
ON forums FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Les créateurs peuvent modifier leurs forums"
ON forums FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id);

-- Politiques pour posts
CREATE POLICY "Tout le monde peut lire les posts dans les forums publics"
ON posts FOR SELECT
TO authenticated, anon
USING (
    EXISTS (
        SELECT 1 FROM forums 
        WHERE id = forum_id AND NOT is_private
    )
);

CREATE POLICY "Les membres peuvent lire les posts dans les forums privés"
ON posts FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM forums f
        JOIN forum_members fm ON f.id = fm.forum_id
        WHERE f.id = forum_id AND f.is_private AND fm.user_id = auth.uid()
    )
);

CREATE POLICY "Les utilisateurs authentifiés peuvent créer des posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = author_id AND
    EXISTS (
        SELECT 1 FROM forums f
        LEFT JOIN forum_members fm ON f.id = fm.forum_id AND fm.user_id = auth.uid()
        WHERE f.id = forum_id AND (NOT f.is_private OR fm.user_id IS NOT NULL)
    )
);

CREATE POLICY "Les auteurs peuvent modifier leurs posts"
ON posts FOR UPDATE
TO authenticated
USING (auth.uid() = author_id);

-- Politiques similaires pour les autres tables
-- (comments, forum_members, favorites, reactions)
-- Ajoutez selon vos besoins spécifiques

-- Création d'un index pour améliorer les performances des recherches
CREATE INDEX IF NOT EXISTS forums_title_idx ON forums USING GIN (to_tsvector('french', title));
CREATE INDEX IF NOT EXISTS posts_title_content_idx ON posts USING GIN (to_tsvector('french', title || ' ' || content));
`}
                    </code>
                  </pre>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => {
                      const sqlCode = document.getElementById("sql-code")?.textContent || ""
                      navigator.clipboard.writeText(sqlCode)
                    }}
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copier le script SQL</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 bg-accent p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Étapes suivantes</h2>
          <ol className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mt-0.5">
                1
              </div>
              <div>
                <h3 className="font-medium">Configurez vos variables d'environnement</h3>
                <p className="text-sm text-muted-foreground">
                  Créez un fichier <code>.env.local</code> à la racine de votre projet avec votre URL Supabase et votre
                  clé anon.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mt-0.5">
                2
              </div>
              <div>
                <h3 className="font-medium">Exécutez le script SQL</h3>
                <p className="text-sm text-muted-foreground">
                  Copiez le script SQL complet et exécutez-le dans la console SQL de Supabase.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mt-0.5">
                3
              </div>
              <div>
                <h3 className="font-medium">Mettez à jour le client Supabase</h3>
                <p className="text-sm text-muted-foreground">
                  Assurez-vous que le fichier <code>lib/supabase-client.ts</code> est configuré pour utiliser vos
                  variables d'environnement.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="size-6 rounded-full bg-primary flex items-center justify-center text-white font-bold mt-0.5">
                4
              </div>
              <div>
                <h3 className="font-medium">Configurez l'authentification</h3>
                <p className="text-sm text-muted-foreground">
                  Activez l'authentification par email et mot de passe dans les paramètres de Supabase.
                </p>
              </div>
            </li>
          </ol>
        </div>

        <div className="flex justify-between items-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/">Retour à l'accueil</Link>
          </Button>
          <Button asChild>
            <a
              href="https://github.com/votre-repo/chez-nous"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Github className="h-4 w-4" />
              <span>Voir sur GitHub</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

