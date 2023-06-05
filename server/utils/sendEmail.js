import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: true,
            service: "gmail",
            auth: {
                user: "ahmad.itumun@gmail.com",
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        console.log(email)
       const a = await transporter.sendMail({
            from: "ahmad.itumun@gmail.com",
            to: email.email,
            subject: email.subject,
            text: email.text,
        });
        console.log(a);
        console.log("Email sent successfully");
    } catch (error) {
        console.log("Error sending email", error);
    }
};