import { Calculator } from "../src/calculator";

describe("Calculator addition function tests", () => {
    let calculator: Calculator;
    const testCases = [
        {
            a: 5,
            b: 3,
            expectedResult: 8,
        },
        {
            a: 3,
            b: 5,
            expectedResult: 8,
        },
        {
            a: 5,
            b: -3,
            expectedResult: 2,
        },
        {
            a: 5,
            b: -7,
            expectedResult: -2,
        },
        {
            a: -5,
            b: -2,
            expectedResult: -7,
        },
        {
            a: 5,
            b: 0,
            expectedResult: 5,
        },
        {
            a: 0,
            b: 5,
            expectedResult: 5,
        },
        {
            a: -2,
            b: 5,
            expectedResult: 3,
        },
        {
            a: 5.2,
            b: 3.3,
            expectedResult: 8.5,
        },
        // Overflow. Needs more protection in the calculator?
        // Yes, test brings this issue out in the second floating point test case.
        {
            a: 5.2,
            b: -3.3,
            expectedResult: 1.9000000000000004,
        },
        {
            a: -3.3,
            b: 5.2,
            expectedResult: 1.9000000000000004, // !
        },
    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have 2 numbers, When I add them together, Then the sum of the two numbers is returned (${testCase.a} + ${testCase.b} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Add(testCase.a, testCase.b);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
