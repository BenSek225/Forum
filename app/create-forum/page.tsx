"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Info, Lock, MessageSquare } from "lucide-react"
import { useForums } from "@/hooks/use-forums"
import { useAuth } from "@/contexts/auth-context"
import type { Category } from "@/lib/supabase-client"

export default function CreateForumPage() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") === "private" ? "private" : "public"
  \
  const [forumType, setForumType] = useState<"public\" | \"private\">(initialType as \"public\" | \"private\"})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState<string>("")
  const [accessCode, setAccessCode] = useState("")
  const [memberLimit, setMemberLimit] = useState<string>("25")
  const [isPremium, setIsPremium] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const  = useState(false)

  const { user, profile } = useAuth()
  const { getCategories, createForum, isLoading: isForumLoading, error } = useForums()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Rediriger si non connecté
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Vous devez être connecté pour créer un forum.",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    // Charger les catégories
    const fetchCategories = async () => {
      const categoriesData = await getCategories()
      setCategories(categoriesData)
    }

    fetchCategories()
  }, [user, router, toast, getCategories])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!user?.id) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour créer un forum.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Validation
      if (title.length < 5) {
        throw new Error("Le titre doit contenir au moins 5 caractères")
      }

      if (forumType === "private" && !accessCode) {
        throw new Error("Un code d'accès est requis pour les forums privés")
      }

      // Préparer les données du forum
      const forumData = {
        title,
        description,
        category_id: forumType === "public" ? Number.parseInt(categoryId) : null,
        is_private: forumType === "private",
        access_code: forumType === "private" ? accessCode : null,
        creator_id: user.id,
        member_limit: Number.parseInt(memberLimit),
        is_premium: isPremium,
      }

      // Créer le forum
      const newForum = await createForum(forumData)

      if (!newForum) {
        throw new Error("Erreur lors de la création du forum")
      }

      toast({
        title: "Forum créé avec succès",
        description:
          forumType === "private"
            ? "Ton forum privé est prêt. Partage le code d'accès avec tes amis."
            : "Ton forum public est maintenant disponible.",
      })

      // Rediriger vers le forum créé
      router.push(forumType === "private" ? "/mes-forums" : `/forums/${newForum.id}`)
    } catch (err) {
      toast({
        title: "Erreur",
        description: err instanceof Error ? err.message : "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent/30 py-12">
      <div className="container px-4 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Créer un nouveau forum</h1>

        <Tabs defaultValue={forumType} onValueChange={(value) => setForumType(value as "public" | "private")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="public" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Forum Public</span>
            </TabsTrigger>
            <TabsTrigger value="private" className="gap-2">
              <Lock className="h-4 w-4" />
              <span>Forum Privé</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <Card className="border-none shadow-md">
              <TabsContent value="public">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    Créer un forum public
                  </CardTitle>
                </CardHeader>
              </TabsContent>

              <TabsContent value="private">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-primary" />
                    Créer un forum privé
                  </CardTitle>
                </CardHeader>
              </TabsContent>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre du forum</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Comment économiser à Abidjan ?"
                    required
                    className="h-11"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="De quoi va-t-on parler dans ce forum ?"
                    className="min-h-[100px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {forumType === "public" && (
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger id="category" className="h-11">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {forumType === "private" && (
                  <div className="space-y-2">
                    <Label htmlFor="access_code">Code d'accès</Label>
                    <Input
                      id="access_code"
                      type="text"
                      placeholder="Ex: Garba123"
                      required={forumType === "private"}
                      className="h-11"
                      value={accessCode}
                      onChange={(e) => setAccessCode(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ce code sera nécessaire pour rejoindre ton forum privé. Partage-le uniquement avec les personnes
                      que tu souhaites inviter.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="premium-switch">Forum Premium</Label>
                    <Switch
                      id="premium-switch"
                      checked={isPremium}
                      onCheckedChange={setIsPremium}
                      disabled={!profile?.is_premium}
                    />
                  </div>
                  {isPremium ? (
                    <div className="bg-accent p-3 rounded-lg flex items-start gap-2">
                      <Info className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Avantages Premium</p>
                        <p className="text-xs text-muted-foreground">
                          Ton forum sera mis en avant avec un badge Premium, aura une meilleure visibilité et pourra
                          accueillir jusqu'à 100 membres.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      {profile?.is_premium
                        ? "Passe en Premium pour plus de visibilité et de fonctionnalités."
                        : "Deviens membre Premium pour accéder à cette fonctionnalité."}
                    </p>
                  )}
                </div>

                {forumType === "private" && (
                  <div className="space-y-2">
                    <Label>Limite de membres</Label>
                    <RadioGroup value={memberLimit} onValueChange={setMemberLimit}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="10" id="r1" />
                        <Label htmlFor="r1" className="cursor-pointer">
                          10 membres (gratuit)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="25" id="r2" />
                        <Label htmlFor="r2" className="cursor-pointer">
                          25 membres (gratuit)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="100" id="r3" disabled={!isPremium} />
                        <Label
                          htmlFor="r3"
                          className={`cursor-pointer flex items-center gap-2 ${!isPremium ? "opacity-50" : ""}`}
                        >
                          100 membres
                          <Badge variant="premium" className="text-xs">
                            Premium
                          </Badge>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-end">
                <Button type="submit" size="lg" disabled={isLoading || isForumLoading}>
                  {isLoading ? "Création en cours..." : "Créer le forum"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Tabs>
      </div>
    </div>
  )
}

