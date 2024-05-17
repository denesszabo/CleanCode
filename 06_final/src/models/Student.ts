import {PersonBase} from "../abstractions/PersonBase";
import {PersonInterface} from "../abstractions/PersonInterface";
import {StudentInterface} from "../abstractions/StudentInterface";

export class Student extends PersonBase implements PersonInterface, StudentInterface {

    public constructor(name: string, email: string) {
        super(name, email);
    }

}
