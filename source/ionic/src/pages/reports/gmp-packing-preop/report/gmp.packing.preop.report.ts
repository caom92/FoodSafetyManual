import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from '../gmp.packing.preop.interface'

@Component({
    selector: 'gmp-packing-preop-report',
    templateUrl: './gmp.packing.preop.report.html'
})

export class GMPPackingPreopReportComponent {
    @Input()
    report: Report

    @Language()
    lang: string

    constructor() {
        
    }
}