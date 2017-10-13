import { Component, Input, NgModule } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.hand.washing.report.interface'

import { GMPPackingHandWashingReportLoader } from '../loader/gmp.packing.hand.washing.report.loader'

@Component({
    selector: 'gmp-packing-hand-washing-report-displayer',
    templateUrl: './gmp.packing.hand.washing.report.displayer.html'
})

export class GMPPackingHandWashingReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}