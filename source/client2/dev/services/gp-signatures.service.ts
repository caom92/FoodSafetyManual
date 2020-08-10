import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'

@Injectable()
export class GPSignaturesService {
  constructor(private apiService: BackendAPIService) {

  }

  public addSignature(data: Object): Promise<any> {
    return this.apiService.serviceCall('add-signature', data)
  }

  public listSignatures(): Promise<any> {
    return this.apiService.serviceCall('list-gp-signatures')
  }

  public assignZones(data: Object): Promise<any> {
    return this.apiService.serviceCall('assign-zones-to-gp-supervisor', data)
  }

  public listZones(): Promise<any> {
    return this.apiService.serviceCall('list-zone-names')
  }

  public listGPSupervisorZones(): Promise<any> {
    return this.apiService.serviceCall('list-gp-supervisor-zones')
  }

  public listLogs(): Promise<any> {
    return this.apiService.serviceCall('list-logs')
  }

  public listUnsignedLogs(data: Object): Promise<any> {
    return this.apiService.serviceCall('list-unsigned-logs', data)
  }

  public signLog(id: number): Promise<any> {
    let data = { captured_log_id: id}

    return this.apiService.confirmationServiceCall('sign-log', { key: 'Titles.gp_signature' }, { key: 'Messages.gp_signature' }, data)
  }
}