import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Rocket, Brain, Sparkles, Target, Zap, Flame, Mic, Headphones, ShieldCheck, ArrowRight, MessageSquare, Users, TrendingUp, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Método Fénix | English in Wonderland",
    description: "Descubrí el Método Fénix de English in Wonderland. Un sistema de aprendizaje acelerado diseñado para que hables inglés con confianza en tiempo récord.",
};


export default function MethodPage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Header / Nav */}
            <div className="container mx-auto px-4 pt-32 mb-12">
                <Link href="/education" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--edu-primary)] transition-colors font-bold text-sm uppercase tracking-widest">
                    <ArrowLeft size={16} /> Volver a Educación
                </Link>
            </div>

            {/* SECCIÓN 1 – HERO */}
            <section className="container mx-auto px-4 mb-24 text-center space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/10 text-[var(--edu-primary)] text-xs font-black uppercase tracking-widest">
                    <Flame size={14} /> El Renacimiento de tu Inglés
                </div>
                <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-tight">
                    Método <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC248C] to-[#D66FA3]">Fénix</span>
                </h1>
                <p className="text-2xl md:text-4xl font-black text-slate-800 max-w-4xl mx-auto leading-tight">
                    Dejá de estudiar inglés. Empezá a hablarlo.
                </p>
                <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Renacé en tu fluidez con el Método Fénix.
                </p>
                <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                    Un método comunicativo diseñado para adultos que ya tienen base en inglés, pero no logran hablar con seguridad ni naturalidad.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                    <Button asChild variant="premium" size="lg" className="rounded-full px-10 h-16 text-lg shadow-2xl shadow-[var(--edu-primary)]/20">
                        <Link href="/contacto">
                            👉 Quiero recuperar mi fluidez
                        </Link>
                    </Button>
                </div>
            </section>

            {/* SECCIÓN 2 – PROBLEMA (Identificación emocional) */}
            <section className="container mx-auto px-4 mb-32">
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--edu-primary)]/10 -skew-x-12 translate-x-20" />
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black leading-tight">¿Te pasa que…?</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "Entendés casi todo, pero no sabés cómo responder",
                                "Te quedás en blanco cuando te preguntan algo",
                                "Traducís mentalmente antes de hablar",
                                "Te da vergüenza equivocarte",
                                "Sentís que estudiás hace años y no avanzás"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 text-slate-300">
                                    <div className="h-6 w-6 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 text-red-400 shrink-0 mt-0.5">
                                        <span className="text-xs font-bold">✗</span>
                                    </div>
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 space-y-2">
                            <p className="text-2xl font-black text-white">No es falta de nivel.</p>
                            <p className="text-2xl font-black text-[var(--edu-primary)]">Es falta de activación.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECCIÓN 3 – LA SOLUCIÓN: ¿Qué es el Método Fénix? */}
            <section className="container mx-auto px-4 mb-32">
                <div className="max-w-5xl mx-auto text-center space-y-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/10 text-[var(--edu-primary)] text-xs font-black uppercase tracking-widest">
                        <Flame size={14} /> La Solución
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">¿Qué es el Método Fénix?</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Un sistema comunicativo intensivo que transforma tu inglés pasivo en fluidez real.
                    </p>
                    <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
                        No sumamos contenido innecesario. Reactivamos lo que ya está en tu cerebro.
                    </p>
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 text-left space-y-6 max-w-3xl mx-auto">
                        <p className="text-slate-600 leading-relaxed">
                            El Método Fénix es un método comunicativo intensivo diseñado para que adultos con conocimientos previos de inglés:
                        </p>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {[
                                "Superen el miedo a hablar",
                                "Dejen de traducir mentalmente",
                                "Ganen fluidez real",
                                "Piensen en inglés",
                                "Recuperen la confianza"
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-6 w-6 rounded-full bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)] shrink-0">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span className="text-slate-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-600 leading-relaxed italic border-l-4 border-[var(--edu-primary)] pl-4">
                            Se llama &quot;Fénix&quot; porque el alumno renace lingüísticamente: deja atrás años de frustración académica y empieza a usar el idioma de manera funcional y natural.
                        </p>
                    </div>
                </div>
            </section>

            {/* Enfoque: Activación, no acumulación */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-5xl mx-auto text-center space-y-8 mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--trans-primary)]/10 text-[var(--trans-primary)] text-xs font-black uppercase tracking-widest">
                            <Brain size={14} /> Enfoque
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Activación, no acumulación</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            No se centra en aprender más reglas, sino en activar lo que el alumno ya sabe. El foco no es &quot;saber más&quot;, sino usar mejor lo que ya se sabe.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {[
                            { text: "Speaking desde el minuto 1", icon: Mic },
                            { text: "Input comprensible y contextual", icon: Brain },
                            { text: "Corrección estratégica (no paralizante)", icon: ShieldCheck },
                            { text: "Repetición inteligente", icon: Zap },
                            { text: "Automatización de estructuras frecuentes", icon: TrendingUp }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="h-12 w-12 rounded-2xl bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)] mx-auto">
                                    <item.icon size={24} />
                                </div>
                                <p className="text-slate-700 font-semibold text-sm">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN 4 – CÓMO FUNCIONA (Pilares) */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">Los 4 Pilares del Método</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {/* Pilar 1 */}
                    <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-[var(--edu-primary)]/20 shadow-xl hover:shadow-2xl hover:border-[var(--edu-primary)]/50 transition-all duration-500">
                        <div className="h-14 w-14 rounded-2xl bg-[var(--edu-primary)] text-white flex items-center justify-center mb-6">
                            <Mic size={28} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">1️⃣ Speaking guiado y progresivo</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Entrenamiento guiado en situaciones reales. Role plays, simulaciones laborales, situaciones reales.</p>
                        <div className="space-y-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            <p className="font-bold text-slate-800 uppercase text-xs tracking-wide">CAMBIO DE MINDSET: &quot;SOMOS Y SIEMPRE SEREMOS EXTRANJEROS&quot;</p>
                            <p>Con este cambio de mindset logramos disminuir la vergüenza al no poder hablar perfecto en términos de pronunciación y gramática</p>
                            <p>Porque lo importante es la comunicación y para poder comunicarnos necesitamos hablar.</p>
                            <p>¿Cómo? Al principio como podemos y con el nivel que tenemos y al desarrollar los otros pilares todo va ir cobrando sentido</p>
                        </div>
                    </div>

                    {/* Pilar 2 */}
                    <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-[var(--trans-primary)]/20 shadow-xl hover:shadow-2xl hover:border-[var(--trans-primary)]/50 transition-all duration-500">
                        <div className="h-14 w-14 rounded-2xl bg-[var(--trans-primary)] text-white flex items-center justify-center mb-6">
                            <Headphones size={28} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">2️⃣ Listening estratégico</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">No escuchás por escuchar: internalizás patrones.</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><span className="text-[var(--trans-primary)] shrink-0">•</span> Detectar patrones</li>
                            <li className="flex items-start gap-2"><span className="text-[var(--trans-primary)] shrink-0">•</span> Internalizar estructuras</li>
                            <li className="flex items-start gap-2"><span className="text-[var(--trans-primary)] shrink-0">•</span> Imitar ritmo y entonación</li>
                        </ul>
                        <div className="space-y-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-4">
                            <p className="font-bold text-slate-800 uppercase text-xs tracking-wide">MANOS A LA OBRA: &quot;SÉ EL PROTAGONISTA DE TU PROPIO APRENDIZAJE&quot;</p>
                            <p>Empezamos el día uno hablando, escuchando e interactuando. Vos sos el protagonista de tu aprendizaje. Acá queremos escucharte a vos, nosotros ya sabemos hablar en inglés.</p>
                            <p>No trabajamos siguiendo un libro como cualquier instituto. Un libro es una herramienta más. Trabajamos con TUS NECESIDADES Y OBSTÁCULOS para que los superes.</p>
                        </div>
                    </div>

                    {/* Pilar 3 */}
                    <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-[#1DA1D2]/20 shadow-xl hover:shadow-2xl hover:border-[#1DA1D2]/50 transition-all duration-500">
                        <div className="h-14 w-14 rounded-2xl bg-[#1DA1D2] text-white flex items-center justify-center mb-6">
                            <Brain size={28} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">3️⃣ Reprogramación mental</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Corrección que construye confianza. Feedback enfocado en desbloquear, no paralizar.</p>
                        <p className="text-sm text-slate-600 mb-3">Trabajar creencias como:</p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li className="flex items-start gap-2"><span className="text-[#1DA1D2] shrink-0">•</span> &quot;No soy bueno para idiomas&quot;</li>
                            <li className="flex items-start gap-2"><span className="text-[#1DA1D2] shrink-0">•</span> &quot;Me da vergüenza&quot;</li>
                            <li className="flex items-start gap-2"><span className="text-[#1DA1D2] shrink-0">•</span> &quot;Seguro lo digo mal&quot;</li>
                        </ul>
                        <div className="space-y-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 mt-4">
                            <p className="font-bold text-slate-800 uppercase text-xs tracking-wide">&quot;LA EXPOSICIÓN ES LA CLAVE&quot;</p>
                            <p>Nos expones a situaciones reales relacionadas con tu profesión/ trabajo/ deseo y necesidad al principio de forma graduada y después situaciones reales sin nivelación</p>
                        </div>
                    </div>

                    {/* Pilar 4 */}
                    <div className="group p-8 rounded-[2.5rem] bg-white border-2 border-[var(--edu-primary)]/20 shadow-xl hover:shadow-2xl hover:border-[var(--edu-primary)]/50 transition-all duration-500">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#BC248C] to-[#2D93C7] text-white flex items-center justify-center mb-6">
                            <Zap size={28} />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-2">4️⃣ Fluidez antes que perfección</h3>
                        <p className="text-sm text-slate-600 leading-relaxed mb-4">Automatización de estructuras. Repetición inteligente para ganar naturalidad.</p>
                        <p className="text-sm text-slate-600 mb-2">Primero comunicación efectiva.</p>
                        <p className="text-sm text-slate-600 mb-4">Luego refinamiento gramatical.</p>
                        <div className="space-y-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                            <p className="font-bold text-slate-800 uppercase text-xs tracking-wide">INDEPENDENCIA CON EL IDIOMA</p>
                            <p>La meta es la fluidez y lograr independencia con el idioma</p>
                            <p>Necesitamos esta independencia para poder pasar una entrevista laboral, trabajar de forma remota y así aumentar tus ingresos o enfrentarnos a nuestro trabajo actual de la manera más profesional posible.</p>
                            <p>El propósito final es que la comunicación ocurra de forma efectiva, que finalmente comprendas a quien te habla y puedas responder de forma apropiada</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Diferencial: Tabla comparativa */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Diferencial</h2>
                        <p className="text-xl text-slate-600">Mientras otros cursos enseñan reglas, nosotros entrenamos rendimiento comunicativo.</p>
                        <p className="text-lg text-slate-500 font-bold">Menos teoría. Más performance.</p>
                    </div>
                    <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="grid grid-cols-2">
                            <div className="bg-slate-100 p-6 font-black text-slate-900 text-center text-sm uppercase tracking-widest">Curso tradicional</div>
                            <div className="bg-[var(--edu-primary)] p-6 font-black text-white text-center text-sm uppercase tracking-widest">Método Fénix</div>
                        </div>
                        {[
                            ["Mucha gramática", "Comunicación real"],
                            ["Clases pasivas", "Participación activa"],
                            ["Evaluación escrita", "Performance oral"],
                            ["Perfección", "Fluidez funcional"]
                        ].map((row, i) => (
                            <div key={i} className={cn("grid grid-cols-2", i % 2 === 0 ? "bg-white" : "bg-slate-50")}>
                                <div className="p-6 text-slate-500 text-center border-r border-slate-100 font-medium">{row[0]}</div>
                                <div className="p-6 text-slate-900 text-center font-bold">{row[1]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECCIÓN 5 – RESULTADOS CONCRETOS */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-5xl mx-auto text-center space-y-8 mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-600 text-xs font-black uppercase tracking-widest">
                        <TrendingUp size={14} /> Resultados
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">Resultado esperado</h2>
                    <p className="text-lg text-slate-600">Después del Método Fénix vas a poder:</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                    {[
                        "Participar en reuniones laborales",
                        "Viajar con seguridad",
                        "Sostener conversaciones reales",
                        "Sentirte profesional en inglés"
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 text-center space-y-4 hover:shadow-2xl transition-all hover:-translate-y-1">
                            <div className="h-12 w-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mx-auto">
                                <CheckCircle2 size={24} />
                            </div>
                            <p className="text-slate-800 font-bold">{item}</p>
                        </div>
                    ))}
                </div>
                <div className="max-w-2xl mx-auto text-center mt-12 space-y-2">
                    <p className="text-xl text-slate-700 font-bold">No solo mejora su inglés.</p>
                    <p className="text-xl text-[var(--edu-primary)] font-black">Mejora su identidad profesional.</p>
                </div>
            </section>

            {/* SECCIÓN 6 – PARA QUIÉN ES */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">¿Para quién es?</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                            El Método Fénix está pensado para adultos con conocimientos previos de inglés que:
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                            {[
                                "Ya tenés base (A2–B2)",
                                "Necesitás inglés para crecer profesionalmente",
                                "Querés dejar de sentirte inseguro al hablar",
                                "Desean exportar sus servicios profesionales y trabajar con empresas o individuos de habla inglesa",
                                "Necesitan mejorar su fluidez para su trabajo diario",
                                "Quieren prepararse para entrevistas laborales en inglés",
                                "Buscan hablar inglés con confianza en reuniones y presentaciones"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className="h-6 w-6 rounded-full bg-[var(--edu-primary)] flex items-center justify-center text-white shrink-0 mt-0.5">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <p className="text-slate-700 font-medium">{item}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-slate-900 rounded-2xl p-6 max-w-md mx-auto text-white">
                            <p className="font-bold">No es para principiantes absolutos.</p>
                            <p className="text-slate-400 text-sm mt-1">Es un sistema de reactivación y automatización lingüística.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ¿Qué incluye? - Plan por Seis Meses */}
            <section className="py-24 container mx-auto px-4">
                <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--edu-primary)]/10 -skew-x-12 translate-x-20" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">¿Que incluye?</h2>
                            <p className="text-[var(--edu-primary)] font-bold uppercase tracking-widest text-sm">PLAN POR SEIS MESES</p>
                            <div className="space-y-5">
                                {[
                                    "24 clases individuales y personalizadas virtuales",
                                    "Acceso a la plataforma con miles de recursos extra",
                                    "Videos grabados de explicaciones adicionales de grammar para que despejes tus dudas",
                                    "Personalización de las clases individuales adaptadas a tu profesión o tu necesidad específica (ejemplo viajes)",
                                    "Feedback constante de tu progreso y de las áreas a mejorar",
                                    "Grabación de las clases en vivo",
                                    "Diploma al finalizar los 6 meses"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-start gap-4 text-slate-300">
                                        <div className="h-6 w-6 rounded-full bg-[var(--edu-primary)]/20 flex items-center justify-center border border-[var(--edu-primary)]/30 text-[var(--edu-primary)] shrink-0 mt-0.5">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <span className="font-medium">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 text-white space-y-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="text-[var(--edu-primary)] font-bold uppercase tracking-widest text-xs">MÉTODO FÉNIX</h4>
                                    <div className="text-3xl font-black mt-1">Plan 6 Meses</div>
                                </div>
                                <div className="h-12 w-12 rounded-full bg-[var(--edu-primary)] flex items-center justify-center shadow-lg shadow-[var(--edu-primary)]/20">
                                    <Rocket size={24} />
                                </div>
                            </div>
                            <hr className="border-white/10" />
                            <div className="space-y-4">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Creado por profesionales especializados en enseñanza comunicativa para adultos, enfocado en fluidez, seguridad y resultados reales.
                                </p>
                                <p className="text-lg font-bold text-white">
                                    En pocas semanas vas a hablar con menos bloqueos, dejar de traducir mentalmente, ganar seguridad en reuniones y sentirte cómodo usando el idioma.
                                </p>
                                <Button asChild variant="premium" className="w-full py-8 text-lg rounded-2xl">
                                    <Link href="/contacto">
                                        👉 Sumate al Método Fénix hoy
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA FINAL */}
            <section className="container mx-auto px-4 mt-12">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#BC248C] to-[#2D93C7] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }} />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black">No necesitás empezar de nuevo.</h2>
                        <p className="text-2xl font-bold text-white/90">Necesitás renacer en tu fluidez.</p>
                        <Button asChild variant="glass" size="lg" className="rounded-full px-12 h-16 text-lg mt-4">
                            <Link href="/contacto">
                                👉 Sumate al Método Fénix hoy
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
