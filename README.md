# GLTEC Informática - Catálogo de Serviços

Catálogo digital de serviços de informática da GLTEC, desenvolvido com Next.js, React, TypeScript e Supabase. Permite que clientes consultem serviços oferecidos e que administradores gerenciem o catálogo de forma simples e segura.

##  Funcionalidades

- **Catálogo de Serviços**: Visualização de serviços por categoria, busca por nome ou descrição.
- **Painel Administrativo**: Login de administrador para gerenciar serviços e categorias (CRUD completo).
- **Integração com Supabase**: Persistência de dados em nuvem (serviços e categorias).
- **Interface Responsiva**: Layout moderno, responsivo e acessível.

##  Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) (Database e Auth)
- [PNPM](https://pnpm.io/) (Gerenciador de pacotes)
- [Shadcn/UI](https://ui.shadcn.com/) (Componentes de UI)

## 📁 Estrutura do Projeto

```
app/                # Páginas e layout principal
components/         # Componentes reutilizáveis (UI, modais, painel admin, etc)
hooks/              # Hooks customizados
lib/                # Integração com Supabase, tipos e dados mock
public/             # Assets públicos
styles/             # Estilos globais
```

##  Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/catalogo-de-servicos-gltec.git
   cd catalogo-de-servicos-gltec
   ```
2. **Instale as dependências:**
   ```bash
   pnpm install
   ```
3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz com:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=xxxx
     NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
     NEXT_PUBLIC_ADMIN_PASSWORD=xxxxx
     ```
   - Obtenha as chaves no [painel do Supabase](https://app.supabase.com/).
4. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   ```
5. **Acesse:**
   - [http://localhost:3000](http://localhost:3000)

##  Acesso Administrativo
- Clique em "Admin" no topo da página e faça login para acessar o painel de gerenciamento.
- Recomenda-se configurar autenticação real no Supabase Auth para produção.

##  Comandos úteis
- `pnpm dev` — Inicia o servidor de desenvolvimento
- `pnpm build` — Gera build de produção
- `pnpm start` — Inicia o app em modo produção

## ☁️ Deploy
- Deploy recomendado no [Vercel](https://vercel.com/) ou [Netlify](https://www.netlify.com/).
- Configure as variáveis de ambiente no painel da plataforma escolhida.

## 📄 Licença
MIT. Veja o arquivo LICENSE.

---
Desenvolvido por GLTEC Informática.
