import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    PlayCircle,
    FileText,
    CheckCircle2,
    Download,
    Lock,
    Video,
    BookOpen,
    Layers,
    Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { PRODUCT_META, getVideos, getPdf } from '@/lib/content-helpers'
import { CompletionButton } from '@/components/completion-button'
import { cn } from '@/lib/utils'

export default async function CampusCoursePage({
    params,
}: {
    params: Promise<{ courseId: string }>
}) {
    const { courseId } = await params
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
    })

    if (!dbUser) {
        redirect('/campus/dashboard')
    }

    // Verify enrollment
    const enrollment = await prisma.enrollment.findFirst({
        where: {
            userId: dbUser.id,
            courseId: courseId,
        }
    })

    if (!enrollment) {
        redirect('/campus/dashboard/courses')
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            units: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' },
                        include: { resources: true }
                    }
                }
            }
        }
    })

    if (!course) {
        redirect('/campus/dashboard/courses')
    }

    // Get user's completions for this course
    const completions = await prisma.lessonCompletion.findMany({
        where: {
            userId: dbUser.id,
            courseId: courseId,
        }
    })
    const completedKeys = new Set(completions.map(c => c.lessonKey))

    // Digital product handling
    if (course.type === 'DIGITAL_PRODUCT' && course.slug) {
        const meta = PRODUCT_META[course.slug]
        if (!meta) {
            redirect('/campus/dashboard/courses')
        }

        const videos = await getVideos(meta.contentFolder)
        const pdfPath = await getPdf(meta.contentFolder)
        const totalVideos = videos.length
        const completedCount = completions.length
        const progressPercent = totalVideos > 0 ? Math.round((completedCount / totalVideos) * 100) : 0

        return (
            <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/campus/dashboard/courses" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[var(--edu-primary)] uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Volver a mis cursos
                    </Link>
                    <div className={cn("rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden bg-gradient-to-br text-white", meta.gradient)}>
                        <Video size={200} className="absolute -right-6 -bottom-6 text-white/10 rotate-12" strokeWidth={1} />
                        <div className="relative z-10 space-y-4 max-w-xl">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-white/80 text-sm leading-relaxed">
                                {course.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4 pt-2">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                    <Video size={16} /> {totalVideos} Videos
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                    <Trophy size={16} /> {completedCount}/{totalVideos} completados
                                </div>
                            </div>
                            {/* Progress bar */}
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                                    <span>Tu progreso</span>
                                    <span className="text-white">{progressPercent}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-700 rounded-full"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Video List */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3 mb-6">
                            <PlayCircle className="text-[var(--edu-primary)]" size={24} /> Contenido del curso
                        </h2>
                        <div className="space-y-3">
                            {videos.map((video) => {
                                const isCompleted = completedKeys.has(String(video.number))
                                return (
                                    <div
                                        key={video.number}
                                        className={cn(
                                            "rounded-2xl border transition-all bg-white",
                                            isCompleted
                                                ? "border-green-200 shadow-sm"
                                                : "border-slate-100 hover:border-slate-200 hover:shadow-lg"
                                        )}
                                    >
                                        <details className="group">
                                            <summary className="flex items-center gap-4 p-5 cursor-pointer list-none select-none">
                                                <CompletionButton
                                                    courseId={courseId}
                                                    lessonKey={String(video.number)}
                                                    isCompleted={isCompleted}
                                                />
                                                <div className={cn(
                                                    "h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0 bg-gradient-to-br",
                                                    isCompleted ? "from-green-400 to-green-500" : meta.gradient
                                                )}>
                                                    {video.number}
                                                </div>
                                                <span className={cn(
                                                    "text-sm font-bold flex-grow",
                                                    isCompleted ? "text-green-700" : "text-slate-700"
                                                )}>
                                                    Lección {video.number}
                                                    {isCompleted && <span className="text-green-500 text-xs ml-2">✓ Completada</span>}
                                                </span>
                                                <PlayCircle size={20} className={cn("shrink-0 group-open:hidden", meta.accent)} />
                                                <span className="text-xs text-slate-400 group-open:hidden">Click para ver</span>
                                            </summary>
                                            <div className="px-5 pb-5">
                                                <video
                                                    controls
                                                    preload="metadata"
                                                    className="w-full rounded-xl bg-black aspect-video"
                                                    controlsList="nodownload"
                                                >
                                                    <source src={video.path} type="video/mp4" />
                                                    Tu navegador no soporta video.
                                                </video>
                                            </div>
                                        </details>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Progress Card */}
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 space-y-6">
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-[var(--edu-primary)]">
                                    <Layers size={20} />
                                </div>
                                Tu Progreso
                            </h3>
                            <div className="text-center py-4">
                                <div className="relative inline-flex items-center justify-center">
                                    <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-100" />
                                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                                            className="text-[var(--edu-primary)]"
                                            strokeDasharray={`${2 * Math.PI * 42}`}
                                            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercent / 100)}`}
                                            strokeLinecap="round"
                                            style={{ transition: 'stroke-dashoffset 1s ease' }}
                                        />
                                    </svg>
                                    <span className="absolute text-2xl font-black text-slate-900">{progressPercent}%</span>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">Videos completados</span>
                                    <span className="font-black text-slate-900">{completedCount}/{totalVideos}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-500 font-medium">Videos restantes</span>
                                    <span className="font-black text-slate-900">{totalVideos - completedCount}</span>
                                </div>
                            </div>
                            {progressPercent === 100 && (
                                <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                                    <Trophy size={32} className="mx-auto text-green-500 mb-2" />
                                    <p className="text-green-700 font-black text-sm">¡Curso completado!</p>
                                    <p className="text-green-600 text-xs font-medium">Felicitaciones 🎉</p>
                                </div>
                            )}
                        </div>

                        {/* PDF Download */}
                        {pdfPath && (
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-slate-900">Booklet de Apoyo</h3>
                                        <p className="text-green-500 text-[10px] font-bold uppercase tracking-widest">PDF incluido</p>
                                    </div>
                                </div>
                                <a href={pdfPath} download>
                                    <Button className="rounded-2xl py-5 px-6 font-bold bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20 w-full">
                                        <Download size={18} className="mr-2" /> Descargar PDF
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Regular course handling (with units and lessons from DB)
    const totalLessons = course.units.reduce((acc, u) => acc + u.lessons.length, 0)
    const completedCount = completions.length
    const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link href="/campus/dashboard/courses" className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-[var(--edu-primary)] uppercase tracking-widest mb-6 transition-colors">
                    <ArrowLeft size={14} /> Volver a mis cursos
                </Link>
                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
                    <BookOpen size={200} className="absolute -right-6 -bottom-6 text-white/5 rotate-12" strokeWidth={1} />
                    <div className="relative z-10 space-y-4 max-w-xl">
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-white/70 text-sm leading-relaxed">
                            {course.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                <Layers size={16} /> {course.units.length} Unidades
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                <BookOpen size={16} /> {totalLessons} Lecciones
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                <Trophy size={16} /> {completedCount}/{totalLessons} completadas
                            </div>
                        </div>
                        {/* Progress bar */}
                        <div className="space-y-2 pt-2">
                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/60">
                                <span>Tu progreso</span>
                                <span className="text-white">{progressPercent}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                <div
                                    className="h-full bg-[var(--edu-primary)] shadow-[0_0_15px_rgba(188,36,140,0.5)] transition-all duration-700 rounded-full"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Units & Lessons */}
                <div className="lg:col-span-2 space-y-8">
                    {course.units.map((unit) => (
                        <div key={unit.id}>
                            <h2 className="text-lg font-black text-slate-900 tracking-tight mb-4 flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)] text-xs font-black">
                                    {unit.order}
                                </div>
                                {unit.title}
                            </h2>
                            <div className="space-y-2">
                                {unit.lessons.map((lesson) => {
                                    const isCompleted = completedKeys.has(lesson.id)
                                    return (
                                        <div
                                            key={lesson.id}
                                            className={cn(
                                                "flex items-center gap-4 p-5 rounded-2xl border transition-all bg-white group",
                                                isCompleted
                                                    ? "border-green-200 shadow-sm"
                                                    : "border-slate-100 hover:border-slate-200 hover:shadow-lg"
                                            )}
                                        >
                                            <CompletionButton
                                                courseId={courseId}
                                                lessonKey={lesson.id}
                                                isCompleted={isCompleted}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className={cn(
                                                    "text-sm font-bold",
                                                    isCompleted ? "text-green-700" : "text-slate-700"
                                                )}>
                                                    {lesson.title}
                                                    {isCompleted && <span className="text-green-500 text-xs ml-2">✓</span>}
                                                </p>
                                                {lesson.description && (
                                                    <p className="text-xs text-slate-400 font-medium mt-1 truncate">{lesson.description}</p>
                                                )}
                                            </div>
                                            {lesson.duration && (
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest shrink-0">{lesson.duration}</span>
                                            )}
                                            <Link href={`/campus/dashboard/courses/${courseId}/lessons/${lesson.id}`}>
                                                <Button variant="ghost" size="sm" className="rounded-xl text-[var(--edu-primary)] hover:bg-[var(--edu-primary)]/10 font-black shrink-0">
                                                    <PlayCircle size={18} className="mr-1" /> Ver
                                                </Button>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}

                    {course.units.length === 0 && (
                        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
                            <BookOpen size={40} className="mx-auto text-slate-300 mb-4" />
                            <h2 className="text-xl font-black text-slate-900 mb-2">Contenido en preparación</h2>
                            <p className="text-slate-500 text-sm font-medium">
                                Las lecciones de este curso estarán disponibles próximamente.
                            </p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 p-8 space-y-6">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-[var(--edu-primary)]">
                                <Layers size={20} />
                            </div>
                            Tu Progreso
                        </h3>
                        <div className="text-center py-4">
                            <div className="relative inline-flex items-center justify-center">
                                <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none" className="text-slate-100" />
                                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="none"
                                        className="text-[var(--edu-primary)]"
                                        strokeDasharray={`${2 * Math.PI * 42}`}
                                        strokeDashoffset={`${2 * Math.PI * 42 * (1 - progressPercent / 100)}`}
                                        strokeLinecap="round"
                                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                                    />
                                </svg>
                                <span className="absolute text-2xl font-black text-slate-900">{progressPercent}%</span>
                            </div>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 font-medium">Lecciones completadas</span>
                                <span className="font-black text-slate-900">{completedCount}/{totalLessons}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 font-medium">Lecciones restantes</span>
                                <span className="font-black text-slate-900">{totalLessons - completedCount}</span>
                            </div>
                        </div>
                        {progressPercent === 100 && (
                            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center">
                                <Trophy size={32} className="mx-auto text-green-500 mb-2" />
                                <p className="text-green-700 font-black text-sm">¡Curso completado!</p>
                                <p className="text-green-600 text-xs font-medium">Felicitaciones 🎉</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
