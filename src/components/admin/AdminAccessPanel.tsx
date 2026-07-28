import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function AdminAccessButton() {
    return (
        <Link
            href="/admin/students"
            id="admin-access-panel-btn"
            className="flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 text-white text-xs font-black hover:bg-[var(--edu-primary)] transition-all duration-300 shadow-xl shadow-slate-900/20 hover:shadow-[var(--edu-primary)]/30"
        >
            <ShieldCheck size={16} />
            Gestionar Accesos
        </Link>
    )
}
