import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

// DEV ONLY: Manual enrollment endpoint for testing without payment
// This endpoint only works in development mode
export async function POST(request: Request) {
    // Block in production
    if (process.env.NODE_ENV === 'production') {
        return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
    }

    try {
        const { courseId } = await request.json();

        if (!courseId) {
            return NextResponse.json({ error: 'courseId is required' }, { status: 400 });
        }

        // Get the current logged-in user
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Must be logged in' }, { status: 401 });
        }

        // Get the DB user
        const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
        });

        if (!dbUser) {
            return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
        }

        // Get the course
        const course = await prisma.course.findUnique({
            where: { id: courseId }
        });

        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }

        // Create the enrollment
        const enrollment = await prisma.enrollment.upsert({
            where: {
                userId_courseId: {
                    userId: dbUser.id,
                    courseId: courseId,
                }
            },
            create: {
                userId: dbUser.id,
                courseId: courseId,
            },
            update: {} // No-op if already exists
        });

        console.log(`[DEV] Manual enrollment: User ${dbUser.id} enrolled in course ${courseId}`);

        return NextResponse.json({ 
            success: true, 
            message: `Enrolled in "${course.title}" successfully`,
            enrollment 
        });
    } catch (error) {
        console.error('[DEV] Enrollment error:', error);
        return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 });
    }
}
