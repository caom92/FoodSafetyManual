import { Component, Input, NgModule } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gap.packing.preop.report.interface'

import { GAPPackingPreopReportComponent } from '../report/gap.packing.preop.report'

@Component({
    selector: 'gap-packing-preop-report-loader',
    templateUrl: './gap.packing.preop.report.loader.html'
})

export class GAPPackingPreopReportLoader {
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
            console.log("reporte activo: " + activeReport)
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