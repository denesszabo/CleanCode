import {mock, mockReset} from "jest-mock-extended";
import {FinancialServiceInterface} from "../../src/abstractions/FinancialServiceInterface";
import {FinancialApiClient} from "../../src/clients/FinancialApiClient";
import {PaymentService} from "../../src/services/PaymentService";
import {CourseInterface} from "../../src/abstractions/CourseInterface";
import {PersonInterface} from "../../src/abstractions/PersonInterface";
import {Course} from "../../src/models/Course";
import {Student} from "../../src/models/Student";
import {UnknownError} from "../../src/errors/UnknownError";
import {InsufficientBalanceError} from "../../src/errors/InsufficientBalanceError";
import {NetworkError} from "../../src/errors/NetworkError";
import {OrderNotFoundError} from "../../src/errors/OrderNotFoundError";

const mockFinancialService = mock<FinancialServiceInterface>();
const mockFinancialApiClient = mock<FinancialApiClient>(mockFinancialService);

describe('PaymentService tests', () => {
    let sut: PaymentService;
    let course: CourseInterface;
    let student: PersonInterface;
    const courseCode = 'C002X';

    beforeEach(() => {
        mockReset(mockFinancialService);
        mockReset(mockFinancialApiClient);
        sut = new PaymentService(mockFinancialApiClient);
        course = new Course(
            courseCode,
            'Computer Science: Drupal for dummies',
            new Date('2024-01-01'),
            10,
            300000
        );

        student = new Student('John', 'john@example.com');

    })
    
    describe('Happy path', () => {
        it('should check the user payed for', async () => {
            // Arrange

            // Act
            await sut.payCourse(course, student);

            // Assert
            expect(mockFinancialApiClient.payOrder).toBeCalledTimes(1);
            expect(mockFinancialService.payOrder).toBeCalledTimes(1);

        });

        it('should get back the course payment info payed for', async () => {
            // Arrange
            mockFinancialApiClient.getOrderStatus.mockResolvedValue('ok');
            // Act
            const result = await sut.getCoursePaymentInfo(course, student);

            // Assert
            expect(mockFinancialApiClient.getOrderStatus).toBeCalledTimes(1);
            expect(mockFinancialService.getOrderStatus).toBeCalledTimes(1);

        });
    })

    describe('Sad path', () => {

        describe('PayOrder test', () => {
            it('should return InsufficientBalanceError error on payment', async () => {
                const expectedError = new InsufficientBalanceError('Insufficient balance');
                mockFinancialApiClient.payOrder.mockImplementation(() => {
                    throw expectedError;
                })

                await expect(() => sut.payCourse(course, student)).rejects.toThrow(expectedError);
            });

            it('should return NetworkError error on payment', async () => {
                const expectedError = new NetworkError('Network not reachable');
                mockFinancialApiClient.payOrder.mockImplementation(() => {
                    throw expectedError;
                })

                await expect(() => sut.payCourse(course, student)).rejects.toThrow(expectedError);
            })

            it('should return UnknownError error on payment', async () => {
                const expectedError = new UnknownError('Unknown error, boo-boo');
                mockFinancialApiClient.payOrder.mockImplementation(() => {
                    throw expectedError;
                })

                await expect(() => sut.payCourse(course, student)).rejects.toThrow(expectedError);
            })
        })

        describe('GetOrderStatus test', () => {

            it('should should throw OrderNotFoundError', async () => {
                // Arrange
                const expectedError = new OrderNotFoundError('Order not found');

                mockFinancialApiClient.getOrderStatus.mockImplementation(() => {
                    throw expectedError;
                });

                // Assert
                await expect(() => sut.getCoursePaymentInfo(course, student)).rejects.toThrow(expectedError);

            })

            it('should should throw NetworkError', async () => {
                // Arrange
                const expectedError = new NetworkError('Network not reachable');

                mockFinancialApiClient.getOrderStatus.mockImplementation(() => {
                    throw expectedError;
                });

                // Assert
                await expect(() => sut.getCoursePaymentInfo(course, student)).rejects.toThrow(expectedError);

            })

            it('should should throw UnknownError', async () => {
                // Arrange
                const expectedError = new UnknownError('Unknown error, boo-boo');

                mockFinancialApiClient.getOrderStatus.mockImplementation(() => {
                    throw expectedError;
                });

                // Assert
                await expect(() => sut.getCoursePaymentInfo(course, student)).rejects.toThrow(expectedError);

            })

        })



    })
})
