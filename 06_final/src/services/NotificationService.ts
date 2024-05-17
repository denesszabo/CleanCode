import {NotificationServiceBase} from "./NotificationServiceBase";
import { mock, mockReset } from 'jest-mock-extended';


export class NotificationService extends NotificationServiceBase {

    public sendNotification(message: string): void {
        this.services.forEach(service => service.sendNotification(message));
    }
}
