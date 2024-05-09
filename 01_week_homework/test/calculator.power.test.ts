import { Calculator } from "../src/calculator";

describe("Calculator power function tests", () => {
    let calculator: Calculator;

    const testCases = [
        {
            a: 3,
            b: 3,
            expectedResult: 27,
        },
        {
            a: 3,
            b: 5,
            expectedResult: 243,
        },
        {
            a: 3,
            b: -3,
            expectedResult: 0.037037037037037035,
        },
        {
            a: -3,
            b: -3,
            expectedResult: -0.037037037037037035,
        },
        {
            a: 0,
            b: 0,
            expectedResult: 1,
        },
        {
            a: 0,
            b: 1,
            expectedResult: 0,
        },
        {
            a: 10,
            b: 1,
            expectedResult: 10,
        },
        {
            a: 1,
            b: 10,
            expectedResult: 1,
        },
        {
            a: 10,
            b: 2,
            expectedResult: 100,
        },
        {
            a: 10,
            b: 3,
            expectedResult: 1000,
        },
        {
            a: 10,
            b: -3,
            expectedResult: 0.001,
        },
        {
            a: 2,
            b: 4,
            expectedResult: 16,
        },
        {
            a: 2,
            b: 10,
            expectedResult: 1024,
        },
        {
            a: 2,
            b: 100,
            expectedResult: 1.2676506002282294e+30, // :-O
        },
        {
            a: 2.2,
            b: 10,
            expectedResult: 2655.9922791424024, // :-O
        },
        {
            a: 2.2,
            b: 2,
            expectedResult: 4.840000000000001, // overflow!
        },
        {
            a: 2.2,
            b: -2,
            expectedResult: 0.20661157024793386,
        },
        {
            a: 2,
            b: 2.2,
            expectedResult: 4.59479341998814,
        },
        {
            a: 2,
            b: -2.2,
            expectedResult: 0.217637640824031,
        },


    ];

    beforeEach(() => {
        calculator = new Calculator();
    })

    testCases.forEach((testCase) => {
        test(`'Given I have 2 numbers the base and the exponent, When I power them, Then the two numbers power result is returned (${testCase.a} ^ ${testCase.b} = ${testCase.expectedResult})'`, () => {
            // Act
            const result = calculator.Pow(testCase.a, testCase.b);

            // Assert
            expect(result).toBe(testCase.expectedResult);
        });
    })

})
