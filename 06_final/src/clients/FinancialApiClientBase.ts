import {FinancialApiClientInterface} from "../abstractions/FinancialApiClientInterface";
import {FinancialServiceInterface} from "../abstractions/FinancialServiceInterface";

export abstract class FinancialApiClientBase implements FinancialApiClientInterface {
    protected financialService: FinancialServiceInterface;

    constructor(financialService: FinancialServiceInterface) {
        this.financialService = financialService;
    }

    abstract getOrderStatus(orderId: string): Promise<any>

    abstract payOrder(orderId: string, data: {}): Promise<void>;
}
