import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class CustomerComplaintService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public log(): Promise<any> {
    let logPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('log-customer-complaint-form').then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return logPromise
  }

  public capture(data: Object): Promise<any> {
    let capturePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('capture-customer-complaint-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return capturePromise
  }

  public update(data: Object): Promise<any> {
    let updatePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('update-customer-complaint-form', data).then(success => {
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
      this.apiService.service('authorization-report-customer-complaint-form', data, false).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return authorizationPromise
  }

  public report(data: Object): Promise<any> {
    let reportPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('report-customer-complaint-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return reportPromise
  }

  public listWaitingLogs(): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('list-waiting-logs-customer-complaint-form', null, false).then(success => {
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
      this.apiService.confirmationService('approve-customer-complaint-form', { key: 'Titles.close_customer_complaint' }, { key: 'Messages.close_customer_complaint' }, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return closePromise
  }
}