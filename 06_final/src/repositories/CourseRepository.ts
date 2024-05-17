import {CourseRepositoryInterface} from "../abstractions/CourseRepositoryInterface";
import {Course} from "../models/Course";
import {CourseInterface} from "../abstractions/CourseInterface";
import {DbClientInterface} from "../abstractions/DbClientInterface";
import {delay} from "../utils/delay";
import {CourseRepositoryBase} from "../abstractions/CourseRepositoryBase";
import {CourseStatisticsInterface} from "../abstractions/CourseStatisticsInterface";
import {CourseStatistics} from "../models/CourseStatistics";

export class CourseRepository implements CourseRepositoryBase {
    private courses: CourseInterface[] = [];
    private dbClient: DbClientInterface;

    constructor(dbClient: DbClientInterface) {
        this.dbClient = dbClient;
    }

    public async addCourse(course: CourseInterface): Promise<void> {
        await this.dbClient.addCourse(course);
    }

    public async getAllCourses(): Promise<Course[]> {
        await delay(1000);
        return this.dbClient.getAllCourses();
    }

    public async getCourse(courseCode: string): Promise<CourseInterface> {
        await delay(1000);
        return this.dbClient.getCourse(courseCode);
    }

    public async getCourseStatistics(courseCode: string): Promise<CourseStatisticsInterface> {
        await delay(1000);
        let course: CourseInterface;

        try {
            course = await this.dbClient.getCourse(courseCode);
        }
        catch (error) {
            // @todo log the error.
            // It may throws NotFoundError.
            throw error;
        }

        // @todo Implement a correct course statistics.
        let statistics;
        statistics = new CourseStatistics(
            course.getCourseCode() + ' - ' + course.getTitle(),
            Math.floor(Math.random() * 10) + 10,
            Math.floor(Math.random() * 10),
            Math.floor(Math.random() * 100),
            new Date('2024-05-01')
        );

        return statistics;
    }
}
