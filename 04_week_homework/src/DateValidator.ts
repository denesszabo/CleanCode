import {OutOfRangeError} from "./error/OutOfRangeError";

export class DateValidator {

    public validateMonth(month: number) {
        if (month < 0 || month > 11) {
            throw new OutOfRangeError('Invalid month given');
        }
    }

    public validateYear(year: number, range_lower: number = 0) {
        if (year < range_lower) {
            throw new OutOfRangeError('Invalid year given');
        }
        const d = new Date();
        if (year > d.getFullYear()) {
            throw new OutOfRangeError('Invalid year given');
        }
    }
}
