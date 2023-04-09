import nodemailer, { Transporter } from "nodemailer";

class SendMailService {
  private client: Transporter
  constructor() {
    nodemailer.createTestAccount().then((account) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        tls: {
          rejectUnauthorized: false
        },
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });

      this.client = transporter
    })

  }
  async execute(to: string, subject: string, body: string) {
    const message = await this.client.sendMail({
      to,
      subject,
      html: body,
      from: "NPS <noreplay@nps.com.br>"
    })

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export default new SendMailService();