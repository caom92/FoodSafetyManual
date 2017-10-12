// For GMP Packing Preop

export interface CapturedLog {
    date: string
    notes: string
    album_url: string
    areas: Area[]
}

export interface Area {
    id: number
    time: string
    notes: string
    person_performing_sanitation: string
    items: Item[]
}

export interface Item {
    id: number
    is_acceptable: boolean
    corrective_action: number
    comment: string
}