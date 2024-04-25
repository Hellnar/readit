import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://rmeyujzjtgdccvhposrp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLIC_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase