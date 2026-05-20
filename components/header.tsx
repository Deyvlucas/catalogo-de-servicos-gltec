"use client"

import { Menu, Settings, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import type { Categories } from "@/lib/data"

interface HeaderProps {
  categories: Categories[]
  selectedCategory: string | null
  onSelectCategory: (id: string | null) => void
  onAdminClick: () => void
  isAdmin: boolean
  onLogout: () => void
}

export function Header({
  categories,
  selectedCategory,
  onSelectCategory,
  onAdminClick,
  isAdmin,
  onLogout,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <span className="text-lg font-bold text-primary-foreground">GL</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">GLTEC</span>
            <span className="text-xs text-muted-foreground">INFORMÁTICA</span>
          </div>
        </div>

        {/* Botões à direita */}
        <div className="flex items-center gap-2">
          {/* Categorias - Desktop: Dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="mr-2 h-4 w-4" />
                  Categorias
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => onSelectCategory(null)}
                  className={selectedCategory === null ? "bg-accent" : ""}
                >
                  Todas as categorias
                </DropdownMenuItem>
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={selectedCategory === cat.id ? "bg-accent" : ""}
                  >
                    {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Categorias - Mobile: Sheet */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>Categorias</SheetTitle>
                </SheetHeader>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    variant={selectedCategory === null ? "secondary" : "ghost"}
                    className="justify-start"
                    onClick={() => onSelectCategory(null)}
                  >
                    Todas as categorias
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.id}
                      variant={selectedCategory === cat.id ? "secondary" : "ghost"}
                      className="justify-start"
                      onClick={() => onSelectCategory(cat.id)}
                    >
                      {cat.name}
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Botão Admin */}
          {isAdmin ? (
            <Button variant="destructive" size="sm" onClick={onLogout}>
              <X className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Sair Admin</span>
            </Button>
          ) : (
            <Button variant="ghost" size="sm" onClick={onAdminClick} className="text-muted-foreground">
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
