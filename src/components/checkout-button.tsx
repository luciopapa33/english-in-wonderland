'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Loader2 } from 'lucide-react';
import { createCoursePreference } from '@/lib/payments/mercadopago';

interface CheckoutButtonProps {
    courseId: string;
    price: number;
    className?: string;
}

export function CheckoutButton({ courseId, price, className }: CheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const { redirectUrl } = await createCoursePreference(courseId);
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                alert('Error: No se pudo obtener la URL de pago');
            }
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error('Checkout error:', message, error);
            if (message.includes('iniciar sesión') || message.includes('sesión')) {
                window.location.href = '/campus?error=' + encodeURIComponent('Debes iniciar sesión para comprar un curso');
            } else if (message.includes('no encontrado')) {
                alert('Error: ' + message);
            } else {
                alert('Hubo un error al procesar el pago: ' + message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            onClick={handleCheckout}
            disabled={loading}
            className={className}
        >
            {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <CreditCard className="mr-2 h-4 w-4" />
            )}
            Comprar curso (${price})
        </Button>
    );
}
