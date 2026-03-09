import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    PlayCircle,
    FileText,
    ArrowLeft,
    ChevronRight,
    CheckCircle2,
    Download,
    Lock,
    MessageSquare,
    Share2,
    Maximize2,
    Sparkles,
    Clock,
    Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'

export default async function LessonPage({
    params,
}: {
    params: Promise<{ courseId: string; lessonId: string }>
}) {
    const { courseId, lessonId } = await params
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    // Fetch course, units and lessons to build the sidebar and current lesson
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            units: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                        include: {
                            resources: true
                        }
                    }
                }
            }
        }
    })

    if (!course) {
        redirect('/campus/dashboard')
    }

    // Verify user has an enrollment for this course
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
    })

    if (!dbUser) {
        redirect('/campus/dashboard')
    }

    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId: dbUser.id,
            courseId: courseId,
        }
    })

    if (!enrollment) {
        redirect('/campus/dashboard/courses')
    }

    // Find current lesson
    let currentLesson = null
    for (const unit of course.units) {
        const found = unit.lessons.find(l => l.id === lessonId)
        if (found) {
            currentLesson = found
            break
        }
    }

    // If no lessonId provided or not found, default to first lesson of first unit
    if (!currentLesson && course.units[0]?.lessons[0]) {
        currentLesson = course.units[0].lessons[0]
    }

    if (!currentLesson) {
        return <div>No hay clases disponibles en este curso.</div>
    }

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row">
            {/* Lesson Sidebar - Content Index */}
            <aside className="w-full lg:w-[400px] border-r border-slate-100 bg-slate-50/50 order-2 lg:order-1 flex flex-col h-auto lg:h-screen lg:sticky lg:top-0">
                <div className="p-6 border-b border-slate-100 bg-white">
                    <Link href="/campus/dashboard/courses" className="flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[var(--edu-primary)] uppercase tracking-widest mb-4 transition-colors">
                        <ArrowLeft size={14} /> Volver a mis cursos
                    </Link>
                    <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
                        {course.title}
                    </h2>
                    <div className="mt-2 flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-[var(--edu-primary)] w-[45%]" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase">45% COMPLETADO</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                    {course.units.map((unit, unitIdx) => (
                        <div key={unit.id} className="space-y-3">
                            <h3 className="px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                Unidad {unit.order}: {unit.title}
                            </h3>
                            <div className="space-y-1">
                                {unit.lessons.map((lesson) => {
                                    const isActive = lesson.id === currentLesson.id
                                    const isCompleted = false // Add logic later

                                    return (
                                        <Link
                                            key={lesson.id}
                                            href={`/campus/dashboard/courses/${courseId}/lessons/${lesson.id}`}
                                            className={`group flex items-center gap-3 p-3 rounded-2xl transition-all ${isActive
                                                ? 'bg-white shadow-xl shadow-slate-200/50 border border-slate-100'
                                                : 'hover:bg-white/60'
                                                }`}
                                        >
                                            <div className={`h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${isActive
                                                ? 'bg-[var(--edu-primary)] text-white'
                                                : isCompleted ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'
                                                }`}>
                                                {isCompleted ? <CheckCircle2 size={16} /> : <PlayCircle size={16} />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-xs font-black truncate ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {lesson.title}
                                                </p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    {lesson.duration || '10:00'}
                                                </p>
                                            </div>
                                            {isActive && (
                                                <div className="h-1.5 w-1.5 rounded-full bg-[var(--edu-primary)] animate-pulse" />
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content - Video Player & Info */}
            <main className="flex-1 order-1 lg:order-2">
                {/* Video Container */}
                <div className="w-full aspect-video bg-slate-900 overflow-hidden relative group">
                    {/* Placeholder for Video Player */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center space-y-6 max-w-sm px-6">
                            <div className="h-20 w-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center mx-auto border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                <PlayCircle size={40} className="text-white fill-white/20" />
                            </div>
                            <p className="text-white/60 text-sm font-medium italic">Mastering the Phoenix Method: {currentLesson.title}</p>
                        </div>
                    </div>

                    {/* Video Overlays */}
                    <div className="absolute top-6 right-6 flex items-center gap-2">
                        <button className="h-10 w-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-black/60 transition-colors">
                            <Maximize2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Lesson Info */}
                <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-12">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-[var(--edu-primary)] text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                <Sparkles size={12} /> Clase Actual
                            </div>
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
                                {currentLesson.title}
                            </h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <Clock size={16} /> {currentLesson.duration || '10:00'}
                                </div>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <MessageSquare size={16} /> 24 Comentarios
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="rounded-2xl h-12 px-6 gap-2 border-slate-200">
                                <Share2 size={18} /> Compartir
                            </Button>
                            <Button className="rounded-2xl h-12 px-8 font-black shadow-xl shadow-[var(--edu-primary)]/20">
                                Marcar como completada
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {/* Description */}
                        <div className="md:col-span-2 space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">Acerca de esta lección</h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {currentLesson.description || "En esta clase profundizaremos en los conceptos clave del Método Fénix. Aprenderás técnicas avanzadas de pronunciación y cómo estructurar tus pensamientos directamente en inglés sin traducir mentalmente."}
                                </p>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    Asegúrate de tener tu cuaderno Wonderland a mano y descargar la guía de ejercicios que se encuentra en la sección de recursos.
                                </p>
                            </div>

                            {/* Comments Placeholder */}
                            <div className="pt-12 border-t border-slate-100">
                                <h3 className="text-lg font-black text-slate-900 mb-8">Discusión de la clase (24)</h3>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/60 text-center">
                                    <p className="text-slate-500 font-bold mb-4">¿Tienes alguna duda sobre la clase?</p>
                                    <Button variant="outline" className="bg-white rounded-xl font-black">Escribir un comentario</Button>
                                </div>
                            </div>
                        </div>

                        {/* Resources Sidebar */}
                        <div className="space-y-8">
                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                                <div className="absolute -top-10 -right-10 opacity-10">
                                    <Download size={140} />
                                </div>
                                <h3 className="text-lg font-black mb-6 relative z-10">Recursos descargables</h3>
                                <div className="space-y-3 relative z-10">
                                    {currentLesson.resources?.length > 0 ? (
                                        currentLesson.resources.map((res, i) => (
                                            <a
                                                key={i}
                                                href={res.url}
                                                className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10 group"
                                            >
                                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[11px] font-black uppercase tracking-widest truncate">{res.title}</p>
                                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{res.type}</p>
                                                </div>
                                                <Download size={16} className="text-white/40 group-hover:text-white transition-colors" />
                                            </a>
                                        ))
                                    ) : (
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/10">
                                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                                    <FileText size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest">Guía de Pronunciación.pdf</p>
                                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">PDF • 2.4 MB</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/10 border border-white/10">
                                                <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                                                    <Layers size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-[11px] font-black uppercase tracking-widest">Ejercicios de Práctica.zip</p>
                                                    <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">ZIP • 15 MB</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Next Lesson Preview */}
                            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Siguiente Clase</p>
                                <h4 className="text-base font-black text-slate-900 mb-6">Unidad 5: Los verbos frasales que necesitas para hablar como un nativo.</h4>
                                <Button variant="ghost" className="w-full justify-between px-0 hover:bg-transparent group">
                                    <span className="text-xs font-black text-[var(--edu-primary)] group-hover:translate-x-1 transition-transform">Ver adelanto</span>
                                    <ChevronRight size={18} className="text-[var(--edu-primary)]" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
