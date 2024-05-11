export interface ExchangeRateServiceInterface {
    getExchangeRate(fromCurrency: string, toCurrency: string): number;
}
