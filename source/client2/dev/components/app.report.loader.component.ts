import { Component, Input, NgModule } from '@angular/core'

import { GMPPackingPreopReportComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.component'

@Component({
    selector: 'report-loader',
    templateUrl: '../templates/app.report.loader.component.html'
})

export class ReportLoader {
    @Input()
    report: any = null

    @Input()
    activeReport: string = "any"

    showReport: boolean = false

    constructor() {
        /*events.subscribe("reportEvent", (activeReport, time) => {
            this.activeReport = activeReport
            console.log("reporte activo: " + activeReport)
        })*/
    }

    openHTMLReport(){
        this.showReport = true
        /*this.events.publish('reportEvent', this.report.report_id, Date.now());*/
    }

    closeHTMLReport(){
        this.showReport = false
        /*this.events.publish('reportEvent', "any", Date.now());*/
    }
}