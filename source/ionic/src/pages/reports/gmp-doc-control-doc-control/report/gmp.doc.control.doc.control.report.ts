import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.doc.control.doc.control.report.interface'

@Component({
  selector: 'gmp-doc-control-doc-control-report',
  templateUrl: './gmp.doc.control.doc.control.report.html'
})

export class GMPDocControlDocControlReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any
  entry = null

  constructor() {
    super()
  }

  ngOnInit() {
    this.report.reports.document.entries.pictures = JSON.parse(this.report.reports.document.entries.pictures)
    this.report.reports.document.entries.files = JSON.parse(this.report.reports.document.entries.files)
    this.entry = true
    console.log(this.report)
    console.log(this.entry)
    super.ngOnInit()
  }

  public getCSS(): string {
    return ""
  }
}