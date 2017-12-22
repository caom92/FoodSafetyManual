export interface CaptureLog {
    date: string,
    notes: string,
    items: Array<CaptureItem>
}

export interface CaptureItem {
    id: number
    is_acceptable: boolean
}