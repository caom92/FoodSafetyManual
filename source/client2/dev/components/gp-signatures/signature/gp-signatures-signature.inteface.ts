export interface GPSignature {
  id: number
  employee_num: number
  username: string
  full_name: string
  signature_path: string
  zones: Array<GPZone>
}

export interface GPZone {
  id: number
}