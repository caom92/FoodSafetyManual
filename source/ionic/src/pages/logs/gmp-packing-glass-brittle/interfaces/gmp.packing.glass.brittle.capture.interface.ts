export interface CaptureLog {
    date: string,
    notes: string,
    time: string,
    areas: Array<CaptureItem>
}

export interface CaptureArea {
    id: number,
    items: Array<CaptureItem>
}

export interface CaptureItem {
    id: number
    is_acceptable: boolean
}