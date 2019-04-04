import { Component } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { BackendService } from '../../../../services/app.backend'
import { LoaderService } from '../../../../services/loader.service'
import { ToastsService } from '../../../../services/toasts.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'

@Component({
  selector: 'gmp-doc-control-doc-control-report-viewer',
  templateUrl: 'gmp.doc.control.doc.control.report.viewer.component.html'
})

export class GMPDocControlDocControlReportViewerComponent extends SuperReportViewer {
  documentList: any = null

  constructor(routeState: ActivatedRoute,
    server: BackendService,
    formBuilder: FormBuilder,
    loaderService: LoaderService,
    toastService: ToastsService) {
    super(routeState, server, formBuilder, loaderService, toastService)
  }

  public ngOnInit(): void {
    super.ngOnInit()

    if (this.suffix == 'gmp-doc-control-doc-control') {
      this.server.update(
        'log-gmp-doc-control-doc-control',
        new FormData(),
        (response: any) => {
          this.documentList = response.data.documents
        }
      )
    }
  }

  public fillRequestForm(): FormData {
    const requestForm = super.fillRequestForm()

    if(this.dateRangeForm.value.document_id != null)
      requestForm.append('document_id', this.dateRangeForm.value.document_id)

    return requestForm
  }

  public initRequestForm(): void {
    super.initRequestForm()

    this.dateRangeForm.addControl('document_id', new FormControl(null))
  }
}