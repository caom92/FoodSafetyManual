import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { MaterializeModule } from 'ngx-materialize'

@Component({
    selector: 'report-loader-card',
    templateUrl: '../templates/report.loader.card.component.html'
})

export class ReportLoaderCard {
    @Input()
    displayDate: string = ""

    componentName: "ReportLoaderCard"
}