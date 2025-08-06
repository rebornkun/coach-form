import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    // Initialize Resend with your API key (must be set in .env.local)
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const body = await req.json();
    const { formData, formSections } = body;

    if (!formData) {
      return NextResponse.json({ error: "Form data is required" }, { status: 400 });
    }

    // Compose email content
    let emailContent = `<h1>New Fan Coach Application Submission</h1>`;

    // Loop through all sections and questions to create email content
    formSections.forEach((section: any) => {
      emailContent += `<h2>${section.title}</h2><ul>`;
      
      section.questions.forEach((question: any) => {
        const answer = formData[question.id] || "Not provided";
        emailContent += `<li><strong>${question.label}:</strong> ${answer}</li>`;
      });
      
      emailContent += `</ul>`;
    });
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Chicago Giants <onboarding@resend.dev>", // You'll need to verify this domain in Resend
      to: process.env.EMAIL_RECIPIENT || "your-email@example.com", // Replace with your recipient email
      subject: `New Fan Coach Application from ${formData.fullName || "Applicant"}`,
      html: emailContent,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: "Email sent successfully", id: data?.id });
  } catch (error) {
    console.error("Email sending failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
