import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: "Missing RESEND_API_KEY" },
        { status: 500 }
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();

    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const enquiryType = String(body.enquiryType || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !enquiryType || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeEnquiryType = escapeHtml(enquiryType);
    const safeMessage = escapeHtml(message);

    const result = await resend.emails.send({
      from: "LIGNORAE Atelier <info@lignorae.com>",
      to: ["info@lignorae.com"],
      bcc: ["euroschneider@gmail.com"],
      subject: `New LIGNORAE enquiry: ${enquiryType}`,
      replyTo: email,
      text: `New LIGNORAE Contact Request\n\nName: ${name}\nEmail: ${email}\nEnquiry Type: ${enquiryType}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;line-height:1.6;color:#111111;">
          <h2>New LIGNORAE Contact Request</h2>

          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Enquiry Type:</strong> ${safeEnquiryType}</p>

          <hr />

          <p style="white-space:pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    if (result.error) {
      console.error("Resend contact form error:", result.error);
      return Response.json(
        { error: "Failed to send email", details: result.error },
        { status: 500 }
      );
    }

    return Response.json({ success: true, id: result.data?.id });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Failed to send email", details: String(error) },
      { status: 500 }
    );
  }
}