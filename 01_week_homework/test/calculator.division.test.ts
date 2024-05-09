import { Calculator } from "../src/calculator";

describe("Calculator division function tests", () => {
    let calculator: Calculator;

    const testCases = [
        {
            a: 15,
            b: 3,
            expectedResult: 5,
        },
        {
            a: 3,
            b: 5,
            expectedResult: 0.6,
        },
        {
            a: 5,
            b: -3,
            expectedResult: -1.6666666666666667,
        },
        {
            a: 5,
            b: -7,
            expectedResult: -0.7142857142857143,
        },
        {
            a: -5,
            b: -2,
            expectedResult: 2.5,
        },
        {
            a: 5,
            b: 0,
            expectedResult: Infinity,
        },
        {
            a: 5,
            b: -0,
            expectedResult: -Infinity,
        },
        {
            a: 0,
            b: 5,
            expectedResult: 0,
        },
        {
            a: -2,
            b: 5,
            expectedResult: -0.4,
        },
        {
            a: 5.2,
            b: 3.3,
            expectedResult: 1.575757575757576,
        },
        {
            a: 5.2,
            b: -3.3,
            expectedResult: -1.575757575757576,
        },
        {
            a: -3.3,
            b: 5.2,
            expectedResult: -0.6346153846153846,
        },
    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have 2 numbers, When I divide them, Then the two numbers division result is returned (${testCase.a} / ${testCase.b} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Divide(testCase.a, testCase.b);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
