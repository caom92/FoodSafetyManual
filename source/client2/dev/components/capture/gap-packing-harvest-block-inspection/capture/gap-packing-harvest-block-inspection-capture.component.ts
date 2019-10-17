import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-harvest-block-inspection-capture',
  templateUrl: './gap-packing-harvest-block-inspection-capture.component.html'
})

export class GAPPackingHarvestBlockInspectionCaptureComponent extends SuperPartialCapture {
  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}