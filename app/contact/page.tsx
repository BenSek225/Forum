"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AtSign, Mail, MapPin, Phone } from "lucide-react"

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Message envoyé",
        description: "Nous avons bien reçu ton message et te répondrons dans les plus brefs délais.",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-accent/30">
      <div className="bg-white py-8 border-b">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Contacte-nous</h1>
          </div>
          <p className="text-muted-foreground">
            Une question, une suggestion ou un problème ? Nous sommes là pour t'aider.
          </p>
        </div>
      </div>

      <div className="container px-4 py-12 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">Envoie-nous un message</h2>

            <form onSubmit={handleSubmit}>
              <Card className="border-none shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ton nom</Label>
                    <Input id="name" placeholder="Comment t'appelles-tu ?" required className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Ton email</Label>
                    <Input id="email" type="email" placeholder="Pour te répondre" required className="h-11" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Select required>
                      <SelectTrigger id="subject" className="h-11">
                        <SelectValue placeholder="De quoi s'agit-il ?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="question">Question générale</SelectItem>
                        <SelectItem value="support">Support technique</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                        <SelectItem value="partnership">Partenariat</SelectItem>
                        <SelectItem value="other">Autre</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Ton message</Label>
                    <Textarea id="message" placeholder="Dis-nous tout..." className="min-h-[150px]" required />
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6">
                  <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Informations de contact</h2>

              <Card className="border-none shadow-md">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground mb-1">Pour toute question ou suggestion</p>
                      <a href="mailto:contact@cheznous.ci" className="text-primary hover:underline">
                        contact@cheznous.ci
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Téléphone</h3>
                      <p className="text-muted-foreground mb-1">Du lundi au vendredi, 9h-18h</p>
                      <a href="tel:+22507080910" className="text-primary hover:underline">
                        +225 07 08 09 10
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Adresse</h3>
                      <p className="text-muted-foreground mb-1">Nos bureaux à Abidjan</p>
                      <p>
                        Cocody, Riviera Palmeraie
                        <br />
                        Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <AtSign className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Réseaux sociaux</h3>
                      <p className="text-muted-foreground mb-2">Suis-nous pour les dernières actualités</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="https://twitter.com/cheznous" target="_blank">
                            Twitter
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="https://instagram.com/cheznous" target="_blank">
                            Instagram
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href="https://facebook.com/cheznous" target="_blank">
                            Facebook
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">FAQ</h2>

              <Card className="border-none shadow-md">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Comment créer un forum privé ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Tu peux créer un forum privé en cliquant sur le bouton "+" flottant en bas à droite de l'écran,
                      puis en sélectionnant "Forum Privé".
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Comment poster anonymement ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Lors de la création d'un post ou d'un commentaire, coche simplement la case "Poster anonymement".
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Est-ce que Chez Nous est gratuit ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Oui, l'utilisation de base de Chez Nous est entièrement gratuite. Nous proposons également des
                      options premium avec des fonctionnalités supplémentaires.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Comment signaler un contenu inapproprié ?</h3>
                    <p className="text-sm text-muted-foreground">
                      Clique sur les trois points à côté du post ou commentaire concerné, puis sélectionne "Signaler".
                    </p>
                  </div>

                  <Button variant="link" asChild className="mt-2">
                    <Link href="/faq">Voir toutes les questions fréquentes</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

