import {CurrencyConverter} from "../src/CurrencyConverter";
import {ExchangeRateServiceInterface} from "../src/ExchangeRateServiceInterface";
import { mock, mockReset } from 'jest-mock-extended';
import {InvalidCurrencyError} from "../src/error/InvalidCurrencyError";
import {InvalidInputAmountError} from "../src/error/InvalidInputAmountError";

// const mockedExchangeRateService = mock<ExchangeRateServiceInterface>();
// jest.mock('../src/ExchangeRateServiceInterface', () => {
//     return {
//         ExchangeRateService: jest.fn().mockImplementation(() => {
//             return {
//                 getExchangeRate: jest.fn().mockReturnValue(1.13)
//             }
//         })
//     }
// });

const mockedExchangeRateService = mock<ExchangeRateServiceInterface>();

describe('CurrencyConverter tests', () => {
    let sut: CurrencyConverter;

    beforeAll(() => {
        mockReset(mockedExchangeRateService);
        sut = new CurrencyConverter(mockedExchangeRateService);
    });

    describe('Happy path', () => {

        it.each([
            [100, 'HUF', 'EUR', 0.26],
            [0, 'HUF', 'EUR', 0],
            [100, 'EUR', 'HUF', 38773],
        ])(`should return the converted amount for %s amount %s to %s as %s`, (amount: number, from: string, to: string, expected: number  ) => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'EUR').mockReturnValue(0.0026);
            mockedExchangeRateService.getExchangeRate.calledWith('EUR', 'HUF').mockReturnValue(387.73);

            // Act
            let actualConverted = sut.Convert(amount, from, to);

            // Assert
            expect(actualConverted).toBe(expected);
        });
    });

    describe('Sad path', () => {
        it(`should trow error on invalid amount`, () => {
            // Arrange
            const invalidAmount = -100;
            const from = 'HUF';
            const to = 'EUR';
            const expectedError = new RangeError("The amount must be a positive number.");
            mockedExchangeRateService.getExchangeRate.calledWith(from, to).mockReturnValue(1);

            // Act
            // let actualConverted = sut.Convert(amount, from, to);

            // Assert
            expect(() => sut.Convert(invalidAmount, from, to)).toThrow(expectedError);
            // @todo How to test it?
            // expect(mockedExchangeRateService.getExcachangeRate).toHaveBeenCalledTimes(0);
        });

        it(`should trow error on Non-existing amount`, () => {
            // Arrange
            const invalidAmount = NaN;
            const from = 'HUF';
            const to = 'EUR';
            const expectedError = new RangeError();
            mockedExchangeRateService.getExchangeRate.calledWith(from, to).mockReturnValue(1);

            // Act
            // let actualConverted = sut.Convert(amount, from, to);

            // Assert
            expect(() => sut.Convert(invalidAmount, from, to)).toThrow(InvalidInputAmountError);
        });
    });


})
