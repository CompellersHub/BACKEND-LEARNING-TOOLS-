export declare class MailService {
    private readonly transporter;
    constructor();
    sendEmail(email: string, templateName: string, subject: string, context: Record<string, any>): Promise<void>;
    private renderTemplate;
}
