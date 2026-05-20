// =============================================================================
// MOCK DATA - Estruturado para fácil integração com Supabase
// =============================================================================
// Para migrar para Supabase, substitua os arrays abaixo por:
// const { data: categories } = await supabase.from('categorias').select('*')
// const { data: services } = await supabase.from('servicos').select('*')
// =============================================================================

export interface Categories {
  id: string
  name: string      // Mudado de nome -> name
  color: string     // Mudado de cor -> color
  created_at: string
  updated_at?: string
}

export interface Service {
  id: string
  name: string         // Mudado de nome -> name
  description: string  // Mudado de descricao -> description
  value: number        // Mudado de valor -> value
  category_id: string
  created_at: string
  updated_at?: string
}

// Categorias iniciais
export const initialCategories: Categories[] = [
  {
    id: "cat-1",
    name: "Suporte Técnico",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "cat-2",
    name: "Desenvolvimento",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    created_at: "2024-01-15T10:00:00Z",
  }
]

// Serviços iniciais
export const initialServices: Service[] = [
  {
    id: "srv-1",
    name: "Formatação de Computador",
    description: "Formatação completa com instalação de Windows, drivers e programas essenciais.",
    category_id: "cat-1",
    value: 120.0,
    created_at: "2024-01-20T14:30:00Z",
  },
  {
    id: "srv-2",
    name: "Limpeza Interna",
    description: "Limpeza de poeira, troca de pasta térmica e verificação de componentes.",
    category_id: "cat-1",
    value: 80.0,
    created_at: "2024-01-20T14:30:00Z",
  }
]

// Senha de administrador (em produção, usar autenticação real via Supabase Auth)
export const ADMIN_PASSWORD = "admin123"
