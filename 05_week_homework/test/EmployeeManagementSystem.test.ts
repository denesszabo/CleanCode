import { EmployeeManagementSystem } from '../src/EmployeeManagementSystem';
import { EmployeeStorage } from '../src/EmployeeStorage';
import {PayrollReport} from "../src/PayrollReport";

describe('EmployeeManagementSystem tests', () => {
    let sut: EmployeeManagementSystem;

    beforeEach(() => {
        sut = new EmployeeManagementSystem(new EmployeeStorage(), new PayrollReport());
    })

    describe('Happy path', () => {

        it('Should calculate the payroll', () => {
            // Arrange

            // Act
            const actualResult: number = sut.calculatePayroll();

            // Assert
            expect(actualResult).toBe(29000);
        })

        it('Should propmote Amanda to rise the salary to 20000 and generate the payroll', () => {
            // Arrange

            // Act
            let payroll: number = sut.calculatePayroll();

            // Assert
            expect(payroll).toBe(29000);

            // Act
            let employee = sut.getEmployeeByName('Amanda');

            // Assert
            expect(employee.getSalary()).toBe(11000);

            // Act
            sut.promoteEmployee(employee, 20000);
            payroll = sut.calculatePayroll();

            // Assert
            expect(payroll).toBe(38000);

        })
    })

})
