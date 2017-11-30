export interface CaptureLog {
    date: string,
    time: string,
    items: Array<CaptureItem>
}

export interface CaptureItem {
    id: number,
    test: number,
    calibration: boolean,
    sanitization: boolean,
    deficiencies: string,
    corrective_action: string
}