import { Component, Input, NgModule } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from './gmp.packing.preop.report.interface'

@Component({
    selector: 'gmp-packing-preop-report',
    templateUrl: '../../../../../templates/gmp.packing.preop.report.component.html'
})

export class GMPPackingPreopReportComponent {
    @Language() lang: string = "en"

    @Input() report: Report

    constructor() {
        
    }
}