import { Component, Input } from '@angular/core'
import { Events } from 'ionic-angular'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.glass.brittle.report.interface'

import { GMPPackingGlassBrittleReportLoader } from '../loader/gmp.packing.glass.brittle.report.loader'

@Component({
    selector: 'gmp-packing-glass-brittle-report-displayer',
    templateUrl: './gmp.packing.glass.brittle.report.displayer.html'
})

export class GMPPackingGlassBrittleReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string

    constructor(public events: Events) {
        
    }
}