import {DatabaseClient} from "./DatabaseClient";
import {DateValidator} from "./DateValidator";

export class UserWorkdayReport {

    public static readonly FIRM_EXIST_SINCE = 2020;
    private workdays: string[] = [];

    public constructor(private dbClient: DatabaseClient, private dateValidator: DateValidator) {}

    public setWorkDays(year: number, month: number): void {
        this.workdays = [];
        this.dateValidator.validateYear(year, UserWorkdayReport.FIRM_EXIST_SINCE);
        this.dateValidator.validateMonth(month);
        this.workdays = this.dbClient.getWorkdays(year, month);
    }

    public getWorkDays(): string[] {
        return this.workdays;
    }

    public getWorkdayCount(): number {
        return this.workdays.length;
    }

    public isWorkedOnDay(day: number): boolean {
        return this.workdays.includes(String(day));
    }

}
