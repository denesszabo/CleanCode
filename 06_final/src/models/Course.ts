import {CourseInterface} from "../abstractions/CourseInterface";
import {StudentInterface} from "../abstractions/StudentInterface";

export class Course implements CourseInterface {
    protected readonly courseCode: string
    protected students: StudentInterface[] = []

    constructor(
        courseCode: string,
        private title: string,
        private startDate: Date,
        private lengthInWeeks: number,
        private cost: number
    ) {
        this.courseCode = courseCode;
        this.title = title;
        this.startDate = startDate;
        this.lengthInWeeks = lengthInWeeks;
        this.cost = cost;
    }

    public getCourseCode(): string {
        return this.courseCode;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getStartDate(): Date {
        return this.startDate;
    }

    public setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    public getLengthInWeeks(): number {
        return this.lengthInWeeks;
    }

    public setLengthInWeeks(lengthInWeeks: number): void {
        this.lengthInWeeks = lengthInWeeks;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

    public assignStudent(student: StudentInterface): void {
        this.students.push(student);
    }

    public getStudents(): StudentInterface[] {
        return this.students;
    }
}
