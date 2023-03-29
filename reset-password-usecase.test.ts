import {
  ResetPasswordUseCase,
  EmailMessage,
  EmailService,
} from './reset-password-usecase';

describe('reset-password-usecase', () => {
  describe('execute', () => {
    test('should send message', () => {
      // Arrange
      const expected = 'jane@mail.com';
      const emailServiceHelper = new EmailServiceHelper();
      const sut = new ResetPasswordUseCase(emailServiceHelper.getEmailService);
      // Act
      sut.execute(expected);
      // Assert
      expect(emailServiceHelper.getMessagesSentTo).toContain(expected);
    });
  });
});

function createMockEmailService(captureFn: (emailAddress: string) => void) {
  return {
    sendMessage: jest.fn((message) => captureFn(message.mailTo)),
  };
}

class EmailServiceHelper {
  private messagesSentTo: string[] = [];
  private emailService = createMockEmailService((email) =>
    this.messagesSentTo.push(email),
  );
  get getMessagesSentTo() {
    return this.messagesSentTo;
  }
  get getEmailService() {
    return this.emailService;
  }
}
