import {CourseInterface} from "./CourseInterface";
import {StudentInterface} from "./StudentInterface";
import {PersonInterface} from "./PersonInterface";

export interface PaymentServiceInterface {

    payCourse(course: CourseInterface, student: PersonInterface): Promise<void>;

    getCoursePaymentInfo(course: CourseInterface, student: PersonInterface): Promise<any>;
}
