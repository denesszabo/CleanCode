export interface DbClientInterface {
    getCourse(courseCode: string): Promise<any>;
}
