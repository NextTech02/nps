# Encuesta NPS · Federación Colombiana de Póker

Formulário de NPS (Net Promoter Score) bilíngue (Espanhol/Inglês) para o
evento **CCP Barranquilla**, com identidade visual da FCP e respostas salvas
no Supabase.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (tema com a paleta oficial da FCP)
- **Supabase** (`@supabase/supabase-js`) para persistir as respostas

## Configuração

### 1. Banco de dados (Supabase)

1. Abra o seu projeto no [Supabase](https://supabase.com) → **SQL Editor**.
2. Cole e execute o conteúdo de [`supabase/schema.sql`](./supabase/schema.sql).
   Isso cria a tabela `nps_responses` e ativa **RLS**: o site pode apenas
   **inserir** respostas (com a chave `anon`); a leitura só é possível pelo
   painel do Supabase ou com a `service_role`.

### 2. Variáveis de ambiente

Copie `.env.local.example` para `.env.local` e preencha com os valores de
**Project Settings → API**:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-public-key
```

### 3. Rodar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

| Arquivo | Função |
|---|---|
| `app/page.tsx` | Página que renderiza o formulário |
| `app/layout.tsx` | Layout, fonte (DM Sans) e metadados |
| `app/globals.css` | Tema Tailwind com a paleta da FCP |
| `components/NpsForm.tsx` | Formulário (estado, validação, envio, idioma) |
| `components/StarRating.tsx` | Avaliação 1–5 estrelas |
| `components/NpsScale.tsx` | Escala NPS 1–10 |
| `lib/content.ts` | Textos e opções em ES/EN |
| `lib/supabase.ts` | Cliente do Supabase |
| `supabase/schema.sql` | Schema da tabela + RLS |

## Perguntas

Baseadas em `NPS.md`:

1. **Dados gerais** — gênero, data de nascimento, cidade/departamento/país *(opcionais)*
2. **Experiência geral** — nota 1–5 estrelas* e aspecto mais valorizado*
3. **Recomendação (NPS)** — escala 1–10*
4. **Melhorias** — campo aberto *(opcional)*
5. **Comunidade** — campo aberto *(opcional)*

\* obrigatório

## Deploy

Pronto para [Vercel](https://vercel.com): defina as duas variáveis de ambiente
no painel do projeto e faça o deploy.
