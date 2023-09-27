import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gap-packing-cooler-cleaning/interfaces/gap-packing-cooler-cleaning-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-cooler-cleaning-capture',
  templateUrl: './gap-packing-cooler-cleaning-capture.component.html'
})

export class GAPPackingCoolerCleaningCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}
