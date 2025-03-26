import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t py-12">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                CN
              </div>
              <span className="font-bold text-xl">Chez Nous</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Le premier forum en ligne pour les Ivoiriens, où tu peux discuter de tout, sans filtre mais avec respect.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/forums" className="text-muted-foreground hover:text-primary transition-colors">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-muted-foreground hover:text-primary transition-colors">
                  L'équipe
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/1" className="text-muted-foreground hover:text-primary transition-colors">
                  Vie Pratique
                </Link>
              </li>
              <li>
                <Link href="/categories/2" className="text-muted-foreground hover:text-primary transition-colors">
                  Tabous et Sans Filtre
                </Link>
              </li>
              <li>
                <Link href="/categories/3" className="text-muted-foreground hover:text-primary transition-colors">
                  Culture & Détente
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/conditions" className="text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de cookies
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-primary transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Chez Nous. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
            <Link href="/aide" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Centre d'aide
            </Link>
            <Link href="/signaler" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Signaler un problème
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

