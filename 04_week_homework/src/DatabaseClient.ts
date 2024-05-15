import {DateValidator} from "./DateValidator";

export class DatabaseClient {

    public static readonly MAX_WORKDAYS_IN_MONTH = 20;

    public constructor(protected dateValidator: DateValidator) {

    }
    public getWorkdays(year: number,  month: number): string[] {

        this.dateValidator.validateYear(year);
        this.dateValidator.validateMonth(month);
        const d = new Date();
        d.setFullYear(year, month - 1, 1);

        return [];
    }


}
