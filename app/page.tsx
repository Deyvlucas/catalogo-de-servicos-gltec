"use client"

import { useMemo, useState, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { ServiceGrid } from "@/components/service-grid"
import { AdminLoginModal } from "@/components/admin-login-modal"
import { AdminPanel } from "@/components/admin-panel"
import { supabase } from "@/lib/supabaseClient"
import { Categories, Service } from "@/lib/data" 

export default function Home() {
  // Estados principais da aplicação
  const [categories, setCategories] = useState<Categories[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Estados de controle de interface e filtros
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Carregar dados iniciais do Supabase ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        // 1. Buscar Categorias ordenadas por "name" (inglês)
        const { data: catData, error: catError } = await supabase
          .from("categories")
          .select("*")
          .order("name", { ascending: true })

        // 2. Buscar Serviços ordenados por "name" (inglês)
        const { data: srvData, error: srvError } = await supabase
          .from("services")
          .select("*")
          .order("name", { ascending: true })

        if (catError) throw catError
        if (srvError) throw srvError

        if (catData) setCategories(catData)
        if (srvData) setServices(srvData)
      } catch (error) {
        console.error("Erro ao sincronizar dados com o Supabase:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filtrar serviços por busca e categoria usando as propriedades corretas do banco
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Ajustado de service.nome/descricao para service.name/description
      const matchesSearch =
        searchQuery === "" ||
        service.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory =
        selectedCategory === null || service.category_id === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [services, searchQuery, selectedCategory])

  // Handlers de Serviços (Supabase Operations atualizados para inglês)
  const handleAddService = async (data: Omit<Service, "id" | "created_at">) => {
    try {
      const { data: insertedData, error } = await supabase
        .from("services")
        .insert([data])
        .select()

      if (error) throw error
      if (insertedData) {
        setServices((prev) => [...prev, insertedData[0]])
      }
    } catch (error) {
      console.error("Erro ao adicionar serviço no Supabase:", error)
    }
  }

  const handleEditService = async (id: string, data: Omit<Service, "id" | "created_at">) => {
    try {
      const { error } = await supabase
        .from("services")
        .update(data)
        .eq("id", id)

      if (error) throw error
      
      setServices((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...data } : s))
      )
    } catch (error) {
      console.error("Erro ao editar serviço no Supabase:", error)
    }
  }

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase
        .from("services")
        .delete()
        .eq("id", id)

      if (error) throw error

      setServices((prev) => prev.filter((s) => s.id !== id))
    } catch (error) {
      console.error("Erro ao deletar serviço no Supabase:", error)
    }
  }

  // Handlers de Categorias (Supabase Operations atualizados para inglês)
  const handleAddCategory = async (data: Omit<Categories, "id" | "created_at">) => {
    try {
      const { data: insertedData, error } = await supabase
        .from("categories")
        .insert([data])
        .select()

      if (error) throw error
      if (insertedData) {
        setCategories((prev) => [...prev, insertedData[0]])
      }
    } catch (error) {
      console.error("Erro ao adicionar categoria no Supabase:", error)
    }
  }

  const handleEditCategory = async (id: string, data: Omit<Categories, "id" | "created_at">) => {
    try {
      const { error } = await supabase
        .from("categories")
        .update(data)
        .eq("id", id)

      if (error) throw error

      setCategories((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...data } : c))
      )
    } catch (error) {
      console.error("Erro ao editar categoria no Supabase:", error)
    }
  }

  const handleDeleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id)

      if (error) throw error

      setCategories((prev) => prev.filter((c) => c.id !== id))
      if (selectedCategory === id) {
        setSelectedCategory(null)
      }
    } catch (error) {
      console.error("Erro ao deletar categoria no Supabase:", error)
    }
  }

  // Handler de Login
  const handleLogin = () => {
    setIsAdmin(true)
    setShowLoginModal(false)
  }

  const handleLogout = () => {
    setIsAdmin(false)
  }

  // Se admin logado, mostra painel administrativo
  if (isAdmin) {
    return (
      <AdminPanel
        services={services}
        categories={categories}
        onAddService={handleAddService}
        onEditService={handleEditService}
        onDeleteService={handleDeleteService}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
        onDeleteCategory={handleDeleteCategory}
        onExit={handleLogout}
      />
    )
  }

  // Visão do cliente (catálogo)
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onAdminClick={() => setShowLoginModal(true)}
        isAdmin={isAdmin}
        onLogout={handleLogout}
      />

      <main className="container mx-auto flex-1 px-4 py-8">
        {/* Hero Section */}
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Catálogo de Serviços
          </h1>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Confira nossos serviços de informática com qualidade e preços acessíveis.
            Atendimento profissional para sua empresa ou residência.
          </p>
        </div>

        {/* Barra de Busca */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filtro Ativo */}
        {selectedCategory && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filtrando por:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/20"
            >
              {/* Mudado de .nome para .name */}
              {categories.find((c) => c.id === selectedCategory)?.name}
              <span className="ml-1">×</span>
            </button>
          </div>
        )}

        {/* Renderização condicional para carregamento ou exibição do grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground animate-pulse">Carregando catálogo...</p>
          </div>
        ) : (
          <>
            {/* Grid de Serviços */}
            <ServiceGrid services={filteredServices} categories={categories} />

            {/* Contador de Resultados */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              {filteredServices.length === 1
                ? "1 serviço encontrado"
                : `${filteredServices.length} serviços encontrados`}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GLTEC Informática. Todos os direitos reservados.</p>
          <p className="mt-1">Soluções em tecnologia para sua empresa.</p>
        </div>
      </footer>

      {/* Modal de Login Admin */}
      <AdminLoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLogin={handleLogin}
      />
    </div>
  )
}