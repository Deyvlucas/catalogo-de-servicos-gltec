"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Service, Categories } from "@/lib/data"

interface ServiceCardProps {
  service: Service
  category: Categories | undefined
}

export function ServiceCard({ service, category }: ServiceCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <Card className="group relative overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-semibold leading-tight text-foreground">
            {service.name}
          </CardTitle>
        </div>
        {category && (
          <Badge variant="outline" className={`w-fit text-xs ${category.color}`}>
            {category.name}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="pt-2">
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>
        <div className="flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            A partir de
          </span>
          <span className="text-2xl font-bold text-primary">
            {formatCurrency(service.value)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
