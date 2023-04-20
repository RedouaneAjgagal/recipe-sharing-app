import sendEmail from "./sendEmail";
import origin from "../config/origin";

const sendVerificationEmail = (name: string, email: string, token: string) => {
    const link = `${origin}/user/verify-email?token=${token}&email=${email}`;
    const message = `
        <h3>Welcome ${name}</h3>
        <p>To verify your email please click on the following link: <a href="${link}">Verify my account</a></p>
    `
    sendEmail({
        to: email,
        subject: "Email Confirmation",
        html: message
    });
}

export default sendVerificationEmail;