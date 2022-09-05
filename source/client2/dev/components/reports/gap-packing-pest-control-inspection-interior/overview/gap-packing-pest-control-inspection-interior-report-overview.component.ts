import { Component, Input } from '@angular/core'
import { Language, TranslationService } from 'angular-l10n'
import { ReportOverview } from '../interfaces/gap-packing-pest-control-inspection-interior-report.interface'

@Component({
  selector: 'gap-packing-pest-control-inspection-interior-report-overview',
  templateUrl: './gap-packing-pest-control-inspection-interior-report-overview.component.html'
})

export class GAPPackingPestControlInspectionInteriorReportOverviewComponent {
  @Input() overview: Array<ReportOverview>
  @Language() lang: string
  plotlyGraph: any = null

  constructor(private translationService: TranslationService) {

  }

  public ngOnInit(): void {
    let labels: Array<string> = []
    let values: Array<number> = []

    for (let overviewItem of this.overview) {
      labels.push(overviewItem.name)
      values.push(overviewItem.total_pests)
    }

    this.plotlyGraph = {
      data: [
        {
          x: labels,
          y: values,
          type: 'bar'
        }
      ],
      layout: { title: this.translationService.translate('Log.total_captured_pests'), yaxis: { title: 'Capturas' } }
    }
  }
}