import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gmp-packing-atp-luminometer/interfaces/gmp.packing.atp.luminometer.log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gmp-packing-atp-luminometer-capture',
  templateUrl: './gmp-packing-atp-luminometer-capture.component.html'
})

export class GMPPackingATPLuminometerCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}