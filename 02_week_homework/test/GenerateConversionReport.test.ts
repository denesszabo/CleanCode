import {CurrencyConverter} from "../src/CurrencyConverter";

import {mock, mockReset} from "jest-mock-extended";
import {ExchangeRateServiceInterface} from "../src/ExchangeRateServiceInterface";
import {InvalidCurrencyError} from "../src/error/InvalidCurrencyError";
import {NetworkError} from "../src/error/NetworkError";
const mockedExchangeRateService = mock<ExchangeRateServiceInterface>();

describe('Generate Conversion report tests', () => {
    let sut: CurrencyConverter;

    beforeAll(() => {
        mockReset(mockedExchangeRateService);
        sut = new CurrencyConverter(mockedExchangeRateService);
    })

    describe('happy part of the generations', () => {
        it('should generate conversion report', () => {
            // Arrange
            const conversionReport = new CurrencyConverter(mockedExchangeRateService);
            const from = 'HUF';
            const to = 'EUR';
            const startDate = new Date();
            const endDate = new Date();
            const days = 10;
            endDate.setDate(endDate.getDate() + days - 1);
            mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'EUR').mockReturnValue(0.0026);

            // Act
            let report = conversionReport.GenerateConversionReport(from, to, startDate, endDate);
            // console.log(report);

            // Assert
            expect(report.length == days);
            expect(report).toMatchSnapshot();
            // This is a private meth, can't be spied. (I have not known yet how to spy private methods).
            // expect(sut.exchangeRateService).toBeCalledTimes(days);
            expect(mockedExchangeRateService.getExchangeRate).toBeCalledTimes(days);
        });
    })


    describe('Sad part of the generations', () => {
        it('should generate empty conversion report', () => {
            // Arrange
            const conversionReport = new CurrencyConverter(mockedExchangeRateService);
            const from = '';
            const to = 'EUR';
            const startDate = new Date();
            const endDate = new Date();
            const days = 10;
            endDate.setDate(endDate.getDate() + days - 1);
            const expectedError = new InvalidCurrencyError("The from currency is invalid.");

            // mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'EUR').mockReturnValue(0.0026);
            mockedExchangeRateService.getExchangeRate.mockImplementation((from, to) => {throw expectedError});

            // Act
            let report = conversionReport.GenerateConversionReport(from, to, startDate, endDate);

            // Assert
            expect(report.length == 0);
        });

        it('should generate empty conversion by network error', () => {
            // Arrange
            const conversionReport = new CurrencyConverter(mockedExchangeRateService);
            const from = 'HUF';
            const to = 'EUR';
            const startDate = new Date();
            const endDate = new Date();
            const days = 10;
            endDate.setDate(endDate.getDate() + days - 1);
            const expectedError = new NetworkError("The network is down.");

            // mockedExchangeRateService.getExchangeRate.calledWith('HUF', 'EUR').mockReturnValue(0.0026);
            mockedExchangeRateService.getExchangeRate.mockImplementation((from, to) => {throw expectedError});

            // Act
            let report = conversionReport.GenerateConversionReport(from, to, startDate, endDate);

            // Assert
            expect(report.length == 0);
        });
    })

})
