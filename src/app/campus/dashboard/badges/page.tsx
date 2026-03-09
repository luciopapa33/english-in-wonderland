import { Trophy, Star, Target, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function BadgesPage() {
    return (
        <div className="p-4 md:p-8 lg:p-12 max-w-5xl mx-auto">
            <div className="mb-12">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Logros</h1>
                <p className="text-slate-500 font-medium">Tu camino hacia la fluidez, celebrado paso a paso.</p>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-white rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200">
                <div className="h-24 w-24 bg-amber-100 rounded-3xl flex items-center justify-center mx-auto mb-8 text-amber-500">
                    <Trophy size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-3">Próximamente</h2>
                <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                    Sistema de logros y badges en construcción. Pronto podrás ver tus medallas, rachas de estudio y certificaciones obtenidas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <Star size={20} className="text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">Badges de nivel</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <Target size={20} className="text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">Rachas diarias</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <Zap size={20} className="text-amber-500 mx-auto mb-2" />
                        <p className="text-xs font-bold text-slate-600">Certificados</p>
                    </div>
                </div>

                <Link href="/campus/dashboard">
                    <Button variant="outline" className="rounded-2xl px-10 h-14 font-black">
                        Volver al resumen
                    </Button>
                </Link>
            </div>
        </div>
    )
}
