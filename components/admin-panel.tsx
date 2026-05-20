"use client"

import { useState } from "react"
import { Plus, Pencil, Trash2, Package, Tags, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Service, Categories } from "@/lib/data"
import { ServiceFormModal } from "./service-form-modal"
import { CategoryFormModal } from "./category-form-modal"

interface AdminPanelProps {
  services: Service[]
  categories: Categories[]
  onAddService: (service: Omit<Service, "id" | "created_at">) => void
  onEditService: (id: string, service: Omit<Service, "id" | "created_at">) => void
  onDeleteService: (id: string) => void
  onAddCategory: (category: Omit<Categories, "id" | "created_at">) => void
  onEditCategory: (id: string, category: Omit<Categories, "id" | "created_at">) => void
  onDeleteCategory: (id: string) => void
  onExit: () => void
}

export function AdminPanel({
  services,
  categories,
  onAddService,
  onEditService,
  onDeleteService,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onExit,
}: AdminPanelProps) {
  const [serviceModalOpen, setServiceModalOpen] = useState(false)
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [editingCategory, setEditingCategory] = useState<Categories | null>(null)
  const [deleteServiceId, setDeleteServiceId] = useState<string | null>(null)
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null)

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const getCategoryById = (id: string) => categories.find((c) => c.id === id)

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setServiceModalOpen(true)
  }

  const handleEditCategory = (category: Categories) => {
    setEditingCategory(category)
    setCategoryModalOpen(true)
  }

  const handleServiceModalClose = () => {
    setServiceModalOpen(false)
    setEditingService(null)
  }

  const handleCategoryModalClose = () => {
    setCategoryModalOpen(false)
    setEditingCategory(null)
  }

  const handleServiceSubmit = (data: Omit<Service, "id" | "created_at">) => {
    if (editingService) {
      onEditService(editingService.id, data)
    } else {
      onAddService(data)
    }
    handleServiceModalClose()
  }

  const handleCategorySubmit = (data: Omit<Categories, "id" | "created_at">) => {
    if (editingCategory) {
      onEditCategory(editingCategory.id, data)
    } else {
      onAddCategory(data)
    }
    handleCategoryModalClose()
  }

  const handleDeleteService = () => {
    if (deleteServiceId) {
      onDeleteService(deleteServiceId)
      setDeleteServiceId(null)
    }
  }

  const handleDeleteCategory = () => {
    if (deleteCategoryId) {
      onDeleteCategory(deleteCategoryId)
      setDeleteCategoryId(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header do Admin */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">GL</span>
            </div>
            <div>
              <h1 className="text-lg font-bold">Painel Administrativo</h1>
              <p className="text-xs text-muted-foreground">Gerencie serviços e categorias</p>
            </div>
          </div>
          <Button variant="outline" onClick={onExit}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Catálogo
          </Button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="services" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              Categorias
            </TabsTrigger>
          </TabsList>

          {/* Tab Serviços */}
          <TabsContent value="services">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Serviços</CardTitle>
                  <CardDescription>
                    Gerencie os serviços oferecidos pela empresa
                  </CardDescription>
                </div>
                <Button onClick={() => setServiceModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Serviço
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead className="hidden md:table-cell">Descrição</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead className="text-right">Valor</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => {
                        const category = getCategoryById(service.category_id)
                        return (
                          <TableRow key={service.id}>
                            <TableCell className="font-medium">{service.name}</TableCell>
                            <TableCell className="hidden max-w-xs truncate md:table-cell">
                              {service.description}
                            </TableCell>
                            <TableCell>
                              {category && (
                                <Badge variant="outline" className={category.color}>
                                  {category.name}
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                              {formatCurrency(service.value)}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditService(service)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-destructive hover:text-destructive"
                                  onClick={() => setDeleteServiceId(service.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab Categorias */}
          <TabsContent value="categories">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Categorias</CardTitle>
                  <CardDescription>
                    Gerencie as categorias de serviços
                  </CardDescription>
                </div>
                <Button onClick={() => setCategoryModalOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Categoria
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Visualização</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">{category.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={category.color}>
                              {category.name}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEditCategory(category)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => setDeleteCategoryId(category.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Modais de Formulário */}
      <ServiceFormModal
        open={serviceModalOpen}
        onOpenChange={handleServiceModalClose}
        onSubmit={handleServiceSubmit}
        categories={categories}
        editingService={editingService}
      />

      <CategoryFormModal
        open={categoryModalOpen}
        onOpenChange={handleCategoryModalClose}
        onSubmit={handleCategorySubmit}
        editingCategory={editingCategory}
      />

      {/* Diálogo de Confirmação - Excluir Serviço */}
      <AlertDialog open={!!deleteServiceId} onOpenChange={() => setDeleteServiceId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este serviço? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteService} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Diálogo de Confirmação - Excluir Categoria */}
      <AlertDialog open={!!deleteCategoryId} onOpenChange={() => setDeleteCategoryId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta categoria? Os serviços associados podem ficar sem categoria.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
