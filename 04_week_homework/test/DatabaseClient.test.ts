import { OutOfRangeError } from "../src/error/OutOfRangeError";
import {DatabaseClient} from "../src/DatabaseClient";
import {DateValidator} from "../src/DateValidator";

const dateValidator = new DateValidator();

describe('DatabaseClient tests', () => {
    let sut: DatabaseClient;

    beforeEach(() => {
        sut = new DatabaseClient(dateValidator);
    })


    describe('Happy path', () => {

        it.each([
            { year: 2022, month: 1},
            { year: 2024, month: 11},
        ])('should return with success for $month', ({year, month}) => {
            // Arrange
            const result = sut.getWorkdays(year, month);
            expect(result).toBeTruthy();
            expect(result.length).toBeLessThanOrEqual(DatabaseClient.MAX_WORKDAYS_IN_MONTH);
        });
    })
    describe('Sad path', () => {

        it.each([
            { year: 2055, month: 5},
            { year: -1, month: 5},
        ])('should return with exception for $year - $month', ({year, month}) => {
            // Arrange
            const expectedError = new OutOfRangeError('Invalid year given');
            // const result = sut.getWorkdays(year, month);

            // Assert
            expect(() => sut.getWorkdays(year, month)).toThrow(expectedError);
        });

        it.each([
            { year: 2022, month: -1},
            { year: 2023, month: 12},
            { year: 2024, month: 13},
        ])('should return with exception for $year - $month', ({year, month}) => {
            // Arrange
            const expectedError = new OutOfRangeError('Invalid month given');
            // const result = sut.getWorkdays(year, month);

            // Assert
            expect(() => sut.getWorkdays(year, month)).toThrow(OutOfRangeError);
        });
    })
})
