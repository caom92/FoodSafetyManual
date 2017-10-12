import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportType } from '../gmp.packing.preop.interface'

@Component({
    selector: '[gmp-packing-preop-report-type]',
    templateUrl: './gmp.packing.preop.type.html'
})

export class GMPPackingPreopReportTypeComponent {
    @Input()
    type: ReportType

    @Input()
    visible: boolean

    @Language()
    lang: string

    constructor() {
        
    }
}