import { mock, mockReset } from 'jest-mock-extended';
import { PushNotificationClient } from '../../src/clients/PushNotificationClient';

describe('PushNotificationClient tests', () => {
    let emailClient: PushNotificationClient;

    beforeEach(() => {
        emailClient = new PushNotificationClient();
    })

    it('should log the push message', () => {
        // Arrange
        const message = 'Hello! This is a push test!';
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const expectedLogMessage: string = `PushNotificationClient: ${message} sent.`;
        // Act
        emailClient.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedLogMessage);
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    })

    describe('Mocked the push client', () => {
        let mockedClient: PushNotificationClient = mock<PushNotificationClient>();

        beforeEach(() => {
            mockReset(mockedClient);
        })

        it('should send the push message', () => {
            // Arrange
            const message = 'Hello! This is a push test!';
            // Act
            mockedClient.sendNotification(message);

            // Assert
            expect(mockedClient.sendNotification).toHaveBeenCalledWith(message);
        })
    })

})
