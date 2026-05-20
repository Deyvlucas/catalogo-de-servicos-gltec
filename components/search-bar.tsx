"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar serviços..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 pl-12 pr-4 text-base bg-card border-border focus-visible:ring-primary"
      />
    </div>
  )
}
