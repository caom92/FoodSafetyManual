import { Component, Input, ViewChild } from '@angular/core'
import { Language } from 'angular-l10n'

import { SuperReportComponent } from '../../super-report/super.report'
import { Report } from '../interfaces/gmp.packing.finished.product.report.interface'
import { Preview } from '../../preview/report.preview.interface'

@Component({
  selector: 'gmp-packing-finished-product-report',
  templateUrl: './gmp.packing.finished.product.report.html'
})

export class GMPPackingFinishedProductReportComponent extends SuperReportComponent {
  @Input() report: Report
  @Language() lang: string
  @ViewChild("report_body") reportHTML: any

  constructor() {
    super()
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
    return "L"
  }

  public getFontSize(): string {
    return "8"
  }

  public getCSS(): string {
    return "<style> table { font-family: arial, sans-serif; border-collapse: collapse; width: 100%; } td { border: 1px solid #000000; text-align: left; } th { border: 1px solid #000000; text-align: left; font-weight: bold; background-color: #4CAF50; } .batchColumn { width: 60px; } .areaColumn { width: 60px; } .suppliersColumn { width: 60px; } .productsColumn { width: 60px; } .clientsColumn { width: 60px; } .qualityColumn { width: 70px; } .originColumn{ width: 40px; } .expiresColumn { width: 60px; } .waterColumn { width: 42px; } .packingColumn { width: 52px; } .weightColumn { width: 52px; } .labelColumn { width: 52px; } .traceabilityColumn { width: 52px; } .urlColumn { width: 67px; } .notesColumn { width: 152px; } </style>"
  }
}