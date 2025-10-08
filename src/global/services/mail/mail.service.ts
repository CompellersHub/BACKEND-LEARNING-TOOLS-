import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";
import dotenv from "dotenv";
import Handlebars from "handlebars";
import { Service } from "typedi";
dotenv.config();

@Service()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: Boolean(process.env.MAIL_SECURE),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      pool: true,
    });
  }

  async sendEmail(
    email: string,
    templateName: string,
    subject: string,
    context: Record<string, any>
  ) {
    try {
      const html = await this.renderTemplate(templateName, context);
      const mailOptions = {
        from: `"Keep Receipts" <${process.env.MAIL_USER}>`,
        to: email,
        subject: subject,
        html: html,
      };
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Email sent: ${info.response}`);
    } catch (error: any) {
      console.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }

  private async renderTemplate(
    templateName: string,
    context: Record<string, any>
  ) {
    const filePath = path.join(__dirname, "./template", `${templateName}.hbs`);
    const template = await fs.readFile(filePath, "utf-8");
    const compiledTemplate = Handlebars.compile(template);
    return compiledTemplate(context);
  }
}
