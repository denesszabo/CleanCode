export class Calculator {

    public Add(a: number, b: number): number {
        return a + b;
    }

    public Sub(a: number, b: number): number {
        return a - b;
    }

    public Multiply(a: number, b: number): number {
        return a * b;
    }

    public Divide(a: number, b: number): number {
        return a / b;
    }
    public Sqrt(a: number): number {
        return Math.sqrt(a);
    }

    public Pow(a: number, b: number): number {
        // a - the base, b - the exponent.
        return Math.pow(a, b);
    }
}
