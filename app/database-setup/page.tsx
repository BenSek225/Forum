import type { Metadata } from "next"
import DatabaseSetupClientPage from "./DatabaseSetupClientPage"

export const metadata: Metadata = {
  title: "Configuration de la Base de Données | Chez Nous",
  description: "Guide de configuration de la base de données Supabase pour l'application Chez Nous",
}

export default function DatabaseSetupPage() {
  return <DatabaseSetupClientPage />
}

