/* 
  SOLID
  * Single responsibility principle or S
  * Open/Closed principle or O
  * Liskov substitution principle or L
  * Interface segregation principle or I
  * Dependency inversion principler o D
*/

import { CustomerCsvFileWriter } from './customer-csv-file-writer';
import { Customer } from './customer';
import { FileWriter } from './file-writer';

describe(CustomerCsvFileWriter.name, () => {
  describe('null customers array', () => {
    test.each([
      {
        customerData: null,
        fileName: 'customers.csv',
      },
    ])(
      'Should throw an argument exception. customerData: $customerData, fileName: $fileName',
      ({ customerData, fileName }) => {
        // Arrange
        const mockFileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(mockFileWriter);

        // Act & Assert
        expect(() => sut.writeCustomers(fileName, customerData!)).toThrowError(
          'Null customers',
        );
      },
    );
  });

  describe('No customer', () => {
    test.each([
      {
        customerData: [],
        fileName: 'customers.csv',
        expected: [],
      },
    ])(
      'customerData: $customerData, fileName: $fileName, expected: $expected',
      ({ customerData, fileName, expected }) => {
        // Arrange
        const mockFileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(mockFileWriter);

        // Act
        sut.writeCustomers(fileName, customerData);

        // Assert
        expect(mockFileWriter.writeLine).toHaveBeenCalledTimes(0);
        mockFileWriter.assertCustomersWereWrittenToFile(fileName, expected);
      },
    );
  });

  describe("Given a customer should write customer's data to a given csv file", () => {
    test.each([
      {
        customerData: {
          customerName: 'Peter Wiles',
          customerNumber: '1234569123',
        },
        fileName: 'customers.csv',
        expected: 'Peter Wiles,1234569123',
      },
      {
        customerData: {
          customerName: 'Brendon Page',
          customerNumber: '789789789',
        },
        fileName: 'customers.csv',
        expected: 'Brendon Page,789789789',
      },
    ])(
      'customerData: $customerData, fileName: $fileName, expected: $expected',
      ({ customerData, fileName, expected }) => {
        // Arrange
        const customer = createCustomer(
          customerData.customerName,
          customerData.customerNumber,
        );
        const mockFileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(mockFileWriter);

        // Act
        sut.writeCustomers(fileName, [customer]);

        // Assert
        mockFileWriter.assertCustomersWereWrittenToFile(fileName, [expected]);
      },
    );
  });

  describe("Given customers should write all customers' data to a given csv file", () => {
    test.each([
      {
        customersData: [
          {
            customerName: 'Peter Wiles',
            customerNumber: '1234569123',
          },
          {
            customerName: 'Brendon Page',
            customerNumber: '789789789',
          },
          {
            customerName: 'Bob',
            customerNumber: '8888888',
          },
        ],
        fileName: 'cust.csv',
        expected: [
          'Peter Wiles,1234569123',
          'Brendon Page,789789789',
          'Bob,8888888',
        ],
      },
    ])(
      'customers: $customersData, fileName: $fileName, expectedWrites: $expected',
      ({ customersData, fileName, expected }) => {
        // Arrange
        const customers: Customer[] = [];
        for (const customerData of customersData) {
          customers.push(
            createCustomer(
              customerData.customerName,
              customerData.customerNumber,
            ),
          );
        }
        const mockFileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(mockFileWriter);

        // Act
        sut.writeCustomers(fileName, customers);

        // Assert
        mockFileWriter.assertCustomersWereWrittenToFile(fileName, expected);
      },
    );
  });
});

export function createCustomerCsvFileWriter(fileWriter: FileWriter) {
  return new CustomerCsvFileWriter(fileWriter);
}

interface MockFileWriter extends FileWriter {
  assertMoreThanTenCustomersWereWrittenToFile(
    fileName: string,
    expected: { csvLine: string; fileName: string }[],
  ): void;
  assertCustomersWereWrittenToFile(fileName: string, expected: string[]): void;
  assertCustomerWasWrittenToFile(fileName: string, expected: string): void;
}

export function createFileWriter(): MockFileWriter {
  return {
    writeLine: jest.fn(),
    assertMoreThanTenCustomersWereWrittenToFile(
      fileName: string,
      expected: { csvLine: string; fileName: string }[],
    ) {
      for (const expectedValues of expected) {
        this.assertCustomerWasWrittenToFile(
          expectedValues.fileName,
          expectedValues.csvLine,
        );
        expect(this.writeLine).toHaveBeenCalledTimes(expected.length);
      }
    },
    assertCustomersWereWrittenToFile(fileName: string, expected: string[]) {
      for (const expectedValue of expected) {
        this.assertCustomerWasWrittenToFile(fileName, expectedValue);
      }
      expect(this.writeLine).toHaveBeenCalledTimes(expected.length);
    },
    assertCustomerWasWrittenToFile(fileName: string, expected: string) {
      expect(this.writeLine).toHaveBeenCalledWith(fileName, expected);
    },
  };
}

export function createCustomer(name: string, contactNumber: string) {
  return new Customer(name, contactNumber);
}
