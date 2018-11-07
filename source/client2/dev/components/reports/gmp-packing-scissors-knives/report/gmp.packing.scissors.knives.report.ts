import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.scissors.knives.report.interface'

@Component({
  selector: 'gmp-packing-scissors-knives-report',
  templateUrl: './gmp.packing.scissors.knives.report.html'
})

export class GMPPackingScissorsKnivesReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TService) {
    super(ts)
  }

  public getCSS(): string {
    return '<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { background-color: #D3D3D3; width: 631px; } .groupColumn { width: 116px; } .quantityColumn { width: 40px; } .timeColumn { width: 40px; } .approvedColumn { width: 70px; } .returnedColumn { width: 105px; } .actionColumn { width: 170px; } .sanitationColumn { width: 90px; } </style>'
  }
}