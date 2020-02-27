import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class LogService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public log(suffix: string): Promise<any> {
    return this.apiService.serviceCall('log-' + suffix, null, false)
  }

  public capture(suffix: string, data: Object): Promise<any> {
    return this.apiService.serviceCall('capture-' + suffix, data)
  }

  public listWaitingLogs(suffix: string): Promise<any> {
    return this.apiService.serviceCall('list-waiting-logs-' + suffix, null, false)
  }

  public authorization(suffix: string, id: number): Promise<any> {
    let data = { report_id: id }

    return this.apiService.serviceCall('authorization-report-' + suffix, data)
  }

  public update(suffix: string, data: Object): Promise<any> {
    return this.apiService.serviceCall('update-' + suffix, data)
  }

  public approve(id: number): Promise<any> {
    let data = { captured_log_id: id, date: this.timeService.getISODate() }

    return this.apiService.confirmationServiceCall('approve-log', { key: 'Titles.approve_log' }, { key: 'Messages.approve_log' }, data)
  }

  public retreat(id: number): Promise<any> {
    let data = { captured_log_id: id }

    return this.apiService.confirmationServiceCall('retreat-log', { key: 'Titles.retreat_log' }, { key: 'Messages.retreat_log' }, data)
  }

  public reject(id: number): Promise<any> {
    let data = { captured_log_id: id }

    return this.apiService.confirmationServiceCall('reject-log', { key: 'Titles.reject_log' }, { key: 'Messages.reject_log' }, data)
  }

  public finish(id: number): Promise<any> {
    let data = { captured_log_id: id }

    return this.apiService.confirmationServiceCall('finish-log', { key: 'Titles.finish_log' }, { key: 'Messages.finish_log' }, data)
  }

  public uploadManual(suffix: string, manual: FileList): Promise<any> {
    let data = { manual_file: manual[0] }

    return this.apiService.serviceCall('upload-manual-' + suffix, data)
  }

  public manualUrl(suffix: string): Promise<any> {
    let data = { suffix: suffix }

    return this.apiService.backgroundServiceCall('get-log-manual-url', data, false)
  }

  // https://stackoverflow.com/questions/43551221/angular-2-mark-nested-formbuilder-as-touched
  public setAsDirty(group: FormGroup | FormArray) {
    group.markAsDirty()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsDirty()
      } else {
        this.setAsDirty(group.controls[i])
      }
    }
  }

  refreshFormGroup(group: FormGroup | FormArray) {
    group.updateValueAndValidity()
    for (let i in group.controls) {
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].updateValueAndValidity()
      } else {
        this.refreshFormGroup(group.controls[i])
      }
    }
  }

  resolveBackendString(input: string | number): string {
    if (typeof input === 'number') {
      return (input !== null && input !== undefined && Number.isNaN(input) !== true) ? String(input) : ''
    } else {
      return (input !== null && input !== undefined) ? String(input) : ''
    }
  }

  resolveBackendBoolean(input: string | number): boolean {
    return (input !== null && input !== undefined) ? (Number(input) === 1) ? true : (Number(input) === 0) ? false : null : null
  }

  resolveBackendCheckboxBoolean(input: string | number): boolean {
    return (input !== null && input !== undefined) ? (Number(input) === 1) ? true : (Number(input) === 0) ? false : null : (input === null) ? false : null
  }

  resolveBackendNumber(input: string | number): number {
    return (!Number.isNaN(Number(input)) && input !== null && input !== undefined) ? Number(input) : null
  }
}