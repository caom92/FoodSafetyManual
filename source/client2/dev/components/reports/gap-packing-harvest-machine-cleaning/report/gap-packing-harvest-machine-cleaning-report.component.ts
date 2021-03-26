import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap-packing-harvest-machine-cleaning-report.interface'

@Component({
  selector: 'gap-packing-harvest-machine-cleaning-report',
  templateUrl: './gap-packing-harvest-machine-cleaning-report.component.html'
})

export class GAPPackingHarvestMachineCleaningReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getOrientation(): string {
    return 'L'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.dateColumn{width:80px}.quantityColumn{width:100px}.disinfectionColumn{width:120px}.conditionsColumn{width:85px}.washColumn{width:85px}.rinseColumn{width:85px}.initialsColumn{width:60px}.defectsColumn{width:325x}</style>'
  }
}