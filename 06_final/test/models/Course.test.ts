import {Course} from "../../src/models/Course";
import {Student} from "../../src/models/Student";

describe('Course tests', () => {
    it('should set the code and the title', () => {
        // Arrange
        const title1 = 'Computer Science: Clean code for dummies';
        const title2 = 'Computer Science: Drupal for dummies';
        const code1 = 'C001';
        const date1 = new Date('2024-01-01');
        const date2 = new Date('2024-02-01');
        const weeks1 = 10;
        const weeks2 = 12;
        const cost1 = 300000;
        const cost2 = 250000;

        const sut = new Course(code1, title1, date1, weeks1, cost1);

        // Assert
        expect(sut.getTitle()).toBe(title1);
        expect(sut.getCourseCode()).toBe(code1);
        expect(sut.getStartDate()).toBe(date1);
        expect(sut.getLengthInWeeks()).toBe(weeks1);
        expect(sut.getCost()).toBe(cost1);

        // Act
        sut.setTitle(title2);
        sut.setStartDate(date2)
        sut.setLengthInWeeks(weeks2);
        sut.setCost(cost2);

        // Assert
        expect(sut.getTitle()).toBe(title2);
        expect(sut.getStartDate()).toBe(date2);
        expect(sut.getLengthInWeeks()).toBe(weeks2);
        expect(sut.getCost()).toBe(cost2);
    })

    it('should assign a new student', () => {
        // Arrange
        const sut = new Course(
            'XXX',
            'Lorem Ipsum',
            new Date('2024-05-15'),
            1,
            5000000
        );

        const student = new Student('John', 'john@example.com');

        // Act
        let students = sut.getStudents();

        // Assert
        expect(students.length).toBe(0);

        // Act
        sut.assignStudent(student);
        students = sut.getStudents();

        expect(students.length).toBe(1);
    })
})
