'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get('email') as string

    if (!email) {
        redirect('/campus/forgot-password?error=' + encodeURIComponent('Ingresa tu email'))
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/campus/reset-password`,
    })

    if (error) {
        redirect('/campus/forgot-password?error=' + encodeURIComponent(error.message))
    }

    redirect('/campus/forgot-password?success=true')
}
