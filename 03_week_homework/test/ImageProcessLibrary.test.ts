import {ImageProcessLibrary} from "../src/ImageProcessLibrary";
import {InvalidImageError} from "../src/error/InvalidImageError";

describe('ImageProcessor tests', () => {

    describe('Happy path', () => {
        it('should process an image and return with success', async() => {
            // Arrange
            const imageProcessLibrary = new ImageProcessLibrary();
            const source = 'source.jpg';
            const destination = 'destination.png';

            // Act
            let resultImage:string = imageProcessLibrary.getProcessedImage();

            // Assert
            expect(resultImage.length).toBe(0);

            // Act
            let resultCode: number = await imageProcessLibrary.processImage(source, destination);

            // Assert
            expect(resultCode).toBe(ImageProcessLibrary.SUCCESS);

            // Act
            resultImage = imageProcessLibrary.getProcessedImage();

            // Assert
            expect(resultImage.length).toBeGreaterThan(0);
        });
    })

    describe('Sad path', () => {
        it.each([
            {name: 'both images are empty', source: '', destination: ''},
            {name: 'the source image is empty', source: '', destination: 'something.jpg'},
            {name: 'the destination image is empty', source: 'something.jpg', destination: ''},
            ]
        )('should process images, $name and return with exception', async({name: string, source, destination}) => {
            // Arrange
            const imageProcessLibrary: ImageProcessLibrary = new ImageProcessLibrary();

            // Act
            let resultImage: string = imageProcessLibrary.getProcessedImage();

            // Assert
            expect(resultImage.length).toBe(0);

            // Act
            // Assert
            await expect(imageProcessLibrary.processImage(source, destination)).rejects.toThrow(InvalidImageError);

            // Act
            resultImage = imageProcessLibrary.getProcessedImage();

            // Assert
            expect(resultImage.length).toBe(0);
        });
    })

})
