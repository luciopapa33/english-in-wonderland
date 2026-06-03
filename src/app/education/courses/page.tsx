import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Clock, Check, Star, Sparkles, ArrowRight, BookOpen, Plane, Home, Mic, Headphones, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { CheckoutButton } from '@/components/checkout-button';

// Force dynamic rendering so Prisma doesn't run at build time
export const dynamic = 'force-dynamic';

const staticCourses = [
    {
        id: 'general',
        title: "CURSOS GENERALES",
        description: "Nuestros cursos generales están diseñados para adultos que buscan aprender inglés de manera integral, desde nivel principiante (A1) hasta avanzado (C2). Trabajamos todas las habilidades del idioma (speaking, listening, reading y writing) con un enfoque práctico y comunicativo, adaptándonos a tus necesidades y ritmo de aprendizaje.",
        icon: BookOpen,
        color: "from-[#BC248C] to-[#D66FA3]",
        borderColor: "border-[#BC248C]/20 hover:border-[#BC248C]/50"
    },
    {
        id: 'travelers',
        title: "ENGLISH FOR TRAVELERS",
        description: "Un curso práctico y dinámico diseñado para que te comuniques con confianza en tus viajes. Aprendé inglés enfocado en situaciones reales como pedir comida, registrarte en un hotel, pedir indicaciones o resolver imprevistos. Con un enfoque 100% comunicativo, te ayudamos a superar el miedo a hablar y a desenvolverte en inglés de manera fluida y natural.",
        icon: Plane,
        color: "from-[#2D93C7] to-[#1DA1D2]",
        borderColor: "border-[#2D93C7]/20 hover:border-[#2D93C7]/50"
    },
    {
        id: 'living-abroad',
        title: "LIVING ABROAD",
        description: "Este curso está diseñado para personas que planean establecerse en un país de habla inglesa. Desarrollarás las habilidades necesarias para desenvolverte con confianza en situaciones cotidianas como encontrar alojamiento, gestionar trámites bancarios, asistir a consultas médicas y construir relaciones sociales.",
        icon: Home,
        color: "from-[#BC248C] to-[#2D93C7]",
        borderColor: "border-[#BC248C]/20 hover:border-[#BC248C]/50"
    },
    {
        id: 'speaking',
        title: "TALLER DE SPEAKING",
        description: "Un curso intensivo diseñado para mejorar tu fluidez y confianza al hablar en inglés. Practicarás diversos tópicos de manera integral, abarcando desde conversaciones cotidianas hasta temas más complejos. Desarrollarás estrategias para expresarte con naturalidad, ampliar tu vocabulario y perfeccionar tu pronunciación. Ideal para quienes buscan ganar seguridad y desenvolverse con facilidad en cualquier situación.",
        icon: Mic,
        color: "from-[#D66FA3] to-[#BC248C]",
        borderColor: "border-[#D66FA3]/20 hover:border-[#D66FA3]/50"
    },
    {
        id: 'listening',
        title: "TALLER DE LISTENING",
        description: "Un curso práctico diseñado para mejorar tu comprensión auditiva en inglés. Aprendé a entender diferentes acentos, ritmos y contextos a través de actividades dinámicas con audios reales y situaciones cotidianas. Desarrollarás estrategias para captar ideas clave, ampliar tu vocabulario y responder con mayor seguridad. Ideal para quienes buscan entrenar su oído y entender el inglés de manera más natural.",
        icon: Headphones,
        color: "from-[#1DA1D2] to-[#2D93C7]",
        borderColor: "border-[#1DA1D2]/20 hover:border-[#1DA1D2]/50"
    },
    {
        id: 'reading',
        title: "TALLER DE READING",
        description: "Un curso enfocado en mejorar tus habilidades de lectura en inglés. A través de actividades como análisis de textos, identificación de ideas principales, ampliación de vocabulario y comprensión de estructuras gramaticales.\nTrabajaremos con materiales variados como artículos, historias cortas, correos y textos informativos para desarrollar tu capacidad de interpretar y responder en diferentes contextos.",
        icon: FileText,
        color: "from-[#BC248C] to-[#D66FA3]",
        borderColor: "border-[#BC248C]/20 hover:border-[#BC248C]/50"
    }
];

