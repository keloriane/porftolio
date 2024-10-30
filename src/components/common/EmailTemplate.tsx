import * as React from "react";

interface EmailTemplateProps {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber?: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstname,
  lastname,
  email,
  phonenumber,
  message,
}) => (
  <div>
    <h1>Hello from your portfolio buddy</h1>

    <h3>
      New contact form submited from {firstname} {lastname}
    </h3>
    <h4> {email} </h4>
    <h4> {message}!</h4>
    <h4>{phonenumber}!</h4>
  </div>
);
