import { Component, Input, NgModule } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'

import { Language } from 'angular-l10n'

import { ReportItem } from '../interfaces/gmp.packing.hand.washing.report.interface'

@Component({
    selector: '[gmp-packing-hand-washing-report-item]',
    templateUrl: './gmp.packing.hand.washing.item.html'
})

export class GMPPackingHandWashingReportItemComponent {
    @Input()
    item: ReportItem

    @Language()
    lang: string

    constructor() {
        
    }
}