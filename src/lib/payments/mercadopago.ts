'use server'

import { MercadoPagoConfig, Preference } from 'mercadopago';
import { createClient } from '@/lib/supabase/server';
import prisma from '@/lib/prisma';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function createCoursePreference(courseId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Debe iniciar sesión para comprar');
    }

    // Get the Prisma user (the DB user ID, not the Supabase auth ID)
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! }
    });

    if (!dbUser) {
        throw new Error('Usuario no encontrado en la base de datos');
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId }
    });

    if (!course) {
        throw new Error('Curso no encontrado');
    }

    try {
        const preference = new Preference(client);

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const isProduction = !appUrl.includes('localhost') && !appUrl.includes('127.0.0.1');

        const result = await preference.create({
            body: {
                items: [
                    {
                        id: course.id,
                        title: course.title,
                        unit_price: course.price,
                        quantity: 1,
                        currency_id: 'ARS',
                    }
                ],
                // Only include back_urls and auto_return in production (MP rejects localhost URLs)
                ...(isProduction ? {
                    back_urls: {
                        success: `${appUrl}/campus/dashboard/courses`,
                        failure: `${appUrl}/campus/dashboard`,
                        pending: `${appUrl}/campus/dashboard`,
                    },
                    auto_return: 'approved',
                    notification_url: `${appUrl}/api/webhooks/mercadopago`,
                } : {}),
                external_reference: JSON.stringify({ userId: dbUser.id, courseId: course.id }),
                metadata: {
                    userId: dbUser.id,
                    courseId: course.id
                }
            }
        });

        return result.id;
    } catch (error: unknown) {
        const errObj = error as Record<string, unknown>;
        console.error('=== MERCADO PAGO ERROR ===');
        console.error('Message:', errObj?.message || error);
        console.error('Status:', errObj?.status);
        console.error('Cause:', JSON.stringify(errObj?.cause, null, 2));
        console.error('Full error:', JSON.stringify(error, null, 2));
        console.error('=========================');
        const msg = typeof errObj?.message === 'string' ? errObj.message : 'Error desconocido';
        throw new Error(`Error de Mercado Pago: ${msg}`);
    }
}
