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

  describe('Different behaviour for more than 10 customers.\nShould write one file per 10 customers.\n.', () => {
    test('12 customers', () => {
      const data = {
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
          {
            customerName: 'Ronald McDonald',
            customerNumber: '55588877',
          },
          {
            customerName: 'John Kennedy',
            customerNumber: '1111111',
          },
          {
            customerName: 'Juan Peron',
            customerNumber: '123456789',
          },
          {
            customerName: 'Alan Alan',
            customerNumber: '41474147',
          },
          {
            customerName: 'Peter McKenzie',
            customerNumber: '789789',
          },
          {
            customerName: 'Asdasd asd',
            customerNumber: '11111111',
          },
          {
            customerName: 'Lionel Messi',
            customerNumber: '123456789',
          },
          {
            customerName: 'Emiliano Martinez',
            customerNumber: '999999999',
          },
          {
            customerName: 'Kylian Mbappe',
            customerNumber: '2222222',
          },
        ],
        fileName: 'cust.csv',
        expected: [
          { csvLine: 'Peter Wiles,1234569123', fileName: '0-cust.csv' },
          { csvLine: 'Brendon Page,789789789', fileName: '0-cust.csv' },
          { csvLine: 'Bob,8888888', fileName: '0-cust.csv' },
          { csvLine: 'Ronald McDonald,55588877', fileName: '0-cust.csv' },
          { csvLine: 'John Kennedy,1111111', fileName: '0-cust.csv' },
          { csvLine: 'Juan Peron,123456789', fileName: '0-cust.csv' },
          { csvLine: 'Alan Alan,41474147', fileName: '0-cust.csv' },
          { csvLine: 'Peter McKenzie,789789', fileName: '0-cust.csv' },
          { csvLine: 'Asdasd asd,11111111', fileName: '0-cust.csv' },
          { csvLine: 'Lionel Messi,123456789', fileName: '0-cust.csv' },
          { csvLine: 'Emiliano Martinez,999999999', fileName: '1-cust.csv' },
          { csvLine: 'Kylian Mbappe,2222222', fileName: '1-cust.csv' },
        ],
      };
      // Arrange
      const customers: Customer[] = [];
      for (const customerData of data.customersData) {
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
      sut.writeCustomers(data.fileName, customers);

      // Assert
      assertMoreThanTenCustomersWereWrittenToFile(
        fileWriter,
        data.fileName,
        data.expected,
      );
    });
  });
});

function assertMoreThanTenCustomersWereWrittenToFile(
  fileWriter: FileWriter,
  fileName: string,
  expected: { csvLine: string; fileName: string }[],
) {
  for (const expectedValues of expected) {
    assertCustomerWasWrittenToFile(
      fileWriter,
      expectedValues.fileName,
      expectedValues.csvLine,
    );
  }
  expect(fileWriter.writeLine).toHaveBeenCalledTimes(expected.length);
}

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
