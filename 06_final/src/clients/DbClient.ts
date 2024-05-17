import {CourseInterface} from "../abstractions/CourseInterface";
import {DbClientInterface} from "../abstractions/DbClientInterface";
import {Course} from "../models/Course";
import {NotFoundError} from "../errors/NotFoundError";
import {delay} from "../utils/delay";
import {courseData} from "../data/courses";
import {StudentInterface} from "../abstractions/StudentInterface";

export class DbClient implements DbClientInterface {
    protected courseRepository: CourseInterface[] = [];

    constructor() {
        this.fillUpCourseRepository();
    }

    private fillUpCourseRepository() {
        courseData.forEach((data) => {
            this.courseRepository.push(new Course(
                data.code, data.title, new Date(data.startDate), data.lengthInWeeks, data.cost
            ));
        });
    }

    public async addCourse(course: CourseInterface): Promise<any> {
        await delay(1000);
        this.courseRepository.push(course);
        // May throw a DatabaseError.
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

    public async assignCourseToStudent(course: CourseInterface, student: StudentInterface): Promise<any> {
        await delay(1000);
        try {
            // @todo Save the course - user relation to the database
        }
        catch (e) {

        }
    }
}
