import {ExchangeRateServiceInterface} from "../src/ExchangeRateServiceInterface";
import { mock, mockReset } from 'jest-mock-extended';
import {InvalidCurrencyError} from "../src/error/InvalidCurrencyError";

const mockedExchangeRateService = mock<ExchangeRateServiceInterface>();

describe('CurrencyConverter tests', () => {

    beforeAll(() => {
        mockReset(mockedExchangeRateService);
    })


    describe('Happy path', () => {
        it.each([
            ['HUF', 'EUR'],
            ['EUR', 'HUF'],
            ['HUF', 'USD'],
            ['HUF', 'HUF'],
        ])('should return the exchange rate', (from: string, to: string) => {
            // Arrange
            mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'EUR').mockReturnValue(Math.random() * 100);
            mockedExchangeRateService.getExchangeRate.calledWith('EUR', 'HUF').mockReturnValue(Math.random() * 100);
            mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'USD').mockReturnValue(Math.random() * 100);
            mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'HUF').mockReturnValue(1);

            // Act
            let actualConverted = mockedExchangeRateService.getExchangeRate(from, to);

            // Assert
            expect(actualConverted).toBeGreaterThan(0);
        });
    });

    describe('Sad path', () => {
        it.each([
            ['XX', 'EUR'],
            ['ZUZTQ', 'HUF'],
            ['ASD', 'USD'],
            ['EUR', 'XX'],
            ['HUF', 'ZUZTQ'],
            ['USD', 'ASD'],
            ['XXX', 'ASD'],
            ['', 'HUF'],
            ['HUF', ''],
            ['', ''],
            // [NaN, NaN],
        ])('should trow an error if there is no exchange rate for %s to %s', (from?, to?) => {
            // Arrange
            const expectedError = new InvalidCurrencyError("The from currency is invalid.");
            mockedExchangeRateService.getExchangeRate.mockImplementation((from?, to?) => {throw expectedError});

            // Act
            // let actualConverted = mockedExchangeRateService.getExchangeRate(from, to);

            // Assert
            expect(() => mockedExchangeRateService.getExchangeRate(from, to)).toThrow(expectedError);
        });
    })

})
