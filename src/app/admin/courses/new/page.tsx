'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    ArrowLeft,
    Sparkles,
    BookOpen,
    DollarSign,
    BarChart,
    Save,
    CheckCircle2,
    Settings,
    Plus,
    Image as ImageIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createCourse } from '../../actions'
import { useRouter } from 'next/navigation'

export default function NewCoursePage() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setIsSubmitting(true)
        try {
            await createCourse(formData)
            router.push('/admin/courses')
            router.refresh()
        } catch (error) {
            console.error(error)
            alert('Error al crear el curso')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Top Bar */}
            <header className="bg-white border-b border-slate-100 p-6 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/courses" className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-xl font-black text-slate-900 tracking-tight">Crear Nuevo Curso</h1>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-slate-300" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrador</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" className="rounded-xl font-black text-slate-400 h-12 px-6">Cancelar</Button>
                        <Button
                            form="course-form"
                            disabled={isSubmitting}
                            className="rounded-xl h-12 px-8 font-black flex items-center gap-2 shadow-xl shadow-[var(--edu-primary)]/20"
                        >
                            {isSubmitting ? 'Guardando...' : <><Save size={18} /> Publicar Curso</>}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 p-8 md:p-12">
                <form id="course-form" action={handleSubmit} className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                    {/* Left Column: Main Info */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Section 1: General Info */}
                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <BookOpen size={18} />
                                </div>
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Información General</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Título del curso</label>
                                    <input
                                        name="title"
                                        type="text"
                                        required
                                        placeholder="Ej: Masterclass de Pronunciación"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-bold text-slate-700 placeholder:opacity-50"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Descripción detallada</label>
                                    <textarea
                                        name="description"
                                        required
                                        rows={5}
                                        placeholder="Escribe qué aprenderán los alumnos en este curso..."
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-medium text-slate-600 placeholder:opacity-50 resize-none"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Units/Curriculum Placeholder */}
                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <Sparkles size={18} />
                                    </div>
                                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Plan de Estudios</h2>
                                </div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">Pronto: Editor Visual</span>
                            </div>

                            <div className="p-10 border-2 border-dashed border-slate-100 rounded-3xl text-center space-y-4">
                                <p className="text-slate-400 text-sm font-medium">Podrás agregar unidades y lecciones una vez <br />que el curso sea creado inicialmente.</p>
                                <div className="flex items-center justify-center gap-6">
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Unidades</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lecciones</span>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-30">
                                        <div className="h-2 w-2 rounded-full bg-slate-300" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Materiales</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Settings */}
                    <div className="space-y-8">
                        {/* Section: Pricing & Levels */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                                    <Settings size={18} />
                                </div>
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Ajustes</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Precio (USD)</label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            name="price"
                                            type="number"
                                            required
                                            step="0.01"
                                            placeholder="29.99"
                                            className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-bold text-slate-700"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Nivel del curso</label>
                                    <select
                                        name="level"
                                        required
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)] transition-all font-bold text-slate-700 appearance-none"
                                    >
                                        <option value="Principiante (A1-A2)">Principiante (A1-A2)</option>
                                        <option value="Intermedio (B1-B2)">Intermedio (B1-B2)</option>
                                        <option value="Avanzado (C1-C2)">Avanzado (C1-C2)</option>
                                        <option value="Todos los niveles">Todos los niveles</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Section: Thumbnail Placeholder */}
                        <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                                    <ImageIcon size={18} />
                                </div>
                                <h2 className="text-lg font-black text-slate-900 uppercase tracking-tighter">Miniatura</h2>
                            </div>
                            <div className="aspect-video bg-slate-50 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-center p-6 space-y-2 cursor-pointer hover:bg-slate-100 transition-colors group">
                                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-slate-300 group-hover:text-[var(--edu-primary)] shadow-sm transition-colors">
                                    <Plus size={20} />
                                </div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subir Imagen</p>
                                <p className="text-[9px] text-slate-300 font-bold uppercase tracking-widest leading-tight">Recomendado: 1280x720px</p>
                            </div>
                        </section>
                    </div>
                </form>
            </main>
        </div>
    )
}
