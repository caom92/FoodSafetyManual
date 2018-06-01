import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.ozone.water.report.interface'

@Component({
  selector: 'gmp-packing-ozone-water-report',
  templateUrl: './gmp.packing.ozone.water.report.html'
})

export class GMPPackingOzoneWaterReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .nameColumn { width: 150px; } .valueColumn { width: 481px; } </style>'
  }
}