import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gap.packing.preop.report.interface'

import { GAPPackingPreopReportLoader } from '../loader/gap.packing.preop.report.loader'

@Component({
    selector: 'gap-packing-preop-report-displayer',
    templateUrl: './gap.packing.preop.report.displayer.html'
})

export class GAPPackingPreopReportDisplayer {
    @Input()
    reports: Array<Report> = null

    @Input()
    activeReport: string = "any"

    @Language()
    lang: string
}