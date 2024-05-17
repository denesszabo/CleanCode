import {FinancialApiClientInterface} from "../../src/abstractions/FinancialApiClientInterface";
import {FinancialApiClient} from "../../src/clients/FinancialApiClient";
import {mock, mockReset} from "jest-mock-extended";
import {DbClient} from "../../src/clients/DbClient";
import {FinancialServiceInterface} from "../../src/abstractions/FinancialServiceInterface";
import {NotFoundError} from "../../src/errors/NotFoundError";
import {OrderNotFoundError} from "../../src/errors/OrderNotFoundError";
import {NetworkError} from "../../src/errors/NetworkError";
import {UnknownError} from "../../src/errors/UnknownError";
import {InsufficientBalanceError} from "../../src/errors/InsufficientBalanceError";

const mockFinancialService = mock<FinancialServiceInterface>();

describe('FinancialApiClient tests', () => {
    let sut: FinancialApiClientInterface;

    beforeEach(() => {
        mockReset(mockFinancialService);
        sut = new FinancialApiClient(mockFinancialService);
    })

    describe('Happy path', () => {
        it('should pay the order', async () => {
            // Arrange
            const orderId: string = 'Order-1';
            const data = {
                order_id: orderId,
                price: 100,
                currency: 'HUF'
            };

            // Act
            await sut.payOrder(orderId, data);

            // Assert

            expect(mockFinancialService.payOrder).toBeCalledTimes(1);
            expect(mockFinancialService.payOrder).toBeCalledWith(orderId, data);
        })

        it('should get the order status', async () => {
            // Arrange
            const orderId: string = 'Order-1';
            const expectedStatus = 1;

            const error = new NotFoundError("Course not found");
            mockFinancialService.getOrderStatus.mockResolvedValue(expectedStatus);

            // Act
            const orderStatus = await sut.getOrderStatus(orderId);

            // Assert

            expect(mockFinancialService.getOrderStatus).toBeCalledTimes(1);
            expect(mockFinancialService.getOrderStatus).toBeCalledWith(orderId);
            expect(orderStatus).toBe(expectedStatus);
        })
    })

    describe('Sad path', () => {

        it('should return an OrderNotFoundError', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const expectedError = new OrderNotFoundError("Order not found");
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.getOrderStatus.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.getOrderStatus(orderId)).rejects.toThrow(expectedError);
        })

        it('should return an NetworkError', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const expectedError = new NetworkError("Network not reachable");
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.getOrderStatus.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.getOrderStatus(orderId)).rejects.toThrow(expectedError);
        })

        it('should return an UnknownError', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const expectedError = new UnknownError('Unknown error, boo-boo');
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.getOrderStatus.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.getOrderStatus(orderId)).rejects.toThrow(expectedError);
        })

        it('should return an InsufficientBalanceError during payment', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const data = {
                order_id: orderId,
                price: 100,
                currency: 'HUF'
            }
            const expectedError = new InsufficientBalanceError('Insufficient balance');
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.payOrder.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.payOrder(orderId, data)).rejects.toThrow(expectedError);
        })

        it('should return an NetworkError during payment', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const data = {
                order_id: orderId,
                price: 100,
                currency: 'HUF'
            }
            const expectedError = new NetworkError('Network not reachable');
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.payOrder.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.payOrder(orderId, data)).rejects.toThrow(expectedError);
        })

        it('should return an UnknownError during payment', async () => {

            // Assign
            const orderId: string = 'Order-1';
            const data = {
                order_id: orderId,
                price: 100,
                currency: 'HUF'
            }
            const expectedError = new UnknownError('Unknown error, boo-boo');
            // mockFinancialService.getOrderStatus.mockResolvedValue(error);
            mockFinancialService.payOrder.mockImplementation(() => {
                throw expectedError;
            });

            // Assert
            await expect(() => sut.payOrder(orderId, data)).rejects.toThrow(expectedError);
        })


    })

})
