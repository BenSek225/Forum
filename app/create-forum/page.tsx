"use client"

import type React from "react"

import { useState } from "react"
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

export default function CreateForumPage() {
  const searchParams = useSearchParams()
  const initialType = searchParams.get("type") === "private" ? "private" : "public"

  const [forumType, setForumType] = useState<"public" | "private">(initialType as "public" | "private")
  const [isLoading, setIsLoading] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate forum creation
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Forum créé avec succès",
        description:
          forumType === "private"
            ? "Ton forum privé est prêt. Partage le code d'accès avec tes amis."
            : "Ton forum public est maintenant disponible.",
      })
      router.push(forumType === "private" ? "/mes-forums" : "/forums")
    }, 1000)
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
                  <Input id="title" placeholder="Ex: Comment économiser à Abidjan ?" required className="h-11" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="De quoi va-t-on parler dans ce forum ?"
                    className="min-h-[100px]"
                  />
                </div>

                {forumType === "public" && (
                  <div className="space-y-2">
                    <Label htmlFor="category">Catégorie</Label>
                    <Select>
                      <SelectTrigger id="category" className="h-11">
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Vie Pratique</SelectItem>
                        <SelectItem value="2">Tabous et Sans Filtre</SelectItem>
                        <SelectItem value="3">Culture & Détente</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {forumType === "private" && (
                  <div className="space-y-2">
                    <Label htmlFor="password">Code d'accès</Label>
                    <Input
                      id="password"
                      type="text"
                      placeholder="Ex: Garba123"
                      required={forumType === "private"}
                      className="h-11"
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
                    <Switch id="premium-switch" checked={isPremium} onCheckedChange={setIsPremium} />
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
                      Passe en Premium pour plus de visibilité et de fonctionnalités.
                    </p>
                  )}
                </div>

                {forumType === "private" && (
                  <div className="space-y-2">
                    <Label>Limite de membres</Label>
                    <RadioGroup defaultValue="10">
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
                <Button type="submit" size="lg" disabled={isLoading}>
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

