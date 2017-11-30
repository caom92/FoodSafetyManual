import { Component, Input } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.scissors.knives.report.interface'

import { GMPPackingScissorsKnivesReportLoader } from '../loader/gmp.packing.scissors.knives.report.loader'

@Component({
    selector: 'gmp-packing-scissors-knives-report-displayer',
    templateUrl: './gmp.packing.scissors.knives.report.displayer.html'
})

export class GMPPackingScissorsKnivesReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}