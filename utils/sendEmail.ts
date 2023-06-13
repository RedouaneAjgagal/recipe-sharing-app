import nodemailerConfig from "../config/nodemailerConfig";
import nodemailer from "nodemailer";


interface SendEmail {
    to: string,
    subject: string,
    html: string
}

const sendEmail = ({ to, subject, html }: SendEmail) => {
    let transporter = nodemailer.createTransport(nodemailerConfig);

    return transporter.sendMail({
        from: '"Recipe Sharing App" <support@sharingrecipeapp.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html // html body
        // text:  // plain text body
    });
}

export default sendEmail;