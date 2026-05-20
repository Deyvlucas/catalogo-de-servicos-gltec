"use client"

import type { Service, Category } from "@/lib/data"
import { ServiceCard } from "./service-card"

interface ServiceGridProps {
  services: Service[]
  categories: Category[]
}

export function ServiceGrid({ services, categories }: ServiceGridProps) {
  const getCategoryById = (id: string) => categories.find((c) => c.id === id)

  if (services.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Nenhum serviço encontrado
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tente ajustar os filtros ou buscar por outro termo.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          category={getCategoryById(service.categoria_id)}
        />
      ))}
    </div>
  )
}
