import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, FileText, CheckCircle2, ShieldCheck, Languages, Zap, ArrowRight, MessageSquare, Award, Globe, GraduationCap, Stethoscope, Scale, BookOpen, Stamp, Subtitles, Mic, LayoutTemplate, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Traducciones | English in Wonderland",
    description: "Servicios de traducción pública y certificada (Español-Inglés). Legal, medicina, educación e inmigración. Traducciones con validez oficial.",
};


export default function TranslationsPage() {
    return (
        <div className="min-h-screen bg-neutral-50/50 pb-20">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-slate-900 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1470&q=80"
                    alt="Professional translations"
                    fill
                    className="object-cover opacity-20"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

                <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--trans-primary)]/20 text-[var(--trans-primary)] text-xs font-bold uppercase tracking-widest border border-[var(--trans-primary)]/30">
                            <Languages size={14} /> Traductora Pública Inglés–Español
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            ¡Hola! Soy{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D93C7] to-[#1DA1D2]">Mariana</span>
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                            Especialista en Traducción Certificada, Legal y Médica
                        </p>
                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">
                            Soy traductora pública de inglés y español con más de siete años de experiencia brindando servicios lingüísticos de alta precisión para clientes en Estados Unidos, América Latina y Europa.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Button variant="premium" size="lg" className="rounded-full shadow-teal-500/20">
                                Solicitar Cotización
                            </Button>
                            <Button variant="glass" size="lg" className="rounded-full">
                                Hablar con Mariana
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <div className="container mx-auto px-4 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: ShieldCheck, text: "Miembro ATA" },
                        { icon: Stamp, text: "Traductora Matriculada" },
                        { icon: Award, text: "ProZ Certified Pro" },
                        { icon: Globe, text: "USCIS Accepted" }
                    ].map((item, i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/50 flex items-center gap-4 border border-slate-100">
                            <div className="h-10 w-10 rounded-xl bg-[var(--trans-primary)]/10 flex items-center justify-center text-[var(--trans-primary)]">
                                <item.icon size={20} />
                            </div>
                            <span className="font-bold text-slate-700 text-sm">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* About / Intro */}
            <section className="container mx-auto px-4 py-24">
                <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 space-y-8">
                    <p className="text-lg text-slate-600 leading-relaxed">
                        A lo largo de mi carrera he trabajado con estudios jurídicos, instituciones de salud, proveedores de servicios lingüísticos (LSP), universidades y empresas que operan en entornos regulados y requieren traducciones exactas, confidenciales y válidas ante autoridades oficiales.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Mi enfoque profesional combina rigor terminológico, cumplimiento normativo y comprensión profunda del contexto legal y sanitario en el que se utilizarán los documentos. No se trata solo de traducir palabras, sino de garantizar que cada documento cumpla con los estándares institucionales, regulatorios y formales que exige su presentación.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Soy miembro de la American Translators Association (ATA) y traductora pública matriculada en Argentina, lo que me habilita a emitir traducciones certificadas con firma digital, aceptadas por USCIS, tribunales, universidades y organismos oficiales.
                    </p>
                </div>
            </section>

            {/* Servicios que ofrezco */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Servicios que ofrezco</h2>
                        <p className="text-slate-600 max-w-3xl mx-auto text-lg">
                            Brindo soluciones lingüísticas especializadas para clientes que requieren exactitud técnica y cumplimiento normativo:
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            { icon: Languages, title: "Traducción profesional Inglés ↔ Español" },
                            { icon: Stamp, title: "Traducciones certificadas y juradas (USCIS, tribunales, universidades, procesos migratorios)" },
                            { icon: Stethoscope, title: "Traducción médica y sanitaria" },
                            { icon: Scale, title: "Traducción legal y contractual" },
                            { icon: GraduationCap, title: "Traducción académica" },
                            { icon: Zap, title: "MTPE (post-edición de traducción automática)" },
                            { icon: Eye, title: "Corrección y control de calidad lingüístico (LQA)" },
                            { icon: Subtitles, title: "Subtitulado y transcripción" },
                            { icon: Mic, title: "Interpretación médica, legal y en conferencias" },
                            { icon: LayoutTemplate, title: "Maquetación y replicación de formato (DTP) manteniendo diseño original" }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-start gap-4 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="h-10 w-10 rounded-xl bg-[var(--trans-primary)]/10 flex items-center justify-center text-[var(--trans-primary)] shrink-0">
                                    <item.icon size={20} />
                                </div>
                                <p className="text-slate-700 font-medium text-sm">{item.title}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-slate-500 mt-8 max-w-3xl mx-auto">
                        Cada proyecto es gestionado con estricta confidencialidad, cumplimiento de plazos y control de calidad exhaustivo.
                    </p>
                </div>
            </section>

            {/* Áreas de especialización */}
            <section className="py-24 container mx-auto px-4">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900">Áreas de especialización</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* USCIS */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-[var(--trans-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--trans-primary)]/20">
                            <Globe size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Traducción para procesos migratorios (USCIS)</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Me especializo en la traducción certificada de documentación para inmigración en Estados Unidos, incluyendo actas civiles, antecedentes penales, diplomas, historiales médicos, sentencias judiciales y documentación de soporte para petitions y adjustment of status. Mis traducciones cumplen con los requisitos formales exigidos por USCIS.
                        </p>
                    </div>

                    {/* Médica */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-[var(--edu-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--edu-primary)]/20">
                            <Stethoscope size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Traducción médica y del sector salud</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Trabajo con documentación clínica, historias médicas, consentimientos informados, informes diagnósticos, estudios complementarios y documentación hospitalaria. Comprendo la terminología médica y la importancia crítica de la precisión en contextos sanitarios.
                        </p>
                    </div>

                    {/* Legal */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center text-white shadow-xl shadow-slate-800/20">
                            <Scale size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Traducción legal</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Brindo servicios para estudios jurídicos y clientes corporativos en materia de contratos, acuerdos, poderes, sentencias, documentación societaria y compliance regulatorio.
                        </p>
                    </div>

                    {/* Académica */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-[#1DA1D2] flex items-center justify-center text-white shadow-xl shadow-[#1DA1D2]/20">
                            <GraduationCap size={28} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900">Traducción académica</h3>
                        <p className="text-slate-600 leading-relaxed">
                            Traducción certificada de títulos, certificados analíticos, programas de estudio y documentación universitaria para validaciones internacionales.
                        </p>
                    </div>
                </div>
            </section>

            {/* Enfoque de trabajo */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Mi enfoque de trabajo</h2>
                    </div>
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                        {[
                            "Precisión terminológica y coherencia conceptual",
                            "Estricto cumplimiento de normas regulatorias",
                            "Confidencialidad absoluta",
                            "Entrega puntual",
                            "Comunicación clara y profesional"
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100 text-center space-y-4 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className="h-10 w-10 rounded-full bg-[var(--trans-primary)]/10 flex items-center justify-center text-[var(--trans-primary)] mx-auto">
                                    <CheckCircle2 size={20} />
                                </div>
                                <p className="text-slate-700 font-semibold text-sm">{item}</p>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-3xl mx-auto mt-12 bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                        <p className="text-slate-600 leading-relaxed text-center italic">
                            Entiendo que, en sectores regulados, un error no es solo un error lingüístico: puede convertirse en un problema legal, migratorio o institucional. Por eso trabajo con estándares de calidad elevados y procesos estructurados.
                        </p>
                    </div>
                </div>
            </section>

            {/* ¿Por qué trabajar conmigo? */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--trans-primary)]/10 -skew-x-12 translate-x-20" />
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-3xl md:text-5xl font-black">¿Por qué trabajar conmigo?</h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Cuento con más de diez años de experiencia en constante interacción con el mundo del inglés y el español.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Cuando realizo traducciones al español para hispanohablantes de Estados Unidos comprendo que el público meta proviene de diferentes entornos y que existe una gran diversidad. Es por ese motivo que evito utilizar regionalismos en mis traducciones. De esa forma me aseguro que todos puedan entender el contenido. De igual manera, cuando realizo localizaciones trato de escoger términos para que la traducción suene y fluya naturalmente en el idioma y en la cultura meta.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Además, al pertenecer al Colegio de Traductores de la provincia de Santa Fé, estoy habilitada para realizar traducciones certificadas con carácter legal con o sin firma digital que se suelen utilizar con frecuencia en proceso migratorios para ciertos países.
                            </p>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Finalmente cuento con la certificación ProZ Certified Pro en la combinación inglés a español, lo que confirma la calidad de mis traducciones según la norma internacional de calidad EN 15038.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2D93C7] to-[#1DA1D2] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }} />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black">¿Necesitás una traducción profesional?</h2>
                        <p className="text-white/90 text-lg">Exactitud técnica, cumplimiento normativo y confidencialidad absoluta.</p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Button variant="glass" size="lg" className="rounded-full px-12 h-16 text-lg">
                                Solicitar Cotización <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
