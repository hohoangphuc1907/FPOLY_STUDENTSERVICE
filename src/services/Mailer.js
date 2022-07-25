const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nhattqps22548@fpt.edu.vn',
        pass: 'NhatsDevilPiano1579'
    }
});

class Mailer {
    to;
    subject;
    html;

    constructor(to, subject, html) {
        this.to = to;
        this.subject = subject;
        this.html = html;
    }

    async send() {
        transporter.sendMail({
            from: 'nhattqps22548@fpt.edu.vn',
            to: this.to,
            subject: this.subject,
            html: this.html
        }, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}

module.exports = Mailer;