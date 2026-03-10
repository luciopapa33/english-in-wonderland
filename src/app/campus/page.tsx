"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lock, Mail, ArrowRight, GraduationCap, User, UserPlus, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { login, signup } from "./actions";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CampusForm() {
    const [mode, setMode] = useState<"login" | "register">("login");
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const searchParams = useSearchParams();
    const error = searchParams.get("error");

    return (
        <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4 overflow-hidden bg-white">
            {/* Background Magic */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--edu-primary)]/5 rounded-full blur-[120px] opacity-50" />

            <div className="relative w-full max-w-[1100px] grid lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                {/* Visual Side */}
                <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1470&q=80"
                        alt="Education background"
                        fill
                        className="object-cover opacity-20"
                        sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />

                    <div className="relative z-10">
                        <Link href="/" className="inline-block mb-12">
                            <span className="text-xl font-black tracking-tighter">
                                ENGLISH IN <span className="text-[var(--edu-primary)]">WONDERLAND</span>
                            </span>
                        </Link>
                        <h2 className="text-5xl font-black leading-tight mb-6">Tu puerta al <br />universo bilingüe</h2>
                        <p className="text-slate-400 text-lg max-w-sm">
                            Accede a tus materiales, clases en vivo y sigue tu progreso en el Método Fénix.
                        </p>
                    </div>

                    <div className="relative z-10 flex items-center gap-4 p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
                        <div className="h-12 w-12 rounded-xl bg-[var(--edu-primary)] flex items-center justify-center">
                            <GraduationCap size={24} />
                        </div>
                        <div>
                            <div className="text-sm font-bold">+1,200 Alumnos Activos</div>
                            <div className="text-xs text-slate-400">Comunidad global de aprendizaje</div>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-8 md:p-16 flex flex-col justify-center space-y-8">
                    {/* Tab Switcher */}
                    <div className="flex gap-1 p-1 bg-slate-100 rounded-2xl">
                        <button
                            type="button"
                            onClick={() => setMode("login")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${mode === "login"
                                ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            <Lock size={16} /> Iniciar Sesión
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode("register")}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${mode === "register"
                                ? "bg-white text-slate-900 shadow-lg shadow-slate-200/50"
                                : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            <UserPlus size={16} /> Registrarme
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-bold flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                                <Lock size={16} />
                            </div>
                            {decodeURIComponent(error)}
                        </div>
                    )}

                    {/* Login Form */}
                    {mode === "login" && (
                        <form action={login} className="space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Acceso al Campus</h1>
                                <p className="text-slate-500">Ingresa tus credenciales para continuar tu formación.</p>
                            </div>

                            <div className="space-y-6">
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

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="password"
                                            type={showLoginPassword ? "text" : "password"}
                                            required
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-[var(--edu-primary)] focus:ring-[var(--edu-primary)]" />
                                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors">Recordarme</span>
                                    </label>
                                    <a href="/campus/forgot-password" className="text-[var(--edu-primary)] font-bold hover:underline">¿Olvidaste tu contraseña?</a>
                                </div>

                                <Button type="submit" className="w-full py-8 text-lg rounded-2xl shadow-xl shadow-[var(--edu-primary)]/20">
                                    Ingresar al Campus <ArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Register Form */}
                    {mode === "register" && (
                        <form action={signup} className="space-y-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Crear cuenta</h1>
                                <p className="text-slate-500">Únete a la comunidad Wonderland y comienza tu viaje bilingüe.</p>
                            </div>

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nombre completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="name"
                                            type="text"
                                            required
                                            placeholder="Tu nombre"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                                        />
                                    </div>
                                </div>

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

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="password"
                                            type={showRegisterPassword ? "text" : "password"}
                                            required
                                            minLength={6}
                                            placeholder="Mínimo 6 caracteres"
                                            className="w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] focus:bg-white transition-all"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showRegisterPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="text-sm">
                                    <label className="flex items-start gap-2 cursor-pointer group">
                                        <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[var(--edu-primary)] focus:ring-[var(--edu-primary)]" />
                                        <span className="text-slate-600 group-hover:text-slate-900 transition-colors">
                                            Acepto los <Link href="/legal/terms" className="text-[var(--edu-primary)] font-bold hover:underline">Términos y Condiciones</Link> y la <Link href="/legal/privacy" className="text-[var(--edu-primary)] font-bold hover:underline">Política de Privacidad</Link>
                                        </span>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full py-8 text-lg rounded-2xl shadow-xl shadow-[var(--edu-primary)]/20">
                                    Crear mi cuenta <ArrowRight className="ml-2" />
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm">
                            {mode === "login" ? (
                                <>¿Aún no eres parte de Wonderland? <button type="button" onClick={() => setMode("register")} className="text-[var(--edu-primary)] font-bold hover:underline">Crear una cuenta</button></>
                            ) : (
                                <>¿Ya tienes una cuenta? <button type="button" onClick={() => setMode("login")} className="text-[var(--edu-primary)] font-bold hover:underline">Iniciar sesión</button></>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CampusPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[calc(100vh-80px)] flex items-center justify-center">
                <div className="animate-spin h-8 w-8 border-4 border-slate-200 border-t-[var(--edu-primary)] rounded-full" />
            </div>
        }>
            <CampusForm />
        </Suspense>
    )
}
