import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-report',
  templateUrl: './gmp.packing.cold.room.temp.report.html'
})

export class GMPPackingColdRoomTempReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
  }

  public getCSS(): string {
    return "<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .even { background-color: #b8e0b9; } .timeColumn { width: 40px; } .numberColumn { width: 100px; } .testColumn { width: 91px; } .deficienciesColumn { width: 200px; } .actionColumn { width: 200px; } </style>"
  }
}