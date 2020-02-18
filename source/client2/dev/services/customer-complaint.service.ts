import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class CustomerComplaintService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public log(): Promise<any> {
    return this.apiService.serviceCall('log-customer-complaint-form')
  }

  public capture(data: Object): Promise<any> {
    return this.apiService.serviceCall('capture-customer-complaint-form', data)
  }

  public update(data: Object): Promise<any> {
    return this.apiService.serviceCall('update-customer-complaint-form', data)
  }

  public authorization(id: number): Promise<any> {
    let data = { id: id }

    return this.apiService.serviceCall('authorization-report-customer-complaint-form', data, false)
  }

  public report(data: Object): Promise<any> {
    return this.apiService.serviceCall('report-customer-complaint-form', data)
  }

  public listWaitingLogs(): Promise<any> {
    return this.apiService.serviceCall('list-waiting-logs-customer-complaint-form')
  }

  public close(id: number): Promise<any> {
    let data = { id: id, date: this.timeService.getISODate() }

    return this.apiService.confirmationServiceCall('approve-customer-complaint-form', { key: 'Titles.close_customer_complaint' }, { key: 'Messages.close_customer_complaint' }, data)
  }
}