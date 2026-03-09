import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import {
    User,
    Mail,
    Lock,
    CreditCard,
    Bell,
    Camera,
    CheckCircle2,
    AlertCircle,
    ShieldCheck,
    ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'

export default async function SettingsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
            profile: true,
            subscriptions: true
        }
    })

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
            <header className="mb-12">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Configuración del Perfil</h1>
                <p className="text-slate-500 font-medium">Personaliza tu cuenta y gestiona tu suscripción.</p>
            </header>

            <div className="grid gap-12">
                {/* Profile Info Section */}
                <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative group">
                            <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-[#BC248C] to-[#2D93C7] flex items-center justify-center text-white text-4xl font-black shadow-2xl">
                                {dbUser?.name?.[0] || 'U'}
                            </div>
                            <button className="absolute -bottom-2 -right-2 h-10 w-10 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:text-[var(--edu-primary)] transition-colors">
                                <Camera size={18} />
                            </button>
                        </div>

                        <div className="flex-1 space-y-8 w-full">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            defaultValue={dbUser?.name || ''}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="email"
                                            disabled
                                            defaultValue={dbUser?.email || ''}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-400 font-bold cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button className="rounded-2xl px-10 h-14 font-black">Guardar cambios</Button>
                        </div>
                    </div>
                </section>

                {/* Subscription Section */}
                <div className="grid md:grid-cols-2 gap-8">
                    <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <CreditCard size={120} />
                        </div>
                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black italic tracking-tighter uppercase">Método Fénix <span className="text-[var(--edu-primary)]">PRO</span></h3>
                                <div className="px-3 py-1 bg-green-500 text-[10px] font-black uppercase tracking-widest rounded-full">Activo</div>
                            </div>

                            <div className="space-y-1">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Próximo cobro</p>
                                <p className="text-2xl font-black">15 de Julio, 2026</p>
                                <p className="text-[var(--edu-primary)] text-xs font-bold">$29.99 USD / mes</p>
                            </div>

                            <div className="pt-4 flex gap-4">
                                <Button variant="glass" className="flex-1 rounded-2xl font-black text-xs">Gestionar Pago</Button>
                                <Button variant="ghost" className="text-white hover:text-white/80 font-black text-xs">Cancelar</Button>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">Privacidad y Seguridad</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Mantén tu cuenta segura. Te recomendamos cambiar tu contraseña periódicamente.
                            </p>
                        </div>
                        <Button variant="outline" className="w-full rounded-2xl h-14 font-black mt-8 flex items-center justify-between px-8 border-slate-200">
                            Cambiar Contraseña <ChevronRight size={18} />
                        </Button>
                    </section>
                </div>

                {/* Notifications */}
                <section className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600">
                            <Bell size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">Notificaciones</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Elige cómo quieres recibir novedades</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { title: 'Nuevas clases disponibles', active: true },
                            { title: 'Recordatorios de mentorías', active: true },
                            { title: 'Ofertas y descuentos exclusivos', active: false },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <p className="text-sm font-black text-slate-700">{item.title}</p>
                                <div className={`h-6 w-10 rounded-full p-1 transition-colors ${item.active ? 'bg-[var(--edu-primary)]' : 'bg-slate-200'}`}>
                                    <div className={`h-4 w-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-4' : 'translate-x-0'}`} />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
