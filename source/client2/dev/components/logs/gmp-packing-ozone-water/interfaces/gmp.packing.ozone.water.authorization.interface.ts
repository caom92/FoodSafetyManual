import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: string
  name: string
  reading: number
  ph: number
  orp: number
  temperature: number
  corrective_action: string
  product: string
  lot: string
  parcel: string
  reference: string
  total_chlorine: number
  free_chlorine: number
  rinse: number
  status: number
}