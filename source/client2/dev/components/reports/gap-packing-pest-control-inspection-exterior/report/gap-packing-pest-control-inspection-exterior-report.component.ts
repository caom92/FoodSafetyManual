import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap-packing-pest-control-inspection-exterior-report.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-exterior-report',
  templateUrl: './gap-packing-pest-control-inspection-exterior-report.component.html'
})

export class GAPPackingPestControlInspectionExteriorReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getOrientation(): string {
    return 'L'
  }

  public getFontSize(): string {
    return '10'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.nameColumn{width:108px}.protectionStatusColumn{width:104px}.equipmentStatusColumn{width:104px}.pestTypeColumn{width:104px}.areaVerificationColumn{width:104px}.taskColumn{width:104px}.capturedPestColumn{width:104px}.correctiveActionColumn{width:104px}.observationsColumn{width:104px}</style>'
  }
}