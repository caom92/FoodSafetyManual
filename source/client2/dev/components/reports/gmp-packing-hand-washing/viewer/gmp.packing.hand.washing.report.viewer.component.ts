import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../../services/app.backend'
import { LoaderService } from '../../../../services/loader.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gmp-packing-hand-washing-report-viewer',
  templateUrl: 'gmp.packing.hand.washing.report.viewer.component.html'
})

export class GMPPackingHandWashingReportViewerComponent extends SuperReportViewer {
  constructor(routeState: ActivatedRoute,
    server: BackendService,
    formBuilder: FormBuilder,
    loaderService: LoaderService,
    toastService: ToastsService) {
    super(routeState, server, formBuilder, loaderService, toastService)
  }
}