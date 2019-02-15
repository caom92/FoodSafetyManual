import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gap.packing.water.resource.report.interface'

@Component({
  selector: 'gap-packing-water-resource-report',
  templateUrl: './gap.packing.water.resource.report.html'
})

export class GAPPackingWaterResourceReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TranslationService) {
    super(ts)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.fullColumn{background-color:#D3D3D3;width:631px}.nameColumn{width:301px}.dateColumn{width:70px}.complianceColumn{width:60px}.actionColumn{width:200px}</style>'
  }
}