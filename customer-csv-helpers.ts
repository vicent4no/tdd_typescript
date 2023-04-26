import { BatchedCustomerCsvFileWriter } from "./batched-customer-csv-file-writer";
import { Customer } from "./customer";
import { CustomerCsvFileWriter, CustomerFileWriter } from "./customer-csv-file-writer";
import { DeduplicatingCustomerCsvFileWriter } from "./deduplicating-customer-csv-file-writer";
import { FileWriter } from "./file-writer";


export function createCustomer(name: string, contactNumber: string) {
  return new Customer(name, contactNumber);
}

export interface MockFileWriter extends FileWriter {
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

export function createCustomerCsvFileWriter(fileWriter: FileWriter) {
  return new CustomerCsvFileWriter(fileWriter);
}

export function createBatchedCustomerCsvFileWriter(fileWriter: FileWriter) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new BatchedCustomerCsvFileWriter(csvFileWriter);
}

export function createBatchedCustomerCsvFileWriterWithBatchSize(
  fileWriter: FileWriter,
  batchSize: number,
) {
  const csvFileWriter = createCustomerCsvFileWriter(fileWriter);
  return new BatchedCustomerCsvFileWriter(csvFileWriter, batchSize);
}

export function createDeduplicatingCustomerCsvFileWriter(
  csvFileWriter: CustomerFileWriter,
) {
  return new DeduplicatingCustomerCsvFileWriter(csvFileWriter);
}




