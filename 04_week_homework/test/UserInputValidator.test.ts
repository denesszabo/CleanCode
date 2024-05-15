import {InputValidator} from "../src/InputValidator";

describe('UserInputValidator tests', () => {
    let sut: InputValidator;

    beforeEach(() => {
        sut = new InputValidator();
    })
    describe('Happy path', () => {
        it.each([
            { name: 'valid input more than 5 less than 20', input: 'test12345'},
            { name: 'valid input with lowercase, uppercase, numbers', input: 'Test12345'},
        ])('should return with success for $input', ({ name, input}) => {
            // Act
            const result = sut.validateUserName(input);

            // Assert
            expect(result).toBe(InputValidator.SUCCESS);
        });
    })

    describe('Sad path', () => {
        it.each([
            { name: 'empty input', input: ''},
            { name: 'spaces only', input: ''},
            { name: 'long input with spaces, but sort trimmed', input: '  test  '},
            { name: 'invalid characters in input1', input: ' -test12345'},
            { name: 'invalid characters in input2', input: '!test12345'},
            { name: 'valid input but too long', input: 'test12345test12345test12345test12345'},
        ])('should return with fail for $input', ({ name, input}) => {
            // Act
            const result = sut.validateUserName(input);

            // Assert
            expect(result).toBe(InputValidator.ERROR);
        });
    })
})
