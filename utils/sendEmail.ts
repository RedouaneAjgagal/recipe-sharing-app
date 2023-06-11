import nodemailerConfig from "../config/nodemailerConfig";
import nodemailer from "nodemailer";


interface SendEmail {
    to: string,
    subject: string,
    html: string
}

const sendEmail = ({ to, subject, html }: SendEmail) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: `Recipe Sharing App <${process.env.EMAIL_SENDER}>`,
        to,
        subject,
        html,
    });
}

export default sendEmail;