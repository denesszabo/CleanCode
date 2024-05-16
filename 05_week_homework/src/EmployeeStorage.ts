import { Employee } from "./Employee";
import {EmployeeNotFound} from "./error/EmployeeNotFound";
export class EmployeeStorage {

    private employees: Employee[] = [];
    constructor() {
        this.employees.push(new Employee('John', 10000));
        this.employees.push(new Employee('Bon', 8000));
        this.employees.push(new Employee('Amanda', 11000));
    }

    public getEmployeeByName(name: string): Employee {
        for ( let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].getName() === name) {
                return this.employees[i];
            }
        }
        throw new EmployeeNotFound('Employee not found');
    }

    public addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    public getEmployees(): Employee[] {
        return this.employees;
    }

    public updateEmployee(changed: Employee): boolean {
        let success = false;
        for ( let i = 0; i < this.employees.length; i++) {
            if (this.employees[i].getName() === changed.getName()) {
                this.employees[i] = changed;
                success = true;
            }
        }

        console.log(this.employees);

        return success;
    }
}
