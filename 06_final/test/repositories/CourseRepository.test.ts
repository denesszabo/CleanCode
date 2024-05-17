import {CourseRepository} from "../../src/repositories/CourseRepository";
import {DbClient} from "../../src/clients/DbClient";
import {mock, mockReset} from "jest-mock-extended";
import {NotFoundError} from "../../src/errors/NotFoundError";
import {Course} from "../../src/models/Course";
import {DatabaseError} from "../../src/errors/DatabaseError";

const mockDbClient = mock<DbClient>();
describe('CourseRepository tests', () => {
    let sut: CourseRepository;

    beforeEach(() => {
        mockReset(mockDbClient);

        sut = new CourseRepository(mockDbClient);
    })
    describe('Happy path', () => {
        it('should get all courses from the database', async () => {
            // Arrange

            // Act
            const result = await sut.getAllCourses();

            // Assert
            expect(mockDbClient.getAllCourses).toBeCalledTimes(1);
        })

        it('should return with one course from the database', async() => {
            // Arrange
            const courseCode = 'C002X';
            const expectedCourse = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );

            mockDbClient.getCourse.mockResolvedValue(expectedCourse);

            // Act
            const result = await sut.getCourse(courseCode);

            // Assert
            expect(mockDbClient.getCourse).toBeCalledTimes(1);
            expect(mockDbClient.getCourse).toHaveBeenCalledWith(courseCode);
            expect(result.getCourseCode()).toBe(courseCode);
        })

        it('should add a new course', () => {
            const courseCode = 'C002X';
            const course = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );

            sut.addCourse(course);

            // Assert
            expect(mockDbClient.addCourse).toBeCalledTimes(1);
            expect(mockDbClient.addCourse).toHaveBeenCalledWith(course);
        });
    })

    describe('Sad path', () => {
        it('should throw an error when the course is not found', async () => {
            // Arrange
            const courseCode = 'C002';
            const error = new NotFoundError("Course not found");
            mockDbClient.getCourse.mockImplementation(() => {
                throw error
            })

            // Act
            await expect(sut.getCourse(courseCode)).rejects.toThrow(error);
        })

        it('should throw DatabaseError on add curse', async () => {
            const courseCode = 'C002X';
            const course = new Course(
                courseCode,
                'Computer Science: Drupal for dummies',
                new Date('2024-01-01'),
                10,
                300000
            );
            const error = new DatabaseError("Database error");

            mockDbClient.addCourse.mockImplementation(() => {
                throw error
            })

            // Act
            await expect(sut.addCourse(course)).rejects.toThrow(error);

        });
    })


})
