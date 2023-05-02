import nodemailerConfig from "../config/nodemailerConfig";
import nodemailer from "nodemailer";


interface SendEmail {
    to: string,
    subject: string,
    html: string
}

const sendEmail = ({ to, subject, html }: SendEmail) => {
    const transporter = nodemailer.createTransport(nodemailerConfig);
    transporter.sendMail({
        from: '"Recipe Sharing APP" <support@recipe.com>',
        to,
        subject,
        html,
    });
}

export default sendEmail;