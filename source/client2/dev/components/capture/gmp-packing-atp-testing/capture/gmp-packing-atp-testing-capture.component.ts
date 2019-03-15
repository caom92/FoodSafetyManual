import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gmp-packing-atp-testing-capture',
  templateUrl: './gmp-packing-atp-testing-capture.component.html'
})

export class GMPPackingATPTestingCaptureComponent extends SuperCapture {
  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}