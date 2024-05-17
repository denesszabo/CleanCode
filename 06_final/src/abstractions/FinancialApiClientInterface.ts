import {FinancialServiceInterface} from "./FinancialServiceInterface";

export interface FinancialApiClientInterface {
    financialService: FinancialServiceInterface;

    getOrderStatus(orderId: string): Promise<any>;

    payOrder(orderId: string, data: {}): Promise<void>;
}
