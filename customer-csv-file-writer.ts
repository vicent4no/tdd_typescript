import { FileWriter } from './file-writer';
import { Customer } from './customer';
export class CustomerCsvFileWriter {
  constructor(private readonly fileWriter: FileWriter) {}

  public writeCustomers(fileName: string, customers: Customer[]) {
    if (customers === null) throw new Error('Null customers');

    const copiedCustomers: Customer[] = [...customers];

    for (const customer of copiedCustomers) {
      this.fileWriter.writeLine(fileName, this.formatAsCsvRow(customer));
    }
  }

  private formatAsCsvRow(customer: Customer): string {
    return `${customer.name},${customer.contactNumber}`;
  }
}
