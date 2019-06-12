import { Component, Input, ViewChild } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.aged.product.report.interface'

@Component({
  selector: 'gmp-packing-aged-product-report',
  templateUrl: './gmp.packing.aged.product.report.html'
})

export class GMPPackingAgedProductReportComponent extends SuperReportComponent {
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
    return '8'
  }

  public getCSS(appendCSS?: string): string {
    return '<style>' + this.commonCSS() + ((appendCSS === String(appendCSS)) ? appendCSS : '') + '.batchColumn{width:60px}.areaColumn{width:65px}.suppliersColumn{width:60px}.productsColumn{width:60px}.clientsColumn{width:60px}.qualityColumn{width:65px}.originColumn{width:50px}.expiresColumn{width:60px}.waterColumn{width:50px}.packingColumn{width:52px}.actionColumn{width:60px}.urlColumn{width:67px}.notesColumn{width:231px}.report-red{background-color:red}.report-yellow{background-color:yellow}.report-orange{background-color:#d27931}</style>'
  }
}