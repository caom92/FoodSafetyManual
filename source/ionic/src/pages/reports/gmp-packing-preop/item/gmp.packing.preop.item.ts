import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportItem } from '../gmp.packing.preop.interface'

@Component({
    selector: '[gmp-packing-preop-report-item]',
    templateUrl: './gmp.packing.preop.item.html'
})

export class GMPPackingPreopReportItemComponent {
    @Input()
    item: ReportItem

    @Language()
    lang: string

    constructor() {
        
    }
}