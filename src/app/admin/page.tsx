import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    Users,
    BookOpen,
    BarChart3,
    PlusCircle,
    MoreHorizontal,
    TrendingUp,
    ArrowUpRight,
    ShieldCheck,
    Search
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'

// Force dynamic rendering so Prisma doesn't run at build time
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    // Check if role is ADMIN
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }
    })

    if (dbUser?.role !== 'ADMIN') {
        redirect('/campus/dashboard')
    }

    // Fetch some stats
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } })
    const totalCourses = await prisma.course.count()

    const recentUsers = await prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { subscriptions: true }
    })

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Admin Sidebar */}
            <aside className="w-72 bg-slate-900 flex flex-col p-8 sticky top-0 h-screen text-white">
                <div className="mb-12">
                    <Link href="/admin" className="text-xl font-black tracking-tighter">
                        WONDERLAND <span className="text-[var(--edu-primary)]">ADMIN</span>
                    </Link>
                </div>

                <nav className="space-y-2 flex-grow">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--edu-primary)] font-bold text-sm shadow-xl shadow-[var(--edu-primary)]/20">
                        <BarChart3 size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <BookOpen size={20} /> Cursos
                    </Link>
                    <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <Users size={20} /> Alumnos
                    </Link>
                    <Link href="/admin/sales" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <TrendingUp size={20} /> Ventas
                    </Link>
                </nav>

                <div className="pt-8 border-t border-white/10">
                    <Link href="/campus/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <ArrowUpRight size={20} /> Ver como alumno
                    </Link>
                </div>
            </aside>

            {/* Main Admin Content */}
            <main className="flex-1 p-12 max-w-7xl mx-auto space-y-12">
                <header className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Panel de Control</h1>
                        <p className="text-slate-500 font-medium tracking-tight">Gestiona tu academia y analiza el crecimiento hoy.</p>
                    </div>

                    <Link href="/admin/courses/new">
                        <Button className="h-14 px-8 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-[var(--edu-primary)]/10">
                            <PlusCircle size={20} /> Crear Nuevo Curso
                        </Button>
                    </Link>
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { label: 'Total Alumnos', value: totalStudents, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                        { label: 'Ingresos Mensuales', value: '$2,450', color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Tasa de Conversión', value: '12.4%', color: 'text-amber-600', bg: 'bg-amber-50' },
                        { label: 'Cursos Activos', value: totalCourses, color: 'text-magenta-600', bg: 'bg-magenta-50' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 group hover:scale-105 transition-transform">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                            <div className={`text-3xl font-black ${stat.color}`}>{stat.value}</div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 mt-2">
                                <TrendingUp size={12} /> +4.2% desde ayer
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Recent Students Table */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Alumnos Recientes</h2>
                            <Link href="/admin/students" className="text-xs font-black text-[var(--edu-primary)] hover:underline">Ver todos</Link>
                        </div>

                        <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Alumno</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Suscripción</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha</th>
                                        <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentUsers.map((user, i) => (
                                        <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                                                        {user.name?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-black text-slate-900">{user.name || 'Sin nombre'}</div>
                                                        <div className="text-[10px] font-bold text-slate-400">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="inline-flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                                                    Premium
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 text-[10px] font-black text-slate-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="text-slate-300 hover:text-slate-900 transition-colors">
                                                    <MoreHorizontal size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Quick Actions / System Health */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Estado del Sistema</h2>

                        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                                    <ShieldCheck size={26} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black leading-tight">Servidores OK</h3>
                                    <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Sin incidencias</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                        <span>Uso de Base de Datos</span>
                                        <span className="text-white">12%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-[var(--edu-primary)] w-[12%]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
                                        <span>Usuarios Conectados</span>
                                        <span className="text-white">45</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#2D93C7] w-[45%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                            <h3 className="text-lg font-black text-slate-900 mb-6">Métrica Rápida</h3>
                            <div className="relative h-48 flex items-end justify-between gap-2 px-2">
                                {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                                    <div key={i} className="flex-1 rounded-t-lg bg-slate-100 group hover:bg-[var(--edu-primary)] transition-all relative cursor-pointer" style={{ height: `${h}%` }}>
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                            {h}%
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest mt-6">Carga de Alumnos (Últimos 7 días)</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