export default async function CoursesPage() {
    const dbCourses = await prisma.course.findMany({
        take: 6,
        orderBy: { title: 'asc' }
    });

    const hasCourses = dbCourses.length > 0;

    return (
        <div className="min-h-screen bg-neutral-50/50 pb-20">
            {/* Header Section */}
            <section className="relative py-24 overflow-hidden bg-slate-900 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1471&q=80"
                    alt="Students collaborating"
                    fill
                    className="object-cover opacity-10"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
                <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/20 text-[var(--edu-primary)] text-xs font-bold uppercase tracking-widest border border-[var(--edu-primary)]/30">
                        <Sparkles size={14} /> Cursos
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                        Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC248C] to-[#2D93C7]">Cursos</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        ¿NO SABES QUÉ CURSO ELEGIR? Descubrí el que mejor se adapte a tus necesidades.
                    </p>
                </div>
            </section>

            {/* Course Cards */}
            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {staticCourses.map((course) => (
                        <div
                            key={course.id}
                            className={cn(
                                "group relative bg-white rounded-[2.5rem] p-1 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-slate-200/50"
                            )}
                        >
                            <div className="bg-white rounded-[2.3rem] p-8 h-full flex flex-col">
                                <div className="space-y-6 flex-grow">
                                    <div className={cn("h-2 w-20 rounded-full bg-gradient-to-r mb-6", course.color)} />

                                    <div className="space-y-4">
                                        <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center", `bg-gradient-to-br ${course.color} text-white`)}>
                                            <course.icon size={28} />
                                        </div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{course.title}</h2>
                                    </div>

                                    <p className="text-slate-500 text-sm leading-relaxed whitespace-pre-line">{course.description}</p>
                                </div>

                                <div className="pt-8 mt-auto">
                                    <Button asChild variant="outline" className={cn("w-full py-6 rounded-2xl text-sm font-bold group-hover:shadow-xl transition-all border-2", course.borderColor)}>
                                        <Link href="/contacto">
                                            VER MÁS <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DB Courses if available */}
                {hasCourses && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-black text-slate-900 text-center mb-12">Cursos Disponibles para Inscripción</h2>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {dbCourses.map((course, i) => (
                                <div
                                    key={course.id}
                                    className="group relative bg-white rounded-[2.5rem] p-1 shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                >
                                    <div className="bg-white rounded-[2.3rem] p-8 h-full flex flex-col">
                                        <div className="space-y-6 flex-grow">
                                            <div className={cn("h-2 w-20 rounded-full bg-gradient-to-r mb-6", i % 3 === 0 ? "from-[#BC248C] to-[#D66FA3]" : (i % 3 === 1 ? "from-[#BC248C] to-[#2D93C7]" : "from-[#2D93C7] to-[#1DA1D2]"))} />
                                            <div className="space-y-2">
                                                <div className="text-[var(--edu-primary)] font-bold text-xs uppercase tracking-widest">Curso Online</div>
                                                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">{course.title}</h2>
                                            </div>
                                            <p className="text-slate-500 text-sm leading-relaxed">{course.description}</p>
                                        </div>
                                        <div className="pt-10 mt-auto space-y-6">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-4xl font-black text-slate-900">ARS {course.price.toLocaleString()}</span>
                                                <span className="text-slate-400 text-sm">/ total</span>
                                            </div>
                                            <CheckoutButton
                                                courseId={course.id.toString()}
                                                price={course.price}
                                                className="w-full py-7 rounded-2xl text-lg font-bold group-hover:shadow-xl transition-all bg-slate-900"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* CTA Banner */}
                <div className="mt-20 p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-[#BC248C] to-[#2D93C7] text-white text-center relative overflow-hidden group">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }}
                    />
                    <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                        <h3 className="text-3xl md:text-5xl font-black">¿No sabes por dónde empezar?</h3>
                        <p className="text-white/90 text-lg opacity-90">
                            Si deseas aprender el idioma inglés de manera integral, donde puedas poner en práctica lo que estudies en diversas situaciones cotidianas de la vida, el curso INTEGRAL es ideal para ti. Sin embargo, si ya cuentas con una base sólida de inglés y deseas desarrollar habilidades más personalizadas y centralizadas en áreas específicas, te recomendamos el MÉTODO FÉNIX.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Link href="/education/method">
                                <Button variant="glass" size="lg" className="rounded-full group-hover:scale-105 transition-transform px-10">
                                    Conocer el Método Fénix <ArrowRight className="ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
