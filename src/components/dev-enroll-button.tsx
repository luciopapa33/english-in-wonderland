'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Unlock } from 'lucide-react';

interface DevEnrollButtonProps {
    courseId: string;
}

export function DevEnrollButton({ courseId }: DevEnrollButtonProps) {
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    if (process.env.NODE_ENV === 'production') return null;

    const handleEnroll = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/dev/enroll', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId }),
            });
            const data = await res.json();
            if (res.ok) {
                setDone(true);
                // Reload to see the enrolled state
                setTimeout(() => window.location.reload(), 1000);
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Dev enrollment error:', error);
            alert('Error al hacer enrollment de prueba');
        } finally {
            setLoading(false);
        }
    };

    if (done) {
        return (
            <div className="p-3 rounded-xl bg-green-50 border-2 border-dashed border-green-300 text-center text-green-700 text-sm font-bold">
                ✅ Enrolled! Recargando...
            </div>
        );
    }

    return (
        <div className="p-3 rounded-xl bg-amber-50 border-2 border-dashed border-amber-300 space-y-2">
            <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest text-center">
                🛠️ Solo Desarrollo
            </div>
            <Button
                onClick={handleEnroll}
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold"
            >
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Unlock className="mr-2 h-4 w-4" />
                )}
                Enrollment gratuito (dev)
            </Button>
        </div>
    );
}
