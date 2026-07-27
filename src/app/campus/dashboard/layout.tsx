import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    BookOpen,
    Video,
    Trophy,
    Calendar,
    Settings,
    LogOut,
    UserCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user || !user.email) {
        redirect('/campus')
    }

    // Fetch only what's needed for the layout/header
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { name: true, role: true }
    })

    const navItems = [
        { icon: LayoutDashboard, label: 'Resumen', href: '/campus/dashboard', active: true },
        { icon: BookOpen, label: 'Mis Cursos', href: '/campus/dashboard/courses' },
        { icon: Video, label: 'Clases en Vivo', href: '/campus/dashboard/live' },
        { icon: Trophy, label: 'Logros', href: '/campus/dashboard/badges' },
        { icon: Calendar, label: 'Calendario', href: '/campus/dashboard/schedule' },
    ]

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-6 sticky top-0 h-screen">
                <div className="mb-10 px-4">
                    <Link href="/" className="inline-block group">
                        <span className="text-xl font-black tracking-tighter transition-transform group-hover:scale-105 inline-block">
                            WONDERLAND <span className="text-[var(--edu-primary)]">CAMPUS</span>
                        </span>
                    </Link>
                </div>

                <nav className="space-y-1.5 flex-grow">
                    {navItems.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${item.active
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="pt-6 border-t border-slate-100 flex flex-col gap-1">
                    <Link
                        href="/campus/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
                    >
                        <Settings size={18} /> Configuraciones
                    </Link>

                    <form action="/auth/signout" method="post">
                        <button type="submit" className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-red-500 hover:bg-red-50 hover:text-red-600 transition-all text-left">
                            <LogOut size={18} /> Cerrar Sesión
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex items-center justify-between">
                    <span className="text-lg font-black tracking-tighter">
                        WONDERLAND <span className="text-[var(--edu-primary)]">CAMPUS</span>
                    </span>
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                        <UserCircle size={24} className="text-slate-400" />
                    </div>
                </header>

                {/* Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    )
}
