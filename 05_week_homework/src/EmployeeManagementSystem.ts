import {EmployeeStorage} from "./EmployeeStorage";
import {Employee} from "./Employee";
import {PayrollReport} from "./PayrollReport";

export class EmployeeManagementSystem {
    private employees: Employee[] = [];

    constructor(private employeeStorage: EmployeeStorage, private payrollReport: PayrollReport) {
        this.employeeStorage = employeeStorage;
    }

    public addEmployee(employee: Employee): void {
        // Real-world code to add employee to the system
        this.employeeStorage.addEmployee(employee);
    }

    public generateReports(): string {
        const employees = this.employeeStorage.getEmployees();
        const report = this.payrollReport.generateReport(employees);
        console.log(report);

        return report;
    }

    public calculatePayroll(): number {
        const employees = this.employeeStorage.getEmployees();
        const totalPayroll = this.payrollReport.calculateTotalPayroll(employees);
        return totalPayroll;
    }

    public getEmployeeByName(name: string): Employee {
        return this.employeeStorage.getEmployeeByName(name);
    }
    public promoteEmployee(employee: Employee, newSalary: number): void {
        employee.setSalary(newSalary);
        this.employeeStorage.updateEmployee(employee);
    }
}
