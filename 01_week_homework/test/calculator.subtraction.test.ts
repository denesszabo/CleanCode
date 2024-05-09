import { Calculator } from "../src/calculator";

describe("Calculator subtraction function tests", () => {
    let calculator: Calculator;

    const testCases = [
        {
            a: 5,
            b: 3,
            expectedResult: 2,
        },
        {
            a: 3,
            b: 5,
            expectedResult: -2,
        },
        {
            a: 5,
            b: -3,
            expectedResult: 8,
        },
        {
            a: 5,
            b: -7,
            expectedResult: 12,
        },
        {
            a: -5,
            b: -2,
            expectedResult: -3,
        },
        {
            a: 5,
            b: 0,
            expectedResult: 5,
        },
        {
            a: 0,
            b: 5,
            expectedResult: -5,
        },
        {
            a: -2,
            b: 5,
            expectedResult: -7,
        },
        // Floating point overflow!
        {
            a: 5.2,
            b: 3.3,
            expectedResult: 5.2 - 3.3,
        },
        {
            a: 5.2,
            b: -3.3,
            expectedResult: 8.5,
        },
        {
            a: -3.3,
            b: 5.2,
            expectedResult: -3.3 - 5.2,
        },
    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have 2 numbers, When I subtract them, Then the sum of the two numbers is returned (${testCase.a} - ${testCase.b} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Sub(testCase.a, testCase.b);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
