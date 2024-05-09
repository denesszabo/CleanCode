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
        if (b === 0) {
            return Infinity;
        }
        return a / b;
    }

}
