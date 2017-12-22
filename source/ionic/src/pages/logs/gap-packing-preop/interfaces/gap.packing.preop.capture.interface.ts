export interface CaptureLog {
    date: string,
    notes: string,
    album_url: string,
    areas: Array<CaptureArea>
}

export interface CaptureArea {
    id: number
    time: string
    notes: string
    person_performing_sanitation: string
    items: Array<CaptureItem>
}

export interface CaptureItem {
    id: number
    is_acceptable: boolean
    corrective_action: number
    comment: string
}