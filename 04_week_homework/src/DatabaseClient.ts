import {OutOfRangeError} from "./error/OutOfRangeError";

export class DatabaseClient {

    public static readonly MAX_WORKDAYS_IN_MONTH = 20;
    public static readonly FIRM_EXIST_SINCE = 2020;

    public getWorkdays(year: number,  month: number): string[] {

        this.validateYear(year);
        this.validateMonth(month);
        const d = new Date();
        d.setFullYear(year, month - 1, 1);

        return [];
    }

    protected validateMonth(month: number) {
        if (month < 0 || month > 11) {
            throw new OutOfRangeError('Invalid month given');
        }
    }

    protected validateYear(year: number) {
        if (year < DatabaseClient.FIRM_EXIST_SINCE) {
            throw new OutOfRangeError('Invalid year given');
        }
        const d = new Date();
        if (year > d.getFullYear()) {
            throw new OutOfRangeError('Invalid year given');
        }
    }
}
