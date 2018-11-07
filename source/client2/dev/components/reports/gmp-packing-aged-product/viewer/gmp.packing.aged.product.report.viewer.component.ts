import { Component } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { StateService } from '@uirouter/core'

import { BackendService } from '../../../../services/app.backend'
import { LoaderService } from '../../../../services/app.loaders'
import { ToastsService } from '../../../../services/app.toasts'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gmp-packing-aged-product-report-viewer',
  templateUrl: 'gmp.packing.aged.product.report.viewer.component.html'
})

export class GMPPackingAgedProductReportViewerComponent extends SuperReportViewer {
  constructor(router: StateService,
    server: BackendService,
    formBuilder: FormBuilder,
    loaderService: LoaderService,
    toastService: ToastsService) {
    super(router, server, formBuilder, loaderService, toastService)
  }
}