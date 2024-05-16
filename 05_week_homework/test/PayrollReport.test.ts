import { PayrollReport } from "../src/PayrollReport";
import { Employee } from "../src/Employee";

describe('PayrollReport tests', () => {

    it('should give an empty report string', () => {
        // Arrange
        const sut = new PayrollReport();

        // Act

        const actualResult = sut.generateReport([]);

        // Assert
        expect(actualResult).toBe("");
    });

    it('should give the report string', () => {
        // Arrange
        const sut = new PayrollReport();
        const employees: Employee[] = [];

        employees.push(new Employee('John', 10000));
        employees.push(new Employee('Bon', 8000));

        const expectedResult = "Name: John, salary: 10000\nName: Bon, salary: 8000\nTotal salary: 18000";
        // Act

        const actualResult = sut.generateReport(employees);

        console.log(actualResult);
        // Assert
        expect(actualResult.length).toBeGreaterThan(0);
        expect(actualResult).toBe(expectedResult);
    });


})
