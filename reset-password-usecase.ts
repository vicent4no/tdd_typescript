export interface EmailService {
  sendMessage(message: EmailMessage): void;
}

export interface EmailMessage {
  subject: string;
  mailTo: string;
  message: string;
}

export class ResetPasswordUseCase {
  constructor(private readonly emailService: EmailService) {}

  public execute(emailAddress: string): void {
    const message = {
      subject: 'Password Reset',
      mailTo: emailAddress,
      message: 'Please follow the link ...',
    };

    this.emailService.sendMessage(message);
  }
}
