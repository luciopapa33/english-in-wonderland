import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Users, BookOpen, BarChart3, TrendingUp, ArrowUpRight, Search, CheckCircle2, XCircle, Mail } from 'lucide-react'
import prisma from '@/lib/prisma'
import { grantCourseAccess, revokeAccess } from '../actions'

export const dynamic = 'force-dynamic'

export default async function AdminStudentsPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string; open?: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/campus')

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }
    })

    if (dbUser?.role !== 'ADMIN') redirect('/campus/dashboard')

    const params = await searchParams
    const search = params.q || ''
    const openId = params.open || ''

    const [students, courses] = await Promise.all([
        prisma.user.findMany({
            where: search ? {
                OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ]
            } : {},
            orderBy: { createdAt: 'desc' },
            include: { enrollments: { select: { courseId: true } } }
        }),
        prisma.course.findMany({
            orderBy: { title: 'asc' },
            select: { id: true, title: true, level: true, type: true }
        })
    ])

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 flex flex-col p-8 sticky top-0 h-screen text-white">
                <div className="mb-12">
                    <Link href="/admin" className="text-xl font-black tracking-tighter">
                        WONDERLAND <span className="text-[var(--edu-primary)]">ADMIN</span>
                    </Link>
                </div>
                <nav className="space-y-2 flex-grow">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <BarChart3 size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <BookOpen size={20} /> Cursos
                    </Link>
                    <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--edu-primary)] font-bold text-sm shadow-xl shadow-[var(--edu-primary)]/20">
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

            {/* Main */}
            <main className="flex-1 p-10 max-w-6xl">
                <header className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gestión de Alumnos</h1>
                        <p className="text-slate-500 font-medium mt-1">
                            {students.length} alumnos registrados · {courses.length} cursos disponibles
                        </p>
                    </div>
                </header>

                {/* Search form */}
                <form method="GET" action="/admin/students" className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        name="q"
                        defaultValue={search}
                        placeholder="Buscar alumno por nombre o email..."
                        className="w-full pl-12 pr-32 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] font-medium transition-all"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 -translate-y-1/2 px-5 py-2 bg-slate-900 text-white text-xs font-black rounded-xl hover:bg-[var(--edu-primary)] transition-colors"
                    >
                        Buscar
                    </button>
                </form>

                {/* Students */}
                <div className="space-y-4">
                    {students.length === 0 ? (
                        <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-xl">
                            <Users size={48} className="mx-auto mb-4 text-slate-200" />
                            <h2 className="text-xl font-black text-slate-900 mb-2">No se encontraron alumnos</h2>
                            {search && (
                                <Link href="/admin/students" className="text-[var(--edu-primary)] font-bold text-sm">
                                    Limpiar búsqueda
                                </Link>
                            )}
                        </div>
                    ) : (
                        students.map(student => {
                            const enrolledIds = new Set(student.enrollments.map(e => e.courseId))
                            const isOpen = openId === student.id

                            return (
                                <div key={student.id} className="bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden">
                                    {/* Student header row */}
                                    <div className="flex items-center gap-4 px-6 py-5">
                                        {/* Avatar */}
                                        <div className="h-11 w-11 rounded-xl bg-slate-900 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                            {(student.name?.[0] || student.email[0]).toUpperCase()}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="font-black text-slate-900 text-sm">{student.name || 'Sin nombre'}</div>
                                            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-0.5">
                                                <Mail size={11} /> {student.email}
                                            </div>
                                        </div>

                                        {/* Stats + expand toggle */}
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${enrolledIds.size > 0 ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                {enrolledIds.size} {enrolledIds.size === 1 ? 'curso' : 'cursos'}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {new Date(student.createdAt).toLocaleDateString('es-AR')}
                                            </span>

                                            {/* Toggle button — uses URL param to expand/collapse */}
                                            <Link
                                                href={isOpen
                                                    ? `/admin/students${search ? `?q=${search}` : ''}`
                                                    : `/admin/students?${search ? `q=${search}&` : ''}open=${student.id}`
                                                }
                                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white text-[11px] font-black transition-all"
                                            >
                                                {isOpen ? 'Cerrar ↑' : 'Ver cursos ↓'}
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Expanded course access panel */}
                                    {isOpen && (
                                        <div className="border-t border-slate-100 bg-slate-50/60 px-6 py-5">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                                Cursos disponibles — otorgá o revocá acceso gratuito
                                            </p>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {courses.map(course => {
                                                    const enrolled = enrolledIds.has(course.id)
                                                    return (
                                                        <div
                                                            key={course.id}
                                                            className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${enrolled ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
                                                        >
                                                            {/* Course info */}
                                                            <div className="flex items-center gap-2.5 min-w-0">
                                                                <div className={`h-9 w-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 ${enrolled ? 'bg-green-500' : 'bg-slate-400'}`}>
                                                                    {course.title[0]}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-xs font-black text-slate-900 truncate leading-tight">{course.title}</div>
                                                                    <div className="text-[10px] font-bold text-slate-400 uppercase">{course.level}</div>
                                                                </div>
                                                            </div>

                                                            {/* Action form */}
                                                            {enrolled ? (
                                                                <form action={async () => {
                                                                    'use server'
                                                                    await revokeAccess(student.id, course.id)
                                                                    redirect(`/admin/students?${search ? `q=${search}&` : ''}open=${student.id}`)
                                                                }}>
                                                                    <button
                                                                        type="submit"
                                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black transition-all border border-red-200 flex-shrink-0 cursor-pointer"
                                                                    >
                                                                        <XCircle size={12} /> Quitar
                                                                    </button>
                                                                </form>
                                                            ) : (
                                                                <form action={async () => {
                                                                    'use server'
                                                                    await grantCourseAccess(student.id, course.id)
                                                                    redirect(`/admin/students?${search ? `q=${search}&` : ''}open=${student.id}`)
                                                                }}>
                                                                    <button
                                                                        type="submit"
                                                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--edu-primary)] text-white hover:opacity-90 text-[10px] font-black transition-all flex-shrink-0 cursor-pointer shadow-md shadow-[var(--edu-primary)]/30"
                                                                    >
                                                                        <CheckCircle2 size={12} /> Dar acceso
                                                                    </button>
                                                                </form>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </main>
        </div>
    )
}
