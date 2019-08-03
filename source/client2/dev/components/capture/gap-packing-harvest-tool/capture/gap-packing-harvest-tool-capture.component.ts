import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gap-packing-harvest-tool/interfaces/gap-packing-harvest-tool-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-harvest-tool-capture',
  templateUrl: './gap-packing-harvest-tool-capture.component.html'
})

export class GAPPackingHarvestToolCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}