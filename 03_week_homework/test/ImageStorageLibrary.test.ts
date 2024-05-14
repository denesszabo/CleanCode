import { ImageStorageLibrary } from "../src/ImageStorageLibrary";

describe('ImageStorageLibrary tests', () => {
    it('should save an image content and return with success', async() => {
        // Arrange
        const imageStorageLibrary = new ImageStorageLibrary();
        const destination = 'destination.jpg';
        const imageContent = 'This is the test image content.';

        // Act
        let result = await imageStorageLibrary.saveContentIntoFile(destination, imageContent);

        // Assert
        expect(result).toBeUndefined();
    });
})
