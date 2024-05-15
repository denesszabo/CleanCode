import {DateValidator} from "./DateValidator";

export class DatabaseClient {

    public static readonly MAX_WORKDAYS_IN_MONTH = 20;

    public constructor(protected dateValidator: DateValidator) {

    }
    public getWorkdays(year: number,  month: number): string[] {

        this.dateValidator.validateYear(year);
        this.dateValidator.validateMonth(month);
        const d = new Date();
        d.setFullYear(year, month, 1);

        let workDays = [];
        let i = 0;
        let currentMonth: number = month;
        while (i < DatabaseClient.MAX_WORKDAYS_IN_MONTH && currentMonth == month) {

            // Don't work Saturday and Sunday.
            if (d.getDay() !== 0 && d.getDay() !== 6) {
                workDays.push(String(d.getDate()));
                i++;
            }
            d.setDate(d.getDate() + 1);
            currentMonth = d.getMonth();
        }
        console.log('month: ' + month + ' - currentMonth: ' + currentMonth);
        console.log('workdays length: ' + workDays.length);
        console.log(workDays);
        return workDays;
    }


}
