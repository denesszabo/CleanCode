import {CourseService} from "../../src/services/CourseService";
import {mock, mockReset} from "jest-mock-extended";
import {CourseRepository} from "../../src/repositories/CourseRepository";
import {CourseInterface} from "../../src/abstractions/CourseInterface";
import {DbClient} from "../../src/clients/DbClient";
import {courseData} from "../../src/data/courses";
import {Course} from "../../src/models/Course";
import {PaymentService} from "../../src/services/PaymentService";
import {Student} from "../../src/models/Student";
import {NotFoundError} from "../../src/errors/NotFoundError";
import {OrderNotFoundError} from "../../src/errors/OrderNotFoundError";
import {NotificationServiceInterface} from "../../src/abstractions/NotificationServiceInterface";


// const mockFinancialService = mock<FinancialServiceInterface>();
// const mockFinancialApiClient = mock<FinancialApiClientInterface>(mockFinancialService);
//
// const mockPaymentService = mock<PaymentService>(mockFinancialApiClient);
const mockPaymentService = mock<PaymentService>();

const mockDbClient = mock<DbClient>();
const mockCourseRepository = mock<CourseRepository>(mockDbClient);
const mockNotificationService = mock<NotificationServiceInterface>()

describe('CourseService tests', () => {
    let sut: CourseService;
    let courses: CourseInterface[] = [];

    beforeEach(() => {

        // mockReset(mockFinancialService);
        // mockReset(mockFinancialApiClient);
        mockReset(mockPaymentService);
        mockReset(mockDbClient);
        mockReset(mockCourseRepository)

        sut = new CourseService(mockCourseRepository, mockPaymentService, mockNotificationService);

        for (let i = 0; i < courseData.length; i++) {
            let data = courseData[i];
            courses.push(new Course(
                data.code, data.title, new Date(data.startDate), data.lengthInWeeks, data.cost
            ));
        }
    })

    describe('Happy path', () => {

        describe('GetCourses() test', () => {

            it('should get all courses, empty', async () => {
                // Arrange
                const expectedCourses: CourseInterface[] = [];
                mockCourseRepository.getAllCourses.mockResolvedValue(expectedCourses);

                // Act
                const courses = await sut.getCourses();

                // Assert
                expect(courses).toEqual(expectedCourses);
                expect(mockCourseRepository.getAllCourses).toBeCalledTimes(1)
            })

            it('should get all courses, not empty', async () => {
                // Arrange
                mockCourseRepository.getAllCourses.mockResolvedValue(courses);

                // Act
                const result = await sut.getCourses();

                // Assert
                expect(result).toEqual(courses);
                expect(mockCourseRepository.getAllCourses).toBeCalledTimes(1)
            })
        })

        it('should add a new course', async () => {
            // Arrange
            const courseCode = 'C002X';
            const course = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );
            courses.push(course);
            mockCourseRepository.getAllCourses.mockResolvedValue(courses);

            // Act
            await sut.addCourse(course);

            // Assert
            expect(mockCourseRepository.addCourse).toBeCalledTimes(1);
        })

        it('should assign the user to a course', async () => {
            // Arrange
            const courseCode = 'C002X';
            const course = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );
            const student = new Student('John', 'john@example.com');
            mockCourseRepository.getCourse.mockResolvedValue(course);
            mockPaymentService.getCoursePaymentInfo.mockResolvedValue(true);

            // Act
            await sut.addStudentToCourse(student, courseCode);
            const courseStudents = course.getStudents();

            // Assert
            expect(mockCourseRepository.getCourse).toBeCalledTimes(1);
            expect(mockPaymentService.getCoursePaymentInfo).toBeCalledTimes(1);
            expect(courseStudents.length).toBe(1);
            expect(mockNotificationService.sendNotification).toBeCalledTimes(1);
        });

    })

    describe('Sad path', () => {
        it('should not assign the user to a course, invalid course', async () => {
            // Arrange
            const courseCode = 'C002X';
            // const course = new Course(
            //     courseCode,
            //     'Computer Science: Drupal for dummies',
            //     new Date('2024-01-01'),
            //     10,
            //     300000
            // );
            const student = new Student('John', 'john@example.com');
            const error = new NotFoundError("Course not found");
            mockCourseRepository.getCourse.mockImplementation(() => {
                throw error
            })

            // Act

            // Assert
            await expect(sut.addStudentToCourse(student, courseCode)).rejects.toThrow(error);
        });

        it('should not assign the user to a course, was not payed', async () => {
            // Arrange
            const courseCode = 'C002X';
            const course = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );
            const student = new Student('John', 'john@example.com');
            mockCourseRepository.getCourse.mockResolvedValue(course);

            const error = new OrderNotFoundError('Payment not found');
            mockPaymentService.getCoursePaymentInfo.mockImplementation(() => {
                throw error
            })

            // Act

            // Assert
            await expect(sut.addStudentToCourse(student, courseCode)).rejects.toThrow(error);
        });
    })

})
