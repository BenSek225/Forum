import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Check, MessageSquare, Users, Star } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 pattern-bg">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <Badge variant="hot" className="mb-4">
            À Propos
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Chez Nous, <span className="text-primary">C'est Nous</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un espace créé par des Ivoiriens, pour des Ivoiriens, où l'on peut parler de tout, sans filtre mais avec
            respect.
          </p>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-16 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
              <p className="text-muted-foreground mb-4">
                Salut, moi c'est Koffi, le cerveau derrière Chez Nous. Avec mon équipe, on a créé cet espace pour vous,
                les Ivoiriens, pour parler librement – en public ou en privé.
              </p>
              <p className="text-muted-foreground mb-4">
                L'idée est née d'un constat simple : il nous manquait un espace en ligne où l'on peut discuter de notre
                quotidien, aborder des sujets sensibles (sexe, relations, etc.), et célébrer notre culture (nouchi,
                zouglou, rap ivoire, etc.), le tout dans un environnement 100% ivoirien.
              </p>
              <p className="text-muted-foreground">
                Chez Nous, c'est plus qu'un forum – c'est un mouvement, une communauté, un espace où chacun peut
                s'exprimer librement et trouver sa place. Rejoins-nous pour construire ça ensemble !
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-3xl opacity-30"></div>
              <Image
                src="/placeholder.svg?height=600&width=600"
                width={600}
                height={600}
                alt="Chez Nous Team"
                className="relative rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Notre Vision */}
      <section className="py-16 bg-accent/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre Vision</h2>
            <p className="text-lg text-primary font-medium mb-4">
              'Chez Nous, on parle, on rigole, on avance – ensemble.'
            </p>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nous voulons créer l'espace de discussion en ligne de référence pour les Ivoiriens, où chacun peut
              s'exprimer librement, trouver de l'aide, et partager sa culture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Liberté d'Expression</h3>
                <p className="text-muted-foreground">
                  Un espace où tu peux parler de tout, même des sujets tabous, avec la possibilité de rester anonyme
                  quand tu le souhaites.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Communauté Locale</h3>
                <p className="text-muted-foreground">
                  Une plateforme 100% ivoirienne, qui comprend nos expressions, notre culture et nos préoccupations
                  quotidiennes.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Utilité Pratique</h3>
                <p className="text-muted-foreground">
                  Des discussions qui t'aident dans ton quotidien, que ce soit pour économiser, trouver un logement ou
                  résoudre un problème.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Comment ça marche</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Crée ton compte</h3>
              <p className="text-muted-foreground">
                Inscris-toi gratuitement avec un pseudo et un mot de passe. Pas besoin d'email compliqué.
              </p>
            </div>
            <div className="text-center">
              <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Explore les forums</h3>
              <p className="text-muted-foreground">
                Découvre les discussions dans nos trois catégories : Vie Pratique, Tabous et Sans Filtre, Culture &
                Détente.
              </p>
            </div>
            <div className="text-center">
              <div className="size-16 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Participe ou crée</h3>
              <p className="text-muted-foreground">
                Commente les posts existants ou crée ton propre forum public ou privé pour lancer une discussion.
              </p>
            </div>
          </div>

          <div className="mt-16 bg-accent/50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Fonctionnalités clés</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Forums Publics & Privés</h4>
                  <p className="text-sm text-muted-foreground">
                    Participe aux discussions ouvertes ou crée ton espace privé avec tes amis.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Option Anonyme</h4>
                  <p className="text-sm text-muted-foreground">
                    Reste anonyme quand tu parles de sujets sensibles dans la catégorie Tabous.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Favoris & Partage</h4>
                  <p className="text-sm text-muted-foreground">
                    Sauvegarde tes discussions préférées et partage-les facilement sur WhatsApp.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-primary">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Top du Jour</h4>
                  <p className="text-sm text-muted-foreground">
                    Découvre les discussions les plus populaires du moment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sondage */}
      <section className="py-16 bg-accent/30">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Qu'est-ce que tu veux discuter ?</h2>
              <p className="text-muted-foreground mb-6">
                Chez Nous est construit pour toi. Dis-nous quels sujets t'intéressent et quelles fonctionnalités tu
                aimerais voir sur la plateforme.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="suggestion">Ton idée de sujet</Label>
                  <Textarea
                    id="suggestion"
                    placeholder="Dis-nous ce que tu aimerais voir comme sujet de discussion..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Ton email (optionnel)</Label>
                  <Input id="email" type="email" placeholder="Pour te répondre si on a des questions" />
                </div>
                <Button>Envoyer</Button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Sujets populaires demandés</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <span>Conseils pour entrepreneurs</span>
                  <Badge>32 votes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <span>Santé mentale et bien-être</span>
                  <Badge>28 votes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <span>Cuisine ivoirienne moderne</span>
                  <Badge>25 votes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <span>Technologie et innovation</span>
                  <Badge>21 votes</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                  <span>Mode et style ivoirien</span>
                  <Badge>19 votes</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 nouchi-gradient text-white">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Prêt à nous rejoindre ?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Crée ton compte gratuitement et commence à participer aux discussions ou lance ton propre forum.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/login?tab=register">Créer un compte</Link>
            </Button>
            <Button size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm" asChild>
              <Link href="/forums">Explorer les forums</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

