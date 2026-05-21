import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cliente do Supabase para o navegador. Usa a chave `anon` pública, protegida
 * por RLS no servidor (apenas INSERT na tabela de respostas é permitido).
 *
 * Retorna `null` se as variáveis de ambiente não estiverem configuradas, para
 * que o build/dev não quebre antes de você preencher o `.env.local`.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(url && anonKey);

/** Nome da tabela onde as respostas são gravadas. */
export const NPS_TABLE = "nps_responses";
