export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose prose-slate">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Política de Privacidad</h1>
            <p>En **English in Wonderland**, nos tomamos muy en serio la seguridad de tus datos. Esta política cumple con la Ley de Protección de Datos Personales de Argentina y los estándares internacionales (GDPR).</p>

            <h2 className="text-xl font-bold mt-8">1. Datos Recolectados</h2>
            <p>Recolectamos información necesaria para la gestión académica y el procesamiento de pagos: Nombre, Email, DNI/CUIT (para facturación AFIP en Argentina) y datos de progreso educativo.</p>

            <h2 className="text-xl font-bold mt-8">2. Uso de Cookies</h2>
            <p>Utilizamos cookies técnicas para mantener la sesión en el Campus y Google Analytics para mejorar la experiencia de usuario.</p>

            <h2 className="text-xl font-bold mt-8">3. Procesamiento de Pagos</h2>
            <p>Tus datos financieros son procesados de forma segura por Mercado Pago (Argentina) o PayPal (Internacional). Wonderland no almacena números de tarjeta completos.</p>
        </div>
    );
}
