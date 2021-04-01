import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class CropRegistryService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }

  public addRegistry(data: Object): Promise<any> {
    return this.apiService.serviceCall('add-register-crop-registry-form', data)
  }

  public view(): Promise<any> {
    return this.apiService.serviceCall('view-crop-registry-form')
  }
}