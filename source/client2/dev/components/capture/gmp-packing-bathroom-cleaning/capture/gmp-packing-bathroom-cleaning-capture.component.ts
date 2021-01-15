import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gmp-packing-bathroom-cleaning/interfaces/gmp-packing-bathroom-cleaning-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gmp-packing-bathroom-cleaning-capture',
  templateUrl: './gmp-packing-bathroom-cleaning-capture.component.html'
})

export class GMPPackingBathroomCleaningCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}