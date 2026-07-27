import { createClient } from '@supabase/supabase-js'

// Admin client uses the SERVICE_ROLE_KEY which bypasses Row Level Security
// and can perform admin operations like confirming user emails
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bktouvieisdzwkdqczrx.supabase.co'
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_mOTPuAWWmyXMqlV8EnPLTQ_BosTwZ59'

export const supabaseAdmin = createClient(
    supabaseUrl,
    supabaseKey,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)
