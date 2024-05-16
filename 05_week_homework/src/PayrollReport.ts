import {Employee} from "./Employee";

export class PayrollReport {

    public generateReport(employees: Employee[]): string {
        let report = [];
        if (employees.length === 0) {
            return '';
        }

        employees.forEach((employee) => {
            report.push("Name: " + employee.getName() + ", salary: " + employee.calculateSalary());
        });

        report.push("Total salary: " + this.calculateTotalPayroll(employees));
        return report.join("\n");
    }

    public calculateTotalPayroll(employees: Employee[]): number {
        let totalPayroll = 0;
        employees.forEach((employee) => {
            totalPayroll += employee.calculateSalary();
        });
        return totalPayroll;
    }
}
