import {NotificationService} from "../../src/services/NotificationService";
import {EmailNotificationClient} from "../../src/clients/EmailNotificationClient";
import {PushNotificationClient} from "../../src/clients/PushNotificationClient";

describe('NotificationService tests', () => {
    const message = 'Hello! This a test message!';
    let sut: NotificationService;

    beforeEach(() => {
        sut = new NotificationService();
    })

    it('should not send a notification', () => {
        // Arrange
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

        // Act
        consoleLogSpy.mockReset();
        sut.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledTimes(0);
    });

    it('should send an email notification', () => {
        // Arrange
        const expectedLogMessage: string = `EmailNotificationClient: ${message} sent.`;
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const emailClient = new EmailNotificationClient();

        // Act
        sut.addService(emailClient)
        consoleLogSpy.mockReset();
        sut.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedLogMessage);
    });

    it('should send a push notification', () => {
        // Arrange
        const expectedLogMessage: string = `PushNotificationClient: ${message} sent.`;
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        const pushNotificationClient = new PushNotificationClient()

        // Act
        sut.addService(pushNotificationClient);

        consoleLogSpy.mockReset();
        sut.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledTimes(1);
        expect(consoleLogSpy).toHaveBeenCalledWith(expectedLogMessage);
    });

    it('should send a push and email notification', () => {
        // Arrange

        let expectedLogMessage: string = `PushNotificationClient: ${message} sent.`;
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation().mockReset();

        let pushNotificationClient = new PushNotificationClient();
        let emailNotificationClient = new EmailNotificationClient();

        // Act
        sut.init([pushNotificationClient, emailNotificationClient]);
        consoleLogSpy.mockReset();
        sut.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledTimes(2);
        expect(consoleLogSpy).toHaveBeenNthCalledWith(1, expectedLogMessage);

        expectedLogMessage = `EmailNotificationClient: ${message} sent.`;
        expect(consoleLogSpy).toHaveBeenNthCalledWith(2, expectedLogMessage);
    });

    it('should send a email and push notification', () => {
        // Arrange

        let expectedLogMessage: string = `EmailNotificationClient: ${message} sent.`;
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation().mockReset();

        let pushNotificationClient = new PushNotificationClient();
        let emailNotificationClient = new EmailNotificationClient();

        // Act
        sut = new NotificationService([emailNotificationClient]);
        sut.addService(pushNotificationClient);
        consoleLogSpy.mockReset();
        sut.sendNotification(message);

        // Assert
        expect(consoleLogSpy).toHaveBeenCalledTimes(2);
        expect(consoleLogSpy).toHaveBeenNthCalledWith(1, expectedLogMessage);

        expectedLogMessage = `PushNotificationClient: ${message} sent.`;
        expect(consoleLogSpy).toHaveBeenNthCalledWith(2, expectedLogMessage);
    });
})
