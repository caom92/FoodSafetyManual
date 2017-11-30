export interface CaptureLog {
    date: string,
    notes: string,
    stations: Array<CaptureStation>
}

export interface CaptureStation {
    id: number,
    is_secured: boolean,
    condition: boolean,
    activity: boolean,
    corrective_action: string
}