import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { PubSubService } from 'angular2-pubsub'

import { LogService } from '../../../../services/log.service'
import { Log } from '../../../logs/gap-packing-master-sanitation/interfaces/gap-packing-master-sanitation-log.interface'
import { SuperPartialCapture } from '../../super-capture/super.partial.capture'

@Component({
  selector: 'gap-packing-master-sanitation-capture',
  templateUrl: './gap-packing-master-sanitation-capture.component.html'
})

export class GAPPackingMasterSanitationCaptureComponent extends SuperPartialCapture {
  logData: Log = null

  constructor(routeState: ActivatedRoute, logService: LogService, events: PubSubService) {
    super(routeState, logService, events)
  }
}
