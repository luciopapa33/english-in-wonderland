'use client'

import { useEffect, useState, useTransition } from 'react'
import Link from 'next/link'
import {
    Users,
    BookOpen,
    BarChart3,
    TrendingUp,
    ArrowUpRight,
    Search,
    CheckCircle2,
    XCircle,
    GraduationCap,
    Mail,
    ChevronDown,
    ChevronUp,
    Loader2
} from 'lucide-react'
import { grantCourseAccess, revokeAccess } from '../actions'

type Course = { id: string; title: string; level: string; type: string }
type Enrollment = { courseId: string; course: Course }
type Student = {
    id: string
    name: string | null
    email: string
    createdAt: string
    enrollments: Enrollment[]
}

// ─── Server-data loader component (we'll call a JSON endpoint) ───────────────
// Since we need interactivity (grant/revoke without full page reload) we make
// this a Client Component that fetches data from a lightweight API route.

export default function AdminStudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()
    const [actionState, setActionState] = useState<Record<string, 'granting' | 'revoking' | null>>({})

    const fetchData = async () => {
        setLoading(true)
        const res = await fetch('/api/admin/students-data', { cache: 'no-store' })
        if (res.ok) {
            const json = await res.json()
            setStudents(json.students)
            setCourses(json.courses)
        }
        setLoading(false)
    }

    useEffect(() => { fetchData() }, [])

    const filtered = students.filter(s =>
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    )

    const isEnrolled = (student: Student, courseId: string) =>
        student.enrollments.some(e => e.courseId === courseId)

    const handleGrant = async (student: Student, courseId: string) => {
        const key = `${student.id}-${courseId}`
        setActionState(prev => ({ ...prev, [key]: 'granting' }))
        await grantCourseAccess(student.id, courseId)
        await fetchData()
        setActionState(prev => ({ ...prev, [key]: null }))
    }

    const handleRevoke = async (student: Student, courseId: string) => {
        const key = `${student.id}-${courseId}`
        setActionState(prev => ({ ...prev, [key]: 'revoking' }))
        await revokeAccess(student.id, courseId)
        await fetchData()
        setActionState(prev => ({ ...prev, [key]: null }))
    }

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
            <main className="flex-1 p-12 max-w-7xl mx-auto">
                <header className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Gestión de Alumnos</h1>
                        <p className="text-slate-500 font-medium mt-1">Otorgá acceso gratuito a los cursos disponibles.</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-sm font-bold text-slate-500">
                        <GraduationCap size={18} className="text-[var(--edu-primary)]" />
                        {loading ? '...' : `${students.length} alumnos registrados`}
                    </div>
                </header>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar alumno por nombre o email..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-medium"
                    />
                </div>

                {/* Students list */}
                {loading ? (
                    <div className="flex items-center justify-center py-24 text-slate-400">
                        <Loader2 className="animate-spin mr-3" size={24} /> Cargando alumnos...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-xl shadow-slate-200/50">
                        <Users size={48} className="mx-auto mb-4 text-slate-200" />
                        <h2 className="text-xl font-black text-slate-900 mb-2">No se encontraron alumnos</h2>
                        <p className="text-slate-400 font-medium">Probá buscando con otro término.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map(student => {
                            const isOpen = expanded === student.id
                            const enrolledCount = student.enrollments.length
                            return (
                                <div
                                    key={student.id}
                                    className="bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden transition-all"
                                >
                                    {/* Student row */}
                                    <button
                                        onClick={() => setExpanded(isOpen ? null : student.id)}
                                        className="w-full flex items-center gap-4 px-8 py-5 text-left hover:bg-slate-50 transition-colors"
                                    >
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

                                        {/* Badges */}
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                                {enrolledCount} {enrolledCount === 1 ? 'curso' : 'cursos'}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                {new Date(student.createdAt).toLocaleDateString('es-AR')}
                                            </span>
                                            {isOpen
                                                ? <ChevronUp size={16} className="text-slate-400" />
                                                : <ChevronDown size={16} className="text-slate-400" />
                                            }
                                        </div>
                                    </button>

                                    {/* Expanded: course access panel */}
                                    {isOpen && (
                                        <div className="border-t border-slate-100 px-8 py-6">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                                Acceso a cursos — otorgá o revocá acceso gratuito
                                            </p>
                                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                {courses.map(course => {
                                                    const enrolled = isEnrolled(student, course.id)
                                                    const key = `${student.id}-${course.id}`
                                                    const busy = actionState[key]

                                                    return (
                                                        <div
                                                            key={course.id}
                                                            className={`flex items-center justify-between gap-3 p-4 rounded-2xl border transition-all ${enrolled
                                                                ? 'bg-green-50 border-green-200'
                                                                : 'bg-slate-50 border-slate-200'
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <div className={`h-8 w-8 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 ${enrolled ? 'bg-green-500' : 'bg-slate-400'}`}>
                                                                    {course.title[0]}
                                                                </div>
                                                                <div className="min-w-0">
                                                                    <div className="text-xs font-black text-slate-900 truncate">{course.title}</div>
                                                                    <div className="text-[10px] font-bold text-slate-400 uppercase">{course.level}</div>
                                                                </div>
                                                            </div>

                                                            {enrolled ? (
                                                                <button
                                                                    onClick={() => handleRevoke(student, course.id)}
                                                                    disabled={!!busy}
                                                                    title="Revocar acceso"
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black transition-all border border-red-200 flex-shrink-0 disabled:opacity-50"
                                                                >
                                                                    {busy === 'revoking'
                                                                        ? <Loader2 size={12} className="animate-spin" />
                                                                        : <XCircle size={12} />
                                                                    }
                                                                    Revocar
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleGrant(student, course.id)}
                                                                    disabled={!!busy}
                                                                    title="Dar acceso gratuito"
                                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[var(--edu-primary)] text-white hover:opacity-90 text-[10px] font-black transition-all flex-shrink-0 disabled:opacity-50"
                                                                >
                                                                    {busy === 'granting'
                                                                        ? <Loader2 size={12} className="animate-spin" />
                                                                        : <CheckCircle2 size={12} />
                                                                    }
                                                                    Dar acceso
                                                                </button>
                                                            )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                )}
            </main>
        </div>
    )
}
