import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../gmp.packing.preop.interface'

import { GMPPackingPreopReportLoader } from '../loader/gmp.packing.preop.report.loader'

@Component({
    selector: 'gmp-packing-preop-report-displayer',
    templateUrl: './gmp.packing.preop.report.displayer.html'
})

export class GMPPackingPreopReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}