"use client";

import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { resetPassword } from "./actions";

function ForgotPasswordForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const success = searchParams.get("success");

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 overflow-hidden bg-white">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--edu-primary)]/5 rounded-full blur-[120px] opacity-50" />

            <div className="relative w-full max-w-md bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 p-8 md:p-12 space-y-8">
                <Link
                    href="/campus"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--edu-primary)] transition-colors font-bold text-sm uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> Volver al login
                </Link>

                {success ? (
                    <div className="space-y-6 text-center">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                            <CheckCircle2 size={32} className="text-green-500" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">¡Email enviado!</h1>
                        <p className="text-slate-500">
                            Revisá tu bandeja de entrada (y spam) para encontrar el link de recuperación. El enlace expira en 24 horas.
                        </p>
                        <Link href="/campus">
                            <Button className="w-full py-6 text-base rounded-2xl mt-4">
                                Volver al login
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="space-y-2">
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Recuperar contraseña</h1>
                            <p className="text-slate-500 text-sm">
                                Ingresá tu email y te enviaremos un enlace para restablecer tu contraseña.
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3">
                                <AlertCircle size={18} className="shrink-0" />
                                {decodeURIComponent(error)}
                            </div>
                        )}

                        <form action={resetPassword} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-7 text-base rounded-2xl shadow-xl shadow-[var(--edu-primary)]/20">
                                Enviar enlace de recuperación
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-[var(--edu-primary)] rounded-full" />
            </div>
        }>
            <ForgotPasswordForm />
        </Suspense>
    );
}
