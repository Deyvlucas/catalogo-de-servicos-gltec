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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Service, Categories } from "@/lib/data"

interface ServiceFormModalProps {
  open: boolean
  onOpenChange: () => void
  onSubmit: (data: Omit<Service, "id" | "created_at">) => void
  categories: Categories[]
  editingService: Service | null
}

interface FormData {
  name: string
  description: string
  category_id: string
  value: string
}

export function ServiceFormModal({
  open,
  onOpenChange,
  onSubmit,
  categories,
  editingService,
}: ServiceFormModalProps) {
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
      description: "",
      category_id: "",
      value: "",
    },
  })

  const categoryId = watch("category_id")

  useEffect(() => {
    if (editingService) {
      reset({
        name: editingService.name,
        description: editingService.description,
        category_id: editingService.category_id,
        value: editingService.value.toString(),
      })
    } else {
      reset({
        name: "",
        description: "",
        category_id: "",
        value: "",
      })
    }
  }, [editingService, reset, open])

  const onFormSubmit = (data: FormData) => {
    onSubmit({
      name: data.name,
      description: data.description,
      category_id: data.category_id,
      value: parseFloat(data.value),
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editingService ? "Editar Serviço" : "Novo Serviço"}
          </DialogTitle>
          <DialogDescription>
            {editingService
              ? "Atualize as informações do serviço."
              : "Preencha os dados para adicionar um novo serviço."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Serviço</Label>
            <Input
              id="name"
              placeholder="Ex: Formatação de Computador"
              {...register("name", { required: "Nome é obrigatório" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descreva o serviço..."
              rows={3}
              {...register("description", { required: "Descrição é obrigatória" })}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category_id">Categoria</Label>
            <Select
              value={categoryId}
              onValueChange={(value) => setValue("category_id", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" {...register("category_id", { required: "Categoria é obrigatória" })} />
            {errors.category_id && (
              <p className="text-sm text-destructive">{errors.category_id.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="value">Valor (R$)</Label>
            <Input
              id="value"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              {...register("value", {
                required: "Valor é obrigatório",
                min: { value: 0, message: "Valor deve ser positivo" },
              })}
            />
            {errors.value && (
              <p className="text-sm text-destructive">{errors.value.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onOpenChange}>
              Cancelar
            </Button>
            <Button type="submit">
              {editingService ? "Salvar Alterações" : "Adicionar Serviço"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
