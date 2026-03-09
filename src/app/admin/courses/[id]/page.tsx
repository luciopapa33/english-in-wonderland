import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    Plus,
    Trash2,
    PlayCircle,
    FileText,
    ChevronRight,
    Layers,
    Settings,
    Edit3,
    Video
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { addUnit, addLesson } from '../../actions'

export default async function CourseEditorPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/campus')
    }

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            units: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' }
                    }
                }
            }
        }
    })

    if (!course) {
        redirect('/admin/courses')
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-slate-100 p-6 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/courses" className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">{course.title}</h1>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.level}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="rounded-xl h-11 border-slate-200 font-black text-xs gap-2">
                            <Settings size={16} /> Ajustes del Curso
                        </Button>
                        <Button className="rounded-xl h-11 px-6 font-black text-xs shadow-xl shadow-[var(--edu-primary)]/10">
                            Guardar Cambios
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 md:p-12 max-w-6xl mx-auto w-full grid lg:grid-cols-3 gap-12">
                {/* Content Structure (Curriculum) */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <Layers className="text-[var(--edu-primary)]" size={24} /> Plan de Estudios
                        </h2>

                        <form action={async (formData) => {
                            'use server'
                            await addUnit(id, 'Nueva Unidad', (course.units.length + 1))
                        }}>
                            <Button type="submit" variant="outline" className="rounded-xl h-10 border-slate-200 font-black text-xs gap-2 hover:bg-slate-900 hover:text-white transition-all">
                                <Plus size={16} /> Agregar Unidad
                            </Button>
                        </form>
                    </div>

                    <div className="space-y-6">
                        {course.units.length === 0 ? (
                            <div className="bg-white rounded-[2.5rem] p-16 text-center border-2 border-dashed border-slate-100">
                                <p className="text-slate-400 font-bold">Comienza agregando tu primera unidad para organizar las lecciones.</p>
                            </div>
                        ) : (
                            course.units.map((unit, unitIdx) => (
                                <div key={unit.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
                                    <div className="bg-slate-50/50 p-6 flex items-center justify-between border-b border-slate-100">
                                        <div className="flex items-center gap-4">
                                            <div className="h-8 w-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-[10px] font-black italic">
                                                U{unit.order}
                                            </div>
                                            <h3 className="font-black text-slate-900 uppercase tracking-tight">{unit.title}</h3>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="h-8 w-8 rounded-lg text-slate-300 hover:text-slate-900 transition-colors">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-2">
                                        {unit.lessons.map((lesson) => (
                                            <div key={lesson.id} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors group/lesson border border-transparent hover:border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-9 w-9 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                                                        <PlayCircle size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900">{lesson.title}</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{lesson.duration || '00:00'}</span>
                                                            <span className="h-1 w-1 rounded-full bg-slate-200" />
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{lesson.isFree ? 'Gratuita' : 'Premium'}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                                                    <button className="h-8 w-8 rounded-lg text-slate-300 hover:text-slate-900">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button className="h-8 w-8 rounded-lg text-slate-300 hover:text-red-500">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}

                                        <form action={async (formData) => {
                                            'use server'
                                            await addLesson(unit.id, {
                                                title: 'Nueva Lección',
                                                order: (unit.lessons.length + 1),
                                                isFree: false
                                            })
                                        }} className="p-2">
                                            <button type="submit" className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-50 text-[10px] font-black text-slate-300 uppercase tracking-widest hover:border-indigo-100 hover:text-indigo-400 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2">
                                                <Plus size={14} /> Agregar Lección
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Info & Stats sidebar */}
                <div className="space-y-8">
                    <section className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <Video size={140} />
                        </div>
                        <h3 className="text-lg font-black mb-6 relative z-10">Estado del Curso</h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                                <span>Visibilidad</span>
                                <span className="px-3 py-1 bg-white/10 rounded-full text-white">Borrador</span>
                            </div>
                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400">Total Lecciones</span>
                                    <span className="text-xl font-black italic">--</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-400">Duración Est.</span>
                                    <span className="text-xl font-black italic">--h</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
                        <h3 className="text-lg font-black text-slate-900 tracking-tight">Acciones Rápidas</h3>
                        <div className="space-y-3">
                            <Button variant="outline" className="w-full h-12 rounded-xl text-xs font-black border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 group">
                                Previsualizar curso <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                            <Button variant="outline" className="w-full h-12 rounded-xl text-xs font-black border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600 group">
                                Duplicar estructura <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    )
}
