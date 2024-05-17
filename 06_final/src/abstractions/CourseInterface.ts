import {StudentInterface} from "./StudentInterface";

export interface CourseInterface {
    courseCode: string;
    title: string;
    startDate: Date;
    lengthInWeeks: number;
    cost: number;
    students: StudentInterface[]

    getCourseCode(): string

    getTitle(): string

    setTitle(title: string): void

    getStartDate(): Date
    setStartDate(startDate: Date): void

    getLengthInWeeks(): number
    setLengthInWeeks(lengthInWeeks: number): void

    getCost(): number
    setCost(cost: number): void

    assignStudent(student: StudentInterface): void;

    getStudents(): StudentInterface[];
}
