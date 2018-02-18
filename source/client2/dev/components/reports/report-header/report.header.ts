import { Component, Input } from '@angular/core'
import { Language } from 'angular-l10n'
import { ReportHeader } from './report.header.interface'

@Component({
  selector: 'report-header',
  templateUrl: './report.header.html'
})

export class ReportHeaderComponent {
  @Language() lang: string
  @Input() header: ReportHeader = {
    zone: null,
    program: null,
    module: null,
    log: null,
    created_on: null,
    created_by: null,
    approved_on: null,
    approved_by: null
  }

  constructor() {

  }
}