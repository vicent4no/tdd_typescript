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
        const fileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(fileWriter);

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
        const fileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(fileWriter);

        // Act
        sut.writeCustomers(fileName, customerData);

        // Assert
        expect(fileWriter.writeLine).toHaveBeenCalledTimes(0);
        assertCustomersWereWrittenToFile(fileWriter, fileName, expected);
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
        const fileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(fileWriter);

        // Act
        sut.writeCustomers(fileName, [customer]);

        // Assert
        assertCustomersWereWrittenToFile(fileWriter, fileName, [expected]);
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
        const fileWriter = createFileWriter();
        const sut = createCustomerCsvFileWriter(fileWriter);

        // Act
        sut.writeCustomers(fileName, customers);

        // Assert
        assertCustomersWereWrittenToFile(fileWriter, fileName, expected);
      },
    );
  });
});

function assertCustomersWereWrittenToFile(
  fileWriter: FileWriter,
  fileName: string,
  expected: string[],
) {
  for (const expectedValue of expected) {
    assertCustomerWasWrittenToFile(fileWriter, fileName, expectedValue);
  }
  expect(fileWriter.writeLine).toHaveBeenCalledTimes(expected.length);
}
function assertCustomerWasWrittenToFile(
  fileWriter: FileWriter,
  fileName: string,
  expected: string,
) {
  expect(fileWriter.writeLine).toHaveBeenCalledWith(fileName, expected);
}
function createCustomerCsvFileWriter(fileWriter: FileWriter) {
  return new CustomerCsvFileWriter(fileWriter);
}

function createFileWriter(): FileWriter {
  return {
    writeLine: jest.fn(),
  };
}

function createCustomer(name: string, contactNumber: string) {
  return new Customer(name, contactNumber);
}
