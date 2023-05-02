import sendEmail from "./sendEmail";
import origin from "../config/origin";

const sendResetPasswordEmail = ({ token, email, name }: { token: string, email: string, name: string }) => {
    const link = `${origin}/user/reset-password?token=${token}&email=${email}`;
    const message = `
        <h4>Hello, ${name}</h4>
        <p>We have received a reset password action, if this wasn't you, please just ignore this email</p>
        <p>To reset your email please click on the following link: <a href="${link}">Reset Password</a></p>
    `
    sendEmail({
        to: email,
        subject: "Reset Password",
        html: message
    });
}

export default sendResetPasswordEmail;