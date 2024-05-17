import {CourseInterface} from "./CourseInterface";

class StudentInterface {
}

export interface DbClientInterface {

    addCourse(course: CourseInterface): Promise<any>;

    getCourse(courseCode: string): Promise<any>;
    getAllCourses(): Promise<any>;

    assignCourseToStudent(course: CourseInterface, student: StudentInterface): Promise<any>;
}
