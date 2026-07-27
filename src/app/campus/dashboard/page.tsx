import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    BookOpen,
    Trophy,
    Sparkles,
    PlayCircle,
    CheckCircle2,
    Clock,
    ChevronRight,
    ArrowRight,
    Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { PRODUCT_META, getVideos } from '@/lib/content-helpers'

// Force dynamic rendering so Prisma doesn't run at build time
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
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
            enrollments: {
                include: {
                    course: true
                }
            },
            subscriptions: true,
            completions: true,
        }
    })

    // Calculate real stats
    const totalEnrollments = dbUser?.enrollments.length || 0
    const totalCompletions = dbUser?.completions.length || 0

    // Calculate total items across all enrolled courses
    let totalItemsAcrossAll = 0
    const courseProgressMap: Record<string, { total: number; completed: number; percent: number }> = {}

    if (dbUser) {
        for (const enrollment of dbUser.enrollments) {
            const course = enrollment.course
            let totalItems = 0

            if (course.type === 'DIGITAL_PRODUCT' && course.slug) {
                const meta = PRODUCT_META[course.slug]
                if (meta) {
                    const videos = await getVideos(meta.contentFolder)
                    totalItems = videos.length
                }
            } else {
                // Regular course — count lessons
                const lessonCount = await prisma.lesson.count({
                    where: { unit: { courseId: course.id } }
                })
                totalItems = lessonCount
            }

            const completedForCourse = dbUser.completions.filter(c => c.courseId === course.id).length
            const percent = totalItems > 0 ? Math.round((completedForCourse / totalItems) * 100) : 0

            courseProgressMap[course.id] = {
                total: totalItems,
                completed: completedForCourse,
                percent,
            }

            totalItemsAcrossAll += totalItems
        }
    }

    const overallPercent = totalItemsAcrossAll > 0 ? Math.round((totalCompletions / totalItemsAcrossAll) * 100) : 0

    // Find the most recent enrollment to feature
    const latestEnrollment = dbUser?.enrollments[0]
    const latestProgress = latestEnrollment ? courseProgressMap[latestEnrollment.course.id] : null

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        ¡Hola, {dbUser?.name || 'Estudiante'}! 👋
                    </h1>
                    <p className="text-slate-500 font-medium tracking-tight">Es un gran día para subir de nivel tu inglés.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white p-2.5 rounded-[1.25rem] border border-slate-200 flex items-center gap-3 pr-5 shadow-sm">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BC248C] to-[#2D93C7] flex items-center justify-center text-white font-extrabold shadow-lg shadow-magenta-500/20">
                            {dbUser?.name?.[0] || 'U'}
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-xs font-black text-slate-900 leading-none mb-1.5">{dbUser?.name}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Alumno</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <CheckCircle2 size={60} className="text-green-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Lecciones Completadas</div>
                        <div className="text-4xl font-black text-slate-900 italic tracking-tighter">{totalCompletions}<span className="text-xl font-bold not-italic ml-1 text-slate-400">/ {totalItemsAcrossAll}</span></div>
                        {totalCompletions > 0 && (
                            <div className="text-green-500 text-[11px] font-black mt-3 flex items-center gap-1.5 bg-green-50 w-fit px-2 py-1 rounded-full border border-green-100">
                                <Sparkles size={12} /> {overallPercent}% completado
                            </div>
                        )}
                        {totalCompletions === 0 && (
                            <div className="text-slate-400 text-[11px] font-black mt-4 flex items-center gap-1.5 opacity-60">
                                ¡Completá tu primera lección!
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <BookOpen size={60} className="text-[#2D93C7]" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Cursos Activos</div>
                        <div className="text-4xl font-black text-slate-900 italic tracking-tighter">{totalEnrollments}</div>
                        <div className="text-slate-500 text-[11px] font-black mt-4 flex items-center gap-1.5 opacity-60">
                            {totalEnrollments === 0 ? 'Explorá el catálogo' : `${totalEnrollments} curso${totalEnrollments > 1 ? 's' : ''} comprado${totalEnrollments > 1 ? 's' : ''}`}
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                        <Trophy size={60} className="text-amber-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-3">Progreso General</div>
                        <div className="text-4xl font-black text-slate-900 italic tracking-tighter">{overallPercent}<span className="text-xl font-bold not-italic ml-1 text-slate-400">%</span></div>
                        {overallPercent >= 100 ? (
                            <div className="text-amber-600 text-[11px] font-black mt-4 flex items-center gap-1.5 bg-amber-50 w-fit px-2.5 py-1 rounded-full border border-amber-100">
                                🎉 ¡Todo completado!
                            </div>
                        ) : overallPercent > 0 ? (
                            <div className="text-amber-600 text-[11px] font-black mt-4 flex items-center gap-1.5 bg-amber-50 w-fit px-2.5 py-1 rounded-full border border-amber-100">
                                ¡Seguí así!
                            </div>
                        ) : (
                            <div className="text-slate-400 text-[11px] font-black mt-4 flex items-center gap-1.5 opacity-60">
                                Empezá a completar lecciones
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Sections */}
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Current Course / Enrolled Courses */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <PlayCircle className="text-[var(--edu-primary)]" size={24} /> {totalEnrollments > 0 ? 'Continuar aprendiendo' : 'Empezá a aprender'}
                        </h2>
                        <Link href="/campus/dashboard/courses" className="text-[10px] font-black text-[var(--edu-primary)] hover:underline uppercase tracking-widest bg-[var(--edu-primary)]/10 px-3 py-1.5 rounded-full transition-colors">
                            Ver mis cursos
                        </Link>
                    </div>

                    {latestEnrollment ? (
                        <Link href={`/campus/dashboard/courses/${latestEnrollment.course.id}`}>
                            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden group shadow-2xl shadow-[var(--edu-primary)]/10 cursor-pointer hover:shadow-[var(--edu-primary)]/20 transition-shadow">
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

                                <div className="relative z-10 space-y-6 max-w-md">
                                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/20">
                                        En curso: {latestEnrollment.course.title}
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tighter">
                                        {latestEnrollment.course.title}
                                    </h3>
                                    {latestProgress && (
                                        <div className="space-y-3">
                                            <div className="flex justify-between text-[11px] font-black uppercase tracking-widest mb-1 text-slate-300">
                                                <span>Tu progreso</span>
                                                <span className="text-white">{latestProgress.percent}%</span>
                                            </div>
                                            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden border border-white/5">
                                                <div className="h-full bg-[var(--edu-primary)] shadow-[0_0_15px_rgba(188,36,140,0.5)] transition-all duration-700 rounded-full"
                                                    style={{ width: `${latestProgress.percent}%` }}
                                                />
                                            </div>
                                            <p className="text-white/60 text-xs font-medium">
                                                {latestProgress.completed} de {latestProgress.total} lecciones completadas
                                            </p>
                                        </div>
                                    )}
                                    <Button className="rounded-2xl h-16 px-10 font-black text-lg group/btn shadow-xl shadow-[var(--edu-primary)]/20">
                                        Continuar Curso <ArrowRight className="ml-3 group-hover/btn:translate-x-1.5 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ) : (
                        <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
                            <BookOpen size={40} className="mx-auto text-slate-300 mb-4" />
                            <h3 className="text-xl font-black text-slate-900 mb-2">Aún no tenés cursos</h3>
                            <p className="text-slate-500 text-sm font-medium mb-6">Explorá nuestro catálogo de cursos y materiales de estudio.</p>
                            <Link href="/education/store">
                                <Button className="rounded-2xl px-10 h-14 font-black">Explorar Catálogo</Button>
                            </Link>
                        </div>
                    )}

                    {/* Other Courses List */}
                    {dbUser && dbUser.enrollments.length > 1 && (
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            {dbUser.enrollments.slice(1, 3).map((enrollment) => {
                                const progress = courseProgressMap[enrollment.course.id]
                                return (
                                    <Link key={enrollment.id} href={`/campus/dashboard/courses/${enrollment.course.id}`}>
                                        <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all duration-500 group relative cursor-pointer h-full">
                                            <div className="flex items-start justify-between mb-5">
                                                <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[var(--edu-primary)] group-hover:bg-[var(--edu-primary)] group-hover:text-white transition-all duration-500 shadow-sm">
                                                    <BookOpen size={24} />
                                                </div>
                                                {progress && (
                                                    <div className="text-xs font-black text-slate-400">
                                                        {progress.percent}%
                                                    </div>
                                                )}
                                            </div>
                                            <h4 className="text-lg font-black text-slate-900 mb-2 truncate group-hover:text-[var(--edu-primary)] transition-colors">{enrollment.course.title}</h4>
                                            <p className="text-slate-500 text-xs mb-4 line-clamp-2 leading-relaxed font-medium">{enrollment.course.description}</p>
                                            {progress && (
                                                <div className="space-y-2 mb-4">
                                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-[var(--edu-primary)] rounded-full transition-all duration-700" style={{ width: `${progress.percent}%` }} />
                                                    </div>
                                                    <p className="text-[10px] font-bold text-slate-400">{progress.completed}/{progress.total} completadas</p>
                                                </div>
                                            )}
                                            <Button variant="outline" className="w-full rounded-2xl font-black h-14 text-slate-600 hover:text-[var(--edu-primary)] hover:border-[var(--edu-primary)]/50 transition-all border-2">
                                                Ir al curso
                                            </Button>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Live Classes Card */}
                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                        <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                                <Video size={18} />
                            </div>
                            Próximas Clases
                        </h3>
                        <div className="space-y-8">
                            {[
                                { time: 'Hoy, 19:00', title: 'Coffee & Conversation', type: 'Grupal', color: 'bg-indigo-500' },
                                { time: 'Mañana, 18:00', title: 'Business English Basics', type: 'Workshop', color: 'bg-emerald-500' },
                            ].map((cls, i) => (
                                <div key={i} className="flex gap-5 group cursor-pointer">
                                    <div className="flex-shrink-0 w-14 h-16 bg-slate-50 rounded-[1.25rem] flex flex-col items-center justify-center border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500 shadow-sm">
                                        <div className="text-[10px] uppercase font-black opacity-40 group-hover:opacity-60 mb-0.5">MAR</div>
                                        <div className="text-xl font-black tracking-tighter">{4 + i}</div>
                                    </div>
                                    <div className="flex-grow py-1">
                                        <div className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1.5">{cls.time}</div>
                                        <div className="text-sm font-black text-slate-900 group-hover:text-[var(--edu-primary)] transition-colors line-clamp-1">{cls.title}</div>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <div className={`h-1.5 w-1.5 rounded-full ${cls.color}`} />
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{cls.type}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-10 h-14 rounded-2xl text-xs font-black text-slate-400 hover:text-[var(--edu-primary)] hover:bg-slate-50 transition-all border border-dashed border-slate-200">
                            Ver calendario completo <ChevronRight size={14} className="ml-1" />
                        </Button>
                    </div>

                    {/* Progress Overview Card */}
                    <div className="bg-gradient-to-br from-[#BC248C] to-[#2D93C7] p-9 rounded-[3rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-500/10">
                        <div className="absolute -top-10 -right-10 p-4 opacity-10">
                            <Sparkles size={180} />
                        </div>
                        <div className="relative z-10 space-y-6">
                            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/20 shadow-xl">
                                <CheckCircle2 size={24} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black leading-tight tracking-tighter">Tu Progreso <br />General</h3>
                                <div className="space-y-2 pt-2">
                                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${overallPercent}%` }} />
                                    </div>
                                    <p className="text-white/80 text-[11px] font-bold leading-relaxed uppercase tracking-wider">
                                        {totalCompletions} de {totalItemsAcrossAll} lecciones completadas ({overallPercent}%)
                                    </p>
                                </div>
                            </div>
                            <Link href="/campus/dashboard/courses" className="inline-block text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 px-6 py-3 rounded-xl hover:scale-105 transition-transform shadow-lg">
                                Ver mis cursos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
