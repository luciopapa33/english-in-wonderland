import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    BookOpen,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Edit,
    ExternalLink,
    Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'

// Force dynamic rendering so Prisma doesn't run at build time
export const dynamic = 'force-dynamic';

export default async function AdminCoursesPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { role: true }
    })

    if (dbUser?.role !== 'ADMIN') {
        redirect('/campus/dashboard')
    }

    const courses = await prisma.course.findMany({
        include: {
            _count: {
                select: { enrollments: true, units: true }
            }
        },
        orderBy: { title: 'asc' }
    })

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar (Using same style as main admin) */}
            <aside className="w-72 bg-slate-900 flex flex-col p-8 sticky top-0 h-screen text-white">
                <div className="mb-12">
                    <Link href="/admin" className="text-xl font-black tracking-tighter">
                        WONDERLAND <span className="text-[var(--edu-primary)]">ADMIN</span>
                    </Link>
                </div>

                <nav className="space-y-2 flex-grow">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <BookOpen size={20} /> Dashboard
                    </Link>
                    <Link href="/admin/courses" className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[var(--edu-primary)] font-bold text-sm shadow-xl shadow-[var(--edu-primary)]/20">
                        <BookOpen size={20} /> Cursos
                    </Link>
                    <Link href="/admin/students" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <Users size={20} /> Alumnos
                    </Link>
                </nav>

                <div className="pt-8 border-t border-white/10">
                    <Link href="/campus/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/10 font-bold text-sm transition-colors text-slate-400 hover:text-white">
                        <ExternalLink size={20} /> Ver como alumno
                    </Link>
                </div>
            </aside>

            <main className="flex-1 p-12 max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Catálogo de Cursos</h1>
                        <p className="text-slate-500 font-medium">Gestiona el contenido académico y niveles de dificultad.</p>
                    </div>

                    <Link href="/admin/courses/new">
                        <Button className="h-14 px-8 rounded-2xl font-black flex items-center gap-3 shadow-2xl shadow-[var(--edu-primary)]/10">
                            <Plus size={20} /> Crear Curso
                        </Button>
                    </Link>
                </header>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar por título o nivel..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-medium"
                        />
                    </div>
                    <Button variant="outline" className="h-14 rounded-2xl px-6 gap-3 border-slate-200 bg-white">
                        <Filter size={18} /> Filtrar
                    </Button>
                </div>

                {/* Courses Table */}
                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden">
                    {courses.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                                <BookOpen size={40} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-2">No hay cursos creados</h2>
                            <p className="text-slate-500 mb-8">Comienza creando tu primer curso para que los alumnos puedan inscribirse.</p>
                            <Link href="/admin/courses/new">
                                <Button className="rounded-2xl px-10 h-14 font-black">Crear mi primer curso</Button>
                            </Link>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 border-b border-slate-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Curso</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nivel</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Contenido</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Inscritos</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Precio</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {courses.map((course) => (
                                    <tr key={course.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 rounded-xl bg-slate-900 flex items-center justify-center text-white text-xs font-black">
                                                    {course.title[0]}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-black text-slate-900 group-hover:text-[var(--edu-primary)] transition-colors">{course.title}</div>
                                                    <div className="text-[10px] font-bold text-slate-400 truncate max-w-[200px]">{course.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                                {course.level}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs font-bold text-slate-600">{course._count.units} Unidades</div>
                                            <div className="text-[10px] text-slate-400">Total lecciones: --</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center border border-white">
                                                    <Users size={12} className="text-slate-400" />
                                                </div>
                                                <span className="text-xs font-black text-slate-700">{course._count.enrollments}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm font-black text-slate-900">${course.price}</td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link href={`/admin/courses/${course.id}`}>
                                                    <button className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[var(--edu-primary)] hover:text-white transition-all">
                                                        <Edit size={16} />
                                                    </button>
                                                </Link>
                                                <button className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    )
}
