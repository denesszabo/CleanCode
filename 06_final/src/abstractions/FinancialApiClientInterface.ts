import {FinancialServiceInterface} from "./FinancialServiceInterface";

export interface FinancialApiClientInterface {

    getOrderStatus(orderId: number): Promise<number>;

    payOrder(orderId: number): Promise<void>;
}
