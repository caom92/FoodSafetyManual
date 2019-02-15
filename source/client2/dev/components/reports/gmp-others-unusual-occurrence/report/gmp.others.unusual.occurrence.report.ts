import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

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

  constructor(ts: TranslationService) {
    super(ts)
  }

  ngOnInit() {
    super.ngOnInit()
    this.entry = this.report.entry[0]
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{width:631px}.shiftColumn{width:211px}.areaColumn{width:210px}.timeColumn{width:210px}.productColumn{width:316px}.batchColumn{width:315px}</style>'
  }
}