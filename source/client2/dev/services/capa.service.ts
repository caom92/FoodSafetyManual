import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class CAPAService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public capture(data: Object): Promise<any> {
    let capturePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('capture-capa-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return capturePromise
  }

  public update(data: Object): Promise<any> {
    let updatePromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('update-capa-form', data).then(success => {
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
      this.apiService.service('authorization-report-capa-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return authorizationPromise
  }

  public report(data: Object): Promise<any> {
    let reportPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('report-capa-form', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return reportPromise
  }

  public listWaitingLogs(): Promise<any> {
    let listPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('list-waiting-logs-capa-form').then(success => {
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
      this.apiService.confirmationService('approve-capa-form', 'Titles.close_capa', 'Messages.close_capa', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return closePromise
  }

  public deleteFile(id: number): Promise<any> {
    let data = { id: id }

    let deleteFilePromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('delete-capa-file', 'Titles.delete_file', 'Messages.delete_file', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return deleteFilePromise
  }

  public deleteImage(id: number): Promise<any> {
    let data = { id: id }

    let deleteImagePromise = new Promise<any>((resolve, reject) => {
      this.apiService.confirmationService('delete-capa-image', 'Titles.delete_image', 'Messages.delete_image', data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return deleteImagePromise
  }
}