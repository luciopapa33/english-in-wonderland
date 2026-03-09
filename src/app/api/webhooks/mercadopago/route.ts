import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN || ''
});

export async function POST(request: Request) {
    const body = await request.json();
    const { data, type } = body;

    if (type === 'payment') {
        const payment = new Payment(client);
        const paymentData = await payment.get({ id: data.id });

        if (paymentData.status === 'approved') {
            const { userId, courseId } = JSON.parse(paymentData.external_reference as string);

            try {
                // Use upsert with the unique constraint for atomic idempotency
                await prisma.enrollment.upsert({
                    where: {
                        userId_courseId: {
                            userId: userId,
                            courseId: courseId,
                        }
                    },
                    create: {
                        userId: userId,
                        courseId: courseId,
                    },
                    update: {} // No-op if already exists
                });
                console.log(`User ${userId} enrolled in course ${courseId} (upsert)`);
            } catch (error) {
                console.error('Error during enrollment:', error);
            }
        }
    }

    return NextResponse.json({ status: 'ok' });
}
