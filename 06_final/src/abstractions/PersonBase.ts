import {PersonInterface} from "./PersonInterface";

export abstract class PersonBase implements PersonInterface {
    protected name: string;
    protected email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

}
