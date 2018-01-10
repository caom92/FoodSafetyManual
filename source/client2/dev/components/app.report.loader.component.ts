import { Component, Input, NgModule, OnDestroy } from '@angular/core'
import { PubSubService } from 'angular2-pubsub'

import { GMPPackingPreopReportComponent } from './gmp/packing/preop/report/gmp.packing.preop.report.component'

@Component({
    selector: 'report-loader',
    templateUrl: '../templates/app.report.loader.component.html'
})

export class ReportLoader implements OnDestroy {
    @Input()
    report: any = null

    @Input()
    activeReport: string = "any"

    showReport: boolean = false

    reportEvent: any = null

    constructor(private events: PubSubService) {
        this.reportEvent = this.events.$sub('reportEvent').subscribe((from) => {
            this.activeReport = from.activeReport;
        });
        /*events.subscribe("reportEvent", (activeReport, time) => {
            this.activeReport = activeReport
            console.log("reporte activo: " + activeReport)
        })*/
    }

    ngOnDestroy(){
        
    }

    openHTMLReport(){
        this.showReport = true
        this.events.$pub('reportEvent', {activeReport:this.report.report_id, time:Date.now()});
        /*this.events.publish('reportEvent', this.report.report_id, Date.now());*/
    }

    closeHTMLReport(){
        this.showReport = false
        this.events.$pub('reportEvent', {activeReport:"any", time:Date.now()});
        /*this.events.publish('reportEvent', "any", Date.now());*/
    }
}