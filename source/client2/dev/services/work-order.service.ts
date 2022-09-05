import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class WorkOrderService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public capture(data: Object): Promise<any> {
    let capturePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('capture-work-order-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return capturePromise
  }

  public update(data: Object): Promise<any> {
    let updatePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('update-work-order-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return updatePromise
  }

  public authorization(id: number): Promise<any> {
    let data = { id: id }

    let authorizationPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('authorization-report-work-order-form', data, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return authorizationPromise
  }

  public report(data: Object): Promise<any> {
    let reportPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('report-work-order-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return reportPromise
  }

  public listWaitingLogs(): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('list-waiting-logs-work-order-form', null, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return listPromise
  }

  public close(id: number): Promise<any> {
    let data = { id: id, date: this.timeService.getISODate() }

    let closePromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('approve-work-order-form', { key: 'Titles.close_work_order' }, { key: 'Messages.close_work_order' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return closePromise
  }

  public delete(id: number): Promise<any> {
    let data = { id: id }

    let deletePromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('delete-work-order-form', { key: 'Titles.delete_work_order' }, { key: 'Messages.delete_work_order' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return deletePromise
  }
}