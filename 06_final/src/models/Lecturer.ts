import {PersonBase} from "../abstractions/PersonBase";
import {PersonInterface} from "../abstractions/PersonInterface";

export class Lecturer extends PersonBase implements PersonInterface {

    public constructor(name: string, email: string) {
        super(name, email);
    }

}
