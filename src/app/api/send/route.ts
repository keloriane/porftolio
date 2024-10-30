import { EmailTemplate } from "@/components/common/EmailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { email, firstname, lastname, phonenumber, message } = body;

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "kevin.flbt@gmail.com",
      subject: "Email form portfolio",
      react: EmailTemplate({
        email,
        firstname,
        lastname,
        phonenumber,
        message,
      }),
      html: `<p>Message from ${firstname} ${lastname} : ${message} <br/> form mail: ${email} </p>`,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.log(process.env.RESEND_API_KEY);
    console.error(error);
    return NextResponse.json({ error });
  }
}
