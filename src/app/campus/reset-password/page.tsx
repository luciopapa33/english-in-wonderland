"use client";

import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { updatePassword } from "./actions";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

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

                <div className="space-y-2">
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nueva contraseña</h1>
                    <p className="text-slate-500 text-sm">
                        Ingresá tu nueva contraseña. Debe tener al menos 6 caracteres.
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3">
                        <AlertCircle size={18} className="shrink-0" />
                        {decodeURIComponent(error)}
                    </div>
                )}

                <form action={updatePassword} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nueva contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={6}
                                placeholder="Mínimo 6 caracteres"
                                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Confirmar contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                name="confirmPassword"
                                type={showConfirm ? "text" : "password"}
                                required
                                minLength={6}
                                placeholder="Repetí tu contraseña"
                                className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                tabIndex={-1}
                            >
                                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full py-7 text-base rounded-2xl shadow-xl shadow-[var(--edu-primary)]/20">
                        Actualizar contraseña
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-[var(--edu-primary)] rounded-full" />
            </div>
        }>
            <ResetPasswordForm />
        </Suspense>
    );
}
