import {Lecturer} from "../../src/models/Lecturer";

describe('Lecturer tests', () => {
    it('should get and set name', () => {
        // Arrange
        const person = new Lecturer('John', 'john@example.com');
        // Assert
        expect(person.getEmail()).toBe('john@example.com');
        // Act
        person.setEmail('john.wick@example.com');
        person.setName('Bill');
        // Assert
        expect(person.getEmail()).toBe('john.wick@example.com');
        expect(person.getName()).toBe('Bill');
    })
})
