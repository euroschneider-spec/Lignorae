import { Resend } from "resend";


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

    const { name, email, enquiryType, message } = body;

    if (!name || !email || !enquiryType || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "LIGNORAE <onboarding@resend.dev>",
      to: ["info@lignorae.com", "euroschneider@gmail.com"],
      subject: `New LIGNORAE enquiry: ${enquiryType}`,
      replyTo: email,

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;line-height:1.6;color:#1a130d;">
          <h2>New LIGNORAE Contact Request</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Enquiry Type:</strong> ${enquiryType}</p>

          <hr />

          <p style="white-space:pre-wrap;">${message}</p>
        </div>
      `,
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("Contact form error:", error);

    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}