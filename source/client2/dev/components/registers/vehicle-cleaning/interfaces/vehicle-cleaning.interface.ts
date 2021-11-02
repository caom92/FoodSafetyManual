export interface VehicleCleaningEntryInterface {
  id: number
  captured_register_id: number
  capture_date: string
  license_plate: string
  disinfection: number
  water_rinse: number
  conditions: number
  contamination_free: number
  corrective_action: string
  initials: string,
  submitter_id: number,
  signable: number,
  signature_path: string,
  supervisor_id: number,
  gp_signable: number,
  gp_signature_path: string,
  gp_supervisor_id: number,
  zone_id: number,
  zone: string
}
