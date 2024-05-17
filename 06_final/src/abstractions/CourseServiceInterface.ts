import {CourseInterface} from "./CourseInterface";
import {StudentInterface} from "./StudentInterface";
import {PersonInterface} from "./PersonInterface";

export interface CourseServiceInterface {
    // @todo Implement these methods!

    addCourse(course: CourseInterface): Promise<void>;

    getCourses(): Promise<CourseInterface[]>;

    addStudentToCourse(student: PersonInterface, courseCode: string): Promise<void>;
    //
    // getCourseStatistics(course: CourseInterface): Promise<any>;
}
