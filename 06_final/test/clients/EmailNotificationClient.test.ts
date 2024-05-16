import { mock, mockReset } from 'jest-mock-extended';
import { EmailNotificationClient } from '../../src/clients/EmailNotificationClient';

describe('EmailNotificationClient tests', () => {
    let emailClient: EmailNotificationClient;

    beforeEach(() => {
        emailClient = new EmailNotificationClient();
    })

    it('should log the email message', () => {
        // Arrange
        const message = 'Hello! This is an email test!';
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const expectedLogMessage: string = `EmailNotificationClient: ${message} sent.`;
        // Act
        emailClient.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedLogMessage);
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    })

    describe('Mocked the client', () => {
        let mockedEmailClient: EmailNotificationClient = mock<EmailNotificationClient>();
        beforeEach(() => {
            mockReset(mockedEmailClient);
        })

        it('should send the email message', () => {
            // Arrange
            const message = 'Hello! This is an email test!';
            // Act
            mockedEmailClient.sendNotification(message);

            // Assert
            expect(mockedEmailClient.sendNotification).toHaveBeenCalledWith(message);
        })
    })

})
