import { ImageProcessLibrary } from "./ImageProcessLibrary";
import { ImageStorageLibrary } from "./ImageStorageLibrary";
import { InvalidImageError } from "./error/InvalidImageError";

export class ImageProcessor {
    public static readonly SUCCESS = 1;
    public static readonly FAILED = -1;

    public constructor(protected imageProcessLibrary: ImageProcessLibrary, protected imageStorageLibrary: ImageStorageLibrary) {
    }

    public async processAndSaveImage(source: string, destination: string): Promise<number> {

        try {
            console.log(`Pocessing image ${source} to ${destination}.`);
            this.validateImage(source);
            this.imageProcessLibrary.processImage(source, destination);

            const processedImageContent: string = this.imageProcessLibrary.getProcessedImage();
            await this.imageStorageLibrary.saveContentIntoFile(destination, processedImageContent);
        }
        catch (e) {
            let error = e as Error;
            // console.error(error.message);
            console.log(error.message);
            throw error;
        }
        // Should return the processed image content.
        return ImageProcessor.SUCCESS;
    }

    public validateImage(image: string): void    {
        if (!image.endsWith('.jpg')) {
            throw new InvalidImageError('Invalid image format. Only JPG images are supported.');
        }
    }

}
