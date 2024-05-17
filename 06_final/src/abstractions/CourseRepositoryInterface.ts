import {DbClientInterface} from "./DbClientInterface";
import {CourseInterface} from "./CourseInterface";
import {CourseStatisticsInterface} from "./CourseStatisticsInterface";

export interface CourseRepositoryInterface {

   addCourse(course: CourseInterface): Promise<void>;

    getAllCourses(): Promise<CourseInterface[]>;

    getCourse(courseCode: string): Promise<CourseInterface>;

    getCourseStatistics(courseCode: string): Promise<CourseStatisticsInterface>;
}
