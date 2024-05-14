import { ImageProcessor } from "../src/ImageProcessor";
import { ImageProcessLibrary } from "../src/ImageProcessLibrary";
import { mock, mockReset } from 'jest-mock-extended';
import { ImageStorageLibrary } from "../src/ImageStorageLibrary";
import {InvalidImageError} from "../src/error/InvalidImageError";
import {ImageProcessingError} from "../src/error/ImageProcessingError";

let mockedImageProcessLibrary = mock<ImageProcessLibrary>();
let mockedImageStorageLibrary = mock<ImageStorageLibrary>();

describe('ImageProcessor tests', () => {
    let imageProcessor: ImageProcessor;
    beforeEach(() => {
        mockReset(mockedImageProcessLibrary);
        mockReset(mockedImageStorageLibrary);
        imageProcessor = new ImageProcessor(mockedImageProcessLibrary, mockedImageStorageLibrary);
    })

    describe('Happy path', () => {
        it.each([
            { source: 'source.jpg', destination: 'destination.png'}
        ])('should processing the $source image to $destination', async ({source, destination}) => {
            // Arrange
            // const imageProcessor = new ImageProcessor(mockedImageProcessLibrary, mockedImageStorageLibrary);

            // Act
            let result = await imageProcessor.processAndSaveImage(source, destination);

            // Assert
            expect(imageProcessor).toBeInstanceOf(ImageProcessor);
            expect(mockedImageProcessLibrary.processImage).toBeCalledWith(source, destination);
            expect(mockedImageProcessLibrary.processImage).toBeCalledTimes(1);
            expect(mockedImageProcessLibrary.getProcessedImage).toBeCalledTimes(1);
            expect(mockedImageStorageLibrary.saveContentIntoFile).toBeCalledTimes(1);
            expect(result).toBe(ImageProcessor.SUCCESS);
        });
    })

    describe('Sad path', () => {
        const cases = [
            { name: 'source image is empty', source: '', destination: 'destination.png'},
            { name: 'source image is not jpg', source: 'source.png', destination: 'destination.png'},
        ]
        it.each(cases)('should processing the $name to $destination and return with exceptions, ', async ({name, source, destination} ) => {
            // Arrange

            const imageProcessor = new ImageProcessor(mockedImageProcessLibrary, mockedImageStorageLibrary);

            // Assert
            expect(imageProcessor).toBeInstanceOf(ImageProcessor);
            await expect(imageProcessor.processAndSaveImage(source, destination)).rejects.toThrow(InvalidImageError);
        });

        it('should throw ImageProcessingError when processing, ', async () => {
            // Arrange
            const source: string = 'source.jpg';
            const destination: string = 'destination.jpg';
            mockedImageProcessLibrary.processImage.mockImplementation(() => { throw new ImageProcessingError('Image processing error'); });
            // const imageProcessor = new ImageProcessor(mockedImageProcessLibrary, mockedImageStorageLibrary);

            // Assert
            expect(imageProcessor).toBeInstanceOf(ImageProcessor);
            await expect(imageProcessor.processAndSaveImage(source, destination)).rejects.toThrow(ImageProcessingError);
            // expect(imageProcessor.processAndSaveImage).toBeCalledTimes(1);
            expect(mockedImageProcessLibrary.processImage).toBeCalledTimes(1);
            expect(mockedImageProcessLibrary.processImage).toBeCalledWith(source, destination);
            expect(mockedImageStorageLibrary.saveContentIntoFile).toBeCalledTimes(0);
        });
    })
})
