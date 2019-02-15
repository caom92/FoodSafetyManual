import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.glass.brittle.report.interface'

@Component({
  selector: 'gmp-packing-glass-brittle-report',
  templateUrl: './gmp.packing.glass.brittle.report.html'
})

export class GMPPackingGlassBrittleReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(translationService: TranslationService) {
    super(translationService)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{background-color:#D3D3D3;width:631px}.descriptionColumn{width:346px}.numberColumn{width:30px}.timeColumn{width:40px}.areaColumn{width:90px}.statusColumn{width:85px}.inventoryColumn{width:40px}</style>'
  }
}