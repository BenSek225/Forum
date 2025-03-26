"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Image, Link2, PenSquare } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CreatePostPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const forumId = searchParams.get("forum")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate post creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Post créé avec succès",
        description: "Ton post a été publié et est maintenant visible dans le forum.",
      })

      if (forumId) {
        router.push(`/forums/${forumId}`)
      } else {
        router.push("/forums")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-accent/30 py-12">
      <div className="container px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau post</h1>

        <form onSubmit={handleSubmit}>
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenSquare className="h-5 w-5 text-primary" />
                Nouveau post
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {!forumId && (
                <div className="space-y-2">
                  <Label htmlFor="forum">Choisir un forum</Label>
                  <Select required>
                    <SelectTrigger id="forum" className="h-11">
                      <SelectValue placeholder="Sélectionner un forum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Comment économiser à Abidjan ?</SelectItem>
                      <SelectItem value="2">Parler de sexe, c'est dur ?</SelectItem>
                      <SelectItem value="3">Le meilleur garba de Cocody</SelectItem>
                      <SelectItem value="4">Trouver un logement pas cher</SelectItem>
                      <SelectItem value="5">Relations amoureuses compliquées</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="title">Titre du post</Label>
                <Input id="title" placeholder="Un titre clair et concis" required className="h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                  id="content"
                  placeholder="Partage tes idées, questions ou expériences..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Button type="button" variant="outline" className="gap-2">
                  <Image className="h-4 w-4" />
                  <span>Ajouter une image</span>
                </Button>
                <Button type="button" variant="outline" className="gap-2">
                  <Link2 className="h-4 w-4" />
                  <span>Ajouter un lien</span>
                </Button>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="anonymous-switch" className="flex items-center gap-2">
                    Poster anonymement
                    {isAnonymous && (
                      <Badge variant="outline" className="text-xs">
                        Anonyme
                      </Badge>
                    )}
                  </Label>
                  <Switch id="anonymous-switch" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
                </div>
                {isAnonymous && (
                  <Alert variant="default" className="bg-accent border-primary/20">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <AlertDescription className="text-xs text-muted-foreground">
                      Ton nom ne sera pas visible, mais respecte quand même les règles de la communauté.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" size="lg" disabled={isLoading}>
                {isLoading ? "Publication en cours..." : "Publier"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}

