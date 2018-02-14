import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'

@Component({
  selector: 'gmp-packing-hand-washing-report',
  templateUrl: './gmp.packing.hand.washing.report.html'
})

export class GMPPackingHandWashingReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return "<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .nameColumn { width: 531px; } .approvedColumn { width: 100px; }</style>"
  }
}