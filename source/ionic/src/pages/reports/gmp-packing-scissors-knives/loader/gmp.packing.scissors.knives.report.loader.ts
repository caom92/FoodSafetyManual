import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.scissors.knives.report.interface'

import { GMPPackingScissorsKnivesReportComponent } from '../report/gmp.packing.scissors.knives.report'

@Component({
    selector: 'gmp-packing-scissors-knives-report-loader',
    templateUrl: './gmp.packing.scissors.knives.report.loader.html'
})

export class GMPPackingScissorsKnivesReportLoader {
    @Input()
    report: Report = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    showReport: boolean = false

    constructor(public events: Events) {
        events.subscribe("reportEvent", (activeReport, time) => {
            this.activeReport = activeReport
        })
    }

    openHTMLReport(){
        this.showReport = true
        this.events.publish('reportEvent', this.report.report_id, Date.now());
    }

    closeHTMLReport(){
        this.showReport = false
        this.events.publish('reportEvent', "any", Date.now());
    }
}