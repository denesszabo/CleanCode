import {StudentInterface} from "./StudentInterface";

export interface CourseInterface {

    getCourseCode(): string

    getTitle(): string

    setTitle(title: string): void

    assignStudent(student: StudentInterface): void;

    getStudents(): StudentInterface[];
}
