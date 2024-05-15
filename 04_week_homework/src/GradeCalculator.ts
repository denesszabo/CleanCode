export class GradeCalculator {

    protected readonly gradeTable = [
        {
            aboveScore: 90,
            grade: 'A',
        },
        {
            aboveScore: 80,
            grade: 'B',
        },
        {
            aboveScore: 70,
            grade: 'C',
        },
    ]
    public calculateGrade(score: number): string {
        for (let level of this.gradeTable) {
            if (score >= level.aboveScore) {
                return level.grade;
            }
        }
        return 'D';
    }

}
