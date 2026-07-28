'use server'

import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function checkAdmin() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('No autenticado')
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }
    })

    if (dbUser?.role !== 'ADMIN') {
        throw new Error('Sin permisos de administrador')
    }

    return user
}

export async function createCourse(formData: FormData) {
    await checkAdmin()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const level = formData.get('level') as string

    const course = await prisma.course.create({
        data: {
            title,
            description,
            price,
            level,
        }
    })

    revalidatePath('/admin/courses')
    revalidatePath('/admin')

    return course
}

export async function addUnit(courseId: string, title: string, order: number) {
    await checkAdmin()

    const unit = await prisma.unit.create({
        data: {
            courseId,
            title,
            order,
        }
    })

    revalidatePath(`/admin/courses/${courseId}`)
    return unit
}

export async function addLesson(unitId: string, data: {
    title: string,
    description?: string,
    videoUrl?: string,
    duration?: string,
    order: number,
    isFree?: boolean
}) {
    await checkAdmin()

    const lesson = await prisma.lesson.create({
        data: {
            unitId,
            ...data
        }
    })

    revalidatePath('/admin/courses/[id]', 'page')
    return lesson
}

export async function deleteCourse(courseId: string) {
    await checkAdmin()

    await prisma.course.delete({
        where: { id: courseId }
    })

    revalidatePath('/admin/courses')
    redirect('/admin/courses')
}

export async function grantCourseAccess(userId: string, courseId: string) {
    await checkAdmin()

    await prisma.enrollment.upsert({
        where: { userId_courseId: { userId, courseId } },
        update: {},
        create: { userId, courseId },
    })

    revalidatePath('/admin/students')
    revalidatePath('/campus/dashboard')
}

export async function revokeAccess(userId: string, courseId: string) {
    await checkAdmin()

    await prisma.enrollment.deleteMany({
        where: { userId, courseId },
    })

    revalidatePath('/admin/students')
    revalidatePath('/campus/dashboard')
}
