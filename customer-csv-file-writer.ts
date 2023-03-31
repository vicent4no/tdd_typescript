import { FileWriter } from './file-writer';
import { Customer } from './customer';
export class CustomerCsvFileWriter {
  constructor(private readonly fileWriter: FileWriter) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    if (customers === null) throw new Error('Null customers');

    const originalCustomers = [...customers];

    if (customers.length > 10) {
      for (let i = 0; i <= customers.length; i += 10) {
        const fileNameInIteration = fileName.split('.');
        fileNameInIteration[0] = `${i / 10}-${fileNameInIteration[0]}`;

        this.writeTenCustomers(
          originalCustomers.splice(0, 10),
          fileNameInIteration.join('.'),
        );
      }
    } else {
      this.writeTenCustomers(originalCustomers, fileName);
    }
  }

  private writeTenCustomers(customers: Customer[], fileName: string) {
    const copiedCustomers: Customer[] = [...customers];

    for (const customer of copiedCustomers) {
      this.fileWriter.writeLine(fileName, this.formatAsCsvRow(customer));
    }
  }

  private formatAsCsvRow(customer: Customer): string {
    return `${customer.name},${customer.contactNumber}`;
  }
}
