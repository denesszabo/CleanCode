/**
 * Defines the currency exchange rate service.
 */
export interface ExchangeRateServiceInterface {

    /**
     * Get the exchange rate between two currencies.
     *
     * @param fromCurrency string
     *   The currency to convert from.
     * @param toCurrency string
     *   The currency to convert to.
     *
     * @trows InvalidCurrencyError
     *   If the given currency is invalid or unknown
     */
    getExchangeRate(fromCurrency: string, toCurrency: string): number;
}
