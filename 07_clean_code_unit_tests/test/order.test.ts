import { Order, STATUS } from "../src/order"

describe('Order basic tests', () => {

    it('should update the status of the order into shipped', () => {
        // Arrange
        const order = new Order('title', new Date(2023, 8, 17), STATUS.NOTSTARTED);

        // Act
        order.updateStatus(STATUS.SHIPPED);

        // Assert
        expect(order.getStatus()).toBe(STATUS.SHIPPED);
    })

    it('should update the status of the order into cancelled', () => {
        // Arrange
        const order = new Order('title', new Date(2023, 8, 17), STATUS.NOTSTARTED);

        // Act
        order.updateStatus(STATUS.CANCELLED);

        // Assert
        expect(order.getStatus()).toBe(STATUS.CANCELLED);
    })

})

describe('Order tests with beforeEach', () => {
    let order: Order;

    beforeEach(() => {
        order = new Order('title', new Date(2023, 8, 17), STATUS.NOTSTARTED);
    })

    it('should update the status of the order into shipped', () => {
        // Act
        order.updateStatus(STATUS.SHIPPED);

        // Assert
        expect(order.getStatus()).toBe(STATUS.SHIPPED);
    })

    it('should update the status of the order into cancelled', () => {
        // Act
        order.updateStatus(STATUS.CANCELLED);

        // Assert
        expect(order.getStatus()).toBe(STATUS.CANCELLED);
    })

})


describe('Order tests with beforeEach and parameters', () => {
    let order: Order;

    beforeEach(() => {
        order = new Order('title', new Date(2023, 8, 17), STATUS.NOTSTARTED);
    })

    it.each(
        [
            [STATUS.SHIPPED],
            [STATUS.CANCELLED]
        ]
    )('should update the status of the order into %s', (status) => {
        // Act
        order.updateStatus(status);

        // Assert
        expect(order.getStatus()).toBe(status);
    })

})

describe('Order tests with test data builder', () => {
    let order: Order;

    beforeEach(() => {
        order = OrderTestDataBuilder.createTestOrderInstance();
    })

    it.each(
        [
            [STATUS.SHIPPED],
            [STATUS.CANCELLED]
        ]
    )('should update the status of the order into %s', (status) => {
        // Act
        order.updateStatus(status);

        // Assert
        assertStatus(order.getStatus(), status)
    })

    it('should move from Shipped status to Returned', () => {
        // Arrange
        const order = OrderTestDataBuilder.createTestOrderInstance('title', new Date(2023, 8, 17), STATUS.SHIPPED);

        // Act
        order.updateStatus(STATUS.RETURNED);

        // Assert
        assertStatus(order.getStatus(), STATUS.RETURNED)
    })

    function assertStatus(actualStatus: STATUS, expectedStatus: STATUS) {
        expect(actualStatus).toBe(expectedStatus);
    }

    class OrderTestDataBuilder {

        public static createTestOrderInstance(
            title: string = "title",
            createdDate: Date = new Date(2023, 8, 17),
            status: STATUS = STATUS.NOTSTARTED) {
                return new Order(title, createdDate, status);
        }
    }

})