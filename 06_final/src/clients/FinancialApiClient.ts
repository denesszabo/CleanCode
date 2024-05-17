import {FinancialApiClientInterface} from "../abstractions/FinancialApiClientInterface";
import {FinancialServiceInterface} from "../abstractions/FinancialServiceInterface";

export class FinancialApiClient implements FinancialApiClientInterface {
    private financialService: FinancialServiceInterface;

    constructor(financialService: FinancialServiceInterface) {
        this.financialService = financialService;
    }

    public async getOrderStatus(orderId: number): Promise<number> {
        this.financialService.getOrderStatus(orderId);
    }

    public async payOrder(orderId: number, data: {}): Promise<void> {
        this.financialService.payOrder(orderId, data);
    }
}
