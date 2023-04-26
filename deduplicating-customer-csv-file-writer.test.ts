import { Customer } from './customer';
import { createBatchedCustomerCsvFileWriterWithBatchSize, createCustomer, createCustomerCsvFileWriter, createDeduplicatingCustomerCsvFileWriter, createFileWriter } from './customer-csv-helpers';
import { DeduplicatingCustomerCsvFileWriter } from './deduplicating-customer-csv-file-writer';

describe(DeduplicatingCustomerCsvFileWriter.name, () => {
  describe('writeCustomers', () => {
    describe('no duplicates', () => {
      describe('unbatched', () => {
        test('Given 12 unduplicated customers should write 12 lines in one file', () => {
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
            fileName: 'deduped.csv',
            expected: [
              { csvLine: 'Peter Wiles,1234569123', fileName: 'deduped.csv' },
              { csvLine: 'Brendon Page,789789789', fileName: 'deduped.csv' },
              { csvLine: 'Bob,8888888', fileName: 'deduped.csv' },
              { csvLine: 'Ronald McDonald,55588877', fileName: 'deduped.csv' },
              { csvLine: 'John Kennedy,1111111', fileName: 'deduped.csv' },
              { csvLine: 'Juan Peron,123456789', fileName: 'deduped.csv' },
              { csvLine: 'Alan Alan,41474147', fileName: 'deduped.csv' },
              { csvLine: 'Peter McKenzie,789789', fileName: 'deduped.csv' },
              { csvLine: 'Asdasd asd,11111111', fileName: 'deduped.csv' },
              { csvLine: 'Lionel Messi,123456789', fileName: 'deduped.csv' },
              {
                csvLine: 'Emiliano Martinez,999999999',
                fileName: 'deduped.csv',
              },
              { csvLine: 'Kylian Mbappe,2222222', fileName: 'deduped.csv' },
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
          const sut = createDeduplicatingCustomerCsvFileWriter(
            createCustomerCsvFileWriter(mockFileWriter),
          );

          // Act
          sut.writeCustomers(data.fileName, customers);

          // Assert
          mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
            data.fileName,
            data.expected,
          );
        });

        test('Given 12 customers with 3 duplicates should write 9 lines in one file', () => {
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
                customerName: 'Peter Wiles',
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
                customerName: 'Bob',
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
                customerName: 'Alan Alan',
                customerNumber: '2222222',
              },
            ],
            fileName: 'deduped.csv',
            expected: [
              { csvLine: 'Peter Wiles,1234569123', fileName: 'deduped.csv' },
              { csvLine: 'Brendon Page,789789789', fileName: 'deduped.csv' },
              { csvLine: 'Bob,8888888', fileName: 'deduped.csv' },
              { csvLine: 'John Kennedy,1111111', fileName: 'deduped.csv' },
              { csvLine: 'Juan Peron,123456789', fileName: 'deduped.csv' },
              { csvLine: 'Alan Alan,41474147', fileName: 'deduped.csv' },
              { csvLine: 'Peter McKenzie,789789', fileName: 'deduped.csv' },
              { csvLine: 'Lionel Messi,123456789', fileName: 'deduped.csv' },
              {
                csvLine: 'Emiliano Martinez,999999999',
                fileName: 'deduped.csv',
              },
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
          const sut = createDeduplicatingCustomerCsvFileWriter(
            createCustomerCsvFileWriter(mockFileWriter),
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

      describe('batched', () => {
        test('Given 12 unduplicated customers and batches by 7 should return a batch of 7 and another of 5', () => {
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
            batchSize: 7,
            expected: [
              { csvLine: 'Peter Wiles,1234569123', fileName: 'cust-0.csv' },
              { csvLine: 'Brendon Page,789789789', fileName: 'cust-0.csv' },
              { csvLine: 'Bob,8888888', fileName: 'cust-0.csv' },
              { csvLine: 'Ronald McDonald,55588877', fileName: 'cust-0.csv' },
              { csvLine: 'John Kennedy,1111111', fileName: 'cust-0.csv' },
              { csvLine: 'Juan Peron,123456789', fileName: 'cust-0.csv' },
              { csvLine: 'Alan Alan,41474147', fileName: 'cust-0.csv' },
              { csvLine: 'Peter McKenzie,789789', fileName: 'cust-1.csv' },
              { csvLine: 'Asdasd asd,11111111', fileName: 'cust-1.csv' },
              { csvLine: 'Lionel Messi,123456789', fileName: 'cust-1.csv' },
              {
                csvLine: 'Emiliano Martinez,999999999',
                fileName: 'cust-1.csv',
              },
              { csvLine: 'Kylian Mbappe,2222222', fileName: 'cust-1.csv' },
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
          const sut = createDeduplicatingCustomerCsvFileWriter(
            createBatchedCustomerCsvFileWriterWithBatchSize(mockFileWriter, 7),
          );

          // Act
          sut.writeCustomers(data.fileName, customers);

          // Assert
          mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
            data.fileName,
            data.expected,
          );
        });

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
          const sut = createDeduplicatingCustomerCsvFileWriter(
            createBatchedCustomerCsvFileWriterWithBatchSize(
              mockFileWriter,
              batchSize,
            ),
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
  });
});

