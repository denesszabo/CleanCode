import {CourseInterface} from "../abstractions/CourseInterface";

export class Course implements CourseInterface {
    protected readonly courseCode: string
    protected title: string

    constructor(courseCode: string, title: string) {
        this.courseCode = courseCode;
        this.title = title;
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

}
