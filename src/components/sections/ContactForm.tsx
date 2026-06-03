'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Mail, MapPin, Phone, Check } from 'lucide-react';

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [isHuman, setIsHuman] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isHuman) return;
        
        setStatus('submitting');
        
        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                form.reset();
                setIsHuman(false);
            } else {
                console.error("Web3Forms Error:", data);
                alert("Error al enviar: " + (data.message || "Intente nuevamente."));
                setStatus('idle');
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Error de conexión. Verifique su internet e intente nuevamente.");
            setStatus('idle');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 text-center space-y-6 border border-white/20 animate-in fade-in zoom-in duration-500">
                <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-500/20">
                    <CheckCircle2 size={40} className="text-white" />
                </div>
                <h3 className="text-3xl font-black text-white">¡Mensaje Enviado!</h3>
                <p className="text-slate-300 max-w-sm mx-auto text-lg leading-relaxed">
                    Gracias por contactarnos. Mariana se comunicará con vos a la brevedad.
                </p>
                <Button 
                    variant="outline" 
                    onClick={() => setStatus('idle')}
                    className="rounded-full border-white/20 text-white hover:bg-white/10"
                >
                    Enviar otro mensaje
                </Button>
            </div>
        );
    }

    return (
        <div id="contacto" className="scroll-mt-32">
            <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden border border-white/10">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[var(--trans-primary)]/5 -skew-x-12 translate-x-20 pointer-events-none" />
                
                <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-start">
                    {/* Form Side */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Contáctanos</h2>
                            <p className="text-slate-400 text-lg">Dejanos tu mensaje y nos pondremos en contacto con vos a la brevedad.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Web3Forms hidden fields */}
                            <input type="hidden" name="access_key" value="edc84cd2-040e-4826-9b70-74098359f729" />
                            <input type="hidden" name="subject" value="Nuevo mensaje desde el sitio web - English in Wonderland" />
                            <input type="hidden" name="from_name" value="Sitio Web (English in Wonderland)" />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <Input 
                                    name="nombre" 
                                    placeholder="Nombre" 
                                    required 
                                    className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-[var(--trans-primary)]"
                                />
                                <Input 
                                    name="apellido" 
                                    placeholder="Apellido" 
                                    required 
                                    className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-[var(--trans-primary)]"
                                />
                            </div>
                            <Input 
                                type="email" 
                                name="email" 
                                placeholder="Correo electrónico" 
                                required 
                                className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-[var(--trans-primary)]"
                            />
                            <Input 
                                type="tel" 
                                name="telefono" 
                                placeholder="Número de teléfono" 
                                required 
                                className="h-14 bg-white/5 border-white/10 text-white rounded-2xl focus:ring-[var(--trans-primary)]"
                            />
                            <Textarea 
                                name="mensaje" 
                                placeholder="Tu mensaje..." 
                                required 
                                className="min-h-[150px] bg-white/5 border-white/10 text-white rounded-[1.5rem] focus:ring-[var(--trans-primary)]"
                            />

                            {/* ReCAPTCHA Visual & Interactive Placeholder */}
                            <div 
                                className="bg-white rounded-lg p-4 flex items-center justify-between shadow-lg cursor-pointer select-none"
                                onClick={() => setIsHuman(!isHuman)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`h-6 w-6 border-2 flex items-center justify-center rounded transition-colors ${isHuman ? 'border-green-500 bg-green-500' : 'border-slate-300'}`}>
                                        {isHuman && <Check size={16} className="text-white" />}
                                    </div>
                                    <span className="text-slate-600 font-medium">No soy un robot</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img 
                                        src="https://www.gstatic.com/recaptcha/api2/logo_48.png" 
                                        alt="reCAPTCHA" 
                                        className="h-8 w-8 grayscale opacity-50"
                                    />
                                    <span className="text-[10px] text-slate-400">reCAPTCHA</span>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={status === 'submitting' || !isHuman}
                                className="w-full h-16 text-lg font-black rounded-2xl bg-gradient-to-r from-[var(--trans-primary)] to-[var(--edu-primary)] hover:scale-[1.02] transition-all shadow-xl shadow-[var(--trans-primary)]/20 disabled:opacity-50 disabled:hover:scale-100"
                            >
                                {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info Side */}
                    <div className="lg:sticky lg:top-32 space-y-12">
                        <div className="space-y-8">
                            <h3 className="text-2xl font-bold text-white">Datos de contacto</h3>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--trans-primary)] border border-white/10 shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">WhatsApp / Teléfono</p>
                                        <p className="text-white text-lg font-medium">+54 9 341 7424541</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--trans-primary)] border border-white/10 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Dirección</p>
                                        <p className="text-white text-lg font-medium">Florida 50 (2154) Capitán Bermúdez, Santa Fe, Argentina</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-white/5 flex items-center justify-center text-[var(--trans-primary)] border border-white/10 shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Email Principal</p>
                                        <p className="text-white text-lg font-medium">metodofenix@englishinwonderland.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 rounded-[2rem] bg-gradient-to-br from-white/5 to-white/0 border border-white/10 space-y-4">
                            <div className="flex items-center gap-2 text-amber-500">
                                <Mail size={18} />
                                <span className="font-bold text-sm uppercase tracking-widest">Atención directa</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                                Los correos del formulario serán recibidos por <strong>wonderlandinstitutecp@gmail.com</strong> para su procesamiento administrativo inmediato.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
