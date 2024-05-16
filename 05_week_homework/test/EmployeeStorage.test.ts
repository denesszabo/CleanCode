import { EmployeeStorage } from '../src/EmployeeStorage';
import {Employee} from "../src/Employee";

describe('Employee tests', () => {
    it('Should return the employee John', () => {
        // Arrange
        const employeeStorage = new EmployeeStorage();

        // Act1
        const actualResult: Employee | null = employeeStorage.getEmployeeByName('John');

        // Assert
        expect(actualResult).toMatchSnapshot('John');
    })

    it('Should return all employee ', () => {
        // Arrange
        const employeeStorage = new EmployeeStorage();

        // Act
        const actualResult = employeeStorage.getEmployees();

        // Assert
        expect(actualResult).toMatchSnapshot('John');
        expect(actualResult).toMatchSnapshot( 'Bon');
        expect(actualResult).toMatchSnapshot( 'Amanda');
    })
    // @todo This test is working just for my test data!
    it('Should add one more employee to the list', () => {
        return;
        // Arrange
        const employeeStorage = new EmployeeStorage();
        const employee: Employee = new Employee('Wick', 20000)
        // Act
        employeeStorage.addEmployee(employee);

        const actualResult = employeeStorage.getEmployees();
        // Assert
        expect(actualResult.length).toBe(4);
        expect(actualResult).toMatchSnapshot('John');
        expect(actualResult).toMatchSnapshot( 'Bon');
        expect(actualResult).toMatchSnapshot( 'Amanda');
        expect(actualResult).toMatchSnapshot( 'Wick');
    })

    // @todo This test is working just for my test data!
    it('Should update an employee', () => {
        return;
        // Arrange
        const employeeStorage = new EmployeeStorage();
        const newName = 'Samantha';
        let employee: Employee = employeeStorage.getEmployeeByName('Amanda');

        // Assert
        expect(employee).not.toBeNull();

        // Act
        employee.setName(newName);
        employee.setSalary(25000);
        const success:boolean = employeeStorage.updateEmployee(employee);

        // Assert
        expect(success).toBe(true);

        // Act
        employee = employeeStorage.getEmployeeByName(newName);

        // Assert
        expect(employee.getName()).toBe('Samantha');
        expect(employee.getSalary()).toBe(2500);
    })

})
