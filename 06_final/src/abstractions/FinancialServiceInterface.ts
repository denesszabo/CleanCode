export interface FinancialServiceInterface {

    getOrderStatus(orderId: number): Promise<number>;

    payOrder(orderId: number, data: {}): Promise<void>;

}
