import {CourseStatisticsInterface} from "../abstractions/CourseStatisticsInterface";

export class CourseStatistics implements CourseStatisticsInterface {
    courseName: string;
    totalLectures: number;
    lecturesCompleted: number;
    progress: number;
    lastAccessed: Date;

    constructor(
        courseName: string,
        totalLectures: number,
        lecturesCompleted: number,
        progress: number,
        lastAccessed: Date
    ) {

        this.courseName = courseName;
        this.totalLectures = totalLectures;
        this.lecturesCompleted = lecturesCompleted;
        this.progress = progress;
        this.lastAccessed = lastAccessed;
    }

    public getCourseName(): string {
        return this.courseName;
    }

    public getTotalLectures(): number {
        return this.totalLectures;
    }

    public getLecturesCompleted(): number {
        return this.lecturesCompleted;
    }

    public getProgress(): number {
        return this.progress;
    }

    public getLastAccessed(): Date {
        return this.lastAccessed;
    }
}
