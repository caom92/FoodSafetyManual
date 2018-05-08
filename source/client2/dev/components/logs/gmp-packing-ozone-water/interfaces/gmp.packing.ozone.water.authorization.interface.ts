import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'

export interface Authorization extends SuperAuthorization {
  items: Array<AuthorizationItem>
}

export interface AuthorizationItem {
  id: string
  name: string
  reading: string
  ph: number
  orp: number
  temperature: number
  corrective_action: string
  product: string
  batch: string
  parcel: string
  reference: string
  total_chlorine: number
  free_chlorine: number
  rinse: number
  status: boolean
}