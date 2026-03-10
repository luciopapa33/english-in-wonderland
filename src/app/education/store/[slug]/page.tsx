import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { CheckoutButton } from '@/components/checkout-button';
import { DevEnrollButton } from '@/components/dev-enroll-button';
import {
    ArrowLeft,
    PlayCircle,
    FileText,
    CheckCircle2,
    Gift,
    Shield,
    Clock,
    Download,
    Briefcase,
    Plane,
    HeartPulse,
    Star,
    Sparkles,
    Lock,
    Video,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import fs from 'fs';
import path from 'path';

const PRODUCT_META: Record<string, {
    icon: typeof Briefcase;
    gradient: string;
    accent: string;
    accentBg: string;
    heroText: string;
    contentFolder: string;
    pdfFile: string | null;
    pdfDescription: string;
    topics: string[];
}> = {
    'english-for-interviews': {
        icon: Briefcase,
        gradient: 'from-[#BC248C] to-[#D66FA3]',
        accent: 'text-[#BC248C]',
        accentBg: 'bg-[#BC248C]',
        heroText: 'Dominá las 15 preguntas más comunes en entrevistas laborales en inglés con ejemplos reales y el método STAR',
        contentFolder: 'interviews',
        pdfFile: null,
        pdfDescription: 'Booklet completo con ejemplos de respuestas, vocabulario profesional y plantillas STAR Method',
        topics: [
            'Tell me about yourself',
            'What is your greatest weakness?',
            'Which is your greatest strength?',
            'What is your greatest achievement?',
            'Why should we hire you?',
            'Do you prefer working individually or with a team?',
            'Why do you want to work here?',
            'How do you see yourself in five years?',
            'What are your salary expectations?',
            'How do you handle stress?',
            'Describe yourself in 3 words',
            'What motivates you at work?',
            'What makes you unique?',
            'What\'s your ideal job?',
            'Do you have any questions for us?',
        ],
    },
    'english-for-travel': {
        icon: Plane,
        gradient: 'from-[#2D93C7] to-[#1DA1D2]',
        accent: 'text-[#2D93C7]',
        accentBg: 'bg-[#2D93C7]',
        heroText: '45 lecciones en video para viajar con confianza: desde el aeropuerto hasta emergencias, todo explicado paso a paso',
        contentFolder: 'travel',
        pdfFile: '1Booklet para viajes GRABADO.pdf',
        pdfDescription: 'Booklet con frases organizadas por situación: aeropuerto, hotel, restaurantes, compras, transporte y emergencias',
        topics: [
            'Vocabulario de aeropuerto y check-in',
            'Conversaciones en el avión',
            'Check-in y check-out en hoteles',
            'Pedir comida en restaurantes',
            'Compras y pagos',
            'Pedir direcciones e indicaciones',
            'Transporte público y taxis',
            'Emergencias durante el viaje',
            'Reservas y confirmaciones',
            'Interacción social y small talk',
            'Aduanas e inmigración',
            'Quejas y reclamos educados',
        ],
    },
    'english-for-medical-emergency': {
        icon: HeartPulse,
        gradient: 'from-[#e74c3c] to-[#c0392b]',
        accent: 'text-[#e74c3c]',
        accentBg: 'bg-[#e74c3c]',
        heroText: 'Kit de supervivencia lingüística: verbos médicos, expresiones de emergencia y vocabulario bilingüe para hospitales y farmacias',
        contentFolder: 'medical',
        pdfFile: null,
        pdfDescription: 'Booklet bilingüe con verbos médicos, expresiones de emergencia, vocabulario de síntomas y partes del cuerpo',
        topics: [
            'Verbos médicos: hurt, fall, vomit, breathe',
            'Verbos de emergencia: choke, administer, recover',
            'Primeros auxilios: perform CPR, resuscitate, bandage',
            'Tratamientos: break, apply, inject, operate',
            'Medicación: sedate, prescribe, hydrate',
            'Expresiones generales: I need a doctor, I am in pain',
            'Alergias y condiciones: I am allergic to, I am diabetic',
            'Síntomas y dolor: describir qué te pasa',
            'En la farmacia: pedir medicamentos',
            'En el hospital: entender indicaciones',
            'Emergencias de embarazo y parto',
            'Formularios y seguro médico',
        ],
    },
};

function getVideos(folder: string): { name: string; number: number; path: string }[] {
    const dirPath = path.join(process.cwd(), 'public', 'content', folder);
    try {
        const files = fs.readdirSync(dirPath);
        return files
            .filter(f => f.endsWith('.mp4'))
            .map(f => ({
                name: f,
                number: parseInt(f.replace('.mp4', '')),
                path: `/content/${folder}/${f}`,
            }))
            .sort((a, b) => a.number - b.number);
    } catch {
        return [];
    }
}

function getPdf(folder: string): string | null {
    const dirPath = path.join(process.cwd(), 'public', 'content', folder);
    try {
        const files = fs.readdirSync(dirPath);
        const pdf = files.find(f => f.toLowerCase().endsWith('.pdf'));
        if (pdf) return `/content/${folder}/${pdf}`;
        return null;
    } catch {
        return null;
    }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const product = await prisma.course.findFirst({
        where: { slug, type: 'DIGITAL_PRODUCT' },
    });

    if (!product) {
        notFound();
    }

    const meta = PRODUCT_META[slug] || PRODUCT_META['english-for-interviews'];
    const Icon = meta.icon;

    // Check if user has purchased this product
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    let hasPurchased = false;

    if (user) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email! } });
        if (dbUser) {
            const enrollment = await prisma.enrollment.findFirst({
                where: { userId: dbUser.id, courseId: product.id },
            });
            hasPurchased = !!enrollment;
        }
    }

    const videos = getVideos(meta.contentFolder);
    const pdfPath = getPdf(meta.contentFolder);
    const totalVideos = videos.length;

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Back Nav */}
            <div className="container mx-auto px-4 pt-28 mb-8">
                <Link href="/education/store" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--edu-primary)] transition-colors font-bold text-sm uppercase tracking-widest">
                    <ArrowLeft size={16} /> Volver a la Tienda
                </Link>
            </div>

            {/* Hero */}
            <section className="container mx-auto px-4 mb-16">
                <div className={cn("rounded-[3rem] p-10 md:p-20 relative overflow-hidden bg-gradient-to-br text-white", meta.gradient)}>
                    <Icon size={300} className="absolute -right-10 -bottom-10 text-white/10 rotate-12" strokeWidth={1} />
                    <div className="relative z-10 max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-widest border border-white/30">
                            <Sparkles size={12} /> Material Digital
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            {product.title}
                        </h1>
                        <p className="text-white/80 text-lg md:text-xl leading-relaxed">
                            {meta.heroText}
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                <Video size={16} /> {totalVideos} Videos
                            </div>
                            {pdfPath && (
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                    <Gift size={16} /> PDF incluido gratis
                                </div>
                            )}
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold">
                                <Clock size={16} /> Acceso de por vida
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Grid */}
            <section className="container mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content — 2 cols */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* PDF Download (if available and purchased) */}
                        {pdfPath && (
                            <div className={cn("rounded-[2rem] p-8 border-2 border-dashed", hasPurchased ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-200")}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-14 w-14 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-slate-900">Booklet de Apoyo (PDF)</h3>
                                        <p className="text-green-500 text-xs font-bold uppercase tracking-widest">Incluido gratis con tu compra</p>
                                    </div>
                                </div>
                                {hasPurchased ? (
                                    <a href={pdfPath} download>
                                        <Button className="rounded-2xl py-6 px-8 font-bold bg-green-500 hover:bg-green-600 shadow-xl shadow-green-500/20 w-full sm:w-auto">
                                            <Download size={18} className="mr-2" /> Descargar PDF
                                        </Button>
                                    </a>
                                ) : (
                                    <div className="flex items-center gap-3 text-slate-400">
                                        <Lock size={18} />
                                        <span className="text-sm font-medium">Comprá el pack para descargar el booklet</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Topics — What you'll learn */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={cn("h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white", meta.gradient)}>
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Qué vas a aprender</h2>
                                    <p className="text-slate-500 text-sm font-medium">Temas incluidos en este pack</p>
                                </div>
                            </div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {meta.topics.map((topic, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                        <div className={cn("mt-0.5 h-6 w-6 rounded-full flex items-center justify-center text-white text-[10px] font-black bg-gradient-to-br shrink-0", meta.gradient)}>
                                            {i + 1}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video List */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className={cn("h-12 w-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white", meta.gradient)}>
                                    <PlayCircle size={24} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">{totalVideos} Videos Explicativos</h2>
                                    <p className="text-slate-500 text-sm font-medium">Contenido paso a paso en orden progresivo</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {videos.map((video, i) => (
                                    <div
                                        key={video.number}
                                        className={cn(
                                            "rounded-2xl border transition-all",
                                            hasPurchased
                                                ? "bg-white border-slate-100 hover:border-slate-200 hover:shadow-lg"
                                                : "bg-slate-50/50 border-slate-100"
                                        )}
                                    >
                                        {hasPurchased ? (
                                            <details className="group">
                                                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none select-none">
                                                    <div className={cn(
                                                        "h-10 w-10 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0 bg-gradient-to-br",
                                                        meta.gradient
                                                    )}>
                                                        {video.number}
                                                    </div>
                                                    <span className="text-sm font-bold text-slate-700 flex-grow">
                                                        Lección {video.number}
                                                    </span>
                                                    <PlayCircle size={20} className={cn("shrink-0 group-open:hidden", meta.accent)} />
                                                    <span className="text-xs text-slate-400 group-open:hidden">Click para ver</span>
                                                </summary>
                                                <div className="px-5 pb-5">
                                                    <video
                                                        controls
                                                        preload="metadata"
                                                        className="w-full rounded-xl bg-black aspect-video"
                                                        controlsList="nodownload"
                                                    >
                                                        <source src={video.path} type="video/mp4" />
                                                        Tu navegador no soporta video.
                                                    </video>
                                                </div>
                                            </details>
                                        ) : (
                                            <div className="flex items-center gap-4 p-5 opacity-60">
                                                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-slate-200 text-slate-400 text-sm font-black shrink-0">
                                                    {video.number}
                                                </div>
                                                <span className="text-sm font-bold text-slate-500 flex-grow">
                                                    Lección {video.number}
                                                </span>
                                                <Lock size={16} className="text-slate-300 shrink-0" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar — Purchase Card (sticky) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 p-8 space-y-8">
                            {hasPurchased ? (
                                <>
                                    <div className="text-center space-y-3">
                                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                            <CheckCircle2 size={32} className="text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900">¡Ya tenés acceso!</h3>
                                        <p className="text-slate-500 text-sm">Disfrutá de todos los videos y el PDF incluido.</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-green-600 font-medium">
                                            <CheckCircle2 size={18} className="shrink-0" />
                                            <span>{totalVideos} videos desbloqueados</span>
                                        </div>
                                        {pdfPath && (
                                            <div className="flex items-center gap-3 text-sm text-green-600 font-medium">
                                                <CheckCircle2 size={18} className="shrink-0" />
                                                <span>PDF descargable</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-sm text-green-600 font-medium">
                                            <CheckCircle2 size={18} className="shrink-0" />
                                            <span>Acceso de por vida</span>
                                        </div>
                                    </div>
                                    <Link href="/campus/dashboard/courses">
                                        <Button className="w-full py-7 text-base rounded-2xl shadow-xl shadow-[var(--edu-primary)]/20">
                                            <PlayCircle size={20} className="mr-2" /> Ir a mi curso
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="text-center space-y-2">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pago único</div>
                                        <div className="text-5xl font-black text-slate-900">
                                            ARS {product.price.toLocaleString()}
                                        </div>
                                        <div className="text-slate-500 text-sm">acceso inmediato y de por vida</div>
                                    </div>

                                    <hr className="border-slate-100" />

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-sm text-slate-700">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                            <span>{totalVideos} videos explicativos HD</span>
                                        </div>
                                        {pdfPath && (
                                            <div className="flex items-center gap-3 text-sm text-slate-700">
                                                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                                <span>Booklet PDF incluido <strong className="text-green-500">GRATIS</strong></span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 text-sm text-slate-700">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                            <span>Acceso de por vida</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-700">
                                            <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                                            <span>Acceso inmediato tras la compra</span>
                                        </div>
                                    </div>

                                    <CheckoutButton courseId={product.id} price={product.price} />

                                    <DevEnrollButton courseId={product.id} />

                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
                                        <Shield size={14} />
                                        Pago seguro con Mercado Pago
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                                <div className="flex items-center gap-1">
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                </div>
                                <span>Material premium</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
