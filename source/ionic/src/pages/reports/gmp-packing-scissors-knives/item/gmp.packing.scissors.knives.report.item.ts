import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.scissors.knives.report.interface'

@Component({
    selector: '[gmp-packing-scissors-knives-report-item]',
    templateUrl: './gmp.packing.scissors.knives.report.item.html'
})

export class GMPPackingScissorsKnivesReportItemComponent {
    @Input()
    item: ReportItem

    @Language()
    lang: string

    constructor() {

    }
}