import { SuperAuthorization } from '../../super-logs/super.logs.authorization.interface'
import { LogQualityTypes, LogActions } from './gmp.packing.aged.product.log.interface'

export interface Authorization extends SuperAuthorization {
  items: AuthorizationItem
}

export interface AuthorizationItem {
  quality_types: LogQualityTypes
  actions: LogActions
  entries: Array<AuthorizationEntry>
}

export interface AuthorizationEntry {

}