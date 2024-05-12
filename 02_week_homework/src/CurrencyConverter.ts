import { ExchangeRateServiceInterface } from "./ExchangeRateServiceInterface";
import {InvalidInputAmountError} from "./error/InvalidInputAmountError";
import {InvalidCurrencyError} from "./error/InvalidCurrencyError";
import {NetworkError} from "./error/NetworkError";

export class CurrencyConverter {

    private readonly FIXED_AMOUNT = 100;
    private readonly EXCHANGE_RATE_ERROR = -1;

    constructor(private exchangeRateService: ExchangeRateServiceInterface) { }

    public Convert(amount: number, fromCurrency: string, toCurrency: string): number {
        this.validateAmount(amount);
        const exchangeRate = this.getExchangeRate(fromCurrency, toCurrency);

        this.validateExchangeRate(exchangeRate);
        return amount * exchangeRate;
    }

    /**
     * Conversion report builder for the give date range.
     *
     * @param fromCurrency
     * @param toCurrency
     * @param startDate
     * @param endDate
     * @constructor
     */
    public GenerateConversionReport(
        fromCurrency: string,
        toCurrency: string,
        startDate: Date,
        endDate: Date
    ): string {
        const conversions: number[] = [];

        const currentDate = new Date(startDate);

        while (currentDate <= endDate) {

            try {
                const exchangeRate: number | null = this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);
                if (exchangeRate != this.EXCHANGE_RATE_ERROR) {
                    this.validateExchangeRate(exchangeRate);
                    this.calculateConversion(exchangeRate, conversions, currentDate);
                }
            }
            catch (error) {
                // @todo: Inject a log service.
                // console.log(error.message, error);
                // return `Conversion Report:\n${conversions.join('\n')}`;
                break;
            }

        }

        return `Conversion Report:\n${conversions.join('\n')}`;
    }

    /**
     * Service call for exchange rate.
     *
     * @param fromCurrency
     *   The currency to convert from.
     * @param toCurrency
     *   The currency to convert to.
     *
     * @return number|null
     *   The exchange rate or null if an error occurred.
     *
     * @private
     */
    private getExchangeRate(fromCurrency: string, toCurrency: string)    {
        try {
            return this.exchangeRateService.getExchangeRate(fromCurrency, toCurrency);
        }
        catch (error) {
            if (error instanceof InvalidCurrencyError) {
                // @todo: Inject a log service.
                console.log(error.message, error);
                return this.EXCHANGE_RATE_ERROR;
            }
            console.log(error);
            throw new NetworkError('The network is down.');
        }

    }

    private calculateConversion(exchangeRate: number, conversions: number[], currentDate: Date) {
        const convertedAmount = this.FIXED_AMOUNT * exchangeRate; // Assume a fixed amount for simplicity
        conversions.push(convertedAmount);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    private validateExchangeRate(exchangeRate: number) {
        if (!exchangeRate) {
            throw new Error('Unable to fetch exchange rate.');
        }

        if (isNaN(exchangeRate)) {
            throw new Error('Invalid exchange rate.');
        }
    }

    /**
     * Validate the input amount.
     *
     * @param amount number
     *   The amount to validate.
     *
     * @throws InvalidInputAmountError
     *   If the amount is invalid.
     * @throws RangeError
     *   If the amount is negative.
     *
     * @private
     */
    private validateAmount(amount: number): void {
        if (isNaN(amount)) {
            throw new InvalidInputAmountError('Invalid amount input.');
        }
        if (amount < 0) {
            throw new RangeError('The amount must be a positive number.');
        }
    }
}
