const nodemailerConfig = {
    host: "smtp-relay.sendinblue.com",
    port: 587,
    auth: {
        user: process.env.BREVO_USER,
        pass: process.env.BREVO_PASS
    }
};

export default nodemailerConfig;