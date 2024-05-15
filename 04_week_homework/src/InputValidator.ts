export class InputValidator {

    public static readonly SUCCESS = true;
    public static readonly ERROR = false;

    public validateUserName(input: string): boolean {
        return /^[a-zA-Z0-9]{5,20}$/.test(input.trim()) ? InputValidator.SUCCESS : InputValidator.ERROR;
    }
}
