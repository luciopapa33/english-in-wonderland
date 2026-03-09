import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Users, Award, ShoppingBag, ArrowRight, Sparkles, CheckCircle2, PlayCircle, Clock, Zap, Monitor, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function EducationPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--edu-primary)]/5 -skew-x-12 transform origin-top-right translate-x-20" />
                <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--edu-primary)]/10 text-[var(--edu-primary)] text-xs font-bold uppercase tracking-widest">
                            <Sparkles size={14} /> Nuestros cursos para adultos ahora 100% Online
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.1]">
                            Aprende Inglés{' '}
                            <span className="text-[var(--edu-primary)]">Online</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                            Aprendé Inglés siguiendo la forma natural en la que aprendiste de niño tu lengua materna, ahora 100% Online.
                        </p>
                        <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium uppercase tracking-wide">
                            WONDERLAND, TU LUGAR PARA MARAVILLARTE CON EL INGLÉS
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/education/courses">
                                <Button size="lg" className="rounded-full shadow-2xl shadow-indigo-500/20">
                                    Ver Cursos <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/education/method">
                                <Button variant="outline" size="lg" className="rounded-full">
                                    El Método Fénix
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-[#BC248C] to-[#2D93C7] rounded-[3rem] blur-2xl opacity-20 animate-pulse" />
                        <div className="relative bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
                            <Image
                                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1470&q=80"
                                className="object-cover"
                                alt="Students learning"
                                width={1470}
                                height={1103}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* FLEXIBLE / DINÁMICO / PRÁCTICO Section */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Nuestros servicios</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto">Nuestros cursos para adultos ahora 100% Online</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                title: "FLEXIBLE",
                                desc: "Curso con amplia disponibilidad de horarios, clases y niveles para que puedas aprender cuando quieras y desde cualquier dispositivo.",
                                icon: Clock,
                                color: "bg-[var(--trans-primary)]/10 text-[var(--trans-primary)]"
                            },
                            {
                                title: "DINÁMICO",
                                desc: "Desde un enfoque comunicativo para puedas comunicarte sin miedo y alcances la fluidez que anhelas desde el primer momento.",
                                icon: Zap,
                                color: "bg-[var(--edu-primary)]/10 text-[var(--edu-primary)]"
                            },
                            {
                                title: "PRÁCTICO",
                                desc: "Campus virtual organizado y de fácil acceso que incluye material gramatical complementario y clases grabadas.",
                                icon: Monitor,
                                color: "bg-[#1DA1D2]/10 text-[#1DA1D2]"
                            }
                        ].map((item, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-white border border-slate-100 hover:border-[var(--edu-primary)]/30 hover:shadow-2xl transition-all duration-500 text-center">
                                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform", item.color)}>
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-500 leading-relaxed text-sm">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tabla de Niveles CTA */}
            <section className="py-16 container mx-auto px-4">
                <div className="bg-gradient-to-br from-[#BC248C] to-[#2D93C7] rounded-[3rem] p-12 md:p-16 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }} />
                    <div className="relative z-10 space-y-6 max-w-3xl mx-auto">
                        <h3 className="text-2xl md:text-4xl font-black">MIRÁ LA TABLA DE NIVELES</h3>
                        <p className="text-white/90 text-lg">Y ELEGÍ EL CURSO QUE MEJOR SE AMOLDE A TUS CONOCIMIENTOS</p>
                        <Link href="/education/courses">
                            <Button variant="glass" size="lg" className="rounded-full px-10 mt-4">
                                TABLA DE NIVELES <ArrowRight className="ml-2" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Método Fénix Preview */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/10 text-[var(--edu-primary)] text-xs font-black uppercase tracking-widest">
                                <Sparkles size={14} /> Método Fénix
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900">¿Qué es el Método Fénix?</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                El Método Fénix es un enfoque comunicativo único diseñado para mejorar tu fluidez, comprensión y nivel de inglés de manera notable en tan solo 6 meses.
                            </p>
                            <Link href="/education/method">
                                <Button size="lg" className="rounded-full shadow-2xl shadow-[var(--edu-primary)]/20 mt-4">
                                    Conocer más sobre el Método Fénix <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>

                        <div className="bg-white rounded-[3rem] p-8 md:p-10 shadow-2xl border border-slate-100 space-y-6">
                            <h3 className="text-2xl font-black text-slate-900">¿A quién está dirigido?</h3>
                            <p className="text-slate-600 leading-relaxed">
                                El Método Fénix está pensado para adultos con conocimientos previos de inglés que:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Desean exportar sus servicios profesionales y trabajar con empresas o individuos de habla inglesa.",
                                    "Necesitan mejorar su fluidez para su trabajo diario.",
                                    "Quieren prepararse para entrevistas laborales en inglés.",
                                    "Buscan hablar inglés con confianza en reuniones y presentaciones."
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-600">
                                        <div className="h-6 w-6 rounded-full bg-[var(--edu-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                                            <CheckCircle2 size={14} className="text-[var(--edu-primary)]" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ¿NO SABES QUÉ CURSO ELEGIR? */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">¿NO SABES QUÉ CURSO ELEGIR?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 text-left space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-[var(--trans-primary)]/10 flex items-center justify-center text-[var(--trans-primary)]">
                                <Layers size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">Curso INTEGRAL</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Si deseas aprender el idioma inglés de manera integral, donde puedas poner en práctica lo que estudies en diversas situaciones cotidianas de la vida, el curso INTEGRAL es ideal para ti. No solo adquirirás conocimientos del idioma, sino que también se hará énfasis en la práctica oral y escrita tanto en clase como fuera de ella.
                            </p>
                            <Link href="/education/courses">
                                <Button variant="outline" className="rounded-full mt-2">
                                    Ver Cursos Integrales <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 text-left space-y-4">
                            <div className="h-12 w-12 rounded-2xl bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)]">
                                <Sparkles size={24} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900">MÉTODO FÉNIX</h3>
                            <p className="text-slate-600 leading-relaxed">
                                Sin embargo, si ya cuentas con una base sólida de inglés y deseas desarrollar habilidades más personalizadas y centralizadas en áreas específicas, te recomendamos el MÉTODO FÉNIX.
                            </p>
                            <Link href="/education/method">
                                <Button className="rounded-full mt-2">
                                    Conocer el Método Fénix <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 container mx-auto px-4">
                <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 relative overflow-hidden text-center text-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BC248C]/20 to-[#2D93C7]/20" />
                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight">¿Listo para transformar <br />tu futuro?</h2>
                        <p className="text-slate-400 text-lg opacity-90">
                            Únete a cientos de estudiantes que ya están desbloqueando oportunidades globales con English in Wonderland.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/education/courses">
                                <Button variant="premium" size="lg" className="rounded-full px-12 h-16 text-lg">
                                    Ver Cursos
                                </Button>
                            </Link>
                            <Link href="/education/method">
                                <Button variant="glass" size="lg" className="rounded-full px-12 h-16 text-lg">
                                    <PlayCircle className="mr-2" /> Método Fénix
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
