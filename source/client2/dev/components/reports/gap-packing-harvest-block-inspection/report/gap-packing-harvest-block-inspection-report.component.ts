import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService, DefaultLocale } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap-packing-harvest-block-inspection-report.interface'

@Component({
  selector: 'gap-packing-harvest-block-inspection-report',
  templateUrl: './gap-packing-harvest-block-inspection-report.component.html'
})

export class GAPPackingHarvestBlockInspectionReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @DefaultLocale() defaultLocale: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '</style>'
  }
}