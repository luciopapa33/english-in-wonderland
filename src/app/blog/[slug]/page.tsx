import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';

const blogPosts: Record<string, { title: string; date: string; author: string; content: string[] }> = {
    "reuniones-laborales-ingles": {
        title: "Cómo participar y presentar en reuniones laborales en inglés",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        content: [
            "La habilidad para comunicarte con confianza en inglés es esencial para destacar en reuniones y presentaciones laborales. Ya sea que trabajes con un equipo internacional o presentes ideas clave a tus jefes o clientes, dominar el idioma te permitirá participar activamente y transmitir tus puntos de manera profesional. A continuación, exploraremos dos áreas clave para sobresalir en estos contextos.",
            "## Frases Clave para Reuniones Laborales",
            "Las reuniones en inglés pueden parecer intimidantes, pero con las frases correctas podés ganar confianza y hacer que tus ideas destaquen. Aquí algunos ejemplos útiles:",
            "**Para expresar tu opinión:** \"I believe we should focus on…\" o \"In my opinion, the best approach would be…\".",
            "**Para clarificar algo:** \"Could you elaborate on that point?\" o \"Just to confirm, are we saying that…?\".",
            "**Para tomar la palabra:** \"If I may add to that…\" o \"Can I jump in here?\".",
            "Usar estas frases te ayudará a participar de manera efectiva y demostrar profesionalismo.",
            "## Cómo Estructurar una Presentación en Inglés",
            "Presentar en inglés requiere claridad y organización. Una estructura sencilla pero efectiva incluye:",
            "**1. Introducción:** Empezá con frases como: \"Today, I'm going to talk about…\" o \"Let me start by explaining…\".",
            "**2. Cuerpo:** Dividí tus puntos en secciones claras usando conectores como \"First, let's discuss…\", \"Next, I'll cover…\".",
            "**3. Conclusión:** Cerrá con un resumen y un llamado a la acción: \"In conclusion, I recommend…\".",
            "Practicar estas frases y estructurar tus ideas asegurará que tu mensaje sea claro y persuasivo."
        ]
    },
    "tell-me-about-you-entrevistas": {
        title: "\"Tell me about you\", la pregunta clave en entrevistas laborales en inglés.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        content: [
            "Una de las primeras preguntas en cualquier entrevista laboral es el crucial: \"Cuéntame sobre ti\". Preparar una respuesta sólida puede marcar la diferencia entre causar una buena impresión o parecer poco preparado.",
            "Para responder efectivamente, es fundamental planificar y practicar. Las entrevistas en inglés suelen tener una estructura predecible, lo que te permite anticiparte a las preguntas más comunes. Aunque no te hagan todas directamente, reflexionar sobre lo que dirías te ayudará a presentarte con confianza.",
            "Evitá respuestas genéricas o demasiado personales. En vez de eso, creá un breve párrafo que destaque tu experiencia laboral y tus logros más relevantes. Una buena proporción sería un 70% de enfoque en tu historial profesional y un 30% de detalles personales que te hagan más cercano. Por ejemplo, describite como lo haría un jefe que valora tu trabajo: mencioná tus logros, fortalezas y objetivos, pero incluí algo personal que humanice tu respuesta.",
            "No esperes a la entrevista para decir tus respuestas en voz alta. Practicá con un amigo, grabate o, mejor aún, trabajá con un docente experto en inglés de negocios. Las simulaciones pueden mejorar tu seguridad y claridad.",
            "¡No te pierdas los próximos posts! Exploraremos más preguntas clave en entrevistas laborales y cómo responderlas con clases personalizadas en Wonderland. ¡Preparate con nosotros y destacá en tu próxima entrevista!"
        ]
    },
    "ingles-exito-profesional": {
        title: "Aprender inglés: el paso clave para tu éxito profesional.",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        content: [
            "Cada año, miles de personas deciden aprender inglés con un objetivo claro: avanzar en sus carreras y alcanzar nuevas oportunidades. Para muchos, este paso marca un antes y un después. Imaginá cómo dominar el idioma podría ayudarte a destacarte en entrevistas laborales o incluso conseguir ese ascenso que tanto buscás.",
            "Sin embargo, enfrentarte a una entrevista en inglés puede ser un reto, especialmente si recién estás trabajando en tu fluidez. Las entrevistas no solo evalúan tus habilidades profesionales, sino también tu capacidad para pensar rápido y comunicarte bajo presión. Si a eso le sumamos la necesidad de traducir mentalmente tus respuestas, el desafío puede ser aún mayor.",
            "La clave para superar este obstáculo es prepararte de manera estratégica. Esto implica practicar respuestas a preguntas comunes, investigar sobre la empresa y el puesto, y trabajar en tus habilidades de comunicación. Dedicar tiempo a prepararte no solo mejora tu confianza, sino que también garantiza que podrás responder con claridad y seguridad.",
            "Si estás planeando una entrevista telefónica o virtual, empezar con una lista de preguntas frecuentes y practicar con un profesor especializado en inglés de negocios puede marcar la diferencia.",
            "📌 ¡No te pierdas nuestros próximos posts! Encontrarás más consejos y estrategias que te ayudarán a dominar el inglés para tus entrevistas laborales y avanzar en tu carrera."
        ]
    },
    "por-que-ingles-no-avanza": {
        title: "¿Por qué sentís que tu inglés no avanza?",
        date: "December 27, 2024",
        author: "mari310184@gmail.com",
        content: [
            "Muchos profesionales sienten que, aunque tienen una base de inglés, no logran usarlo con confianza en situaciones reales. Esto sucede porque, en su mayoría, aprendieron a través de métodos tradicionales que priorizan gramática y memorización sobre la práctica comunicativa. Como resultado, enfrentan dificultades para expresar ideas en reuniones, entrevistas laborales o al responder correos profesionales en inglés.",
            "Las clases personalizadas son una solución efectiva para superar estas barreras. A diferencia de las clases grupales o cursos genéricos, el enfoque personalizado permite identificar tus necesidades específicas. Por ejemplo, si tu desafío es hablar en público, las sesiones pueden incluir simulaciones de presentaciones. Si tu objetivo es mejorar tu fluidez en reuniones, practicarás vocabulario y situaciones específicas de tu ámbito profesional.",
            "Además, trabajar con un instructor que se adapta a tu ritmo garantiza avances más rápidos. La práctica continua y el feedback constante ayudan a mejorar la pronunciación, ganar confianza y usar el inglés de manera natural en contextos laborales.",
            "Con clases personalizadas, no solo superarás tus dificultades actuales, sino que también desarrollarás habilidades que te permitirán aprovechar nuevas oportunidades laborales y conectar con el mercado global. Convertí el inglés en tu herramienta para el éxito profesional."
        ]
    }
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts[slug];

    if (!post) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-black text-slate-900">Post no encontrado</h1>
                    <Link href="/blog" className="text-[var(--edu-primary)] font-bold">
                        ← Volver al Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            <div className="max-w-3xl mx-auto px-4 pt-32">
                <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-[var(--edu-primary)] transition-colors font-bold text-sm uppercase tracking-widest mb-12">
                    <ArrowLeft size={16} /> Volver al Blog
                </Link>

                <article className="bg-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-slate-100 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                            <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{post.title}</h1>
                    </div>

                    <div className="space-y-6 text-slate-600 leading-relaxed">
                        {post.content.map((paragraph, i) => {
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={i} className="text-2xl font-black text-slate-900 pt-4">{paragraph.replace('## ', '')}</h2>;
                            }
                            if (paragraph.startsWith('**') && paragraph.includes(':')) {
                                const parts = paragraph.split(':**');
                                if (parts.length === 2) {
                                    return (
                                        <p key={i}>
                                            <strong>{parts[0].replace('**', '')}:</strong>{parts[1]}
                                        </p>
                                    );
                                }
                            }
                            return <p key={i}>{paragraph}</p>;
                        })}
                    </div>
                </article>
            </div>
        </div>
    );
}
