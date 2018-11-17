import { Component, Input } from '@angular/core'
import { TranslationService as TService } from 'angular-l10n'

import { LogService } from '../../../../services/app.logs'
import { Preview } from '../../report-common/report-preview/report-preview.interface'
import { SuperReportLoader } from '../../super-report/super.report.loader'
import { Report } from '../interfaces/gmp.packing.finished.product.report.interface'

@Component({
  selector: 'gmp-packing-finished-product-report-loader',
  templateUrl: 'gmp.packing.finished.product.report.loader.component.html'
})

export class GMPPackingFinishedProductReportLoaderComponent extends SuperReportLoader {
  @Input() report: Report

  constructor(ts: TService, logService: LogService) {
    super(ts, logService)
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