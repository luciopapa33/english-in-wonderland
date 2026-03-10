'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!password || password.length < 6) {
        redirect('/campus/reset-password?error=' + encodeURIComponent('La contraseña debe tener al menos 6 caracteres'))
    }

    if (password !== confirmPassword) {
        redirect('/campus/reset-password?error=' + encodeURIComponent('Las contraseñas no coinciden'))
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
        redirect('/campus/reset-password?error=' + encodeURIComponent(error.message))
    }

    redirect('/campus?error=' + encodeURIComponent('✅ Contraseña actualizada. Ya podés iniciar sesión.'))
}
