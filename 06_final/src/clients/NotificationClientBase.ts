import {NotificationClientInterface} from "../abstractions/NotificationClientInterface";

export abstract class NotificationClientBase implements NotificationClientInterface {
    public sendNotification(message: string) {
        console.log(`${this.constructor.name}: ${message} sent.`);
    };
}
