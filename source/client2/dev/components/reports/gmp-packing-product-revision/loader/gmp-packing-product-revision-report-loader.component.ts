import { Component, Input } from '@angular/core'

import { LogService } from '../../../../services/log.service'
import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp-packing-product-revision-report.interface'

@Component({
  selector: 'gmp-packing-product-revision-report-loader',
  templateUrl: 'gmp-packing-product-revision-report-loader.component.html'
})

export class GMPPackingProductRevisionReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(logService: LogService) {
    super(logService)
  }

  public getPreview(): Array<Preview> {
    let preview: Array<Preview> = []

    let items = ''
    for (let entry of this.report.entries) {
      items += entry.product + ', '
    }

    if (items != '') {
      items = items.substring(0, items.length - 2)
    }

    preview.push({ title: null, content: items })

    return preview
  }
}