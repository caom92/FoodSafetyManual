import { Component } from '@angular/core'
import { FormBuilder, FormControl } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'

import { LogService } from '../../../../services/log.service'
import { ReportService } from '../../../../services/report.service'
import { DateTimeService } from '../../../../services/time.service'
import { SuperReportViewer } from '../../super-report/super.report.viewer'


@Component({
  selector: 'gmp-doc-control-doc-control-report-viewer',
  templateUrl: 'gmp.doc.control.doc.control.report.viewer.component.html'
})

export class GMPDocControlDocControlReportViewerComponent extends SuperReportViewer {
  documentList: any = null

  constructor(routeState: ActivatedRoute,
    formBuilder: FormBuilder,
    reportService: ReportService,
    timeService: DateTimeService,
    private logService: LogService) {
    super(routeState, formBuilder, reportService, timeService)
  }

  public ngOnInit(): void {
    super.ngOnInit()

    if (this.suffix == 'gmp-doc-control-doc-control') {
      this.logService.log(this.suffix).then(success => {
        this.documentList = success.documents
      }, error => {

      })
    }
  }

  public initRequestForm(): void {
    super.initRequestForm()

    this.dateRangeForm.addControl('document_id', new FormControl(null))
  }
}