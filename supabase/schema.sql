-- =============================================================================
-- Encuesta NPS · Federación Colombiana de Póker
-- Schema da tabela de respostas + Row Level Security (RLS).
--
-- Como usar:
--   1. No painel do Supabase, abra "SQL Editor".
--   2. Cole todo este arquivo e clique em "Run".
--   3. Pronto: o formulário poderá inserir respostas com a chave anon,
--      mas ninguém conseguirá LER os dados pelas chaves públicas.
-- =============================================================================

create table if not exists public.nps_responses (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),

  -- idioma em que o formulário foi respondido
  language     text not null check (language in ('es', 'en')),

  -- dados gerais (todos opcionais)
  gender       text check (
                 gender in ('hombre', 'mujer', 'otro', 'prefiero_no_responder')
               ),
  birth_date   date,
  city         text check (char_length(city) <= 120),
  department   text check (char_length(department) <= 120),
  country      text check (char_length(country) <= 120),

  -- experiência geral (obrigatórios)
  experience_rating smallint not null check (experience_rating between 1 and 5),
  valued_aspect     text not null check (
                      valued_aspect in (
                        'lugar_comodidad',
                        'organizacion_torneos',
                        'registro_logistica',
                        'ambiente_comunidad',
                        'staff_atencion'
                      )
                    ),

  -- NPS (obrigatório), escala 1 a 10 conforme o questionário
  nps_score    smallint not null check (nps_score between 1 and 10),

  -- campos abertos (opcionais)
  improvements      text check (char_length(improvements) <= 5000),
  community_meaning text check (char_length(community_meaning) <= 5000)
);

-- Índice para ordenar/relatar por data
create index if not exists nps_responses_created_at_idx
  on public.nps_responses (created_at desc);

-- ----------------------------------------------------------------------------
-- Row Level Security: o formulário público só pode INSERIR.
-- ----------------------------------------------------------------------------
alter table public.nps_responses enable row level security;

-- Remove políticas anteriores (idempotente ao rodar de novo)
drop policy if exists "nps_anon_insert" on public.nps_responses;

-- Permite INSERT para visitantes anônimos e autenticados (chave anon do navegador)
create policy "nps_anon_insert"
  on public.nps_responses
  for insert
  to anon, authenticated
  with check (true);

-- Observação: como NÃO existe policy de SELECT, as chaves públicas (anon)
-- não conseguem ler respostas. Para analisar os resultados, use o painel do
-- Supabase (Table Editor / SQL Editor) ou a chave service_role no backend.
