'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function toggleLessonCompletion(courseId: string, lessonKey: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('No autenticado')
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    })

    if (!dbUser) {
        throw new Error('Usuario no encontrado')
    }

    // Check if already completed
    const existing = await prisma.lessonCompletion.findUnique({
        where: {
            userId_courseId_lessonKey: {
                userId: dbUser.id,
                courseId: courseId,
                lessonKey: lessonKey,
            }
        }
    })

    if (existing) {
        // Uncomplete it
        await prisma.lessonCompletion.delete({
            where: { id: existing.id }
        })
    } else {
        // Mark as completed
        await prisma.lessonCompletion.create({
            data: {
                userId: dbUser.id,
                courseId: courseId,
                lessonKey: lessonKey,
            }
        })
    }

    revalidatePath('/campus/dashboard')
    revalidatePath(`/campus/dashboard/courses`)
    revalidatePath(`/campus/dashboard/courses/${courseId}`)

    return { completed: !existing }
}
