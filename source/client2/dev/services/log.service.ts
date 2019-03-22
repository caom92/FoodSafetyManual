import { Injectable } from '@angular/core'
import { FormArray, FormControl, FormGroup } from '@angular/forms'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class LogService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public log(suffix: string): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('log-' + suffix, null, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return logPromise
  }

  public capture(suffix: string, data: Object): Promise<any> {
    let capturePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('capture-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return capturePromise
  }

  public listWaitingLogs(suffix: string): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('list-waiting-logs-' + suffix, null, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return listPromise
  }

  public authorization(suffix: string, id: number): Promise<any> {
    let data = { report_id: id }

    let authorizationPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('authorization-report-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return authorizationPromise
  }

  public update(suffix: string, data: Object): Promise<any> {
    let updatePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('update-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return updatePromise
  }

  public approve(id: number): Promise<any> {
    let data = { captured_log_id: id, date: this.timeService.getISODate() }

    let approvePromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('approve-log', { key: 'Titles.approve_log' }, { key: 'Messages.approve_log' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return approvePromise
  }

  public retreat(id: number): Promise<any> {
    let data = { captured_log_id: id }

    let retreatPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('retreat-log', { key: 'Titles.retreat_log' }, { key: 'Messages.retreat_log' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return retreatPromise
  }

  public reject(id: number): Promise<any> {
    let data = { captured_log_id: id }

    let rejectPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('reject-log', { key: 'Titles.reject_log' }, { key: 'Messages.reject_log' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return rejectPromise
  }

  public finish(id: number): Promise<any> {
    let data = { captured_log_id: id }

    let finishPromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('finish-log', { key: 'Titles.finish_log' }, { key: 'Messages.finish_log' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return finishPromise
  }

  public uploadManual(suffix: string, manual: FileList): Promise<any> {
    let data = { manual_file: manual[0] }

    let uploadPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('upload-manual-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return uploadPromise
  }

  public manualUrl(suffix: string): Promise<any> {
    let data = { suffix: suffix }

    let manualPromise = new Promise<any>((resolve, reject) => {
      this.apiService.backgroundService('get-log-manual-url', data, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return manualPromise
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