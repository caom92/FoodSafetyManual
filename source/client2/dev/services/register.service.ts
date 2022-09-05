import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class RegisterService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public countPendingRegisters(): Promise<any> {
    return this.apiService.silentService('count-pending-registers')
  }

  public info(suffix: string): Promise<any> {
    return this.apiService.serviceCall('info-' + suffix, null, false)
  }

  public list(): Promise<any> {
    return this.apiService.serviceCall('list-registers', null, false)
  }

  public view(suffix: string, data: Object): Promise<any> {
    return this.apiService.serviceCall('view-' + suffix, data, false)
  }

  public add(suffix: string, data: Object): Promise<any> {
    return this.apiService.serviceCall('add-' + suffix, data)
  }

  public edit(suffix: string, data: Object): Promise<any> {
    return this.apiService.serviceCall('edit-' + suffix, data)
  }

  public supervisorSign(id: number): Promise<any> {
    let data = { captured_register_id: id, date: this.timeService.getISODate() }

    return this.apiService.confirmationServiceCall('sign-register', { key: 'Titles.sign_register' }, { key: 'Messages.sign_register' }, data)
  }

  public gpSupervisorSign(id: number): Promise<any> {
    let data = { captured_register_id: id, date: this.timeService.getISODate() }

    return this.apiService.confirmationServiceCall('gp-sign-register', { key: 'Titles.gp_sign_register' }, { key: 'Messages.gp_sign_register' }, data)
  }

  public addFooter(data: Object): Promise<any> {
    return this.apiService.serviceCall('add-register-footer', data, true)
  }

  public editFooter(data: Object): Promise<any> {
    return this.apiService.serviceCall('edit-register-footer', data, true)
  }

  public listZones(): Promise<any> {
    return this.apiService.serviceCall('list-zone-names', null, false)
  }

  public listFooters(zoneID: number): Promise<any> {
    let data = { zone_id: zoneID }
    return this.apiService.serviceCall('list-register-footer', data, false)
  }
}