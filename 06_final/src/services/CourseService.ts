import {CourseServiceInterface} from "../abstractions/CourseServiceInterface";
import {CourseRepositoryInterface} from "../abstractions/CourseRepositoryInterface";
import {CourseInterface} from "../abstractions/CourseInterface";
import {PaymentServiceInterface} from "../abstractions/PaymentServiceInterface";
import {StudentInterface} from "../abstractions/StudentInterface";
import {PersonInterface} from "../abstractions/PersonInterface";
import {NotificationService} from "./NotificationService";
import {NotificationServiceInterface} from "../abstractions/NotificationServiceInterface";

export class CourseService implements CourseServiceInterface {

    constructor(
        private courseRepository: CourseRepositoryInterface,
        private paymentService: PaymentServiceInterface,
        private notificationService: NotificationServiceInterface
    ) {

    }

    public async addCourse(course: CourseInterface): Promise<void> {
        await this.courseRepository.addCourse(course);
    }

    public async getCourses(): Promise<CourseInterface[]> {
        return await this.courseRepository.getAllCourses();
    }

    public async addStudentToCourse(student: PersonInterface, courseCode: string): Promise<void> {
        let course: CourseInterface;

        try {
            course = await this.courseRepository.getCourse(courseCode);
        }
        catch (error) {
            // @todo log the error.
            throw error;
        }

        try {
            this.paymentService.getCoursePaymentInfo(course, student);
        }
        catch (error) {
            // @todo log the error.
            throw error;
        }
        course.assignStudent(student);
        this.notificationService.sendNotification(`${student.getName()} student was added to course.`)
    }
}
