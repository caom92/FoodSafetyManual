export interface CaptureLog {
    date: string,
    time: string,
    items: Array<CaptureItem>
}

export interface CaptureItem {
    id: number,
    test: number,
    deficiencies: string,
    corrective_action: string
}