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

    const data = await resend.emails.send({
      from: "LIGNORAE <onboarding@resend.dev>",
      to: ["info@lignorae.com"],
      subject: `New LIGNORAE enquiry: ${enquiryType}`,
      replyTo: email,

      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>New LIGNORAE Contact Request</h2>

          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Enquiry Type:</strong> ${enquiryType}</p>

          <hr />

          <p>${message}</p>
        </div>
      `,
    });

    return Response.json(data);
  } catch (error) {
    return Response.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}