import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from '../interfaces/gmp.packing.scissors.knives.report.interface'

@Component({
    selector: 'gmp-packing-scissors-knives-report',
    templateUrl: './gmp.packing.scissors.knives.report.html'
})

export class GMPPackingScissorsKnivesReportComponent {
    @Input()
    report: Report

    @Language()
    lang: string

    constructor() {
        
    }
}