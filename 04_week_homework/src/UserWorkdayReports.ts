export class UserWorkdayReports {

    private workdays: string[] = [];

    public constructor(private dbClient: DatabaseClient) {}

    public setYearMonth(date: string): void {
        this.workdays = this.dbClient.getWorkDaysForMonth(date);
    }

    public processUserData(
        x: number,
        y: string,
        z: boolean,  // find user flag?
        a: string[], // users
        b: number,
        c: boolean, // count users flag?
        d: string,  // lookup user
        e: number,  // ??? Processing the first e elements?
    ): string
    {
        let result = '';

        if (z && c) {
            for (let i = 0; i < a.length; i++) {
                if (a[i] === d) {
                    result += 'User found: ' + d + ' at index ' + i;
                    break;
                }
            }
        }
        else if(!z && c) {
            let count = 0;
            while (count < e) {
                result += 'Processing... ';
                count++;
            }
        }
        else {
            result = 'No action taken.';
        }
        return result;
    }
}