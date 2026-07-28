import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }
    })

    if (dbUser?.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const [students, courses] = await Promise.all([
        prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                enrollments: {
                    include: { course: true }
                }
            }
        }),
        prisma.course.findMany({
            orderBy: { title: 'asc' },
            select: { id: true, title: true, level: true, type: true }
        })
    ])

    return NextResponse.json({ students, courses })
}
