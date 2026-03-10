import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Star, PlayCircle, FileText, ArrowRight, Sparkles, Gift, CheckCircle2, Briefcase, Plane, HeartPulse } from 'lucide-react';
import { cn } from '@/lib/utils';
import prisma from '@/lib/prisma';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Tienda | English in Wonderland",
    description: "Cursos de inglés para propósitos específicos: Entrevistas laborales, Viajes y Emergencias Médicas. ¡Dominá el idioma y transformá tu carrera!",
};


const PRODUCT_ICONS: Record<string, typeof Briefcase> = {
    'english-for-interviews': Briefcase,
    'english-for-travel': Plane,
    'english-for-medical-emergency': HeartPulse,
};

const PRODUCT_COLORS: Record<string, { gradient: string; accent: string; shadow: string }> = {
    'english-for-interviews': {
        gradient: 'from-[#BC248C] to-[#D66FA3]',
        accent: 'text-[#BC248C]',
        shadow: 'shadow-[#BC248C]/20',
    },
    'english-for-travel': {
        gradient: 'from-[#2D93C7] to-[#1DA1D2]',
        accent: 'text-[#2D93C7]',
        shadow: 'shadow-[#2D93C7]/20',
    },
    'english-for-medical-emergency': {
        gradient: 'from-[#e74c3c] to-[#c0392b]',
        accent: 'text-[#e74c3c]',
        shadow: 'shadow-[#e74c3c]/20',
    },
};

export default async function StorePage() {
    const products = await prisma.course.findMany({
        where: { type: 'DIGITAL_PRODUCT' },
        orderBy: { title: 'asc' },
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 bg-gradient-to-br from-[#BC248C]/20 via-slate-900 to-[#2D93C7]/20" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest border border-white/20">
                            <Sparkles size={14} className="text-amber-400" /> Material Digital Exclusivo
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Aprende inglés <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#BC248C] to-[#2D93C7]">a tu ritmo</span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
                            Packs de videos explicativos + PDFs de apoyo para dominar el inglés en situaciones específicas de la vida real.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 pt-4">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <PlayCircle size={18} className="text-[#BC248C]" /> Videos explicativos
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <FileText size={18} className="text-[#2D93C7]" /> PDFs de apoyo
                            </div>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-300">
                                <Gift size={18} className="text-amber-400" /> PDFs gratis con la compra
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="container mx-auto px-4 py-20 -mt-10 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {products.map((product) => {
                        const slug = product.slug || '';
                        const Icon = PRODUCT_ICONS[slug] || PlayCircle;
                        const colors = PRODUCT_COLORS[slug] || PRODUCT_COLORS['english-for-interviews'];

                        return (
                            <div
                                key={product.id}
                                className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 hover:-translate-y-3 transition-all duration-700 flex flex-col overflow-hidden"
                            >
                                {/* Card Header with Gradient */}
                                <div className={cn("relative h-48 bg-gradient-to-br flex items-center justify-center", colors.gradient)}>
                                    <Icon size={80} className="text-white/20 group-hover:scale-110 transition-transform duration-700" strokeWidth={1.5} />
                                    <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest border border-white/20">
                                        <Gift size={12} /> PDFs incluidos
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="space-y-4 flex-grow">
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-[var(--edu-primary)] transition-colors">
                                            {product.title}
                                        </h2>
                                        <p className="text-slate-500 text-sm leading-relaxed">
                                            {product.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-3 pt-4 border-t border-slate-100">
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center">
                                                    <PlayCircle size={14} className={colors.accent} />
                                                </div>
                                                <span className="font-medium">Videos explicativos HD</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center">
                                                    <FileText size={14} className={colors.accent} />
                                                </div>
                                                <span className="font-medium">PDFs de apoyo <span className="text-green-500 font-bold">(GRATIS)</span></span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-slate-600">
                                                <div className="h-7 w-7 rounded-lg bg-slate-50 flex items-center justify-center">
                                                    <CheckCircle2 size={14} className={colors.accent} />
                                                </div>
                                                <span className="font-medium">Acceso inmediato y de por vida</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="pt-8 mt-auto space-y-4">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-slate-900">ARS {product.price.toLocaleString()}</span>
                                            <span className="text-slate-400 text-sm">/ pago único</span>
                                        </div>
                                        <Link href={`/education/store/${slug}`} className="block">
                                            <Button className={cn(
                                                "w-full py-7 rounded-2xl text-lg font-bold shadow-xl transition-all",
                                                `bg-gradient-to-r ${colors.gradient} hover:opacity-90`,
                                                colors.shadow
                                            )}>
                                                Ver contenido y comprar <ArrowRight className="ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bundle CTA */}
                <div className="mt-20 p-8 md:p-16 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#BC248C]/10 to-[#2D93C7]/10" />
                    <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/30">
                            <Sparkles size={14} /> Oferta Especial
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black tracking-tight">
                            ¿Querés los 3 packs juntos?
                        </h3>
                        <p className="text-slate-400 text-lg opacity-90">
                            Próximamente: Pack completo con descuento especial. Dejanos tu email para ser el primero en enterarte.
                        </p>
                        <div className="flex justify-center">
                            <div className="flex gap-2 max-w-md w-full">
                                <input
                                    type="email"
                                    placeholder="Tu email..."
                                    className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[var(--edu-primary)]"
                                />
                                <Button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#BC248C] to-[#2D93C7] font-bold shadow-xl">
                                    Avisenme
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
