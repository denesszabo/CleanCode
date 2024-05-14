import { delay } from "./common";
import { InvalidImageError } from "./error/InvalidImageError";
import { ImageProcessingError } from "./error/ImageProcessingError";

export class ImageProcessLibrary {
    public static readonly SUCCESS = 1;
    protected processedImage: string;

    public constructor() {
        // Set the processed image to an empty string.
        this.processedImage = '';
    }

    /**
     * Process an image.
     *
     * @param source
     *   The source image.
     * @param destination
     *   The destination path.
     *
     * @throws InvalidImageError.
     * @throws ImageProcessingError
     */
    public async processImage(source: string, destination: string): Promise<number> {
        this.processedImage = '';

        try {
            this.validateImage(source);
            this.validateImage(destination);
            console.log(`Processing image from ${source} to ${destination}`);

            // Simulate the actual image processing process. It takes a time.
            await delay(1500);

            console.log('Image processed successfully.');

            // @todo: Should throw an error if the image cannot be processed.
            // @todo: Implement the image processing here.
            this.processedImage = 'PROCESSED_IMAGE_CONTENT';
            return ImageProcessLibrary.SUCCESS;
        }
        catch (e) {
            let error = e as Error;
            console.error(error.message);
            throw error;
        }

    }

    protected validateImage(image: string) {
        if (image.length == 0) {
            throw new InvalidImageError('The image cannot be empty.');
        }
    }


    public getProcessedImage(): string {
        return this.processedImage;
    }
}
