'use client'

import { useState, useEffect, useCallback } from 'react'
import {
    Users,
    X,
    CheckCircle2,
    XCircle,
    Loader2,
    Search,
    ChevronDown,
    ChevronUp,
    Mail,
    ShieldCheck,
    BookOpen
} from 'lucide-react'
import { grantCourseAccess, revokeAccess } from '@/app/admin/actions'

type Course = { id: string; title: string; level: string; type: string }
type Enrollment = { courseId: string; course: Course }
type Student = {
    id: string
    name: string | null
    email: string
    createdAt: string
    enrollments: Enrollment[]
}

export default function AdminAccessPanel() {
    const [open, setOpen] = useState(false)
    const [students, setStudents] = useState<Student[]>([])
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [expanded, setExpanded] = useState<string | null>(null)
    const [busy, setBusy] = useState<Record<string, 'granting' | 'revoking'>>({})

    const fetchData = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/students-data', { cache: 'no-store' })
            if (res.ok) {
                const json = await res.json()
                setStudents(json.students)
                setCourses(json.courses)
            }
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (open) fetchData()
    }, [open, fetchData])

    const isEnrolled = (student: Student, courseId: string) =>
        student.enrollments.some(e => e.courseId === courseId)

    const handleGrant = async (student: Student, courseId: string) => {
        const key = `${student.id}-${courseId}`
        setBusy(prev => ({ ...prev, [key]: 'granting' }))
        try {
            await grantCourseAccess(student.id, courseId)
            // Optimistic update
            setStudents(prev => prev.map(s =>
                s.id === student.id
                    ? { ...s, enrollments: [...s.enrollments, { courseId, course: courses.find(c => c.id === courseId)! }] }
                    : s
            ))
        } finally {
            setBusy(prev => { const n = { ...prev }; delete n[key]; return n })
        }
    }

    const handleRevoke = async (student: Student, courseId: string) => {
        const key = `${student.id}-${courseId}`
        setBusy(prev => ({ ...prev, [key]: 'revoking' }))
        try {
            await revokeAccess(student.id, courseId)
            setStudents(prev => prev.map(s =>
                s.id === student.id
                    ? { ...s, enrollments: s.enrollments.filter(e => e.courseId !== courseId) }
                    : s
            ))
        } finally {
            setBusy(prev => { const n = { ...prev }; delete n[key]; return n })
        }
    }

    const filtered = students.filter(s =>
        !search ||
        s.name?.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <>
            {/* Trigger button */}
            <button
                id="admin-access-panel-btn"
                onClick={() => setOpen(true)}
                className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-[var(--edu-primary)] transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-[var(--edu-primary)]/30"
            >
                <ShieldCheck size={16} />
                Gestionar Accesos
            </button>

            {/* Modal overlay */}
            {open && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setOpen(false)}
                    />

                    {/* Modal panel */}
                    <div className="relative z-10 bg-white rounded-[2.5rem] shadow-2xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                                    <Users size={20} className="text-[var(--edu-primary)]" />
                                    Gestionar Accesos a Cursos
                                </h2>
                                <p className="text-xs font-bold text-slate-400 mt-1">
                                    {loading ? 'Cargando...' : `${students.length} alumnos · ${courses.length} cursos disponibles`}
                                </p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                                className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-all"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-8 py-4 border-b border-slate-100">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar alumno por nombre o email..."
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] font-medium transition-all"
                                />
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                            {loading ? (
                                <div className="flex items-center justify-center py-16 text-slate-400">
                                    <Loader2 className="animate-spin mr-2" size={20} /> Cargando alumnos...
                                </div>
                            ) : filtered.length === 0 ? (
                                <div className="text-center py-16 text-slate-400">
                                    <Users size={40} className="mx-auto mb-3 opacity-30" />
                                    <p className="font-bold text-sm">No se encontraron alumnos</p>
                                </div>
                            ) : (
                                filtered.map(student => {
                                    const isOpen = expanded === student.id
                                    const enrolledCount = student.enrollments.length

                                    return (
                                        <div key={student.id} className="rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                                            {/* Student row */}
                                            <button
                                                onClick={() => setExpanded(isOpen ? null : student.id)}
                                                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition-colors"
                                            >
                                                {/* Avatar */}
                                                <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                                                    {(student.name?.[0] || student.email[0]).toUpperCase()}
                                                </div>

                                                {/* Info */}
                                                <div className="flex-1 min-w-0 text-left">
                                                    <div className="font-black text-slate-900 text-sm truncate">
                                                        {student.name || 'Sin nombre'}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 mt-0.5">
                                                        <Mail size={11} /> {student.email}
                                                    </div>
                                                </div>

                                                {/* Badge + toggle */}
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${enrolledCount > 0 ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                                        {enrolledCount} {enrolledCount === 1 ? 'curso' : 'cursos'}
                                                    </span>
                                                    {isOpen
                                                        ? <ChevronUp size={14} className="text-slate-400" />
                                                        : <ChevronDown size={14} className="text-slate-400" />
                                                    }
                                                </div>
                                            </button>

                                            {/* Expanded course list */}
                                            {isOpen && (
                                                <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                                                        Cursos disponibles — hacé clic para dar o quitar acceso
                                                    </p>
                                                    <div className="grid sm:grid-cols-2 gap-2">
                                                        {courses.map(course => {
                                                            const enrolled = isEnrolled(student, course.id)
                                                            const key = `${student.id}-${course.id}`
                                                            const isBusy = !!busy[key]

                                                            return (
                                                                <div
                                                                    key={course.id}
                                                                    className={`flex items-center justify-between gap-2 p-3 rounded-xl border transition-all ${enrolled ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
                                                                >
                                                                    {/* Course info */}
                                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 ${enrolled ? 'bg-green-500' : 'bg-slate-400'}`}>
                                                                            <BookOpen size={14} />
                                                                        </div>
                                                                        <div className="min-w-0">
                                                                            <div className="text-xs font-black text-slate-900 truncate leading-tight">{course.title}</div>
                                                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{course.level}</div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Action button */}
                                                                    {enrolled ? (
                                                                        <button
                                                                            onClick={() => handleRevoke(student, course.id)}
                                                                            disabled={isBusy}
                                                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black transition-all border border-red-200 flex-shrink-0 disabled:opacity-50"
                                                                        >
                                                                            {isBusy ? <Loader2 size={11} className="animate-spin" /> : <XCircle size={11} />}
                                                                            Quitar
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            onClick={() => handleGrant(student, course.id)}
                                                                            disabled={isBusy}
                                                                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--edu-primary)] text-white hover:opacity-90 text-[10px] font-black transition-all flex-shrink-0 disabled:opacity-50 shadow-md shadow-[var(--edu-primary)]/30"
                                                                        >
                                                                            {isBusy ? <Loader2 size={11} className="animate-spin" /> : <CheckCircle2 size={11} />}
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
                                })
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
