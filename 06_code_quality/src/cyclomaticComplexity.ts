export class CyclomaticComplexity {

  public calculateGrades(scores: number[]): void {
    const grades: string[] = [];

    for (const score of scores) {
      const grade = this.calculateGrade(score);
      grades.push(grade);
    }

    for (const grade of grades) {
      console.log(grade);
    }
  }

  private calculateGrade(score: number): string {
    this.validateScore(score);

    let grade: string;

    switch (true) {
      case score <= 50:
        grade = 'Fail';
        break;
      case 51 <= score && score <= 75:
        grade = 'Pass';
        break;
      case 76 <= score && score <= 100:
        grade = 'Excellent';
        break;
      default:
        throw new Error('Unexpected score');
    }

    return grade;
  }

  private validateScore(score: number) {
    if (score < 0 || score > 100) {
      this.handleUnexpectedScore();
    }
  }

  private handleUnexpectedScore() {
    throw new Error('Unexpected score')
  }
}
