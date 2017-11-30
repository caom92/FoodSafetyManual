import { Component, Input, NgModule } from '@angular/core'

import { Report } from './gmp.packing.preop.report.interface'

@Component({
    selector: 'gmp-packing-preop-report',
    templateUrl: '../../../../../templates/gmp.packing.preop.report.component.html'
})

export class GMPPackingPreopReportComponent {
    @Input()
    report: Report

    constructor() {
        
    }
}