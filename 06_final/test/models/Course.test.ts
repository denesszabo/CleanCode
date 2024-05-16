import {Course} from "../../src/models/Course";

describe('Course tests', () => {
    it('should set the code and the title', () => {
        // Arrange
        const title1 = 'Computer Science: Clean code for dummies';
        const title2 = 'Computer Science: Drupal for dummies';
        const code = 'C001';

        const sut = new Course(code, title1);

        // Assert
        expect(sut.getTitle()).toBe(title1);
        expect(sut.getCourseCode()).toBe(code);

        // Act
        sut.setTitle(title2);
        // Assert
        expect(sut.getTitle()).toBe(title2);
    })
})
