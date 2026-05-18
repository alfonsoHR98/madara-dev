import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

type ContactPayload = {
    name?: string;
    email?: string;
    projectType?: string;
    message?: string;
    company?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown) {
    return String(value ?? "").trim().slice(0, 2000);
}

function escapeHtml(value: string) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export const POST: APIRoute = async ({ request }) => {
    const apiKey = import.meta.env.RESEND_API_KEY;
    const to = import.meta.env.CONTACT_TO_EMAIL;
    const from = import.meta.env.CONTACT_FROM_EMAIL;
    const fallbackReplyTo = import.meta.env.CONTACT_REPLY_TO_FALLBACK ?? to;

    if (!apiKey || !to || !from) {
        return Response.json({ message: "Faltan variables de entorno de contacto." }, { status: 500 });
    }

    let payload: ContactPayload;
    try {
        payload = await request.json();
    } catch {
        return Response.json({ message: "Payload inválido." }, { status: 400 });
    }

    if (clean(payload.company)) {
        return Response.json({ ok: true });
    }

    const name = clean(payload.name);
    const email = clean(payload.email).toLowerCase();
    const projectType = clean(payload.projectType);
    const message = clean(payload.message);

    if (!name || !emailPattern.test(email) || !projectType || message.length < 10) {
        return Response.json({ message: "Completa todos los campos con información válida." }, { status: 400 });
    }

    const resend = new Resend(apiKey);
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeProjectType = escapeHtml(projectType);
    const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

    try {
        await resend.emails.send({
            from,
            to,
            replyTo: email || fallbackReplyTo,
            subject: `Nuevo proyecto: ${projectType}`,
            text: `Nombre: ${name}\nEmail: ${email}\nTipo: ${projectType}\n\nMensaje:\n${message}`,
            html: `
                <div style="font-family:Inter,system-ui,sans-serif;line-height:1.6;color:#111827">
                    <h1 style="font-size:20px;margin:0 0 16px">Nuevo mensaje desde MadaraDev</h1>
                    <p><strong>Nombre:</strong> ${safeName}</p>
                    <p><strong>Email:</strong> ${safeEmail}</p>
                    <p><strong>Tipo:</strong> ${safeProjectType}</p>
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0" />
                    <p>${safeMessage}</p>
                </div>
            `,
        });

        return Response.json({ ok: true });
    } catch (error) {
        console.error("Contact email failed", error);
        return Response.json({ message: "No se pudo enviar el mensaje. Intenta de nuevo." }, { status: 500 });
    }
};
