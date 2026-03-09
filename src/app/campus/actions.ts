'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/campus?error=' + encodeURIComponent(error.message))
    }

    redirect('/campus/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const name = formData.get('name') as string || 'New User'

    // Use admin API to create user with auto-confirmed email
    const { data: adminData, error: adminError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm email — no verification link needed
    })

    if (adminError) {
        redirect('/campus?error=' + encodeURIComponent(adminError.message))
    }

    // Create user record in our database via Prisma
    if (adminData.user) {
        try {
            await prisma.user.create({
                data: {
                    email: adminData.user.email!,
                    name,
                }
            })
        } catch (e) {
            console.error("Error creating user in Prisma:", e)
        }
    }

    // Auto-login the new user
    const { error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (loginError) {
        redirect('/campus?error=' + encodeURIComponent('Cuenta creada. Por favor iniciá sesión.'))
    }

    redirect('/campus/dashboard')
}

