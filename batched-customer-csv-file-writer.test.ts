import { BatchedCustomerCsvFileWriter } from "./batched-customer-csv-file-writer";
import { Customer } from "./customer";
import { createCustomer, createCustomerCsvFileWriter, createFileWriter } from "./customer-csv-file-writer.test";
import { FileWriter } from "./file-writer";

describe(BatchedCustomerCsvFileWriter.name, () => {
  describe('Should write one file per 10 customers.', () => {
    test('Given 12 customers should batch in 10 and 2.', () => {
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
          { csvLine: 'Peter Wiles,1234569123', fileName: 'cust-0.csv' },
          { csvLine: 'Brendon Page,789789789', fileName: 'cust-0.csv' },
          { csvLine: 'Bob,8888888', fileName: 'cust-0.csv' },
          { csvLine: 'Ronald McDonald,55588877', fileName: 'cust-0.csv' },
          { csvLine: 'John Kennedy,1111111', fileName: 'cust-0.csv' },
          { csvLine: 'Juan Peron,123456789', fileName: 'cust-0.csv' },
          { csvLine: 'Alan Alan,41474147', fileName: 'cust-0.csv' },
          { csvLine: 'Peter McKenzie,789789', fileName: 'cust-0.csv' },
          { csvLine: 'Asdasd asd,11111111', fileName: 'cust-0.csv' },
          { csvLine: 'Lionel Messi,123456789', fileName: 'cust-0.csv' },
          { csvLine: 'Emiliano Martinez,999999999', fileName: 'cust-1.csv' },
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
      const sut = createBatchedCustomerCsvFileWriter(mockFileWriter);
  
      // Act
      sut.writeCustomers(data.fileName, customers);
  
      // Assert
      mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
        data.fileName,
        data.expected,
      );
    });
    test('Given 23 customers should batch in 10, 10 and 3', () => {
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
            customerName: 'c',
            customerNumber: '3',
          },
          {
            customerName: 'd',
            customerNumber: '4',
          },
          {
            customerName: 'e',
            customerNumber: '5',
          },
          {
            customerName: 'f',
            customerNumber: '6',
          },
          {
            customerName: 'g',
            customerNumber: '7',
          },
          {
            customerName: 'h',
            customerNumber: '8',
          },
          {
            customerName: 'i',
            customerNumber: '9',
          },
          {
            customerName: 'j',
            customerNumber: '10',
          },
          {
            customerName: 'k',
            customerNumber: '11',
          },
          {
            customerName: 'l',
            customerNumber: '12',
          },
          {
            customerName: 'm',
            customerNumber: '13',
          },
          {
            customerName: 'n',
            customerNumber: '14',
          },
          {
            customerName: 'o',
            customerNumber: '15',
          },
          {
            customerName: 'p',
            customerNumber: '16',
          },
          {
            customerName: 'q',
            customerNumber: '17',
          },
          {
            customerName: 'r',
            customerNumber: '18',
          },
          {
            customerName: 's',
            customerNumber: '19',
          },
          {
            customerName: 't',
            customerNumber: '20',
          },
          {
            customerName: 'u',
            customerNumber: '21',
          },
          {
            customerName: 'v',
            customerNumber: '22',
          },
          {
            customerName: 'w',
            customerNumber: '23',
          },
        ],
        fileName: 'cust',
        expected: [
          { csvLine: 'a,1', fileName: 'cust-0' },
          { csvLine: 'b,2', fileName: 'cust-0' },
          { csvLine: 'c,3', fileName: 'cust-0' },
          { csvLine: 'd,4', fileName: 'cust-0' },
          { csvLine: 'e,5', fileName: 'cust-0' },
          { csvLine: 'f,6', fileName: 'cust-0' },
          { csvLine: 'g,7', fileName: 'cust-0' },
          { csvLine: 'h,8', fileName: 'cust-0' },
          { csvLine: 'i,9', fileName: 'cust-0' },
          { csvLine: 'j,10', fileName: 'cust-0' },
          { csvLine: 'k,11', fileName: 'cust-1' },
          { csvLine: 'l,12', fileName: 'cust-1' },
          { csvLine: 'm,13', fileName: 'cust-1' },
          { csvLine: 'n,14', fileName: 'cust-1' },
          { csvLine: 'o,15', fileName: 'cust-1' },
          { csvLine: 'p,16', fileName: 'cust-1' },
          { csvLine: 'q,17', fileName: 'cust-1' },
          { csvLine: 'r,18', fileName: 'cust-1' },
          { csvLine: 's,19', fileName: 'cust-1' },
          { csvLine: 't,20', fileName: 'cust-1' },
          { csvLine: 'u,21', fileName: 'cust-2' },
          { csvLine: 'v,22', fileName: 'cust-2' },
          { csvLine: 'w,23', fileName: 'cust-2' },
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
      const sut = createBatchedCustomerCsvFileWriter(mockFileWriter);
  
      // Act
      sut.writeCustomers(data.fileName, customers);
  
      // Assert
      mockFileWriter.assertMoreThanTenCustomersWereWrittenToFile(
        data.fileName,
        data.expected,
      );
    });
  });
})

function createBatchedCustomerCsvFileWriter(fileWriter: FileWriter) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new BatchedCustomerCsvFileWriter(csvFileWriter);
}