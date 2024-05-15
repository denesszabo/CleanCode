import {GradeCalculator} from "../src/GradeCalculator";

describe('Grade calculator', () => {
    let calculator: GradeCalculator;

    beforeEach(() => {
        calculator = new GradeCalculator();
    })

    it.each(
        [
            {
                // Extreme case.
                score: 110,
                expectedGrade: 'A',
            },
            {
                score: 100,
                expectedGrade: 'A',
            },
            {
                score: 90,
                expectedGrade: 'A',
            },
            {
                score: 89,
                expectedGrade: 'B',
            },
            {
                score: 80,
                expectedGrade: 'B',
            },
            {
                score: 79,
                expectedGrade: 'C',
            },
            {
                score: 70,
                expectedGrade: 'C',
            },
            {
                score: 69,
                expectedGrade: 'D',
            },
            {
                score: 60,
                expectedGrade: 'D',
            },
            {
                score: 10,
                expectedGrade: 'D',
            },
            {
                score: 0,
                expectedGrade: 'D',
            },
            {
                // Extreme case.
                score: -1,
                expectedGrade: 'D',
            },
        ]
    )('should give back the proper grade for the given score $score', ({ score, expectedGrade}) => {
        // Act
        const grade = calculator.calculateGrade(score);

        // Assert
        expect(grade).toBe(expectedGrade);
    });
});
