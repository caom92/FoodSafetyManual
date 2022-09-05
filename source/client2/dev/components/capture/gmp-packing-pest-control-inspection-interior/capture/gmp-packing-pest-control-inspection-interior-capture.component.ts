import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gmp-packing-pest-control-inspection-interior/interfaces/gmp-packing-pest-control-inspection-interior-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gmp-packing-pest-control-inspection-interior-capture',
  templateUrl: './gmp-packing-pest-control-inspection-interior-capture.component.html'
})

export class GMPPackingPestControlInspectionInteriorCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}