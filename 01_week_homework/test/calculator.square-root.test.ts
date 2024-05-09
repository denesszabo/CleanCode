import { Calculator } from "../src/calculator";

describe("Calculator square root function tests", () => {
    let calculator: Calculator;

    const testCases = [
        {
            a: 0,
            expectedResult: 0,
        },
        {
            a: 1,
            expectedResult: 1,
        },
        {
            a: 9,
            expectedResult: 3,
        },
        {
            a: 64,
            expectedResult: 8,
        },
        {
            a: -9,
            expectedResult: NaN,
        },
        {
            a: 9.9,
            expectedResult: 3.146426544510455,
        },
        {
            a: 5,
            expectedResult: 2.23606797749979,
        },

    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have a number, When I square root it, Then the number square root is returned (sqrt(${testCase.a}} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Sqrt(testCase.a);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
