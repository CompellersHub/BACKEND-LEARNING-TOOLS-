"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
const dotenv_1 = __importDefault(require("dotenv"));
const handlebars_1 = __importDefault(require("handlebars"));
const typedi_1 = require("typedi");
dotenv_1.default.config();
let MailService = class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
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
    async sendEmail(email, templateName, subject, context) {
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
        }
        catch (error) {
            console.error(`Error sending email: ${error.message}`);
            throw error;
        }
    }
    async renderTemplate(templateName, context) {
        const filePath = path_1.default.join(__dirname, "./template", `${templateName}.hbs`);
        const template = await promises_1.default.readFile(filePath, "utf-8");
        const compiledTemplate = handlebars_1.default.compile(template);
        return compiledTemplate(context);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], MailService);
//# sourceMappingURL=mail.service.js.map