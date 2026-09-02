import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (import.meta.env["VITE_SUPABASE_URL"] as string) || "";
const supabaseAnonKey = (import.meta.env["VITE_SUPABASE_ANON_KEY"] as string) || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes("your-project") &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseAnonKey.includes("your-") &&
    !supabaseAnonKey.includes("placeholder") &&
    supabaseUrl.startsWith("http"),
);

// Graceful client initialization
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient("https://placeholder-project.supabase.co", "placeholder-anon-key", {
      auth: { persistSession: false },
    });
