export default function RefundPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl prose prose-slate">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Políticas de Cancelación y Reembolso</h1>

            <h2 className="text-xl font-bold mt-8">Suscripción "Método Fénix"</h2>
            <p>Las suscripciones pueden cancelarse en cualquier momento. La cancelación entrará en vigor al final del período de facturación actual. **No se realizan reembolsos por meses ya iniciados.**</p>

            <h2 className="text-xl font-bold mt-8">Productos Digitales y On-Demand</h2>
            <p>Debido a la naturaleza del contenido digital de acceso inmediato, solo se ofrecen reembolsos en caso de error técnico que impida el acceso al material, reportado dentro de las primeras 48hs.</p>

            <h2 className="text-xl font-bold mt-8">Clases Presenciales y Online Grupales</h2>
            <p>La inasistencia a las clases grupales no genera crédito a favor ni reposición. En caso de baja del curso, se deberá notificar con 15 días de antelación al inicio del mes siguiente.</p>
        </div>
    );
}
