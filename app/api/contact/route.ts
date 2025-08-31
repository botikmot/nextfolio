import { NextResponse } from "next/server";
import Mailgun from "mailgun.js";
import formData from "form-data";

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "", // Must be private API key starting with "key-"
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body.name || "");
    const email = String(body.email || "");
    const message = String(body.message || "");

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // Send email
    await mg.messages.create(process.env.MAILGUN_DOMAIN || "", {
      from: `${name} <${email}>`,
      to: [process.env.CONTACT_OWNER_EMAIL || ""], // The email to receive messages
      subject: `New message from ${name}`,
      text: message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mailgun error:", err);
    return NextResponse.json({ ok: false, error: "Failed to send email" }, { status: 500 });
  }
}
