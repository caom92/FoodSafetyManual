import { Injectable } from '@angular/core';
import { LogService } from './log.service'

import { BackendAPIService } from './backend-api.service'
import { DateTimeService } from './time.service'

@Injectable()
export class GAPPackingPestControlInspectionExteriorLogService extends LogService {
  constructor(apiService: BackendAPIService, timeService: DateTimeService) {
    super(apiService, timeService)
  }

  
}