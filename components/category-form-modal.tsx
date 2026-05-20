"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { Categories } from "@/lib/data"

interface CategoryFormModalProps {
  open: boolean
  onOpenChange: () => void
  onSubmit: (data: Omit<Categories, "id" | "created_at">) => void
  editingCategory: Categories | null
}

interface FormData {
  name: string
  color: string
}

const colorOptions = [
  { value: "bg-blue-500/20 text-blue-400 border-blue-500/30", label: "Azul", preview: "bg-blue-500" },
  { value: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", label: "Verde", preview: "bg-emerald-500" },
  { value: "bg-amber-500/20 text-amber-400 border-amber-500/30", label: "Amarelo", preview: "bg-amber-500" },
  { value: "bg-purple-500/20 text-purple-400 border-purple-500/30", label: "Roxo", preview: "bg-purple-500" },
  { value: "bg-rose-500/20 text-rose-400 border-rose-500/30", label: "Rosa", preview: "bg-rose-500" },
  { value: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", label: "Ciano", preview: "bg-cyan-500" },
  { value: "bg-orange-500/20 text-orange-400 border-orange-500/30", label: "Laranja", preview: "bg-orange-500" },
  { value: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", label: "Índigo", preview: "bg-indigo-500" },
]

export function CategoryFormModal({
  open,
  onOpenChange,
  onSubmit,
  editingCategory,
}: CategoryFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      color: colorOptions[0].value,
    },
  })

  const selectedColor = watch("color")

  useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        color: editingCategory.color,
      })
    } else {
      reset({
        name: "",
        color: colorOptions[0].value,
      })
    }
  }, [editingCategory, reset, open])

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      name: data.name,
      color: data.color,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingCategory ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
          <DialogDescription>
            {editingCategory
              ? "Atualize as informações da categoria."
              : "Preencha os dados para adicionar uma nova categoria."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input
              id="name"
              placeholder="Ex: Suporte Técnico"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Cor do Badge</Label>
            <Select
              value={selectedColor}
              onValueChange={(value) => setValue("color", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma cor" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${color.preview}`} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("color", { required: true })} />
          </div>

          <div className="space-y-2">
            <Label>Pré-visualização</Label>
            <div className="flex items-center gap-2 rounded-md border border-border bg-muted/30 p-3">
              <Badge variant="outline" className={selectedColor}>
                {watch("name") || "Nome da Categoria"}
              </Badge>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onOpenChange}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingCategory ? "Salvar Alterações" : "Adicionar Categoria"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
