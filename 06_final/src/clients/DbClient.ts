import {CourseInterface} from "../abstractions/CourseInterface";
import {DbClientInterface} from "../abstractions/DbClientInterface";
import {Course} from "../models/Course";
import {NotFoundError} from "../errors/NotFoundError";
import {delay} from "../utils/delay";


export class DbClient implements DbClientInterface {
    protected courseRepository: Course[] = [];

    constructor() {
        this.fillUpCourseRepository();
    }

    private fillUpCourseRepository() {
        this.courseRepository.push(new Course('INF101', 'Introduction to Computer Science 1'));
        this.courseRepository.push(new Course('INF102', 'Introduction to Computer Science 2'));
        this.courseRepository.push(new Course('C001', 'Computer Science: Clean code for dummies'));
        this.courseRepository.push(new Course('C002', 'Computer Science: Drupal for dummies'));
    }

    public async getAllCourses(): Promise<CourseInterface[]> {
        await delay(1000);
        return this.courseRepository;
    }

    public async getCourse(courseCode: string): Promise<CourseInterface> {
        await delay(1000);

        // return new Course('C002', 'Computer Science: Drupal for dummies');
        const found = this.courseRepository.find(
            (c: CourseInterface) =>
            c.getCourseCode() === courseCode
        );

        if (found) {
            return found;
        }

        throw new NotFoundError('Course not found');
    }
}
