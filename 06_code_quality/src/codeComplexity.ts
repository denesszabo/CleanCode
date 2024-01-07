export class CodeComplexity {

  // version 1
  public complexFunction(a: number, b: number): number {
    if (a > b) {
      console.log('a is greater than b');
    } else {
      console.log('a is not greater than b');
    }

    for (let i = 0; i < 5; i++) {
      console.log(`Iteration ${i}`);
    }

    let result = a + b;
    return result;
  }

  // version 2
  // public complexFunction(a: number, b: number): number {
  //   console.log(a > b ? 'a is greater than b' : 'a is not greater than b');

  //   for (let i = 0; i < 5; i++) {
  //     console.log(`Iteration ${i}`);
  //   }

  //   return a + b;
  // }

  // version 3
  // private isAGreaterThanB(a: number, b: number): boolean {
  //   return a > b;
  // }

  // private logIterations(iterations: number): void {
  //   for (let i = 0; i < iterations; i++) {
  //     console.log(`Iteration ${i}`);
  //   }
  // }

  // public complexFunction(a: number, b: number): number {
  //   const aIsGreaterThanB = this.isAGreaterThanB(a, b);
  //   const iterations = 5;

  //   console.log(aIsGreaterThanB ? 'a is greater than b' : 'a is not greater than b');
  //   this.logIterations(iterations);

  //   return a + b;
  // }

}