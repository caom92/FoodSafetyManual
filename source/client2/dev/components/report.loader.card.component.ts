import { Component, Input } from '@angular/core'

@Component({
  selector: 'report-loader-card',
  templateUrl: '../templates/report.loader.card.component.html'
})

export class ReportLoaderCard {
  @Input()
  displayDate: string = ''

  componentName: "ReportLoaderCard"
}