export interface AddUserRequest {
  emailAddress: string;
  userName: string;
}

export interface EmailService {
  sendWelcomeLetter(emailAddress: string): void;
}

export class RealEmailService implements EmailService {
  sendWelcomeLetter(emailAddress: string): void {
    // What the service actually does.
  }
}
export class AddUserUseCase {
  constructor(private readonly emailService: EmailService) {}

  public execute(addUserRequest: AddUserRequest) {
    // check if userName is available
    // check if email address is available
    // add user

    this.emailService.sendWelcomeLetter(addUserRequest.emailAddress);
    this.emailService.sendWelcomeLetter('internal@chillisoft.co.za');
  }
}
