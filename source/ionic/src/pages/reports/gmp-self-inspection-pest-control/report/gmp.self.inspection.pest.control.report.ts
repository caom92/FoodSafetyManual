import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.self.inspection.pest.control.report.interface'

@Component({
  selector: 'gmp-packing-preop-report',
  templateUrl: './gmp.self.inspection.pest.control.report.html'
})

export class GMPSelfInspectionPestControlReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return "<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .even { background-color: #b8e0b9; } .typeTitle { background-color: yellow; width: 588px; } .fullColumn { background-color: #D3D3D3; width: 631px; } .numberColumn { width: 47px; } .areaColumn { width: 195px; } .securedColumn { width: 75px; } .statusColumn { width: 100px; } .activityColumn { width: 70px; } .actionColumn { width: 144px; }</style>"
  }
}