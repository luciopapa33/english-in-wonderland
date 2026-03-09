import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    BookOpen,
    Search,
    Filter,
    MoreVertical,
    Play,
    Clock,
    Layers,
    Trophy,
    CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { PRODUCT_META, getVideos } from '@/lib/content-helpers'

export default async function CoursesPage() {
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
            completions: true,
        }
    })

    // Calculate progress per course
    const courseProgressMap: Record<string, { total: number; completed: number; percent: number }> = {}

    if (dbUser) {
        for (const enrollment of dbUser.enrollments) {
            const course = enrollment.course
            let totalItems = 0

            if (course.type === 'DIGITAL_PRODUCT' && course.slug) {
                const meta = PRODUCT_META[course.slug]
                if (meta) {
                    const videos = getVideos(meta.contentFolder)
                    totalItems = videos.length
                }
            } else {
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
        }
    }

    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mis Cursos</h1>
                    <p className="text-slate-500 font-medium">Gestiona tu progreso y continúa tus lecciones.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar curso..."
                            className="pl-12 pr-4 py-3 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all w-full md:w-64"
                        />
                    </div>
                    <Button variant="outline" className="rounded-2xl h-12 w-12 p-0 border-slate-200">
                        <Filter size={18} />
                    </Button>
                </div>
            </div>

            {/* Course Grid */}
            {dbUser?.enrollments.length === 0 ? (
                <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
                    <div className="h-20 w-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <BookOpen size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Aún no tienes cursos inscritos</h2>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">
                        Explorá nuestro catálogo de cursos y materiales de estudio para comenzar.
                    </p>
                    <Link href="/education/store">
                        <Button className="rounded-2xl px-10 h-14 font-black">Explorar Catálogo</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {dbUser?.enrollments.map((enrollment) => {
                        const progress = courseProgressMap[enrollment.course.id]
                        const isCompleted = progress && progress.percent >= 100
                        const gradients = [
                            'bg-gradient-to-br from-[#BC248C] to-[#D66FA3]',
                            'bg-gradient-to-br from-[#2D93C7] to-[#1DA1D2]',
                            'bg-gradient-to-br from-[#BC248C] to-[#2D93C7]',
                        ]
                        // Pick gradient based on course title hash
                        const gradientIndex = enrollment.course.title.length % 3

                        return (
                            <div key={enrollment.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col overflow-hidden group hover:shadow-2xl transition-all duration-500">
                                {/* Course Image Placement */}
                                <div className="h-48 bg-slate-100 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                    <div
                                        className={`w-full h-full ${gradients[gradientIndex]} group-hover:scale-110 transition-transform duration-700 flex items-center justify-center`}
                                    >
                                        <BookOpen size={48} className="text-white/30" />
                                    </div>
                                    <div className="absolute top-4 left-4 z-20">
                                        <span className="px-3 py-1 rounded-lg bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                                            {enrollment.course.level}
                                        </span>
                                    </div>
                                    {isCompleted && (
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="px-3 py-1 rounded-lg bg-green-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-green-400/30 flex items-center gap-1">
                                                <CheckCircle2 size={12} /> Completado
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-[var(--edu-primary)] transition-colors">
                                            {enrollment.course.title}
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 mb-6">
                                        {progress && (
                                            <>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                    <Layers size={14} /> {progress.total} Lecciones
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                    <Trophy size={14} /> {progress.completed} completadas
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="mt-auto space-y-5">
                                        {progress && (
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    <span>Tu progreso</span>
                                                    <span className="text-slate-900">{progress.percent}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-green-500' : 'bg-[var(--edu-primary)]'}`}
                                                        style={{ width: `${progress.percent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <Link href={`/campus/dashboard/courses/${enrollment.course.id}`} className="block">
                                            <Button className="w-full rounded-2xl h-14 font-black flex items-center justify-center gap-2 group/btn shadow-[var(--edu-primary)]/10">
                                                <Play size={18} className="fill-current" /> {isCompleted ? 'Revisar' : 'Continuar'}
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
