"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"

export default function DatabasePage() {
  const [activeTab, setActiveTab] = useState("users")
  const [tableData, setTableData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user, profile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est administrateur
    if (!user || !profile) {
      router.push("/login")
      return
    }

    // Charger les données de la table active
    fetchTableData(activeTab)
  }, [user, profile, activeTab, router])

  const fetchTableData = async (tableName: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.from(tableName).select("*").limit(100)

      if (error) throw error

      setTableData(data || [])
    } catch (err) {
      console.error(`Erreur lors de la récupération des données de ${tableName}:`, err)
      setError(`Erreur lors de la récupération des données: ${err instanceof Error ? err.message : String(err)}`)
      setTableData([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    fetchTableData(value)
  }

  const renderTableData = () => {
    if (isLoading) {
      return (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-4">Chargement des données...</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="text-center py-8 text-red-500">
          <p>{error}</p>
        </div>
      )
    }

    if (tableData.length === 0) {
      return (
        <div className="text-center py-8">
          <p>Aucune donnée disponible dans cette table.</p>
        </div>
      )
    }

    // Obtenir les noms de colonnes à partir du premier élément
    const columns = Object.keys(tableData[0])

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              {columns.map((column) => (
                <th
                  key={column}
                  className="p-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider border"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                {columns.map((column) => (
                  <td key={`${rowIndex}-${column}`} className="p-2 text-sm border">
                    {renderCellValue(row[column])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const renderCellValue = (value: any) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground italic">null</span>
    }

    if (typeof value === "boolean") {
      return value ? <Badge variant="default">true</Badge> : <Badge variant="outline">false</Badge>
    }

    if (typeof value === "object") {
      return <span className="font-mono text-xs">{JSON.stringify(value)}</span>
    }

    // Tronquer les chaînes longues
    if (typeof value === "string" && value.length > 100) {
      return <span title={value}>{value.substring(0, 100)}...</span>
    }

    return String(value)
  }

  const runInitScript = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Exécuter le script d'initialisation via une fonction RPC ou une API
      const { data, error } = await supabase.rpc("init_test_data")

      if (error) throw error

      // Recharger les données
      fetchTableData(activeTab)
    } catch (err) {
      console.error("Erreur lors de l'exécution du script d'initialisation:", err)
      setError(`Erreur lors de l'exécution du script: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent/30 py-12">
      <div className="container px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Gestion de la Base de Données</h1>
          <Button onClick={runInitScript} disabled={isLoading}>
            Initialiser les données de test
          </Button>
        </div>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>Tables de la base de données</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
              <TabsList className="mb-6 flex flex-wrap">
                <TabsTrigger value="users">Utilisateurs</TabsTrigger>
                <TabsTrigger value="categories">Catégories</TabsTrigger>
                <TabsTrigger value="forums">Forums</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="comments">Commentaires</TabsTrigger>
                <TabsTrigger value="forum_members">Membres des forums</TabsTrigger>
                <TabsTrigger value="favorites">Favoris</TabsTrigger>
                <TabsTrigger value="reactions">Réactions</TabsTrigger>
              </TabsList>

              <TabsContent value="users" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="categories" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="forums" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="posts" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="comments" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="forum_members" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="favorites" className="mt-6">
                {renderTableData()}
              </TabsContent>

              <TabsContent value="reactions" className="mt-6">
                {renderTableData()}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

