import { Injectable } from '@angular/core'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class ProcessFinishedProductService {
  constructor(private apiService: BackendAPIService, private timeService: DateTimeService) {

  }
}
