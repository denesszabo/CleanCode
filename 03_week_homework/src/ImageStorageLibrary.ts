import {delay} from "./common";

export class ImageStorageLibrary {

    public async saveContentIntoFile(destination: string, content: string): Promise<void> {
        console.log(`Saving file content ${content} to path ${destination}`);

        // Simulate the actual image saving process. It takes a time.
        await delay(1000);
    }
}
