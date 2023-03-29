import {
  AddUserUseCase,
  AddUserRequest,
  EmailService,
} from './add-user-usecase';

describe('add-user-usecase', () => {
  describe('execute', () => {
    test('Should trigger send welcome letter to new user', () => {
      // Arrange
      const expected = 'peter@mail.com';
      const addUserRequest: AddUserRequest = {
        userName: 'peter',
        emailAddress: expected,
      };
      const mockedEmailService = new MockEmailService();
      const sut = new AddUserUseCase(mockedEmailService);

      // Act
      sut.execute(addUserRequest);
      // Assert
      expect(mockedEmailService.emailAdressesSentTo).toContain(expected);
    });
  });
});

class MockEmailService implements EmailService {
  public emailAdressesSentTo: string[] = [];
  sendWelcomeLetter(emailAddress: string): void {
    this.emailAdressesSentTo.push(emailAddress);
  }
}
