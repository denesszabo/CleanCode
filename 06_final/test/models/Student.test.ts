import {Student} from "../../src/models/Student";

describe('Student tests', () => {
    it('should get and set name', () => {
        // Arrange
        const student = new Student('John', 'john@example.com');
        // Assert
        expect(student.getName()).toBe('John');
        // Act
        student.setName('Jane');
        // Assert
        expect(student.getName()).toBe('Jane');
    })

    it('should set and get email', () => {
        // Arrange
        const student = new Student('John', 'john@example.com');
        // Assert
        expect(student.getEmail()).toBe('john@example.com');
        // Act
        student.setEmail('john@wick.com');
        // Assert
        expect(student.getEmail()).toBe('john@wick.com');
    })
})
