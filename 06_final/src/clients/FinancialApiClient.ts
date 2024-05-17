import {FinancialApiClientBase} from "./FinancialApiClientBase";
import {OrderNotFoundError} from "../errors/OrderNotFoundError";
import {NetworkError} from "../errors/NetworkError";
import {UnknownError} from "../errors/UnknownError";
import {InsufficientBalanceError} from "../errors/InsufficientBalanceError";

export class FinancialApiClient extends FinancialApiClientBase {

    public async getOrderStatus(orderId: string): Promise<any> {
        try {
            return await this.financialService.getOrderStatus(orderId);
        }
        catch (error) {
            if (error instanceof OrderNotFoundError || error instanceof NetworkError) {
                console.warn(error.message);
                throw error;
            }

            throw new UnknownError('Unknown error, boo-boo');
        }
    }

    public async payOrder(orderId: string , data: {}): Promise<void> {
        try {
            return await this.financialService.payOrder(orderId, data);
        }
        catch (error) {
            if (error instanceof InsufficientBalanceError || error instanceof NetworkError) {
                console.warn(error.message);
                throw error;
            }

            throw new UnknownError('Unknown error, boo-boo');
        }

    }
}
