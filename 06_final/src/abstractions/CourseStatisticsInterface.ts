export interface CourseStatisticsInterface {
    courseName: string,
    totalLectures: number,
    lecturesCompleted: number,
    progress: number,
    lastAccessed: Date;

    getCourseName(): string;
    getTotalLectures(): number;
    getLecturesCompleted(): number;
    getProgress(): number;
    getLastAccessed(): Date;

}
