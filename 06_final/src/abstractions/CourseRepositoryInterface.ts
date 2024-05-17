import {DbClientInterface} from "./DbClientInterface";
import {CourseInterface} from "./CourseInterface";

export interface CourseRepositoryInterface {

   addCourse(course: CourseInterface): Promise<void>;

    getAllCourses(): Promise<CourseInterface[]>;

    getCourse(courseCode: string): Promise<CourseInterface>;

    // @todo getCourseStatistics(courseCode: string): Promise<CourseStatisticsInterface>;
}
