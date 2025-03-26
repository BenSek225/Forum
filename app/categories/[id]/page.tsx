import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, MessageSquare, Plus } from "lucide-react"

const categories = [
  {
    id: 1,
    title: "Vie Pratique",
    description: "Astuces quotidiennes, petites annonces",
    forums: [
      { id: 1, title: "Comment économiser à Abidjan ?", posts: 24 },
      { id: 2, title: "Trouver un logement pas cher", posts: 15 },
      { id: 3, title: "Astuces transport en commun", posts: 18 },
    ],
  },
  {
    id: 2,
    title: "Tabous et Sans Filtre",
    description: "Sujets sensibles avec anonymat",
    forums: [
      { id: 4, title: "Parler de sexe, c'est dur ?", posts: 32 },
      { id: 5, title: "Relations amoureuses compliquées", posts: 28 },
      { id: 6, title: "Santé intime - questions anonymes", posts: 19 },
    ],
  },
  {
    id: 3,
    title: "Culture & Détente",
    description: "Humour, musique, cuisine ivoirienne",
    forums: [
      { id: 7, title: "Le meilleur garba de Cocody", posts: 45 },
      { id: 8, title: "Nouveaux sons zouglou à découvrir", posts: 22 },
      { id: 9, title: "Blagues nouchi du moment", posts: 37 },
    ],
  },
]

export default function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = Number.parseInt(params.id)
  const category = categories.find((cat) => cat.id === categoryId) || categories[0]

  return (
    <div className="container px-4 py-6 md:py-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{category.title}</h1>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <Button size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Nouveau Forum</span>
        </Button>
      </div>

      <div className="space-y-4">
        {category.forums.map((forum) => (
          <Link href={`/forums/${forum.id}`} key={forum.id}>
            <Card className="hover:bg-accent/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{forum.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    {forum.posts}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

