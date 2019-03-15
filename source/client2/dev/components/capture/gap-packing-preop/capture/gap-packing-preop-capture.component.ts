import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gap-packing-preop-capture',
  templateUrl: './gap-packing-preop-capture.component.html'
})

export class GAPPackingPreopCaptureComponent extends SuperCapture {
  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}