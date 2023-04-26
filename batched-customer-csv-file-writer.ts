import { Customer } from './customer';
import { CustomerFileWriter } from './customer-csv-file-writer';

export class BatchedCustomerCsvFileWriter implements CustomerFileWriter {
  constructor(
    private readonly csvFileWriter: CustomerFileWriter,
    private readonly batchSize: number = 10,
  ) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    if (customers.length > this.batchSize) {
      const splittedBaseName = fileName.split('.');
      const batchCount = Math.ceil(customers.length / this.batchSize);

      for (let batch = 0; batch <= batchCount; batch++) {
        const batchStart = batch * this.batchSize;
        const batchEnd = batchStart + this.batchSize;
        const batchFileName = `${splittedBaseName[0]}-${batch}${
          splittedBaseName[1] ? '.' + splittedBaseName[1] : ''
        }`;

        this.csvFileWriter.writeCustomers(
          batchFileName,
          customers.slice(batchStart, batchEnd),
        );
      }
    } else {
      this.csvFileWriter.writeCustomers(fileName, customers);
    }
  }
}
