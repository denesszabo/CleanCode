import {FinancialApiClientInterface} from "../../src/abstractions/FinancialApiClientInterface";
import {FinancialApiClient} from "../../src/clients/FinancialApiClient";
import {mock, mockReset} from "jest-mock-extended";
import {DbClient} from "../../src/clients/DbClient";
import {FinancialServiceInterface} from "../../src/abstractions/FinancialServiceInterface";

const mockFinancialService = mock<FinancialServiceInterface>();
describe('FinancialApiClient tests', () => {
    let sut: FinancialApiClientInterface;

    beforeEach(() => {
        mockReset(mockFinancialService);
        sut = new FinancialApiClient(mockFinancialService);
    })

    it('should pay the order', async () => {
        // Arrange
        const orderId = 1;
        const data = {
            order_id: orderId,
            price: 100,
            currency: 'HUF'
        };

        // Act
        await sut.payOrder(orderId);

        // Assert

        expect(mockFinancialService.payOrder).toBeCalledTimes(1);
        expect(mockFinancialService.payOrder).toBeCalledWith(orderId, data);
    });
})
