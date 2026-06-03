import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const payload = {
            access_key: "edc84cd2-040e-4826-9b70-74098359f729",
            subject: "Nuevo mensaje desde el sitio web - English in Wonderland",
            from_name: "Sitio Web (English in Wonderland)",
            nombre: body.nombre,
            apellido: body.apellido,
            email: body.email,
            telefono: body.telefono,
            mensaje: body.mensaje,
        };

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (data.success) {
            return NextResponse.json({ success: true });
        } else {
            console.error("Web3Forms API Error:", data);
            return NextResponse.json(
                { success: false, message: data.message },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
