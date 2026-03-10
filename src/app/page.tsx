import Link from 'next/link';
import { ArrowRight, BookOpen, Globe, Sparkles, Star, Zap, Clock, Lightbulb, Monitor, Users, Heart, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "English in Wonderland | Academia de Inglés & Traducciones",
  description: "Aprende inglés de forma dinámica en English in Wonderland. Cursos especializados, academia online y servicios de traducción certificada.",
};


export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-50/50">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--edu-primary)]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--trans-primary)]/10 blur-[120px] rounded-full animate-pulse delay-700" />

      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {/* Hero Section - INICIO */}
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg shadow-indigo-500/5 animate-bounce-slow">
            <Sparkles className="text-amber-400 h-4 w-4" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">ENGLISH IN WONDERLAND</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tight leading-[1.1]">
            ¡Bienvenidos a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC248C] via-[#D66FA3] to-[#2D93C7] animate-gradient">
              Wonderland!
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 font-medium max-w-2xl leading-relaxed">
            En nuestra academia transformamos vidas a través del aprendizaje del inglés
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Link href="/education">
              <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold shadow-2xl shadow-[var(--edu-primary)]/20 hover:scale-105 transition-all">
                Ingresar a la Academia
              </Button>
            </Link>
            <Link href="/translations">
              <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold hover:bg-white hover:border-[var(--trans-primary)] transition-all">
                Servicios de Traducción
              </Button>
            </Link>
          </div>
        </div>

        {/* NOSOTROS Section */}
        <section className="mt-32 max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--edu-primary)]/10 text-[var(--edu-primary)] text-xs font-black uppercase tracking-widest">
              <Heart size={14} /> Nosotros
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">Sobre Wonderland</h2>
          </div>

          <div className="bg-white rounded-[3rem] p-8 md:p-14 shadow-2xl border border-slate-100 space-y-8">
            <p className="text-lg text-slate-600 leading-relaxed">
              En Wonderland Online transformamos vidas a través del aprendizaje del inglés. Somos una academia dedicada a adultos profesionales que desean mejorar su fluidez y comprensión del idioma para avanzar en su vida personal y profesional.
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              {/* Nuestra experiencia */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--trans-primary)]/10 flex items-center justify-center text-[var(--trans-primary)]">
                    <Star size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Nuestra experiencia</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Con años de experiencia en la enseñanza del inglés, hemos ayudado a cientos de profesionales a alcanzar sus metas laborales y personales. Desde entrevistas exitosas hasta presentaciones impecables, nuestro enfoque práctico ha demostrado ser altamente efectivo.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Nuestro propósito es ser el puente que conecta a los profesionales con el mundo global a través del dominio del inglés. Queremos que cada alumno pueda alcanzar sus objetivos laborales y personales, utilizando el inglés como herramienta principal para destacar en el mercado internacional. Nuestra visión es empoderarte para que puedas comunicarte con confianza, abrir puertas a nuevas oportunidades y superar las barreras idiomáticas.
                </p>
              </div>

              {/* Nuestra misión */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[var(--edu-primary)]/10 flex items-center justify-center text-[var(--edu-primary)]">
                    <Target size={24} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Nuestra misión</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Transformar el aprendizaje del inglés en una experiencia efectiva, personalizada y orientada a resultados. Nos comprometemos a:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-[var(--edu-primary)] mt-2 shrink-0" />
                    Brindar un método comunicativo que permita a nuestros alumnos ganar fluidez y comprensión de manera práctica.
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-[var(--edu-primary)] mt-2 shrink-0" />
                    Diseñar programas que simulen situaciones reales del ámbito profesional, como entrevistas, reuniones y presentaciones.
                  </li>
                  <li className="flex items-start gap-3 text-slate-600">
                    <div className="h-2 w-2 rounded-full bg-[var(--edu-primary)] mt-2 shrink-0" />
                    Ofrecer un acompañamiento continuo que motive, guíe y asegure el progreso de cada estudiante.
                  </li>
                </ul>
                <p className="text-slate-600 leading-relaxed">
                  Creemos firmemente que aprender inglés no es solo una habilidad, sino una herramienta clave para acceder a mejores oportunidades laborales, conectarse con culturas globales y alcanzar metas personales y profesionales. Ayudar a nuestros alumnos a superar las barreras del idioma, ganando confianza y fluidez en solo 6 meses con nuestro innovador Método Fénix.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-8 mt-32 max-w-6xl mx-auto">
          {/* Education Card */}
          <Link href="/education" className="group relative overflow-hidden rounded-[3rem] p-1 shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#BC248C] to-[#D66FA3] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.9rem] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
              <BookOpen size={240} className="absolute -right-20 -bottom-20 text-[#BC248C]/5 group-hover:text-white/10 transition-colors duration-700 -rotate-12" strokeWidth={1} />

              <div className="space-y-8 relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-[var(--edu-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--edu-primary)]/30 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={32} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight">Academia <br />Wonderland</h2>
                  <p className="text-slate-500 group-hover:text-[#F3E8FF] transition-colors text-lg max-w-[280px]">
                    Domina el inglés con un sistema que se adapta a tu vida, no al revés.
                  </p>
                </div>
              </div>

              <div className="pt-12 relative z-10 flex items-center gap-2 text-[var(--edu-primary)] group-hover:text-white font-black uppercase tracking-widest text-sm">
                Explorar Cursos <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Translation Card */}
          <Link href="/translations" className="group relative overflow-hidden rounded-[3rem] p-1 shadow-2xl transition-all duration-700 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D93C7] to-[#1DA1D2] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative h-full bg-white dark:bg-slate-900 rounded-[2.9rem] p-10 md:p-14 flex flex-col justify-between overflow-hidden">
              <Globe size={240} className="absolute -right-20 -bottom-20 text-[#2D93C7]/5 group-hover:text-white/10 transition-colors duration-700 rotate-12" strokeWidth={1} />

              <div className="space-y-8 relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-[var(--trans-primary)] flex items-center justify-center text-white shadow-xl shadow-[var(--trans-primary)]/30 group-hover:scale-110 transition-transform duration-500">
                  <Globe size={32} />
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-black text-slate-900 group-hover:text-white transition-colors tracking-tight">Servicios de <br />Traducción</h2>
                  <p className="text-slate-500 group-hover:text-[#E0F2FE] transition-colors text-lg max-w-[280px]">
                    Soluciones lingüísticas de alta precisión para personas y empresas.
                  </p>
                </div>
              </div>

              <div className="pt-12 relative z-10 flex items-center gap-2 text-[var(--trans-primary)] group-hover:text-white font-black uppercase tracking-widest text-sm">
                Ver Servicios <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        {/* Dynamic Badge Section */}
        <div className="mt-40 flex flex-wrap justify-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Star className="fill-current h-5 w-5" /> EXCELENCIA ACADÉMICA
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Zap className="fill-current h-5 w-5" /> MÉTODO ACELERADO
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-400">
            <Globe className="h-5 w-5" /> ALCANCE GLOBAL
          </div>
        </div>
      </main>
    </div>
  );
}
