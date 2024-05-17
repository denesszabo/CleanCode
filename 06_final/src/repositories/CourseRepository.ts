import {CourseRepositoryInterface} from "../abstractions/CourseRepositoryInterface";
import {Course} from "../models/Course";
import {CourseInterface} from "../abstractions/CourseInterface";
import {DbClientInterface} from "../abstractions/DbClientInterface";
import {delay} from "../utils/delay";
import {CourseRepositoryBase} from "../abstractions/CourseRepositoryBase";
import {StudentInterface} from "../abstractions/StudentInterface";

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
}
