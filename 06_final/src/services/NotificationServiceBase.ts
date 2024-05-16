import {NotificationServiceInterface} from "../abstractions/NotificationServiceInterface";
import {NotificationClientInterface} from "../abstractions/NotificationClientInterface";

export abstract class NotificationServiceBase implements NotificationServiceInterface {
    protected services: NotificationClientInterface[] = [];

    constructor(services?: NotificationClientInterface[]) {
        if (services) {
            this.services = services;
        }
    }

    public addService(service: NotificationClientInterface): void {
        this.services.push(service);
    }

    public init(services: NotificationClientInterface[]): void {
        services.forEach((service) => this.addService(service));
    }

    public sendNotification(message: string): void {
        this.services.forEach(service => service.sendNotification(message));
    };
}
