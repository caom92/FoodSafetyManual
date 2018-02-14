import { Component, Input, OnInit } from '@angular/core'

import { Language } from 'angular-l10n'

import { Report } from './gmp.packing.preop.report.interface'

@Component({
    selector: 'gmp-packing-preop-report',
    templateUrl: '../../../../../templates/gmp.packing.preop.report.component.html'
})

export class GMPPackingPreopReportComponent implements OnInit {
    @Language() lang: string = "en"

    @Input() report: Report
    @Input() parent: any

    constructor() {
        
    }

    ngOnInit() {
        console.log(this.report)
        console.log(this.parent)
    }
}