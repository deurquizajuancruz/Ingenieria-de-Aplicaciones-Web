export interface Site {
    userId: string,
    name: string,
    url: string,
    depth: number,
    frequencyHours: number,
    extractor: string,
    resolver?: string,
}