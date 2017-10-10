export interface Report {
    report_id: number,
    created_by: string,
    approved_by: string,
    signature_path: string,
    creation_date: string,
    approval_date: string,
    zone_name: string,
    program_name: string,
    module_name: string,
    log_name: string,
    notes: string,
    album_url: string,
    areas: ReportArea[]
}

export interface ReportArea {
    id: number,
    name: string,
    person_performing_sanitation: string,
    notes: string,
    time: string,
    types: ReportType[]
}

export interface ReportType {
    id: number,
    en: string,
    es: string,
    items: ReportItem[]
}

export interface ReportItem {
    id: number,
    order: number,
    name: string,
    status: number,
    corrective_action_id: number,
    corrective_action: string,
    comment: string
}
