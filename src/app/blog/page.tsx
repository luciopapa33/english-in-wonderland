import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog | English in Wonderland",
    description: "Tips, guías y recursos gratuitos para mejorar tu inglés. Todo lo que necesitás saber sobre gramática, vocabulario y cultura bilingüe.",
};

const posts = [
    {
        title: "Cómo participar y presentar en reuniones laborales en inglés",
        excerpt: "La habilidad para comunicarte con confianza en inglés es esencial para destacar en reuniones y presentaciones laborales. Ya sea que trabajes con un equipo internacional o presentes ideas clave a tus jefes o clientes, dominar el idioma te permitirá participar activamente y transmitir tus puntos de manera profesional.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        slug: "reuniones-laborales-ingles",
        category: "Educación"
    },
    {
        title: "\"Tell me about you\", la pregunta clave en entrevistas laborales en inglés.",
        excerpt: "Una de las primeras preguntas en cualquier entrevista laboral es el crucial: \"Cuéntame sobre ti\". Preparar una respuesta sólida puede marcar la diferencia entre causar una buena impresión o parecer poco preparado.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        slug: "tell-me-about-you-entrevistas",
        category: "Educación"
    },
    {
        title: "Aprender inglés: el paso clave para tu éxito profesional.",
        excerpt: "Cada año, miles de personas deciden aprender inglés con un objetivo claro: avanzar en sus carreras y alcanzar nuevas oportunidades. Para muchos, este paso marca un antes y un después.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        slug: "ingles-exito-profesional",
        category: "Educación"
    },
    {
        title: "¿Por qué sentís que tu inglés no avanza?",
        excerpt: "Muchos profesionales sienten que, aunque tienen una base de inglés, no logran usarlo con confianza en situaciones reales. Esto sucede porque, en su mayoría, aprendieron a través de métodos tradicionales que priorizan gramática y memorización sobre la práctica comunicativa.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        slug: "por-que-ingles-no-avanza",
        category: "Educación"
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-12 pt-24">
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">Blog</h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Tips, estrategias y recursos para mejorar tu inglés profesional.
                    </p>
                </header>

                <div className="grid md:grid-cols-2 gap-8">
                    {posts.map((post, i) => (
                        <article key={i} className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group">
                            <div className="h-48 bg-gradient-to-br from-[#BC248C]/10 to-[#2D93C7]/10 flex items-center justify-center">
                                <span className="text-sm font-bold uppercase tracking-widest text-[var(--edu-primary)]/50 group-hover:scale-110 transition-transform">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center gap-4 text-xs text-slate-400">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-[var(--edu-primary)] transition-colors">
                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                </h2>
                                <p className="text-slate-600 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-[var(--edu-primary)] font-bold gap-2 group-hover:gap-3 transition-all">
                                    Leer más <ArrowRight size={18} />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
