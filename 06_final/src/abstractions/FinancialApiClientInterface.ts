import {FinancialServiceInterface} from "./FinancialServiceInterface";

export interface FinancialApiClientInterface {

    getOrderStatus(orderId: string): Promise<any>;

    payOrder(orderId: string, data: {}): Promise<void>;
}
