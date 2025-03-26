import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function EquipePage() {
  const team = [
    {
      name: "Koffi Aya",
      role: "Fondateur & Développeur",
      bio: "Développeur full-stack passionné par la création d'espaces numériques pour les Ivoiriens. Amateur de garba et de code propre.",
      image: "/placeholder.svg?height=400&width=400",
      skills: ["Next.js", "React", "Supabase", "UI/UX"],
      social: {
        twitter: "https://twitter.com/koffiaya",
        github: "https://github.com/koffiaya",
        linkedin: "https://linkedin.com/in/koffiaya",
        email: "koffi@cheznous.ci",
      },
    },
    {
      name: "Aya Kouamé",
      role: "Designer & Community Manager",
      bio: "Designer qui parle nouchi mieux que toi. Spécialiste en expérience utilisateur avec un focus sur l'accessibilité et l'esthétique locale.",
      image: "/placeholder.svg?height=400&width=400",
      skills: ["UI Design", "Figma", "Community Management", "Branding"],
      social: {
        twitter: "https://twitter.com/ayakouame",
        github: "https://github.com/ayakouame",
        linkedin: "https://linkedin.com/in/ayakouame",
        email: "aya@cheznous.ci",
      },
    },
    {
      name: "Kouamé Koffi",
      role: "Marketing & Contenu",
      bio: "Community manager qui connaît tous les coins d'Abidjan. Expert en création de contenu engageant et en stratégies de croissance.",
      image: "/placeholder.svg?height=400&width=400",
      skills: ["Content Strategy", "Social Media", "Growth Hacking", "SEO"],
      social: {
        twitter: "https://twitter.com/kouamekoffi",
        github: "https://github.com/kouamekoffi",
        linkedin: "https://linkedin.com/in/kouamekoffi",
        email: "kouame@cheznous.ci",
      },
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 pattern-bg">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <Badge variant="hot" className="mb-4">
            Notre Équipe
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Les cerveaux derrière <span className="text-primary">Chez Nous</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Une équipe passionnée d'Ivoiriens qui travaille pour créer un espace d'expression libre et authentique pour
            notre communauté.
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                  <p className="text-primary font-medium mb-4">{member.role}</p>
                  <p className="text-muted-foreground mb-4">{member.bio}</p>

                  <div className="mb-6">
                    <p className="text-sm font-medium mb-2">Compétences:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, idx) => (
                        <span key={idx} className="text-xs bg-accent text-primary px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-accent/50">
        <div className="container px-4 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Rejoins notre équipe</h2>
              <p className="text-muted-foreground mb-6">
                Tu es passionné par la tech, le design ou le marketing? Tu veux contribuer à créer un espace numérique
                pour les Ivoiriens? Nous sommes toujours à la recherche de talents pour rejoindre l'aventure Chez Nous.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium">Partage tes compétences</h3>
                    <p className="text-sm text-muted-foreground">
                      Dis-nous ce que tu sais faire et comment tu peux contribuer au projet.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium">Discute avec l'équipe</h3>
                    <p className="text-sm text-muted-foreground">
                      On organise un appel pour mieux te connaître et voir comment on peut collaborer.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-0.5">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium">Rejoins l'aventure</h3>
                    <p className="text-sm text-muted-foreground">
                      Si ça matche, bienvenue dans l'équipe! On construit ensemble.
                    </p>
                  </div>
                </div>
              </div>
              <Button className="mt-8" asChild>
                <Link href="/contact">Contacte-nous</Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Postes ouverts</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Développeur Backend</h4>
                    <Badge>Remote</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nous recherchons un développeur backend pour améliorer notre infrastructure et développer de
                    nouvelles fonctionnalités.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
                <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Community Manager</h4>
                    <Badge>Abidjan</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Rejoins-nous pour animer notre communauté et créer du contenu engageant pour nos utilisateurs.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
                <div className="p-4 border rounded-lg hover:border-primary transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">UI/UX Designer</h4>
                    <Badge>Freelance</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Aide-nous à créer une expérience utilisateur exceptionnelle avec ton talent en design.
                  </p>
                  <Button variant="outline" size="sm">
                    Voir détails
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 nouchi-gradient text-white">
        <div className="container px-4 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Une question pour l'équipe?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            N'hésite pas à nous contacter si tu as des questions, des suggestions ou si tu veux simplement discuter avec
            nous.
          </p>
          <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link href="/contact">Contacte-nous</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

