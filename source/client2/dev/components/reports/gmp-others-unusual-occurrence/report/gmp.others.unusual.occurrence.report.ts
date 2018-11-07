import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.others.unusual.occurrence.report.interface'

@Component({
  selector: 'gmp-others-unusual-occurrence-report',
  templateUrl: './gmp.others.unusual.occurrence.report.html'
})

export class GMPOthersUnusualOccurrenceReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any
  entry = null

  constructor(ts: TService) {
    super(ts)
  }

  ngOnInit() {
    super.ngOnInit()
    this.entry = this.report.entry[0]
  }

  public getCSS(): string {
    return '<style>table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .fullColumn { width: 631px; } .shiftColumn { width: 211px; } .areaColumn { width: 210px; } .timeColumn { width: 210px; } .productColumn { width: 316px; } .batchColumn { width: 315px; }</style>'
  }
}