const nodemailer = require('nodemailer');
const { HttpResponse } = require('../../system/helpers/HttpResponse');
const emailValidator = require('deep-email-validator');

const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'dvsvpoly.hcm@poly.edu.vn',
        pass: 'mxniaucxumbbyshb'
    },
});

class Mailer {
    to;
    subject;
    html;
    file;
    code;

    constructor(to, subject, html, fileUri, code) {
        this.to = to;
        this.subject = subject;
        this.html = html;
        this.file = fileUri;
        this.code = code;
    }

    async sendWithoutAttachment() {
        try {
            const checkEmail = await emailValidator.validate({ email: this.to, validateTypo: false });
            if (!checkEmail.valid) {
                throw new Error('Email không chính xác');
            }
            await transporter.sendMail({
                from: 'dvsvpoly.hcm@poly.edu.vn',
                to: this.to,
                subject: this.subject,
                html: this.html,
            });
            return new HttpResponse({ message: 'Gửi email thành công' });
        } catch (errors) {
            throw errors;

        }
    }

    async send() {
        try {
            const checkEmail = await emailValidator.validate({ email: this.to, validateTypo: false });
            if (!checkEmail.valid) {
                throw new Error('Email không chính xác');
            }
            await transporter.sendMail({
                from: 'dvsvpoly.hcm@poly.edu.vn',
                to: this.to,
                subject: this.subject,
                html: this.html,
                attachments: [
                    {
                        filename: `${this.code}.docx`,
                        path: this.file
                    }
                ]
            });
            return new HttpResponse({ message: 'Gửi email thành công' });
        } catch (errors) {
            throw errors;

        }
    }
}

module.exports = Mailer;