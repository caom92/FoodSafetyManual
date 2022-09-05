import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gmp-packing-pest-control-inspection-flytrap/interfaces/gmp-packing-pest-control-inspection-flytrap-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gmp-packing-pest-control-inspection-flytrap-capture',
  templateUrl: './gmp-packing-pest-control-inspection-flytrap-capture.component.html'
})

export class GMPPackingPestControlInspectionFlytrapCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}