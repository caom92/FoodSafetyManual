import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.cold.room.temp.report.interface'

@Component({
  selector: 'gmp-packing-cold-room-temp-report',
  templateUrl: './gmp.packing.cold.room.temp.report.html'
})

export class GMPPackingColdRoomTempReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TranslationService) {
    super(ts)
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.even{background-color:#b8e0b9}.timeColumn{width:40px}.numberColumn{width:100px}.testColumn{width:91px}.humidityColumn{width:90px}.deficienciesColumn{width:155px}.actionColumn{width:155px}</style>'
  }
}