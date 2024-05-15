import {UserWorkdayReport} from "../src/UserWorkdayReport";
import {DateValidator} from "../src/DateValidator";
import {DatabaseClient} from "../src/DatabaseClient";
import {OutOfRangeError} from "../src/error/OutOfRangeError";

describe('Process user data tests', () => {
    let sut: UserWorkdayReport;
    let dateValidator: DateValidator;
    let databaseClient: DatabaseClient;

    beforeEach(() => {
        dateValidator = new DateValidator();
        databaseClient = new DatabaseClient(dateValidator);
        sut = new UserWorkdayReport(databaseClient, dateValidator);
    })

    describe('Happy path', () => {
        it.each([
            { year: 2022, month: 1},
            { year: 2023, month: 11},
            { year: 2024, month: 1},
            { year: 2024, month: 1},
            { year: 2024, month: 3},
            { year: 2024, month: 4},
        ])('should return with success $year-$month', ({year, month}) => {
            // Arrange
            // Act
            sut.setWorkDays(year, month);
            let result = sut.getWorkDays();

            // Assert
            expect(result).toBeTruthy();
            expect(result.length).toBeLessThanOrEqual(DatabaseClient.MAX_WORKDAYS_IN_MONTH);

            // Act
            let count = sut.getWorkdayCount();
            expect(count).toBeGreaterThanOrEqual(0);
            expect(count).toBeLessThanOrEqual(DatabaseClient.MAX_WORKDAYS_IN_MONTH);
        });

        it.each([
            { day: 1, worked: true},
            { day: 3, worked: true},
            { day: 9, worked: true},
            { day: 4, worked: false},
            { day: 29, worked: false},
            { day: 18, worked: false},
       ])('should return with worked $worked for $day. day', ({day, worked}) => {
            // Arrange
            sut.setWorkDays(2024, 4);

            // Act
            let result = sut.isWorkedOnDay(day);

            expect(result).toBe(worked);
        });

    })

    describe('Sad path', () => {
        it.each([
            { year: 2019, month: 1},
            { year: 2000, month: 11},
            { year: 2055, month: 10},
        ])('should throw OutOfRangeError for years,$year-$month', ({year, month}) => {
            // Arrange
            const expectedError = new OutOfRangeError('Invalid year given');

            // Assert
            expect(() => sut.setWorkDays(year, month)).toThrow(expectedError);
        });

        it.each([
            { year: 2020, month: 12},
            { year: 2024, month: -1},
        ])('should throw OutOfRangeError for months, $year-$month', ({year, month}) => {
            // Arrange
            const expectedError = new OutOfRangeError('Invalid month given');

            // Assert
            expect(() => sut.setWorkDays(year, month)).toThrow(expectedError);
        });
    })
})
