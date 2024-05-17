import {CourseRepositoryInterface} from "./CourseRepositoryInterface";
import {DbClientInterface} from "./DbClientInterface";
import {CourseInterface} from "./CourseInterface";
import {CourseStatisticsInterface} from "./CourseStatisticsInterface";

export abstract class CourseRepositoryBase implements CourseRepositoryInterface {

    constructor(dbClient: DbClientInterface) {}

    abstract addCourse(course: CourseInterface): Promise<void>;

    abstract getAllCourses(): Promise<CourseInterface[]>;

    abstract getCourse(courseCode: string): Promise<CourseInterface>;

    abstract getCourseStatistics(courseCode: string): Promise<CourseStatisticsInterface>;
}
