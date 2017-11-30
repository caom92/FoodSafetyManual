import { Component, Input, NgModule } from '@angular/core'

import { ReportItem } from './gmp.packing.preop.report.interface'

@Component({
    selector: '[gmp-packing-preop-report-item]',
    templateUrl: '../../../../../templates/gmp.packing.preop.report.item.component.html'
})

export class GMPPackingPreopReportItemComponent {
    @Input()
    item: ReportItem

    constructor() {
        
    }
}