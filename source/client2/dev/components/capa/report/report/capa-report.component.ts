import { Component, Input } from '@angular/core'

import { CAPAReportInterface } from '../interface/capa-report.interface'

@Component({
  selector: 'capa-report',
  templateUrl: './capa-report.component.html'
})

export class CAPAReport {
  @Input() report: CAPAReportInterface
}