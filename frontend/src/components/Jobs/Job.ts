type JobState = 'in progress' | 'completed' | 'failed';

export interface Job {
    _id: string,
    siteId: {
        _id: string,
        name: string,
    },
    state: JobState,
    numberPages: number,
    amountDocuments: number,
    createdAt: string,
    updatedAt: string,
    __v: number,
}