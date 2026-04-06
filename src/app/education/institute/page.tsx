import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Users, Award, ArrowRight, Sparkles, CheckCircle2, GraduationCap, Baby, Briefcase, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function InstitutePage() {
    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden bg-slate-900 text-white">
                <Image
                    src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=1470&q=80"
                    alt="Wonderland Institute"
                    fill
                    className="object-cover opacity-15"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900" />
                <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/20 text-[var(--edu-primary)] text-xs font-bold uppercase tracking-widest border border-[var(--edu-primary)]/30">
                        <Sparkles size={14} /> Clases Presenciales
                    </span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight">
                        Wonderland <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC248C] to-[#2D93C7]">Institute</span>
                    </h1>
                    <p className="text-slate-400 max-w-3xl mx-auto text-lg">
                        Cursos de inglés para niños, jóvenes y adultos
                    </p>
                    <p className="text-slate-300 max-w-3xl mx-auto text-lg leading-relaxed">
                        Somos un instituto con más de 10 años de experiencia. Enfocamos el ejercicio profesional en la enseñanza del inglés para uso cotidiano y laboral, llevamos a cabo de servicios en educación con instituciones prestigiosas en Europa en el área de formación, capacitación, gestión educacional y evaluación a nivel internacional mediante exámenes certificados internacionalmente.
                    </p>
                </div>
            </section>

            {/* About Institute */}
            <section className="container mx-auto px-4 py-24">
                <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 space-y-6">
                    <h2 className="text-3xl font-black text-slate-900 text-center">Clases interactivas</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Actualmente nos dedicamos a la enseñanza de la lengua inglesa y al desarrollo de sus habilidades comunicativas para otorgarle al alumno acceso al conocimiento, la cultura universal, y al crecimiento académico, personal y profesional.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Nuestro programa de gestión se ha desarrollado en base a soluciones integrales de formación, capacitación y evaluación en el idioma inglés que se ajustan a las necesidades específicas de cada persona independientemente del sector del que venga y el uso para el cual necesite el idioma.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Nuestros excelentes resultados académicos son el reflejo de nuestra preocupación por nuestros alumnos y trato personalizado hacia ellos. Le invitamos a conocernos y ser parte del compromiso de aprender en forma seria pero entretenida.
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Desde su fundación, Wonderland Institute ha suscrito distintos acuerdos con entidades internacionales para certificar el dominio de la lengua inglesa a través de exámenes internacionales, alineados con el Marco Común Europeo de Referencia para las lenguas extranjeras.
                    </p>
                </div>
            </section>

            {/* Niños y Jóvenes */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="h-14 w-14 rounded-2xl bg-[var(--edu-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--edu-primary)]/20">
                                    <Baby size={28} />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900">Cursos de inglés para niños y Jóvenes</h2>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Diseñamos y entregamos soluciones entretenidas, innovadoras e integrales de formación, enseñanza y evaluación en el idioma inglés, que se ajustan a las necesidades específicas de cada persona. Aceptamos niños desde 4 años en adelante y fomentamos la adquisición de la lengua a través de actividades interactivas y lúdicas. El juego es fundamental en los primeros años de vida y es de esa forma que los niños se comunican oralmente de forma más efectiva.
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Nuestra enseñanza está orientada para que nuestros estudiantes se desempeñen en forma cotidiana con facilidad, piensen y hablen en inglés respondiendo a sus necesidades de comunicación pero además cumpliendo con la Certificación Internacional y alineados con el Marco Común Europeo de Referencia (CEFR)
                            </p>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Desarrollaremos y perfeccionaremos las cuatro habilidades del idioma inglés: lectura, comprensión auditiva, expresión oral y escritura, a través de la práctica sistemática mediante el uso de nuestra plataforma digital y software interactivo
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-[#BC248C]/10 to-[#D66FA3]/10 rounded-[3rem] p-12 flex items-center justify-center min-h-[400px]">
                            <div className="text-center space-y-4">
                                <Baby size={80} className="text-[var(--edu-primary)]/30 mx-auto" />
                                <p className="text-[var(--edu-primary)] font-black text-2xl">Desde 4 años</p>
                                <p className="text-slate-500">Actividades interactivas y lúdicas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Adultos */}
            <section className="py-24 container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="bg-gradient-to-br from-[#2D93C7]/10 to-[#1DA1D2]/10 rounded-[3rem] p-12 flex items-center justify-center min-h-[400px] order-2 lg:order-1">
                        <div className="text-center space-y-4">
                            <Briefcase size={80} className="text-[var(--trans-primary)]/30 mx-auto" />
                            <p className="text-[var(--trans-primary)] font-black text-2xl">Básico a Avanzado</p>
                            <p className="text-slate-500">Enfoque comunicativo profesional</p>
                        </div>
                    </div>
                    <div className="space-y-8 order-1 lg:order-2">
                        <div className="flex items-center gap-3">
                            <div className="h-14 w-14 rounded-2xl bg-[var(--trans-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--trans-primary)]/20">
                                <Briefcase size={28} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900">Cursos de inglés para Adultos</h2>
                        </div>
                        <p className="text-lg text-[var(--trans-primary)] font-bold">Desde nivel básico hasta nivel avanzado</p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Diseñamos y entregamos soluciones innovadoras e integrales de formación, capacitación y evaluación en el idioma inglés, que se ajustan a las necesidades específicas de cada persona. Nuestro foco está en la enseñanza del idioma para la comunicación, por lo cual hacemos un fuerte hincapié en las habilidades orales y de compresión auditiva.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Nuestra enseñanza está orientada para que nuestros estudiantes se desempeñen en forma cotidiana con facilidad, piensen y hablen en Inglés respondiendo a sus necesidades de comunicación pero además cumpliendo con la Certificación Internacional y alineados con el Marco Común Europeo de Referencia (CEFR) por sus siglas en inglés.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Desarrollaremos y perfeccionaremos las cuatro habilidades del idioma inglés: lectura, comprensión auditiva, expresión oral y escritura, a través de la práctica sistemática mediante el uso de nuestra plataforma digital y software interactivo.
                        </p>
                    </div>
                </div>
            </section>

            {/* EXÁMENES INTERNACIONALES */}
            <section className="py-24 bg-slate-50">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-600 text-xs font-black uppercase tracking-widest">
                            <Award size={14} /> Centro Autorizado
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900">Exámenes Internacionales</h2>
                        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                            Centro Autorizado de Exámenes Internacionales
                        </p>
                    </div>

                    <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 space-y-8">
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Somos centro autorizado para realizar exámenes de inglés internacionales. Preparamos a nuestros alumnos para que rindan el Pearson English International Certificate y Anglia Exams. También preparamos a nuestros alumnos para rendir los exámenes internacionales de Cambridge.
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed font-medium">
                            Los exámenes internacionales representan un distintivo de excelencia, siendo aceptados y reconocidos por miles de organizaciones en todo el mundo.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Pearson */}
                            <div className="bg-slate-50 rounded-[2rem] p-8 space-y-4 border border-slate-100">
                                <div className="h-12 w-12 rounded-2xl bg-[var(--trans-primary)] flex items-center justify-center text-white">
                                    <Award size={24} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase">PEARSON ENGLISH INTERNATIONAL CERTIFICATE</h3>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-800">Pearson International Certificate</p>
                                        <p className="text-slate-600 text-sm">Para estudiantes de inglés mayores de 14 años. Dividido en 6 niveles: desde el A1 al C2.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-800">Pearson International Certificate Young Learners</p>
                                        <p className="text-slate-600 text-sm">Para estudiantes de inglés de 8 a 13 años. Dividido en 4 niveles.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cambridge */}
                            <div className="bg-slate-50 rounded-[2rem] p-8 space-y-4 border border-slate-100">
                                <div className="h-12 w-12 rounded-2xl bg-[var(--edu-primary)] flex items-center justify-center text-white">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 uppercase">CAMBRIDGE ENGLISH LANGUAGE ASSESSMENT</h3>
                                <p className="text-slate-500 text-sm">(British English)</p>
                                <div className="space-y-3">
                                    {[
                                        "PRELIMINARY (PET)",
                                        "FIRST (FCE)",
                                        "ADVANCED (CAE)"
                                    ].map((exam, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)]">
                                                <CheckCircle2 size={14} />
                                            </div>
                                            <span className="text-slate-700 font-bold text-sm">{exam}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#BC248C] to-[#2D93C7] rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)" }} />
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-5xl font-black">Instituto Wonderland Capitán Bermúdez</h2>
                        <p className="text-white/90 text-lg">Cursos de inglés para todas las edades. Le invitamos a conocernos y ser parte del compromiso de aprender en forma seria pero entretenida.</p>
                        <div className="flex flex-wrap justify-center gap-4 pt-4">
                            <Button asChild variant="glass" size="lg" className="rounded-full px-10">
                                <Link href="/contacto">
                                    Contactanos <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
