export interface FinancialServiceInterface {

    getOrderStatus(orderId: string): Promise<number>;

    payOrder(orderId: string, data: {}): Promise<void>;

}
