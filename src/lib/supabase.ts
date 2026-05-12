/**
 * Supabase client stub.
 * 
 * TO CONNECT:
 * 1. Create a project at https://supabase.com
 * 2. Copy your Project URL and anon key from Settings > API
 * 3. Replace the placeholders below (or use environment variables)
 * 4. In each data file under src/data/, replace the dummy arrays with
 *    Supabase queries — examples are commented out in each file.
 */
import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? "https://your-project.supabase.co"
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "your-anon-key"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Example query helper (swap dummy data for this):
// export async function fetchCaseTrends(diseaseId: string) {
//   const { data, error } = await supabase
//     .from("case_trends")
//     .select("*")
//     .eq("disease_id", diseaseId)
//     .order("date", { ascending: true })
//   if (error) throw error
//   return data
// }
