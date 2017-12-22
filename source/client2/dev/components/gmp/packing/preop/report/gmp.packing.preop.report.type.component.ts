import { Component, Input, NgModule } from '@angular/core'

import { ReportType } from './gmp.packing.preop.report.interface'

@Component({
    selector: '[gmp-packing-preop-report-type]',
    templateUrl: '../../../../../templates/gmp.packing.preop.report.type.component.html'
})

export class GMPPackingPreopReportTypeComponent {
    @Input()
    type: ReportType

    @Input()
    visible: boolean

    constructor() {
        
    }
}