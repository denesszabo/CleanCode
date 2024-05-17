import {DbClient} from "../../src/clients/DbClient";
import {NotFoundError} from "../../src/errors/NotFoundError";
import {Course} from "../../src/models/Course";

describe('DbClient tests', () => {
    let sut: DbClient;

    beforeEach(() => {
        sut = new DbClient();
    })

    describe('Happy path', () => {
        it('should return all the courses', async () => {
            // Act
            const result = await sut.getAllCourses();

            // Assert
            expect(result.length).toBe(4);
        });

        it('should return one of the courses', async () => {
            // Arrange
            const courseCode = 'C002';
            // Act

            const result = await sut.getCourse(courseCode);

            // Assert
            expect(result.getCourseCode()).toBe(courseCode);
        })

        it('should add new course', async () => {
            // Arrange
            const courseCode = 'AS001';
            const courseTitle = 'Above science: Why the universe is so big? - The flat earth theory';
            const course = new Course(
                courseCode,
                courseTitle,
                new Date('2024-05-15'),
                1,
                5000000
            );

            // Act
            sut.addCourse(course);
            const courses = await sut.getAllCourses();

            // Assert
            expect(courses.length).toBe(5);

            // Act
            const result = await sut.getCourse(courseCode);

            // Assert
            expect(result.getCourseCode()).toBe(courseCode);
        });
    })

    describe('Sad path', () => {
        it('should throw an error if course is not found', async () => {
            // Arrange
            const courseCode = 'C999';
            const error = new NotFoundError("Course not found");
            // Act
            await expect(sut.getCourse(courseCode)).rejects.toThrow(error);
        });
    })
})
