"use client";

import Link from "next/link";
import { Menu, X, Globe, GraduationCap, Sparkles, ShoppingBag, Home, ChevronDown, BookOpen, Flame, Building2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const academiaItems = [
    { href: "/education", label: "Academia Online", icon: BookOpen, desc: "Clases en vivo por videollamada" },
    { href: "/education/method", label: "Método Fénix", icon: Flame, desc: "Nuestro sistema de aprendizaje acelerado" },
    { href: "/education/institute", label: "Instituto Presencial", icon: Building2, desc: "Clases presenciales en nuestro instituto" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [academiaOpen, setAcademiaOpen] = useState(false);
    const [mobileAcademiaOpen, setMobileAcademiaOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setAcademiaOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { href: "/translations", label: "Traducciones", icon: Globe, color: "hover:text-[var(--trans-primary)]" },
        { href: "/education/store", label: "Tienda", icon: ShoppingBag, color: "hover:text-[var(--edu-primary)]" },
        { href: "/blog", label: "Blog", icon: null, color: "hover:text-slate-600" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                scrolled ? "py-2" : "py-4"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <nav className={cn(
                    "flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-500 border border-transparent",
                    scrolled
                        ? "glass border-white/20 shadow-xl shadow-indigo-500/5 translate-y-2"
                        : "bg-transparent"
                )}>
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group z-50">
                        <div className="relative">
                            <Sparkles className="h-6 w-6 text-[var(--edu-primary)] absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                                ENGLISH IN <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BC248C] to-[#2D93C7] group-hover:from-[#2D93C7] group-hover:to-[#BC248C] transition-all duration-700">WONDERLAND</span>
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {/* Inicio */}
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-slate-600"
                        >
                            <Home className="h-4 w-4" />
                            Inicio
                        </Link>

                        {/* Academia Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setAcademiaOpen(!academiaOpen)}
                                className={cn(
                                    "px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 hover:bg-slate-100/50 dark:hover:bg-white/5 hover:text-[var(--edu-primary)]",
                                    academiaOpen && "bg-slate-100/50 text-[var(--edu-primary)]"
                                )}
                            >
                                <GraduationCap className="h-4 w-4" />
                                Academia
                                <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", academiaOpen && "rotate-180")} />
                            </button>

                            {/* Dropdown Panel */}
                            <div className={cn(
                                "absolute top-full left-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-black/20 p-2 transition-all duration-300 origin-top-left",
                                academiaOpen
                                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                            )}>
                                {academiaItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setAcademiaOpen(false)}
                                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group/item"
                                    >
                                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#BC248C] to-[#D66FA3] flex items-center justify-center text-white shrink-0 group-hover/item:scale-110 transition-transform">
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Rest of nav links */}
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-4 py-2 text-sm font-semibold transition-all duration-300 rounded-xl flex items-center gap-2 hover:bg-slate-100/50 dark:hover:bg-white/5",
                                    link.color
                                )}
                            >
                                {link.icon && <link.icon className="h-4 w-4" />}
                                {link.label}
                            </Link>
                        ))}

                        <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

                        <Link href="/campus">
                            <Button variant="default" size="sm" className="rounded-full font-bold px-6">
                                Campus Virtual
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden z-50 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </nav>
            </div>

            {/* Mobile Navigation Overlay */}
            <div
                className={cn(
                    "fixed inset-0 bg-white dark:bg-slate-950 z-40 md:hidden transition-all duration-500 ease-in-out flex flex-col items-center justify-center p-8",
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none translate-y-10"
                )}
            >
                <div className="flex flex-col items-center space-y-6 w-full max-w-xs">
                    {/* Inicio */}
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="text-3xl font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-colors text-center w-full"
                    >
                        Inicio
                    </Link>

                    {/* Academia with sub-items */}
                    <div className="w-full text-center">
                        <button
                            onClick={() => setMobileAcademiaOpen(!mobileAcademiaOpen)}
                            className="text-3xl font-black text-slate-900 dark:text-white hover:text-[var(--edu-primary)] transition-colors inline-flex items-center gap-2"
                        >
                            Academia
                            <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", mobileAcademiaOpen && "rotate-180")} />
                        </button>
                        <div className={cn(
                            "mt-4 space-y-3 transition-all duration-300 overflow-hidden",
                            mobileAcademiaOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                        )}>
                            {academiaItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => { setIsOpen(false); setMobileAcademiaOpen(false); }}
                                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900 mx-auto max-w-xs"
                                >
                                    <item.icon className="h-5 w-5 text-[var(--edu-primary)]" />
                                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Other links */}
                    {navLinks.map((link, i) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-3xl font-black text-slate-900 dark:text-white hover:text-indigo-600 transition-colors text-center w-full"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 my-4" />

                    <Link href="/campus" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full py-6 text-lg rounded-2xl font-bold shadow-2xl shadow-indigo-500/30">
                            Acceder al Campus
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
}
