import {
  AddUserUseCase,
  AddUserRequest,
  EmailService,
  RealEmailService,
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

  describe('execute using Jest', () => {
    test('Should trigger send welcome letter to new user', () => {
      // Arrange
      const expected = 'peter@mail.com';
      const addUserRequest: AddUserRequest = {
        userName: 'peter',
        emailAddress: expected,
      };

      // Mocking service
      const emailAdressesSentTo: string[] = [];
      const mockedEmailService: EmailService = {
        sendWelcomeLetter: jest.fn((address) =>
          emailAdressesSentTo.push(address),
        ),
      };

      const sut = new AddUserUseCase(mockedEmailService);

      // Act
      sut.execute(addUserRequest);
      // Assert
      expect(emailAdressesSentTo).toContain(expected);
    });
  });

  describe('execute with a real service though having one method mocked', () => {
    test('Should trigger send welcome letter to new user', () => {
      // Arrange
      const expected = 'peter@mail.com';
      const addUserRequest: AddUserRequest = {
        userName: 'peter',
        emailAddress: expected,
      };
      const mockedEmailService = new RealEmailService();
      const emailAdressesSentTo: string[] = [];
      mockedEmailService.sendWelcomeLetter = jest.fn((address) =>
        emailAdressesSentTo.push(address),
      );
      const sut = new AddUserUseCase(mockedEmailService);

      // Act
      sut.execute(addUserRequest);
      // Assert
      expect(emailAdressesSentTo).toContain(expected);
    });
  });
});

class MockEmailService implements EmailService {
  public emailAdressesSentTo: string[] = [];
  sendWelcomeLetter(emailAddress: string): void {
    this.emailAdressesSentTo.push(emailAddress);
  }
}
