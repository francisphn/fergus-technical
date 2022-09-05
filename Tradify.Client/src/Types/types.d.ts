export type Job = {
    id: number,
    userId: number,
    title: string,
    client: string,
    status: string,
    created: string,
    notes: Array<string>
}