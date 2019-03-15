import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gmp-packing-preop-capture',
  templateUrl: './gmp-packing-preop-capture.component.html'
})

export class GMPPackingPreopCaptureComponent extends SuperCapture {
  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}