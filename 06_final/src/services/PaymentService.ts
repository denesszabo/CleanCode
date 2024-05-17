import {PaymentServiceInterface} from "../abstractions/PaymentServiceInterface";
import {StudentInterface} from "../abstractions/StudentInterface";
import {CourseInterface} from "../abstractions/CourseInterface";
import {FinancialApiClientInterface} from "../abstractions/FinancialApiClientInterface";

export class PaymentService implements PaymentServiceInterface {

    constructor(private financialApiClient: FinancialApiClientInterface) {}

    payCourse(course: CourseInterface, student: StudentInterface): Promise<void> {
        return Promise.resolve();
    }
    getCoursePaymentInfo(course: CourseInterface, student: StudentInterface): Promise<any> {
        return Promise.resolve();
    }
}
