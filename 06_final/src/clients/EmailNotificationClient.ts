import {NotificationClientBase} from "./NotificationClientBase";


export class EmailNotificationClient extends NotificationClientBase {

    public sendNotification(message: string) {
        console.log(`${this.constructor.name}: ${message} sent.`);
    }
}
