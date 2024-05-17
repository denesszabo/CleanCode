import {CourseInterface} from "./CourseInterface";
import {StudentInterface} from "./StudentInterface";

export interface PaymentServiceInterface {

    constructor(financialApiClient: FinancialApiClientInterface);

    payCourse(course: CourseInterface, student: StudentInterface): Promise<void>;

    getCoursePaymentInfo(course: CourseInterface, student: StudentInterface): Promise<any>;
}
