import { createClient } from '@supabase/supabase-js'

// Admin client uses the SERVICE_ROLE_KEY which bypasses Row Level Security
// and can perform admin operations like confirming user emails
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)
