import { Customer } from './customer';
import { CustomerFileWriter } from './customer-csv-file-writer';

export class DeduplicatingCustomerCsvFileWriter implements CustomerFileWriter {
  constructor(private readonly csvFileWriter: CustomerFileWriter) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    const deduplicatedCustomers = [...customers].filter(
      (customer, index, array) =>
        array.findIndex((cust) => cust.name === customer.name) === index,
    );

    this.csvFileWriter.writeCustomers(fileName, deduplicatedCustomers);
  }
}
