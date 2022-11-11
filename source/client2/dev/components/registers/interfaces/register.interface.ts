export interface RegisterEntryInterface {
  id: number
  captured_register_id: number
  capture_date: string
  submitter_id: number
  submitter_first_name?: string
  submitter_last_name?: string
  signable: number
  signature_path: string
  supervisor_id: number
  gp_signable: number
  gp_signature_path: string
  gp_supervisor_id: number
  zone_id: number
  zone: string
}
