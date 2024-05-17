import {PaymentServiceInterface} from "../abstractions/PaymentServiceInterface";
import {StudentInterface} from "../abstractions/StudentInterface";
import {CourseInterface} from "../abstractions/CourseInterface";
import {FinancialApiClientInterface} from "../abstractions/FinancialApiClientInterface";
import {PersonInterface} from "../abstractions/PersonInterface";

export class PaymentService implements PaymentServiceInterface {

    constructor(private financialApiClient: FinancialApiClientInterface) {}

    public async payCourse(course: CourseInterface, student: PersonInterface): Promise<void> {
        const orderId = this.getOrderId(course, student);
        try {
            return await this.financialApiClient.payOrder(orderId, {
                courseCode: course.getCourseCode(),
                cost: course.getCost(),
                currency: 'HUF',
                studentName: student.getName(),
                studentEmail: student.getEmail(),
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getCoursePaymentInfo(course: CourseInterface, student: PersonInterface): Promise<any> {

        const orderId = this.getOrderId(course, student);

        return await this.financialApiClient.getOrderStatus(orderId);
    }

    private getOrderId(course: CourseInterface, student: PersonInterface): string {
        return 'Order-' + course.getCourseCode() + '-' + student.getEmail();
    }
}
