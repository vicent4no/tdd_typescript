import { Customer } from "./customer";
import { CustomerCsvFileWriter } from "./customer-csv-file-writer";

export class BatchedCustomerCsvFileWriter {
  constructor(private readonly csvFileWriter: CustomerCsvFileWriter) {}

  
  public writeCustomers(fileName: string, customers: Customer[]) {
    if (customers.length > 10) {
      const splittedBaseName = fileName.split('.');
      const batchCount = Math.ceil(customers.length / 10);

      for (let batch = 0; batch <= batchCount; batch++) {
        const batchStart = batch * 10;
        const batchEnd = batchStart + 10;
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