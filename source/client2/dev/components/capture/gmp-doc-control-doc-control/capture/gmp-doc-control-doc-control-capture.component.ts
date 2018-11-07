import { Component } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { StateService } from '@uirouter/core'
import { PubSubService } from 'angular2-pubsub'
import { BackendService } from '../../../../services/app.backend'

import { SuperCapture } from '../../super-capture/super.capture'

@Component({
  selector: 'gmp-doc-control-doc-control-capture',
  templateUrl: './gmp-doc-control-doc-control-capture.component.html'
})

export class GMPDocControlDocControlCaptureComponent extends SuperCapture {
  constructor(router: StateService, server: BackendService, sanitizer: DomSanitizer, events: PubSubService) {
    super(router, server, sanitizer, events)
  }
}