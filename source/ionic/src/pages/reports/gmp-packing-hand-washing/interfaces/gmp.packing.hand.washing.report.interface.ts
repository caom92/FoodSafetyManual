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
    items: Array<ReportItem>
}

export interface ReportItem {
    id: number,
    name: string,
    is_acceptable: number
}
