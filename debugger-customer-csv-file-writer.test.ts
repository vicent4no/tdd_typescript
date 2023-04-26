import { Customer } from './customer';
import {
  createCustomer,
  createDebuggerCustomerCsvFileWriter,
  createFileWriter,
} from './customer-csv-helpers';
import { DebuggerCustomerCsvFileWriter } from './debugger-customer-csv-file-writer';

describe(DebuggerCustomerCsvFileWriter.name, () => {
  describe('writeCustomers', () => {
    describe('Should write in batches without duplicates', () => {
      test('Given 23 customers with 6 duplicates and batches of 4 should return batches of 4, 4, 4, 4, and 1', () => {
        const data = {
          customersData: [
            {
              customerName: 'a',
              customerNumber: '1',
            },
            {
              customerName: 'b',
              customerNumber: '2',
            },
            {
              customerName: 'b',
              customerNumber: '3',
            },
            {
              customerName: 'c',
              customerNumber: '4',
            },
            {
              customerName: 'd',
              customerNumber: '5',
            },
            {
              customerName: 'e',
              customerNumber: '6',
            },
            {
              customerName: 'e',
              customerNumber: '7',
            },
            {
              customerName: 'f',
              customerNumber: '8',
            },
            {
              customerName: 'g',
              customerNumber: '9',
            },
            {
              customerName: 'h',
              customerNumber: '10',
            },
            {
              customerName: 'e',
              customerNumber: '11',
            },
            {
              customerName: 'i',
              customerNumber: '12',
            },
            {
              customerName: 'j',
              customerNumber: '13',
            },
            {
              customerName: 'k',
              customerNumber: '14',
            },
            {
              customerName: 'l',
              customerNumber: '15',
            },
            {
              customerName: 'j',
              customerNumber: '16',
            },
            {
              customerName: 'k',
              customerNumber: '17',
            },
            {
              customerName: 'j',
              customerNumber: '18',
            },
            {
              customerName: 'l',
              customerNumber: '19',
            },
            {
              customerName: 'm',
              customerNumber: '20',
            },
            {
              customerName: 'n',
              customerNumber: '21',
            },
            {
              customerName: 'o',
              customerNumber: '22',
            },
            {
              customerName: 'p',
              customerNumber: '23',
            },
            {
              customerName: 'q',
              customerNumber: '24',
            },
          ],
          fileName: 'cust',
          batchSize: 4,
          expected: [
            { csvLine: 'a,1', fileName: 'cust-0' },
            { csvLine: 'b,2', fileName: 'cust-0' },
            { csvLine: 'c,4', fileName: 'cust-0' },
            { csvLine: 'd,5', fileName: 'cust-0' },
            { csvLine: 'e,6', fileName: 'cust-1' },
            { csvLine: 'f,8', fileName: 'cust-1' },
            { csvLine: 'g,9', fileName: 'cust-1' },
            { csvLine: 'h,10', fileName: 'cust-1' },
            { csvLine: 'i,12', fileName: 'cust-2' },
            { csvLine: 'j,13', fileName: 'cust-2' },
            { csvLine: 'k,14', fileName: 'cust-2' },
            { csvLine: 'l,15', fileName: 'cust-2' },
            { csvLine: 'm,20', fileName: 'cust-3' },
            { csvLine: 'n,21', fileName: 'cust-3' },
            { csvLine: 'o,22', fileName: 'cust-3' },
            { csvLine: 'p,23', fileName: 'cust-3' },
            { csvLine: 'q,24', fileName: 'cust-4' },
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
        const mockFileWriter = createFileWriter();
        const batchSize = data.batchSize;
        const sut = createDebuggerCustomerCsvFileWriter(
          mockFileWriter,
          batchSize,
        );
        // Act
        sut.writeCustomers(data.fileName, customers);

        // Assert
        mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
          data.fileName,
          data.expected,
        );
      });
    });
  });

  describe('writeCustomersDebug', () => {
    describe('Should write in batches of 20 with duplicates', () => {
      test('Given 24 customers that include duplicates should return two files with 20 and 4 size (batched by 20)', () => {
        const data = {
          customersData: [
            {
              customerName: 'a',
              customerNumber: '1',
            },
            {
              customerName: 'b',
              customerNumber: '2',
            },
            {
              customerName: 'b',
              customerNumber: '3',
            },
            {
              customerName: 'c',
              customerNumber: '4',
            },
            {
              customerName: 'd',
              customerNumber: '5',
            },
            {
              customerName: 'e',
              customerNumber: '6',
            },
            {
              customerName: 'e',
              customerNumber: '7',
            },
            {
              customerName: 'f',
              customerNumber: '8',
            },
            {
              customerName: 'g',
              customerNumber: '9',
            },
            {
              customerName: 'h',
              customerNumber: '10',
            },
            {
              customerName: 'e',
              customerNumber: '11',
            },
            {
              customerName: 'i',
              customerNumber: '12',
            },
            {
              customerName: 'j',
              customerNumber: '13',
            },
            {
              customerName: 'k',
              customerNumber: '14',
            },
            {
              customerName: 'l',
              customerNumber: '15',
            },
            {
              customerName: 'j',
              customerNumber: '16',
            },
            {
              customerName: 'k',
              customerNumber: '17',
            },
            {
              customerName: 'j',
              customerNumber: '18',
            },
            {
              customerName: 'l',
              customerNumber: '19',
            },
            {
              customerName: 'm',
              customerNumber: '20',
            },
            {
              customerName: 'n',
              customerNumber: '21',
            },
            {
              customerName: 'o',
              customerNumber: '22',
            },
            {
              customerName: 'p',
              customerNumber: '23',
            },
            {
              customerName: 'q',
              customerNumber: '24',
            },
          ],
          fileName: 'cust',
          batchSize: 20,
          expected: [
            { csvLine: 'a,1', fileName: 'cust-0' },
            { csvLine: 'b,2', fileName: 'cust-0' },
            { csvLine: 'b,3', fileName: 'cust-0' },
            { csvLine: 'c,4', fileName: 'cust-0' },
            { csvLine: 'd,5', fileName: 'cust-0' },
            { csvLine: 'e,6', fileName: 'cust-0' },
            { csvLine: 'e,7', fileName: 'cust-0' },
            { csvLine: 'f,8', fileName: 'cust-0' },
            { csvLine: 'g,9', fileName: 'cust-0' },
            { csvLine: 'h,10', fileName: 'cust-0' },
            { csvLine: 'e,11', fileName: 'cust-0' },
            { csvLine: 'i,12', fileName: 'cust-0' },
            { csvLine: 'j,13', fileName: 'cust-0' },
            { csvLine: 'k,14', fileName: 'cust-0' },
            { csvLine: 'l,15', fileName: 'cust-0' },
            { csvLine: 'j,16', fileName: 'cust-0' },
            { csvLine: 'k,17', fileName: 'cust-0' },
            { csvLine: 'j,18', fileName: 'cust-0' },
            { csvLine: 'l,19', fileName: 'cust-0' },
            { csvLine: 'm,20', fileName: 'cust-0' },
            { csvLine: 'n,21', fileName: 'cust-1' },
            { csvLine: 'o,22', fileName: 'cust-1' },
            { csvLine: 'p,23', fileName: 'cust-1' },
            { csvLine: 'q,24', fileName: 'cust-1' },
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
        const mockFileWriter = createFileWriter();
        const batchSize = data.batchSize;
        const sut = createDebuggerCustomerCsvFileWriter(
          mockFileWriter,
          batchSize,
        );
        // Act
        sut.writeCustomersDebug(data.fileName, customers);

        // Assert
        mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
          data.fileName,
          data.expected,
        );
      })
    });
  });
});
