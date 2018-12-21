import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService as TService } from 'angular-l10n'

import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.finished.product.report.interface'

@Component({
  selector: 'gmp-packing-finished-product-report',
  templateUrl: './gmp.packing.finished.product.report.html'
})

export class GMPPackingFinishedProductReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild('report_body') reportHTML: any

  constructor(ts: TService) {
    super(ts)
  }

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []

    let items = ''
    for (let entry of this.report.entries) {
      items += entry.product + ", "
    }
    
    if (items != '') {
      items = items.substring(0, items.length - 2)
    }

    preview.push({ title: null, content: items })

    return preview
  }

  public getOrientation(): string {
    return 'L'
  }

  public getFontSize(): string {
    return '8'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.batchColumn{width:60px}.areaColumn{width:60px}.suppliersColumn{width:60px}.productsColumn{width:60px}.clientsColumn{width:60px}.qualityColumn{width:70px}.originColumn{width:40px}.expiresColumn{width:60px}.waterColumn{width:42px}.packingColumn{width:52px}.weightColumn{width:52px}.labelColumn{width:52px}.traceabilityColumn{width:52px}.urlColumn{width:67px}.notesColumn{width:152px}</style>'
  }
}