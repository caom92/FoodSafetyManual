import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'

@Injectable()
export class ReportService {
  constructor(private apiService: BackendAPIService) {

  }

  public report(suffix: string, data: any): Promise<any> {
    let reportPromise = new Promise<any>((resolve, reject) => {
      this.apiService.service('report-' + suffix, data).then(success => {
        resolve(success)
      }, error => {
        reject(error)
      })
    })

    return reportPromise
  }
}