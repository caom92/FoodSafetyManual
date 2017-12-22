import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.thermo.calibration.report.interface'

import { GMPPackingThermoCalibrationReportComponent } from '../report/gmp.packing.thermo.calibration.report'

@Component({
    selector: 'gmp-packing-thermo-calibration-report-loader',
    templateUrl: './gmp.packing.thermo.calibration.report.loader.html'
})

export class GMPPackingThermoCalibrationReportLoader {
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