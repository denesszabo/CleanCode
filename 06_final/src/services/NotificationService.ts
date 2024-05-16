import {NotificationServiceBase} from "./NotificationServiceBase";

export class NotificationService extends NotificationServiceBase {
    public sendNotification(message: string): void {
        this.services.forEach(service => service.sendNotification(message));
    }
}
