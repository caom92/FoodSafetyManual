import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gap-packing-harvest-machine-cleaning/interfaces/gap-packing-harvest-machine-cleaning-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-capture',
  templateUrl: './gap-packing-harvest-machine-cleaning-capture.component.html'
})

export class GAPPackingHarvestMachineCleaningCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}