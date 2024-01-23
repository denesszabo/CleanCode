export class Order {

    constructor(private title: string, private createdDate: Date, private status: STATUS) {}

    public updateStatus(newStatus: STATUS) {
        this.status = newStatus;
    }

    public getStatus() {
        return this.status;
    }
}

export enum STATUS {
    NOTSTARTED,
    PROCESSING,
    SHIPPED,
    DELIVERED,
    RETURNED,
    CANCELLED
}