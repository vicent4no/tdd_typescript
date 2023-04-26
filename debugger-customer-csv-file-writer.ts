import { BatchedCustomerCsvFileWriter } from './batched-customer-csv-file-writer';
import { Customer } from './customer';
import { CustomerFileWriter } from './customer-csv-file-writer';
import { DeduplicatingCustomerCsvFileWriter } from './deduplicating-customer-csv-file-writer';

export class DebuggerCustomerCsvFileWriter implements CustomerFileWriter {
  constructor(private readonly deduplicatingCsvFileWriter: DeduplicatingCustomerCsvFileWriter, private readonly batchedCsvFileWriter: BatchedCustomerCsvFileWriter) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    this.deduplicatingCsvFileWriter.writeCustomers(fileName, customers);
  }

  public writeCustomersDebug(fileName: string, customers: Customer[]) {
    this.batchedCsvFileWriter.writeCustomers(fileName, customers);
  }
}
