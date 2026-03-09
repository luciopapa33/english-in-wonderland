import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, Send, Twitter } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-20 px-4 mt-20">
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-black text-white tracking-tighter">
                                ENGLISH IN <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-teal-400">WONDERLAND</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Transformamos la enseñanza de idiomas con el Método Fénix y conectamos negocios globalmente con servicios de traducción de élite.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Instagram, Facebook, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors group">
                                    <Icon size={18} className="text-slate-400 group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-white uppercase tracking-widest text-xs">Ecosistema</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/education" className="hover:text-white transition-colors">Academia Digital</Link></li>
                            <li><Link href="/education/method" className="hover:text-white transition-colors">Método Fénix</Link></li>
                            <li><Link href="/education/courses" className="hover:text-white transition-colors">Cursos en Vivo</Link></li>
                            <li><Link href="/education/store" className="hover:text-white transition-colors">Tienda de Recursos</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-white uppercase tracking-widest text-xs">Servicios LGT</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/translations" className="hover:text-white transition-colors">Traducción Legal</Link></li>
                            <li><Link href="/translations" className="hover:text-white transition-colors">Traducción Técnica</Link></li>
                            <li><Link href="/translations" className="hover:text-white transition-colors">Certificaciones</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog & Recursos</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-white uppercase tracking-widest text-xs">Únete a la Experiencia</h4>
                        <p className="text-sm text-slate-400">Recibe tips semanales y ofertas exclusivas de nuestro ecosistema.</p>
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Tu email..."
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            />
                            <button className="absolute right-2 top-1.5 p-1.5 bg-indigo-600 rounded-lg text-white hover:bg-indigo-500 transition-colors">
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} English In Wonderland. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-8 text-xs text-slate-500">
                        <Link href="/legal/terms" className="hover:text-white">Términos</Link>
                        <Link href="/legal/privacy" className="hover:text-white">Privacidad</Link>
                        <Link href="/legal/refunds" className="hover:text-white">Políticas de Reembolso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
