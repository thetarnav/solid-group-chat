import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://inbmfyzbytmwbkzvwmlz.supabase.co'
const supabaseKey = import.meta.env.VITE_SB_PUBLIC + ''
const supabase = createClient(supabaseUrl, supabaseKey)
export const { auth } = supabase