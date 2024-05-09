import { Calculator } from "../src/calculator";

describe("Calculator multiplication function tests", () => {
    let calculator: Calculator;

    const testCases = [
        {
            a: 5,
            b: 3,
            expectedResult: 15,
        },
        {
            a: 3,
            b: 5,
            expectedResult: 15,
        },
        {
            a: 5,
            b: -3,
            expectedResult: -15,
        },
        {
            a: 5,
            b: -7,
            expectedResult: -35,
        },
        {
            a: -5,
            b: -2,
            expectedResult: 10,
        },
        {
            a: 5,
            b: 0,
            expectedResult: 0,
        },
        {
            a: 0,
            b: 5,
            expectedResult: 0,
        },
        {
            a: -2,
            b: 5,
            expectedResult: -10,
        },
        // Floating point overflow!
        {
            a: 5.2,
            b: 3.3,
            expectedResult: 17.16,
        },
        {
            a: 5.2,
            b: -3.3,
            expectedResult: -17.16,
        },
        {
            a: -3.3,
            b: 5.2,
            expectedResult: -17.16,
        },
    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have 2 numbers, When I multiply them, Then the two numbers multiplication result is returned (${testCase.a} * ${testCase.b} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Multiply(testCase.a, testCase.b);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
