import {NotificationClientBase} from "./NotificationClientBase";

export class PushNotificationClient extends NotificationClientBase {

    public sendNotification(message: string) {
        console.log(`${this.constructor.name}: ${message} sent.`);
    }
}
