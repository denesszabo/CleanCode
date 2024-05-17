import {FinancialApiClientInterface} from "../abstractions/FinancialApiClientInterface";
import {FinancialServiceInterface} from "../abstractions/FinancialServiceInterface";

export abstract class FinancialApiClientBase implements FinancialApiClientInterface {

    protected constructor(private financialService: FinancialServiceInterface) {
    };

    abstract getOrderStatus(orderId: number): Promise<number>;
    abstract payOrder(orderId: number): Promise<void>;
}
